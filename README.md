# FlatLedger

A household app for finding your belongings, planning a room and keeping shared bills clear.

[Try the app](https://roomies-satyam.satyamtomar524.chatgpt.site/) · [User guide](docs/PROJECT_GUIDE.md) · [Find a file or guide](docs/README.md)

![FlatLedger overview](docs/screenshots/home-desktop.png)

## What it does

- Record belongings, their owner and the exact place they are stored.
- Keep a kitchen stock list and turn low items into a shopping list.
- Split bills, record repayments and review spending by month or category.
- Arrange furniture in a measured room and keep notes on planned purchases.

The app starts with an empty household ledger and a labelled **3 × 3.5 m sample room**. Replace the sample measurements with your own before checking furniture fit.

## Run on your computer

You need Python 3.10 or newer. No extra Python packages are required.

```sh
git clone https://github.com/satyamtomar524-tech/flatledger.git
cd flatledger
python -m roommate --no-tracker
```

Open <http://127.0.0.1:8765>. The Python module still uses the original name, `roommate`. On Windows, `./start.ps1 --no-tracker` can also start the app from the code folder.

## Where to find things

| I want to… | Open |
|---|---|
| Learn how to use the app | [User guide](docs/PROJECT_GUIDE.md) |
| Find or update something on GitHub | [GitHub guide](docs/GITHUB_SETUP.md) |
| Understand the code | [Architecture and file map](docs/ARCHITECTURE.md) |
| Check what works and how it was tested | [Verification record](docs/VERIFICATION.md) |
| Explain the project in an interview | [Portfolio notes](docs/PORTFOLIO.md) |

The source uses Python and SQLite for saved records and calculations, with plain JavaScript and SVG for the interface. The browser edition runs the Python code through Pyodide. It needs no AI service or API key.

## Data and limits

The public app saves records in your current browser. Export a backup before clearing site data or moving devices. Each visitor has a separate workspace; shared accounts and device synchronization are not implemented.

Bills use EUR and exact cents. Repayments record what you enter; the app does not connect to a bank or send money. Room checks use rectangles and clearances for rough planning. They are not construction drawings.

The browser edition uses manually recorded product prices. The local server has a limited product-page checker, but no real retailer has been demonstrated as compatible. [Scope and limitations](docs/PRODUCT_SCOPE.md) explains these boundaries.

## Check a change

From the code folder:

```sh
python -B -m unittest discover -s tests -q
node --test tests/reports.test.cjs
```

Node.js is needed for the second command. Optional browser checks and earlier results are in the [verification guide](docs/VERIFICATION.md).

Developed with coding assistance. Actual use, savings and productivity improvements have not been measured.

MIT license · Satyam Tomar. [Room-Planner](https://github.com/EricAndrechek/Room-Planner) and [price-tracker](https://github.com/sonoyumi/price-tracker) inspired early features; their source was not copied.
