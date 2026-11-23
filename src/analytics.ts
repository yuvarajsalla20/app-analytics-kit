import AsyncStorage from '@react-native-async-storage/async-storage';
import { OpenPanel } from '@openpanel/react-native';
import { useEffect } from 'react';
import type { Analytics, AnalyticsKeys } from './types';

/**
 * iPhone and Android. Starts OpenPanel once with the app's keys and records screen views only: no custom events, no
 * profile and no account details. Events wait on the phone while it is offline and are sent when it is back online.
 * Without both keys, analytics is off and nothing is sent. The website uses analytics.web.ts instead.
 */
export function createAnalytics(keys: AnalyticsKeys | null | undefined): Analytics {
  const clientId = keys?.clientId?.trim() ?? '';
  const clientSecret = keys?.clientSecret?.trim() ?? '';
  const op = clientId && clientSecret ? new OpenPanel({ clientId, clientSecret, storage: AsyncStorage }) : null;
  return {
    on: op !== null,
    useScreenView(screen) {
      useEffect(() => {
        if (op && screen) op.screenView(screen);
      }, [screen]);
    },
  };
}
