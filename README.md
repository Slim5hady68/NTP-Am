# NTP-Am — AMOLED New Tab Page

**Version 2.0.2**  
**Authored by JT26-AI**

## About NTP-Am

NTP-Am is a lightweight, minimalist New Tab Page for a clean, distraction-free browsing experience. It combines a true AMOLED black background with customisable website shortcuts, without a search bar or unnecessary clutter.

Originally developed as a browser extension, NTP-Am is also available as a standalone webpage hosted on GitHub Pages. This version is especially useful with Android browsers that support a custom New Tab URL.

## Features

- **AMOLED black design:** Pure black background with borderless shortcut icons.
- **Custom shortcuts:** Add, edit, remove and drag shortcuts into a preferred order.
- **Adjustable grid:** Choose 4, 5 or 6 columns.
- **Icon sizes:** Small, medium or large.
- **Optional labels:** Show or hide website names.
- **Optional clock and date:** Show or hide the clock/date display.
- **Discreet settings:** A visible 12px grey cog in the bottom-right corner opens a slide-up settings panel.
- **Local preferences:** Shortcuts and settings are stored in your browser.
- **Backup and restore:** Export or import a JSON backup.
- **Caching:** A service worker caches site files and supported favicons for faster repeat visits where supported.

## Getting Started

Open **https://slim5hady68.github.io/NTP-Am/** in your browser.

### Use as your New Tab Page in BareBrowser (Android)

1. Install or enable the **Custom New Tab URL** extension.
2. Open its settings and enter `https://slim5hady68.github.io/NTP-Am/`.
3. Save the URL, then open a new tab to try NTP-Am.
4. If you previously installed the original NTP-Am extension that overrides the New Tab Page, disable it to avoid conflicts with BareBrowser's **+** button.

Other browsers may use a different method to set a custom New Tab Page.

## How to Use NTP-Am

### Add a shortcut

1. Tap an empty **+** shortcut position.
2. Enter a name and website URL.
3. Tap **Save**.

### Edit or remove a shortcut

Double-tap an existing shortcut to open the editor. Change its details and save, or select **Remove**.

### Rearrange shortcuts

Press and hold a shortcut, drag it to a new position, and release. On touchscreens, a short hold activates dragging.

### Change settings

Tap the small grey cog in the bottom-right corner to open the slide-up settings panel. Choose the grid columns, icon size, shortcut label visibility and clock/date visibility. Close the panel with **×** or by tapping outside it.

### Back up or restore

Open Settings and select **Export backup** to save a JSON backup of your setup. To import one, select **Restore backup** and choose a previously exported JSON file.

## Privacy and Storage

NTP-Am saves your shortcuts and preferences locally using your browser's `localStorage`; it does not upload your shortcut configuration to GitHub. Website icons are requested from Google's favicon service and may be cached by the browser.

Clearing browser site data, or using a private browsing session, may remove your saved setup. Export a backup before clearing browser data or changing browsers. Data from the original extension does not transfer automatically; use its backup/restore feature where available.

## Performance

NTP-Am uses a service worker to cache its webpage files and supported favicons. This can improve repeat loading times and may allow the page to load offline after a successful online visit. Behaviour depends on browser support and cached resources.

## Credits

**NTP-Am v2.0.2**  
**Authored by JT26-AI**

*A minimalist AMOLED browsing experience designed for simplicity, speed and personalisation.*


### Icon styles

Open Settings and choose **Floating icons**, **Uniform rounded tiles**, or **Smoked Glass** under **Icon style**. The default remains Floating icons. Your choice is saved locally and included in backups.
