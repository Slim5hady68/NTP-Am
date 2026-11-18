'use strict';
document.addEventListener('DOMContentLoaded', () => {
  if (!document.body.classList.contains('panel-mode')) return;
  const report = () => {
    const height = Math.ceil(document.body.scrollHeight + 6);
    window.parent.postMessage({type:'ntpam-settings-height',height}, location.origin);
  };
  if ('ResizeObserver' in window) new ResizeObserver(report).observe(document.body);
  window.addEventListener('load', report);
  document.getElementById('grid-layout-details')?.addEventListener('toggle', report);
  report();
});
