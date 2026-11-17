# NTP-Am Web v2.1.0

AMOLED new-tab dashboard, authored by JT26-AI. Converted from NTP-Am v2.0.4 for GitHub Pages.

## Publish
1. Create a **public** GitHub repository named `NTP-Am` under `Slim5hady68`.
2. Upload **the contents of this folder** to the root of the repository on the `main` branch (including `index.html`, not the ZIP itself).
3. In repository **Settings → Pages**, choose **Deploy from a branch**, `main`, `/ (root)`, then Save.
4. Once deployed, open `https://slim5hady68.github.io/NTP-Am/` and set that HTTPS URL in the Custom New Tab URL extension.

## Important
- The hosted website stores shortcuts/preferences in this browser's `localStorage`; data is not uploaded to GitHub.
- Existing extension data is on a different origin and **does not migrate automatically**. Export a JSON backup from NTP-Am extension settings, then restore it using the hosted site's Settings page.
- Backups are recommended because browser data clearing/private mode may erase local settings.
- Favicons use Google's public icon image endpoint as ordinary images; if unavailable, a letter fallback is shown.
- Hosting as HTTPS avoids direct `chrome_url_overrides`, but whether BareBrowser's + button remains visible must be tested on-device.
- This is a test build, not a confirmed BareBrowser compatibility fix.


v2.1.1: Settings cog and borderless shortcut icons.


## v2.1.2 performance update

- Service worker caches the website files on first visit, for faster repeat loads and offline access after successful installation.
- Shortcut favicon image responses are cached locally by the service worker (up to 80 entries); normal browser caching is used as a fallback.
- Your shortcuts and settings continue to live in browser localStorage. Clearing site data removes them.
- To update GitHub Pages, upload **all changed files including the new `sw.js`** to the repository root.
- Visit the site once online, then close and reopen the tab to test cached loading. Service-worker support varies by browser.
- Future updates should bump the `VERSION` constant in `sw.js` to invalidate the cached app shell.


## v2.1.3 — Slide-up settings
Tap the small corner cog to open settings in a slide-up sheet. Close using ×, the backdrop, Escape, or a downward swipe on the handle. Settings, backups, and local storage are unchanged. Upload all extracted files including new `sheet.js`; `sw.js` has a bumped cache version.


v2.1.4: Replaces corner cog with bottom-centre handle; settings opens in a shorter slide-up sheet with a dimmed backdrop. Swipe down on sheet handle, tap backdrop or × to close.
