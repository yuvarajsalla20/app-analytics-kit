import { beforeEach, describe, expect, it } from 'vitest';
import { createAnalytics as createNative } from '../src/analytics';
import { createAnalytics as createWeb } from '../src/analytics.web';
import { KIT_VERSION } from '../src/version';
import pkg from '../package.json';
import { created, sent } from './stubs/openpanel';
import { resetEffects } from './stubs/react';

const KEYS = { clientId: 'client-id', clientSecret: 'client-secret' };

beforeEach(() => {
  created.length = 0;
  sent.length = 0;
  resetEffects();
});

describe('iPhone and Android', () => {
  it('starts OpenPanel once with both keys and an offline queue', () => {
    const analytics = createNative(KEYS);
    expect(analytics.on).toBe(true);
    expect(created).toHaveLength(1);
    expect(created[0]).toMatchObject({ clientId: 'client-id', clientSecret: 'client-secret' });
    expect(created[0].storage).toBeDefined();
  });

  it('stays off without both keys', () => {
    for (const keys of [null, undefined, { clientId: 'client-id', clientSecret: '' }, { clientId: ' ', clientSecret: 'x' }]) {
      expect(createNative(keys).on).toBe(false);
    }
    expect(created).toHaveLength(0);
  });

  it('records a screen view only when the screen changes, and none while loading', () => {
    const analytics = createNative(KEYS);
    analytics.useScreenView(null);
    analytics.useScreenView('/home');
    analytics.useScreenView('/home');
    analytics.useScreenView('/account/app');
    expect(sent).toEqual([
      { name: 'screen_view', path: '/home' },
      { name: 'screen_view', path: '/account/app' },
    ]);
  });

  it('offers screen views only: no custom events', () => {
    expect(Object.keys(createNative(KEYS)).sort()).toEqual(['on', 'useScreenView']);
  });
});

describe('website', () => {
  it('never starts OpenPanel and sends nothing, even with keys', () => {
    const analytics = createWeb(KEYS);
    analytics.useScreenView('/home');
    expect(analytics.on).toBe(false);
    expect(created).toHaveLength(0);
    expect(sent).toHaveLength(0);
  });
});

it('reports the package version', () => {
  expect(KIT_VERSION).toBe(pkg.version);
});
