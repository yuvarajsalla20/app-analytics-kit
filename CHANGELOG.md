# Changelog

Upgrade notes for app-analytics-kit, newest first. Each version is tagged in git (`v1.0.0`).

## 1.1.0 (2026-11-23)

- The owner switch. Analytics now starts off: OpenPanel is not started and nothing is sent until the app calls `setSwitch(true)`. Turning it on sends the screen on show; turning it off stops sending.
- `analyticsSwitch(data)` reads the switch from the data of the Firebase document `config/app` (field `analytics`); only a literal `true` turns it on. `SWITCH_DOC` and `SWITCH_FIELD` name the document and field.
- `app-analytics-kit/firestore`: `readAnalyticsSwitch(db, analytics)` reads the switch once at launch. `firebase` is an optional peer dependency, needed only for this entry.
- Upgrade: read `config/app` at launch and call `analytics.setSwitch(analyticsSwitch(data))`. Without this call, the app sends nothing.

## 1.0.0 (2026-11-23)

- First release. `createAnalytics(keys)` starts OpenPanel on iPhone and Android with an offline queue, and `useScreenView(screen)` records one screen view each time the screen changes.
- Screen views only: the kit offers no custom events, profile or account details.
- The website never starts OpenPanel, and the documented setup keeps the keys out of the website bundle.
- Built on `@openpanel/react-native` 1.4.4, tested on Expo SDK 58.
