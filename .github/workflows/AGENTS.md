# Workflow Guidelines

## Scope

These instructions apply to files under `.github/workflows/`.

## General CI Rules

- Keep workflows idempotent and safe for scheduled re-runs.
- Prefer explicit shell safety in script blocks: `set -euo pipefail`.
- Use clear step names and stable step outputs for control flow.
- Avoid destructive git operations unless strictly required and justified by workflow logic.

## Branch Governance

- Never push directly to `master` from workflows.
- Use a dedicated sync/automation branch for upstream flows.
- Changes to protected branches must enter via Pull Request.
- Prefer merge commit strategy when repository governance requires audit-friendly history.

## Upstream Sync Workflow (`sync-upstream.yml`)

- Purpose: synchronize fork changes from `consistem/intersystems-servermanager` into this repository branch via PR.
- Schedule: daily at `03:00 UTC` (equivalent to `00:00 America/Sao_Paulo`).
- Invariants:
    - Sync branch is `bot/sync-upstream-master`.
    - No direct writes to `master`.
    - PR only flow (`bot/sync-upstream-master` -> `master`).
    - Merge mode must be merge commit (`git merge --no-ff`), not squash/rebase.
    - PR creation/update must be done via `peter-evans/create-pull-request`.
- Safety behavior:
    - Exit with no action if upstream tip is already contained in base.
    - Only create/update PR when there is real upstream update.
    - After PR creation/update, auto-merge should be enabled as best-effort using merge commit strategy.
- Conflict behavior:
    - Log merge conflict and require manual resolution on the sync branch.
    - Optional Google Chat alert can notify maintainers about conflicts and include manual resolution commands.

## Release Workflows (`main.yml`, `prerelease.yml`)

- These come from upstream. Keep fork changes to them minimal, so upstream syncs merge cleanly.
- `build` and `beta` stay active: every push to `master` builds, lints, tests and creates a GitHub pre-release with the `.vsix`.
- The `publish` job (Marketplace and Open VSX) is **off** in this fork: it runs only when the repository variable `ENABLE_MARKETPLACE_PUBLISH` is `'true'`. The variable is not set, because the fork does not publish to the Marketplace.
- In its place, the fork-only `release-vsix` job in `main.yml` attaches the `.vsix` to the GitHub release on every `released` event (it reuses the `.vsix` that `build` tested, so `build` uploads it on releases too). It runs only while `ENABLE_MARKETPLACE_PUBLISH` is not `'true'`, so it never races with `publish`, which uploads its own `.vsix` to the same release.
- A `release` event runs the workflow file of the tagged commit, not the one on `master`. A tag created before a workflow change does not get it.
- Before setting `ENABLE_MARKETPLACE_PUBLISH` to `'true'`:
    - `main.yml` publishes with trusted publishing (`vsce publish --oidc`, `ovsx publish --trusted-publishing`): configure it for the `consistem-sistemas` publisher in the VS Marketplace and in Open VSX. There is no token fallback; without it the job fails.
    - `prerelease.yml` still publishes with the `VSCE_TOKEN` / `OVSX_TOKEN` secrets.
    - Both jobs check out with the `TOKEN` secret (missing in this fork) and push a version bump straight to `master`, which breaks the Branch Governance rule above. Adapt that step (for example, to open a PR) or allow the push explicitly.

## Repository Setup Requirements

- GitHub Actions enabled.
- Repository workflow permissions must allow:
    - `Contents: Read and write`
    - `Pull requests: Read and write`
- Authentication should use `GITHUB_TOKEN` (`github.token`) for checkout and PR automation.
- Repository allows merge commits.
- Optional secret `GOOGLE_CHAT_WEBHOOK_URL` for Chat notifications.
