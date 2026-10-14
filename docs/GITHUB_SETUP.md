# Finding your way around GitHub

[FlatLedger repository](https://github.com/satyamtomar524-tech/flatledger) · [All guides](README.md) · [Project overview](../README.md)

## Find a file

Open the repository's **Code** page. The README explains the project; the folders above it contain the files.

| Looking for | Folder or file |
|---|---|
| Project introduction and run command | `README.md` |
| Explanations and instructions | `docs/` |
| Python rules, calculations and database code | `roommate/` |
| Pages, colours and browser behaviour | `web/` |
| Automated checks | `tests/` |
| Build helpers | `scripts/` |
| Sample setup data | `examples/` |

Press **t** on the repository page, or use **Go to file**, to search for a filename. For example, search for `expenses.py` to find the bill calculations or `style.css` to find the page styling. Use repository search when you know a word in the code but not the filename.

[GitHub lists the file-finder shortcut here](https://docs.github.com/en/get-started/accessibility/keyboard-shortcuts). The **Actions** page shows automated check results. **Issues** can hold a bug report or a small improvement idea. A **pull request** shows proposed code changes for review.

## Make one small change

Run commands from your cloned repository folder. On Satyam's organised Desktop copy, this is `flatledger/02_Code`.

1. Run `git status` to see existing changes.
2. Edit one file, then run the relevant checks from the [verification guide](VERIFICATION.md).
3. Run `git diff` and read what changed.
4. Stage the intended file, commit it and push when you want it published.

For a README-only change, the last step is:

```sh
git add README.md
git commit -m "Clarify the project introduction"
git push
```

Use the filename you actually changed. Check `git status` again before committing. Actual household records, database files, private backups and credentials do not belong in this repository.

## Ask for help clearly

A few useful requests for Codex:

- “Find the FlatLedger code that splits a bill and explain it simply.”
- “Show me which files changed before publishing.”
- “Fix this bug, run the relevant checks and show me the result.”

Name the project and describe what you expected and what happened. For an error, include the exact message.

## Why some names still say Roomies

The project was renamed to FlatLedger. The Python module remains `roommate`; the `roomies` command and existing public URL are retained for compatibility. The public site's storage name is also retained so the rename does not lose saved records.

To get a fresh copy, follow [Run on your computer](../README.md#run-on-your-computer). The [workflow history](https://github.com/satyamtomar524-tech/flatledger/actions) records checks run by GitHub.
