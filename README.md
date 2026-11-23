# app-analytics-kit

Privacy-first screen views for every app on the kits, sent to [OpenPanel](https://openpanel.dev) from iPhone and Android. The app supplies its two OpenPanel keys and the name of the screen on show. The kit does everything else and enforces the rules below.

**Current version: v1.0.0** (see [CHANGELOG.md](CHANGELOG.md)).

| Rule | How the kit enforces it |
|---|---|
| Screen views only | The kit offers `useScreenView` and nothing else: no custom events, no profile and no account details. |
| Never on the website | On the website the kit never starts OpenPanel, and the app passes no keys there, so the client secret never reaches a browser. |
| Off without keys | Without both keys, analytics is off and the app works as before. |
| Nothing lost offline | Screen views wait on the phone while it is offline and are sent when it is back online. |
| Free in every app | Analytics is not a Premium feature. |

OpenPanel also records the app version, the build number and the device type with each screen view.

## Install

Pin the kit by the full commit SHA of its release tag, with `git+https`, and record the tag in `kitVersions`:

```jsonc
"dependencies": { "app-analytics-kit": "git+https://github.com/yuvarajsalla20/app-analytics-kit.git#<full SHA of v1.0.0>" },
"kitVersions":  { "app-analytics-kit": "v1.0.0" }
```

The app also needs `expo-application`, `expo-constants` and `@react-native-async-storage/async-storage`, which every app on the kits already has. npm may warn that OpenPanel's React Native package lists older Expo versions; the kit is tested on Expo SDK 58, and the warning is safe to ignore.

## Use

1. Make one file, e.g., `src/shared/analytics.ts`, exactly as below. `Platform.OS` is fixed when the website is built, so the website bundle drops the keys entirely.

   ```ts
   import { Platform } from 'react-native';
   import { createAnalytics } from 'app-analytics-kit';

   // The OpenPanel project's client ID is public and lives in the code; the secret comes only from the environment.
   const OPENPANEL_CLIENT_ID = '<client ID>';

   export const analytics = createAnalytics(
     Platform.OS === 'web'
       ? null
       : { clientId: OPENPANEL_CLIENT_ID, clientSecret: process.env.EXPO_PUBLIC_OPENPANEL_CLIENT_SECRET ?? '' },
   );
   ```

2. Where the app picks its screen, record it. Pass a path such as `/home` or `/account/app`, and null while the app is still loading:

   ```ts
   analytics.useScreenView(screenName);
   ```

   With Expo Router, pass `usePathname()`.

3. Set `EXPO_PUBLIC_OPENPANEL_CLIENT_SECRET` as an EAS environment variable for preview and production, with Sensitive visibility, and make a new build. For a local run, put the same line in `.env`, which is never committed.

## About the client secret

OpenPanel needs the client secret on iPhone and Android, because a phone cannot prove where it is calling from the way a website can. Any `EXPO_PUBLIC_` value is built into the app, so a person who unpacks the app can read it. Keeping it in EAS environment variables keeps it out of git, not out of the app. The secret only allows sending events; it does not allow reading the dashboard. If false events ever appear, make a new secret in OpenPanel, update the EAS variable and release a new build.

## Develop

`npm test` runs the tests and `npm run typecheck` checks the types. Raise the version in `package.json` and `src/version.ts`, and add a CHANGELOG entry, in the same pull request.
