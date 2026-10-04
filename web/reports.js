/* Expense reports use recorded bill dates and integer cents. Repayments are excluded. */
"use strict";

const expenseReports = (() => {
  const labels = {
    groceries: "Groceries",
    rent: "Rent",
    utilities: "Utilities",
    household: "Household",
    other: "Other",
  };

  function summarize(
    expenses,
    { month = "all", category = "all", search = "" } = {},
  ) {
    const query = search.trim().toLocaleLowerCase();
    const records = expenses
      .filter(
        (expense) =>
          (month === "all" || expense.date.slice(0, 7) === month) &&
          (category === "all" || expense.category === category) &&
          (!query ||
            `${expense.title} ${expense.notes || ""}`
              .toLocaleLowerCase()
              .includes(query)),
      )
      .sort((a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id));
    const categories = new Map();
    let totalCents = 0;
    for (const expense of records) {
      totalCents += expense.amount_cents;
      categories.set(
        expense.category,
        (categories.get(expense.category) || 0) + expense.amount_cents,
      );
    }
    if (!Number.isSafeInteger(totalCents))
      throw new Error("The expense total exceeds the supported range.");
    return {
      records,
      totalCents,
      count: records.length,
      categories: [...categories]
        .map(([category, amountCents]) => ({
          category,
          label: labels[category] || category,
          amountCents,
        }))
        .sort(
          (a, b) =>
            b.amountCents - a.amountCents ||
            a.category.localeCompare(b.category),
        ),
    };
  }

  function months(expenses) {
    return [...new Set(expenses.map((expense) => expense.date.slice(0, 7)))]
      .sort()
      .reverse();
  }

  function csv(report) {
    const quote = (value) => {
      const text = String(value);
      // Prevent spreadsheet formulas when an entered title starts with a formula marker.
      const safe = /^[=+\-@\t\r\n]/.test(text) ? `'${text}` : text;
      return `"${safe.replaceAll('"', '""')}"`;
    };
    const rows = [
      ["date", "title", "category", "amount_cents", "amount_eur"],
      ...report.records.map((record) => [
        record.date,
        record.title,
        record.category,
        record.amount_cents,
        `${Math.floor(record.amount_cents / 100)}.${String(record.amount_cents % 100).padStart(2, "0")}`,
      ]),
    ];
    return (
      "\uFEFF" +
      rows.map((row) => row.map(quote).join(",")).join("\r\n") +
      "\r\n"
    );
  }

  return { summarize, months, csv, labels };
})();

if (typeof module !== "undefined" && module.exports)
  module.exports = expenseReports;
