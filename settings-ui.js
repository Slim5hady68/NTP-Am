'use strict';
document.addEventListener('DOMContentLoaded', () => {
  if (!document.body.classList.contains('panel-mode')) return;
  for (const select of document.querySelectorAll('#icon-style, #icon-size')) {
    const wrap=document.createElement('div');wrap.className='custom-select';
    const trigger=document.createElement('button');trigger.type='button';trigger.setAttribute('aria-haspopup','listbox');
    const menu=document.createElement('div');menu.className='custom-select-menu';menu.hidden=true;menu.setAttribute('role','listbox');
    const sync=()=>{trigger.textContent=select.selectedOptions[0]?.textContent||'';menu.querySelectorAll('button').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.value===select.value)));};
    for(const opt of select.options){
      const b=document.createElement('button');b.type='button';b.dataset.value=opt.value;b.textContent=opt.textContent;b.setAttribute('role','option');
      b.addEventListener('click',()=>{select.value=b.dataset.value;select.dispatchEvent(new Event('change',{bubbles:true}));sync();menu.hidden=true;trigger.setAttribute('aria-expanded','false');trigger.focus();});
      menu.append(b);
    }
    trigger.addEventListener('click',()=>{const opening=menu.hidden;document.querySelectorAll('.custom-select-menu').forEach(m=>m.hidden=true);menu.hidden=!opening;trigger.setAttribute('aria-expanded',String(opening));});
    document.addEventListener('click',e=>{if(!wrap.contains(e.target)){menu.hidden=true;trigger.setAttribute('aria-expanded','false');}});
    trigger.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.hidden=true;trigger.setAttribute('aria-expanded','false');}});
    select.classList.add('enhanced-native');select.parentNode.insertBefore(wrap,select.nextSibling);wrap.append(trigger,menu);
    select.addEventListener('change',sync);sync();
  }
  const report=()=>{const footer=document.querySelector('footer');const height=footer ? Math.ceil(footer.getBoundingClientRect().bottom - document.body.getBoundingClientRect().top + 6) : Math.ceil(document.body.scrollHeight);window.parent.postMessage({type:'ntpam-settings-height',height},location.origin);};
  if('ResizeObserver' in window)new ResizeObserver(report).observe(document.body);
  window.addEventListener('load',report);report();
});
