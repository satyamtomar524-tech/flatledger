# Start with one task

FlatLedger has six areas. Pick the page for the task you want to do; you do not need to set up everything at once.

## Get started

Open the public website to try FlatLedger without installing anything. It saves in your current browser; Export keeps a backup. Sharing the link gives each friend their own workspace, with no live synchronization.

For the local Python app, run `python -m roommate` from the project directory, or `start.ps1` on Windows. Open the printed local address. The code keeps the original Python module name for compatibility.

- **Overview:** a short overview and shortcuts.
- **Space planner:** the measured room plan. Start with the sample, then enter your actual walls, openings and furniture.
- **Inventory:** belongings and where to find them. Add a name, room, exact spot, quantity and owner.
- **Kitchen stock:** kitchen equipment plus fridge, freezer and pantry supplies. Update stock status as things are used.
- **Expenses:** people, bills, repayments and balances.
- **Purchase planning:** wishlist products and price history.

The flat starts empty. Add your flatmates in flat settings before assigning belongings or splitting a bill.

## Find something you own

Add a kettle in Inventory. Set location to Kitchen, spot to Worktop beside the sink, and owner to Shared. Later, search “kettle” or filter by Kitchen.

Small objects do not need dimensions. Inventory is an inventory; Space planner is a measured arrangement. They remain separate so adding a spoon cannot create a floor-plan conflict.

## Keep the kitchen useful

Equipment such as pans and kettles belongs in the flat inventory. Food belongs in the kitchen stock list. Choose Fridge, Freezer or Pantry and record the amount as ordinary text, such as “1 carton.”

Set stock to Stocked, Low or Out. Low and Out entries become the shopping checklist. Optional best-before dates help organize what to check next. The app cannot determine freshness or safety from an entered date.

## Split a bill

1. Add the people in your flat.
2. Enter the bill title, date and total amount.
3. Select who paid.
4. Select the people sharing that bill. A person can pay without taking a share.
5. Save and review the balances and suggested payments.

A positive balance means that person is owed money. A negative balance means they owe money. Values stay in exact cents. Remainder cents go to the first participants in saved order.

After paying someone back, choose **Record repayment** next to the suggestion. Check the people, amount and date, then confirm the payment has already been made. A partial repayment reduces what is owed. Paying back the full amount clears it. Repayments do not increase spending, and the app does not send money or verify a bank transfer.

Use **Money paid back** to edit or remove a mistaken entry. Member removal is blocked while belongings, food, bills, repayments or monthly templates still refer to that person.

## Review spending

Use the report at the top of Expenses to choose a period, category or title/notes search. Category totals and the bill history use those filters. **Export current report** downloads the selected bills; **Export bill shares** downloads the complete ledger's participant shares.

The report counts bills by their recorded date and excludes repayments. Outstanding balances always use all bills and repayments. Filtering September spending does not hide a debt from another month. The overview's spending card uses the current calendar month on your device.

## Keep rent and regular bills ready

Open **Rent & regular bills** and save a monthly bill: the usual amount, who pays, who shares it and the due day. If you choose the 31st, a shorter month uses its last day.

Nothing enters your spending yet. After the bill is paid, choose **Record paid bill**, check the date and actual amount, and save. One saved bill can have one recorded expense per calendar month. You can edit that expense if it is wrong. Updating the template affects future entries; older expenses keep their original amounts. Pause or remove a template when you no longer need it.

## Arrange the room

Select a piece, drag it or edit its coordinates, and wait for the saved status. Use More details for less frequent controls. Arrow keys move by 5 cm; R rotates.

Owned items have solid outlines and planned places have dashed outlines. Surface objects use local coordinates on one supporting floor item. Rugs can use Overlay. Wall markers do not occupy floor area.

Confirm the actual room measurements before using buying alerts. The sample room is an illustration. A geometric fit checks rectangles and defined clearances, not comfort, load capacity, assembly access or building compliance.

## Consider an upgrade

Link an exact product to a planned place. Enter dimensions and the delivered-price target. Record a quote with stock, shipping, time, source and variant confirmation.

Unknown shipping stays blank. A live SKU match can support an informational item-price notice; it cannot invent a delivered total. A buying-target alert requires all the fit, evidence and delivery conditions in `DATA_AND_RULES.md`.

## Follow one action through the code

| Action | Browser | Python rule | Saved data |
|---|---|---|---|
| Move a desk | `web/app.js` | `geometry.py` | Room in `storage.py` |
| Store a kettle's location | `web/flat.js` | `household.py` | Flat in `storage.py` |
| Report recorded spending | `web/reports.js` | Validated bills from Python | Read-only calculation; no write |
| Split groceries | `web/flat.js` | `expenses.py` | Expense inside flat |
| Record money paid back | `web/costs.js` | `expenses.py` | Repayment inside flat |
| Reuse a monthly bill | `web/costs.js` | `expenses.py` | Template, then a reviewed expense |
| Record a product quote | `web/app.js` | `pricing.py` | Separate observation |

`server.py` receives the JSON requests. An API is this browser-to-Python interface. JSON is the structured text they exchange. SQLite is the database stored in one local file.

Start learning with one action. For example, trace how a €20.00 expense becomes 2,000 cents, is divided and appears in the balance table. Then change one small behavior and verify it with the existing checks.

## Back up the workspace

Use the data menu to export a full backup. Current backups include the flat, repayments, monthly bills and room. Version 1 room-only backups preserve the existing flat. Version 2 backups restore the flat records they contain; if repayments and monthly bills are absent, those lists become empty. The import preview explains this before confirmation. Runtime databases and actual backups belong outside the public repository.

See `VERIFICATION.md` for the checks and `PORTFOLIO.md` for a description you can explain in an interview.
