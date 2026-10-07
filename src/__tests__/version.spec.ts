import { describe, expect, it } from 'vitest';
import { RELEASE_TAG, mockApiVersion } from '../version';

describe('api-version.json', () => {
  it('pins mock-api to a release tag', () => {
    expect(mockApiVersion).toMatch(RELEASE_TAG);
  });
});
