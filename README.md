# mock-ui

Mock repo for developing CCF release automation. Not a product.

It mirrors [compliance-framework/ui](https://github.com/compliance-framework/ui) in miniature: a
Vite + TypeScript app on Node 20, served by nginx from a Docker image.

## Commands

```sh
npm ci
npm run lint           # ESLint
npm run format:check   # Prettier
npm run type-check     # tsc --noEmit
npm test               # Vitest
npm run build          # type-check, then vite build into dist/
docker build .         # nginx image serving dist/
```

## mock-api version

`src/api-version.json` records the mock-api release this UI targets. Update it with:

```sh
scripts/sync-mock-api-version.sh v1.2.3   # vX.Y.Z or vX.Y.Z-rcN
```

The script stands in for ui's `scripts/sync-agentconfig-conformance.sh`, so `ccf-bump`'s ui updater
can be tested against the mocks. It is offline and does not check that the tag exists.

## Releases

Release automation comes from the shared workflows in
[compliance-framework/workflows](https://github.com/compliance-framework/workflows), pinned by
commit SHA:

- `release-please.yml`: on pushes to `main`, release-please opens or updates the release PR from
  the conventional-commit history (`release-please-config.json`, `.release-please-manifest.json`).
  Merging it tags `vX.Y.Z` and publishes the GitHub release.
- `release.yml`: a published release builds `ghcr.io/compliance-framework/mock-ui` and tags it
  `X.Y.Z`, `X.Y`, `X` and `latest` (a `-rcN` tag publishes only `X.Y.Z-rcN`).
- `cut-prerelease.yml`: run by hand (`workflow_dispatch`), it tags `vX.Y.Z-rcN` on `main`, taking
  the version from the open release PR, and publishes it as a GitHub prerelease.
- `preview.yml`: pushes to `main` publish `:main` and `:sha-<7>`; a PR labelled `preview`
  publishes `:pr-<number>`.
- `ci.yml` runs `release-checks.yml`, which only acts on `release-please--*` PRs.
