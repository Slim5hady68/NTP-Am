# NTPure — Minimalist Customisable New Tab Page

**Version 2.2** · **Authored by JT26-AI**

NTPure is a lightweight, customisable New Tab Page with an optional true-black AMOLED background or your own wallpaper. Keep your favourite websites within reach, arrange shortcuts your way, and enjoy a clean interface without a built-in search bar or unnecessary clutter.

**Try NTPure (after publishing):** https://slim5hady68.github.io/NTPure/

## Screenshots

<p align="center">
  <a href="images/smoked-glass.png"><img src="images/smoked-glass.png" alt="NTPure Smoked Glass shortcuts" width="30%"></a>
  <a href="images/settings.png"><img src="images/settings.png" alt="NTPure appearance settings" width="30%"></a>
  <a href="images/shortcut-editor.png"><img src="images/shortcut-editor.png" alt="NTPure shortcut editor" width="30%"></a>
</p>
<p align="center"><sub>Smoked Glass icons · Appearance settings · Shortcut editor (tap an image for full size)</sub></p>

## Features

- **Three icon styles:** Floating (borderless), Uniform Rounded Tiles, and Smoked Glass with glossy reflections and dimensional shading.
- **Customisable shortcut icons:** Personalise each shortcut icon individually using its website favicon or your own PNG/JPG/WebP image.
- **Flexible shortcut grid:** Choose 4, 5 or 6 columns, small/medium/large icons, and optional website labels.
- **Drag-and-drop ordering:** Press and hold a shortcut to rearrange it.
- **Optional clock and date:** Show or hide them in Settings.
- **Discreet settings panel:** A 12px grey cog opens a slide-up panel; close it using × or by tapping outside.
- **Backup and restore:** Export shortcuts, icon choices, uploaded icon images, wallpapers, and preferences to a JSON file.
- **Custom wallpaper:** Upload a JPG, PNG or WebP background image up to 3 MB without canvas processing, and adjust its darkness with a slider; AMOLED black remains the default.
- **Local storage and caching:** Your setup stays in your browser, while service-worker caching can improve repeat load times.

## Moving from NTP-Am to NTPure

**Important:** Renaming the GitHub repository changes the GitHub Pages URL. Browser storage does **not** automatically move between `/NTP-Am/` and `/NTPure/`. Before switching, open the old NTP-Am page and use **Settings → Export backup**. After uploading NTPure and opening the new URL, use **Settings → Restore backup**. NTPure accepts backups created by NTP-Am as well as NTPure. Update your BareBrowser Custom New Tab URL to the new address only after restoring and verifying your shortcuts and wallpaper.

## Getting Started

Open **https://slim5hady68.github.io/NTPure/**.

### Use with BareBrowser on Android

1. Install or enable the **Custom New Tab URL** extension.
2. Set its URL to `https://slim5hady68.github.io/NTPure/`.
3. Save and open a new tab.

Other browsers may offer different ways to configure a custom New Tab Page.

## How to Use

### Add, edit, or remove shortcuts

- **Add:** Tap an empty **+** position, enter a website name and URL, then save.
- **Edit:** Open Settings → **Edit shortcuts**, then tap the shortcut you want to change. Tap **Done** to return to normal browsing.
- **Remove:** Open the shortcut editor and choose **Remove**.
- **Rearrange:** Press and hold a shortcut, move it to another position, then release.

### Choose a custom icon

In the shortcut editor, select an icon source:

1. **Website favicon** — use the website's automatically retrieved icon.
2. **Upload image** — choose a PNG, JPG, or WebP file from your device. NTPure resizes uploaded icons to 96 × 96 pixels and stores them locally.

You can switch back to the website favicon at any time. Uploaded icons are stored locally and can be included in your backups.

### Change the appearance

Tap the small grey cog in the bottom-right corner. Under **Icon style**, choose:

| Style | Appearance |
| --- | --- |
| **Floating** | Clean, borderless icons over any background |
| **Uniform Rounded Tiles** | Consistent rounded-square icon backgrounds |
| **Smoked Glass** | Glossy, smoky circular icons with highlights and depth |

You can also change the number of grid columns, icon size, label visibility, and clock/date display. Your choices are saved automatically.

### Back up and restore

Open Settings and choose **Export backup** to download a JSON file. Use **Restore backup** to import a saved configuration.

Backups include your shortcut order, preferences, uploaded icon images, and wallpaper image data. **Restoring a backup replaces the current configuration**, so export your existing setup first if you want to keep it.

## Privacy and Storage

NTPure stores shortcuts, uploaded icons, and preferences locally in your browser using `localStorage`. Your personal shortcut configuration is not uploaded to GitHub.

Website favicons may be fetched from Google's favicon service.

Clearing browser site data can remove your saved shortcuts and settings. Keep a JSON backup, especially before changing browsers or clearing data.

## Custom Wallpapers

Open **Settings → Background** and tap **Upload wallpaper** to choose a PNG, JPG or WebP image from your device. NTPure resizes and compresses it locally. Use the **Wallpaper darkness** slider (0–90%) to change the appearance immediately, or select **AMOLED black** to remove the wallpaper.

Uploaded wallpapers are stored in your browser and included in exported JSON backups. Keep a backup before clearing browser data.

## What's New in v2.2

- Performance improvements to shortcut rendering and wallpaper darkness updates; existing shortcut drag-and-drop and settings are retained.
- Updated app-shell caching: request current files online, with cached copies available when offline.
- Restored reliable wallpaper uploads on BareBrowser by reading the original JPG, PNG or WebP file directly, without canvas processing.
- Removed temporary wallpaper diagnostic controls and preview.

## Wallpaper uploads: 3 MB limit and canvas-blocking compatibility

**Wallpaper photos must be JPG, PNG or WebP files no larger than 3 MB (3 × 1024 × 1024 bytes).** This limit applies to wallpaper uploads, not shortcut icons. Larger images are rejected without replacing the existing wallpaper. If necessary, reduce the image size using your phone's photo editor before uploading.

NTPure deliberately **bypasses HTML canvas processing for wallpaper uploads**. Some privacy-focused browsers, including the user's BareBrowser setup, can block or restrict canvas readback; in testing, this resulted in black converted wallpaper images. Version 2.2 reads the original image file directly and stores it locally without canvas resizing or compression. This avoids the observed canvas-blocking failure and keeps the upload compatible with browsers that restrict canvas access.

The 3 MB limit helps control local browser-storage usage because original images are stored as base64 data URLs (which use more space than the source file). Actual available storage depends on the browser and other saved data. If an upload fails due to storage limits, choose a smaller file. Export a backup before clearing browser site data.

**Note:** The BareBrowser canvas-blocking explanation is consistent with the observed tests, but a specific browser-update change has not been independently verified.

## Credits

**NTPure v2.2**  
**Authored by JT26-AI**  
**Icon concept credit: DrumDestroyer**

*Minimalist by design. Personalised by you.*

### Startup performance

The v2.2 release uses a versioned, precached app shell for fast repeat tab openings, with a background refresh for newer files. On first installation or after a service-worker update, a network load may still be required. Browser toolbar controls (including the + New Tab button) are managed by the browser, not by NTPure.
