const assert = require("node:assert/strict");
const { test } = require("node:test");
const reports = require("../web/reports.js");

const bills = [
  {
    id: "a",
    date: "2026-09-01",
    title: "Rent",
    category: "rent",
    amount_cents: 80001,
  },
  {
    id: "b",
    date: "2026-09-30",
    title: "Food",
    category: "groceries",
    amount_cents: 2000,
    notes: "Shared kitchen",
  },
  {
    id: "c",
    date: "2026-10-01",
    title: "Food",
    category: "groceries",
    amount_cents: 1001,
  },
  {
    id: "d",
    date: "2025-09-01",
    title: "Earlier rent",
    category: "rent",
    amount_cents: 70000,
  },
];

test("monthly totals keep every cent and separate years", () => {
  const report = reports.summarize(bills, { month: "2026-09" });
  assert.equal(report.totalCents, 82001);
  assert.equal(report.count, 2);
  assert.deepEqual(
    report.categories.map((item) => [item.category, item.amountCents]),
    [
      ["rent", 80001],
      ["groceries", 2000],
    ],
  );
  assert.deepEqual(
    report.records.map((item) => item.id),
    ["b", "a"],
  );
  assert.equal(reports.summarize(bills, { month: "2026-10" }).totalCents, 1001);
});

test("period, category and text filters intersect without changing source records", () => {
  const before = JSON.stringify(bills);
  assert.equal(
    reports.summarize(bills, {
      month: "2026-09",
      category: "groceries",
      search: "  SHARED  ",
    }).totalCents,
    2000,
  );
  assert.equal(
    reports.summarize(bills, { category: "utilities" }).totalCents,
    0,
  );
  assert.equal(reports.summarize(bills, { search: "missing" }).count, 0);
  assert.equal(JSON.stringify(bills), before);
  assert.deepEqual(reports.months(bills), ["2026-10", "2026-09", "2025-09"]);
});

test("all-period report reconciles categories to bills, including large allowed records", () => {
  const report = reports.summarize(bills);
  assert.equal(report.totalCents, 153002);
  assert.equal(
    report.categories.reduce((sum, entry) => sum + entry.amountCents, 0),
    report.totalCents,
  );
  assert.equal(
    reports.summarize(
      Array.from({ length: 500 }, (_, n) => ({
        ...bills[0],
        id: String(n),
        amount_cents: 100000000,
      })),
    ).totalCents,
    50000000000,
  );
});

test("report CSV keeps exact amounts, escaped titles and safe spreadsheet cells", () => {
  const csv = reports.csv(
    reports.summarize([{ ...bills[2], title: '=HYPERLINK("x")\nInjected' }]),
  );
  assert(csv.startsWith('\uFEFF"date"'));
  assert(csv.includes('"1001","10.01"'));
  assert(csv.includes('"\'=HYPERLINK(""x"")\nInjected"'));
  assert.equal(reports.csv(reports.summarize([])).split("\r\n").length, 2);
});
