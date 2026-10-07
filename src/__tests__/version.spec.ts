import { execFileSync, spawnSync } from 'node:child_process';
import {
  copyFileSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockApiVersion } from '../version';

// Release tag shape shared by the mock repos: vX.Y.Z or vX.Y.Z-rcN.
const RELEASE_TAG = /^v\d+\.\d+\.\d+(-rc\d+)?$/;

describe('api-version.json', () => {
  it('pins mock-api to a release tag', () => {
    expect(mockApiVersion).toMatch(RELEASE_TAG);
  });
});

describe('scripts/sync-mock-api-version.sh', () => {
  const original = '{\n  "mockApi": "v0.0.0"\n}\n';
  let root: string;
  let script: string;
  let file: string;

  // Run against a copy: the script writes relative to its own directory.
  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'mock-ui-sync-'));
    mkdirSync(join(root, 'scripts'));
    mkdirSync(join(root, 'src'));
    script = join(root, 'scripts', 'sync-mock-api-version.sh');
    copyFileSync(
      fileURLToPath(
        new URL('../../scripts/sync-mock-api-version.sh', import.meta.url),
      ),
      script,
    );
    file = join(root, 'src', 'api-version.json');
    writeFileSync(file, original);
  });

  afterEach(() => {
    rmSync(root, { recursive: true, force: true });
  });

  it.each(['v1.2.3', 'v10.0.1-rc2'])('writes %s', (tag) => {
    execFileSync('bash', [script, tag]);
    expect(readFileSync(file, 'utf8')).toBe(`{\n  "mockApi": "${tag}"\n}\n`);
  });

  it.each([['1.2.3'], ['v1.2'], ['v1.2.3-beta1'], ['v1.2.3"'], []])(
    'rejects %j and leaves the file unchanged',
    (...args: string[]) => {
      const result = spawnSync('bash', [script, ...args]);
      expect(result.status).not.toBe(0);
      expect(readFileSync(file, 'utf8')).toBe(original);
    },
  );
});
