# Changelog

Upgrade notes for app-analytics-kit, newest first. Each version is tagged in git (`v1.0.0`).

## 1.0.0 (2026-11-23)

- First release. `createAnalytics(keys)` starts OpenPanel on iPhone and Android with an offline queue, and `useScreenView(screen)` records one screen view each time the screen changes.
- Screen views only: the kit offers no custom events, profile or account details.
- The website never starts OpenPanel, and the documented setup keeps the keys out of the website bundle.
- Built on `@openpanel/react-native` 1.4.4, tested on Expo SDK 58.
