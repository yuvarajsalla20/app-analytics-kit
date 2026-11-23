# Rules for this kit

- Every word this repository shows or publishes must be professional and consistent, including the README, changelog, code comments, commit messages and pull requests. Follow the "Writing rule" in app-settings-kit's README (https://github.com/yuvarajsalla20/app-settings-kit#writing-rule-every-word-is-professional).
- Keep the README current: the "Current version" line, the install pin example and the changelog change in the same pull request that raises the version.
- Apps never add analytics of their own: a change goes into this kit as its default.
- Screen views only. Adding custom events, a profile or any account detail is a decision for the owner, never a default.
- The client secret never reaches a browser: the website entry (`analytics.web.ts`) must stay a no-op.
- Every change works on iPhone and Android.
