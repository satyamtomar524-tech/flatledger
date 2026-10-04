# GitHub project

Public repository: [satyamtomar524-tech/flatledger](https://github.com/satyamtomar524-tech/flatledger).

The project was renamed from Roomies to FlatLedger on 3 October 2026. The repository contains source, tests, documentation and sample setup data. Actual room databases, belongings, groceries and expense records are excluded from Git.

## Get a working copy

```sh
git clone https://github.com/satyamtomar524-tech/flatledger.git
cd flatledger
python -m roommate
```

The Python module keeps its original name for compatibility. The app and repository are called FlatLedger. The installed package exposes `flatledger` and keeps the earlier `roomies` command as an alias.

If you already cloned the previous repository, update its remote:

```sh
git remote set-url origin https://github.com/satyamtomar524-tech/flatledger.git
git pull
```

## Publish your next change

Make a small change and run the relevant checks first:

```sh
python -m unittest discover -s tests -v
node --check web/app.js
node --check web/flat.js
git status
git add PATH-TO-YOUR-CHANGED-FILE
git commit -m "Describe the change"
git push
```

Replace the placeholder with your changed file. Keep actual backups private. This repository uses a GitHub noreply commit address.

The [workflow history](https://github.com/satyamtomar524-tech/flatledger/actions) records remote checks.
