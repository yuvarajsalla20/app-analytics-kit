/** The Firebase document that holds the owner's switch, and its field. Write `analytics: true` there to turn analytics on. */
export const SWITCH_DOC = { collection: 'config', id: 'app' } as const;
export const SWITCH_FIELD = 'analytics';

/** Reads the switch from the data of config/app. Only a literal true turns analytics on; anything else keeps it off. */
export const analyticsSwitch = (data: unknown): boolean =>
  typeof data === 'object' && data !== null && (data as Record<string, unknown>)[SWITCH_FIELD] === true;
