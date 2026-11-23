import { beforeEach, expect, it } from 'vitest';
import { createAnalytics } from '../src/analytics';
import { readAnalyticsSwitch } from '../src/firestore';
import { remote } from './stubs/firestore';
import { Platform } from './stubs/react-native';

const DB = {} as never;
const KEYS = { clientId: 'client-id', clientSecret: 'client-secret' };

beforeEach(() => {
  remote.data = undefined;
  remote.fail = false;
  remote.reads = 0;
  Platform.OS = 'ios';
});

it('turns analytics on when config/app says analytics: true', async () => {
  remote.data = { analytics: true };
  const analytics = createAnalytics(KEYS);
  expect(await readAnalyticsSwitch(DB, analytics)).toBe(true);
  expect(analytics.on).toBe(true);
  expect(remote.reads).toBe(1);
});

it('stays off without the document, offline, without a database and on the website', async () => {
  const analytics = createAnalytics(KEYS);
  expect(await readAnalyticsSwitch(DB, analytics)).toBe(false);
  remote.fail = true;
  expect(await readAnalyticsSwitch(DB, analytics)).toBe(false);
  remote.fail = false;
  remote.data = { analytics: true };
  expect(await readAnalyticsSwitch(null, analytics)).toBe(false);
  Platform.OS = 'web';
  expect(await readAnalyticsSwitch(DB, analytics)).toBe(false);
  expect(analytics.on).toBe(false);
});
