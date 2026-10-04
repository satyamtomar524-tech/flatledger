/* Run inside a disposable local or public-browser workspace. */
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");

module.exports = async function reportWorkflow(page, getState) {
  const original = (await getState()).flat;
  const payer = original.members[0].id;
  const participants = original.members.map((member) => member.id);
  const bill = (id, date, title, category, amount_cents, notes = "") => ({
    id,
    date,
    title,
    category,
    amount_cents,
    notes,
    paid_by: payer,
    split_between: participants,
  });
  await page.evaluate(
    async (expenses) =>
      updateFlat((flat) => {
        flat.expenses = expenses;
        flat.repayments = [];
        flat.monthly_bills = [];
      }),
    [
      bill("report-rent", "2026-09-01", "Example rent", "rent", 80001),
      bill(
        "report-food",
        "2026-09-30",
        "Example groceries",
        "groceries",
        2000,
        "Shared kitchen",
      ),
      bill(
        "report-oct",
        "2026-10-01",
        "Example October groceries",
        "groceries",
        1001,
      ),
    ],
  );
  const navigate = (view) =>
    page.locator(`.navigation [data-view="${view}"]`).click();
  await navigate("expenses");
  const balances = await page.locator("#balances-list").innerText();
  assert.match(
    await page.locator("#spending-metrics").innerText(),
    /830[.,]02/,
  );
  await page.selectOption("#expense-period", "2026-09");
  assert.match(
    await page.locator("#spending-metrics").innerText(),
    /820[.,]01/,
  );
  assert.equal(
    await page.locator("#expense-list [data-expense-id]").count(),
    2,
  );
  await page.selectOption("#expense-category", "groceries");
  assert.match(await page.locator("#spending-metrics").innerText(), /20[.,]00/);
  assert.equal(
    await page.locator("#expense-list [data-expense-id]").count(),
    1,
  );
  await page.locator("#expense-search").fill("missing");
  assert.equal(
    await page.locator("#expense-list [data-expense-id]").count(),
    0,
  );
  await page.locator("#expense-search").fill("kitchen");
  assert.equal(
    await page.locator("#expense-list [data-expense-id]").count(),
    1,
  );
  assert.equal(await page.locator("#balances-list").innerText(), balances);
  const downloadEvent = page.waitForEvent("download");
  await page.locator("#export-spending").click();
  const download = await downloadEvent;
  assert.equal(download.suggestedFilename(), "flatledger-spending-report.csv");
  const csv = await fs.readFile(await download.path(), "utf8");
  assert(csv.includes('"2000","20.00"'));
  assert(csv.includes("Example groceries"));
  assert(!csv.includes("Example rent") && !csv.includes("October"));
  await navigate("flat");
  await page.goBack();
  assert.equal(new URL(page.url()).hash, "#expenses");
  assert(await page.locator("#view-expenses").isVisible());
  await page.reload();
  await page.waitForFunction(() =>
    document
      .querySelector("#save-status")
      .textContent.includes("All changes saved"),
  );
  assert(await page.locator("#view-expenses").isVisible());
  assert.match(
    await page.locator("#spending-metrics").innerText(),
    /830[.,]02/,
  );
  await page.evaluate(() => showView("journal"));
  await page.reload();
  await page.waitForFunction(() =>
    document
      .querySelector("#save-status")
      .textContent.includes("All changes saved"),
  );
  assert(await page.locator("#view-journal").isVisible());
  await page.evaluate(
    async (flat) => updateFlat((target) => Object.assign(target, flat)),
    original,
  );
  await navigate("home");
  assert.equal(
    await page
      .locator(
        "#home-plan-preview [data-item-id], #home-plan-preview [id], #home-plan-preview [tabindex]",
      )
      .count(),
    0,
  );
};
