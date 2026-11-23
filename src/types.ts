/** The two values from the OpenPanel project's settings. The app reads them from its EAS environment variables. */
export type AnalyticsKeys = { clientId: string; clientSecret: string };

/** What the app receives from `createAnalytics`. Screen views are the only thing the kit sends. */
export type Analytics = {
  /** True when the keys were given and this is iPhone or Android. */
  readonly on: boolean;
  /** Records one screen view each time `screen` changes (e.g., "/home", "/account/app"). Pass null while nothing is shown. */
  useScreenView(screen: string | null): void;
};
