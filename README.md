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
