"use strict";
(() => {
  const trigger = document.getElementById('open-settings');
  const panel = document.getElementById('settings-sheet');
  const backdrop = document.getElementById('sheet-backdrop');
  const closeButton = document.getElementById('close-settings');
  let open = false;
  function setOpen(value) {
    if (open === value) return;
    open = value;
    if (value) {
      backdrop.hidden = false;
      panel.inert = false;
      panel.setAttribute('aria-hidden','false');
      requestAnimationFrame(() => panel.classList.add('is-open'));
      closeButton.focus({preventScroll:true});
    } else {
      panel.classList.remove('is-open');
      backdrop.hidden = true;
      panel.inert = true;
      panel.setAttribute('aria-hidden','true');
      trigger.focus({preventScroll:true});
    }
    trigger.setAttribute('aria-expanded',String(value));
  }
  window.addEventListener('message', event => {
    if (event.origin !== location.origin || event.source !== document.getElementById('settings-frame').contentWindow) return;
    if (event.data?.type === 'ntpam-edit-shortcuts') setOpen(false);
    if (event.data?.type === 'ntpam-wallpaper-updated') {
      window.applyNtpWallpaper?.();
      // Confirm that the main page has picked up the saved image.
      setTimeout(() => reportWallpaperStatus(event.source, event.origin), 450);
    }
    if (event.data?.type === 'ntpure-wallpaper-check') reportWallpaperStatus(event.source, event.origin);
    if (event.data?.type === 'ntpure-wallpaper-dim') window.applyNtpWallpaperDarkness?.(event.data.value);
    if (event.data?.type === 'ntpam-settings-height' && Number.isFinite(event.data.height)) {
      const desired=Math.max(240,Math.ceil(event.data.height)+36);
      panel.style.setProperty('--ntpam-sheet-height',Math.min(desired,window.innerHeight-2)+'px');
    }
  });
  function reportWallpaperStatus(target, origin) {
    const img = document.getElementById('wallpaper-image');
    const layer = document.getElementById('wallpaper-layer');
    const rect = img?.getBoundingClientRect();
    const imageState = !img?.getAttribute('src') ? 'No image source' : img.complete ? (img.naturalWidth ? 'Image decoded' : 'Image decode failed') : 'Image still loading';
    const detail = [imageState, img?.naturalWidth ? img.naturalWidth+'×'+img.naturalHeight : '', rect ? Math.round(rect.width)+'×'+Math.round(rect.height)+' on screen' : '', layer ? 'layer '+getComputedStyle(layer).display+', '+getComputedStyle(layer).visibility : 'layer missing'].filter(Boolean).join(' · ');
    target?.postMessage({type:'ntpure-wallpaper-diagnostic',detail},origin);
  }
  trigger.addEventListener('click',() => setOpen(true));
  closeButton.addEventListener('click',() => setOpen(false));
  backdrop.addEventListener('click',() => setOpen(false));
  document.addEventListener('keydown',e => { if (e.key === 'Escape' && open) setOpen(false); });
})();
