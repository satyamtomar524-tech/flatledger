# Product scope and feasibility

Updated 3 October 2026 · FlatLedger 2.3.0

## Problem and user

A person managing a rented room or small household needs to answer four questions: what do we own, where is it, what needs replenishing, and who paid for what? FlatLedger keeps those records together and adds measured space planning before a purchase.

The first usable scope is a private, device-local workspace maintained by one person. Flatmate names identify ownership and bill shares; they are not accounts. The application has no shared cloud database.

## Delivered capabilities

| Workflow | Input required | Output | Boundary |
|---|---|---|---|
| Inventory | Item, quantity, owner and location | Searchable asset register | Manually entered |
| Kitchen stock | Stock status and storage place | Low/out shopping checklist | No purchase automation or food-safety assessment |
| Expense ledger | Amount/date, payer and participants | Exact shares, balances and suggested repayments | EUR; equal splits; payments made outside the app |
| Spending report | Bills and selected filters | Category totals, bill history and CSV | Repayments excluded; no bank reconciliation |
| Monthly bills | Usual amount and due day | Reviewed recurring bill entry | Never charges or adds spending automatically |
| Space planning | Room, openings and item dimensions | 2D arrangement and clearance checks | Rectangular geometry; confirm measurements on site |
| Purchase planning | Exact dimensions and dated prices | Fit and delivered-price target checks | Manual on the public website; no proven live retailer integration |

The overview reports current-calendar-month spending from bill dates. Filtered reports do not alter records or settlement calculations. Category totals reconcile to selected bills in integer cents. The filtered CSV exports its selected bills; the existing bill-shares CSV exports the complete ledger.

## Why this scope is achievable

The local server and public browser edition reuse one Python rules and storage layer. SQLite transactions protect validated writes. The frontend has no framework build dependency. Public hosting serves static files and a pinned Python browser runtime; household data stays on the visitor's device.

Users need backups and cannot edit the same household simultaneously from different devices. Previous browser storage names and backup schemas are preserved through the FlatLedger rename. The public URL is retained because records belong to its browser origin.

## Later priorities

1. Observe a small, consenting user trial and record confusing tasks before expanding scope. No trial has been run yet.
2. Add shared accounts only when needed. Design household membership, permissions, edit conflicts and export/deletion controls, then test access boundaries.
3. Add a specific retailer integration after checking its permitted access method, variant identity and delivered-price evidence. An unsupported source stays manual.

AI is optional future work. It could explain validated records or suggest arrangements within existing constraints. A model would not replace geometry checks or expense arithmetic. No generative AI integration is claimed in this release.
