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
    if (event.data?.type === 'ntpam-wallpaper-updated') window.applyNtpWallpaper?.();
    if (event.data?.type === 'ntpam-settings-height' && Number.isFinite(event.data.height)) {
      const desired=Math.max(240,Math.ceil(event.data.height)+38);
      panel.style.height=Math.min(desired,window.innerHeight-16)+'px';
    }
  });
  trigger.addEventListener('click',() => setOpen(true));
  closeButton.addEventListener('click',() => setOpen(false));
  backdrop.addEventListener('click',() => setOpen(false));
  document.addEventListener('keydown',e => { if (e.key === 'Escape' && open) setOpen(false); });
})();
