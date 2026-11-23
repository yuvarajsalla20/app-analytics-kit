import { beforeEach, describe, expect, it } from 'vitest';
import { createAnalytics as createNative } from '../src/analytics';
import { createAnalytics as createWeb } from '../src/analytics.web';
import { analyticsSwitch } from '../src/switch';
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

describe('the owner switch', () => {
  it('starts off: OpenPanel is not started and nothing is sent', () => {
    const analytics = createNative(KEYS);
    analytics.useScreenView('/home');
    expect(analytics.on).toBe(false);
    expect(created).toHaveLength(0);
    expect(sent).toHaveLength(0);
  });

  it('turning it on starts OpenPanel once, with an offline queue, and sends the screen on show', () => {
    const analytics = createNative(KEYS);
    analytics.useScreenView('/home');
    analytics.setSwitch(true);
    analytics.setSwitch(true);
    expect(analytics.on).toBe(true);
    expect(created).toHaveLength(1);
    expect(created[0]).toMatchObject({ clientId: 'client-id', clientSecret: 'client-secret' });
    expect(created[0].storage).toBeDefined();
    expect(sent).toEqual([{ name: 'screen_view', path: '/home' }]);
  });

  it('turning it off stops sending', () => {
    const analytics = createNative(KEYS);
    analytics.setSwitch(true);
    analytics.useScreenView('/home');
    analytics.setSwitch(false);
    analytics.useScreenView('/report');
    expect(sent).toEqual([{ name: 'screen_view', path: '/home' }]);
  });

  it('reads only a literal true from config/app', () => {
    expect(analyticsSwitch({ analytics: true })).toBe(true);
    for (const data of [undefined, null, {}, { analytics: 'true' }, { analytics: 1 }, { analytics: false }]) {
      expect(analyticsSwitch(data)).toBe(false);
    }
  });
});

describe('iPhone and Android', () => {
  it('stays off without both keys, even with the switch on', () => {
    for (const keys of [null, undefined, { clientId: 'client-id', clientSecret: '' }, { clientId: ' ', clientSecret: 'x' }]) {
      const analytics = createNative(keys);
      analytics.setSwitch(true);
      analytics.useScreenView('/home');
      expect(analytics.on).toBe(false);
    }
    expect(created).toHaveLength(0);
  });

  it('records a screen view only when the screen changes, and none while loading', () => {
    const analytics = createNative(KEYS);
    analytics.setSwitch(true);
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
    expect(Object.keys(createNative(KEYS)).sort()).toEqual(['on', 'setSwitch', 'useScreenView']);
  });
});

describe('website', () => {
  it('never starts OpenPanel and sends nothing, even with keys and the switch on', () => {
    const analytics = createWeb(KEYS);
    analytics.setSwitch(true);
    analytics.useScreenView('/home');
    expect(analytics.on).toBe(false);
    expect(created).toHaveLength(0);
    expect(sent).toHaveLength(0);
  });
});

it('reports the package version', () => {
  expect(KIT_VERSION).toBe(pkg.version);
});
