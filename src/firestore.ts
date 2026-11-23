import { doc, getDoc, type Firestore } from 'firebase/firestore';
import { Platform } from 'react-native';
import { analyticsSwitch, SWITCH_DOC } from './switch';
import type { Analytics } from './types';

/**
 * Reads the owner's switch once at launch from the Firestore document config/app (field `analytics`) and hands it to the
 * kit. Off when there is no database, no document, no field or no connection, so traffic never starts by accident.
 * An app that already reads config/app (e.g., for a minimum version) can pass that data to `analyticsSwitch` instead.
 */
export async function readAnalyticsSwitch(db: Firestore | null | undefined, analytics: Analytics): Promise<boolean> {
  let on = false;
  if (db && Platform.OS !== 'web') {
    try {
      on = analyticsSwitch((await getDoc(doc(db, SWITCH_DOC.collection, SWITCH_DOC.id))).data());
    } catch {
      // Offline or no document: analytics stays off.
    }
  }
  analytics.setSwitch(on);
  return on;
}
