/** The two values from the OpenPanel project's settings. The client ID is public; the secret comes from the environment. */
export type AnalyticsKeys = { clientId: string; clientSecret: string };

/** What the app receives from `createAnalytics`. Screen views are the only thing the kit sends. */
export type Analytics = {
  /** True when the keys were given, this is iPhone or Android, and the owner's switch is on. */
  readonly on: boolean;
  /**
   * The owner's switch, from the app's Firebase document config/app (see `analyticsSwitch`). It starts off, so nothing
   * is sent until the switch is known to be on. Turning it on sends the screen on show.
   */
  setSwitch(on: boolean): void;
  /** Records one screen view each time `screen` changes (e.g., "/home", "/account/app"). Pass null while nothing is shown. */
  useScreenView(screen: string | null): void;
};
