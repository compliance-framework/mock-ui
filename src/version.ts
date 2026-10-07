import apiVersion from './api-version.json';

// Release tag shape shared by the mock repos: vX.Y.Z or vX.Y.Z-rcN.
export const RELEASE_TAG = /^v\d+\.\d+\.\d+(-rc\d+)?$/;

// The mock-api release this UI targets. Written by scripts/sync-mock-api-version.sh.
export const mockApiVersion: string = apiVersion.mockApi;
