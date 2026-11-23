import type { Analytics, AnalyticsKeys } from './types';

/**
 * The website. It sends nothing and never starts OpenPanel, because the client secret must not reach a browser. The app
 * passes null for the keys on the website (see the README), so the website bundle does not contain them either.
 */
export function createAnalytics(_keys: AnalyticsKeys | null | undefined): Analytics {
  return { on: false, setSwitch() {}, useScreenView() {} };
}
