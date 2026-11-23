import AsyncStorage from '@react-native-async-storage/async-storage';
import { OpenPanel } from '@openpanel/react-native';
import { useEffect } from 'react';
import type { Analytics, AnalyticsKeys } from './types';

/**
 * iPhone and Android. Records screen views only: no custom events, no profile and no account details. Nothing is sent
 * until both keys are given and the owner's switch is on; OpenPanel is not even started before then. Events wait on the
 * phone while it is offline and are sent when it is back online. The website uses analytics.web.ts instead.
 */
export function createAnalytics(keys: AnalyticsKeys | null | undefined): Analytics {
  const clientId = keys?.clientId?.trim() ?? '';
  const clientSecret = keys?.clientSecret?.trim() ?? '';
  const hasKeys = Boolean(clientId && clientSecret);
  let op: OpenPanel | null = null;
  let switchOn = false;
  let current: string | null = null;

  const send = (screen: string | null) => {
    if (!switchOn || !hasKeys || !screen) return;
    op ??= new OpenPanel({ clientId, clientSecret, storage: AsyncStorage });
    op.screenView(screen);
  };

  return {
    get on() {
      return hasKeys && switchOn;
    },
    setSwitch(on) {
      const turnedOn = on && !switchOn;
      switchOn = on;
      if (turnedOn) send(current);
    },
    useScreenView(screen) {
      useEffect(() => {
        // Null means nothing new is on show; the last screen stays the one sent when the switch turns on.
        if (screen) current = screen;
        send(screen);
      }, [screen]);
    },
  };
}
