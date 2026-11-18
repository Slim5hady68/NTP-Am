'use strict';
(() => {
const KEY='ntp-am-wallpaper-v1';
const fileInput=document.getElementById('wallpaper-file');
const upload=document.getElementById('upload-wallpaper');
const remove=document.getElementById('remove-wallpaper');
const controls=document.getElementById('wallpaper-controls');
const slider=document.getElementById('wallpaper-darkness');
const output=document.getElementById('wallpaper-percent');
const status=document.getElementById('wallpaper-status');
let state={image:'',darkness:35};
try {const stored=JSON.parse(localStorage.getItem(KEY));if(stored && typeof stored==='object')state={image:typeof stored.image==='string'?stored.image:'',darkness:Number.isFinite(Number(stored.darkness))?Math.max(0,Math.min(90,Number(stored.darkness))):35};}catch{}
const update=()=>{controls.hidden=!state.image;slider.value=String(state.darkness);output.textContent=state.darkness+'%';};
function persist() {try {if(state.image)localStorage.setItem(KEY,JSON.stringify(state));else localStorage.removeItem(KEY);window.parent.postMessage({type:'ntpam-wallpaper-updated'},location.origin);status.textContent='Background saved.';return true;}catch{status.textContent='Not enough browser storage. Try a smaller wallpaper or export a backup.';return false;}}
upload.addEventListener('click',()=>{fileInput.value='';fileInput.click();});
fileInput.addEventListener('change',async()=>{
 const file=fileInput.files?.[0];if(!file)return;
 if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>12*1024*1024){status.textContent='Choose a PNG, JPG or WebP under 12 MB.';return;}
 try {
  const bitmap=await createImageBitmap(file);
  const maxSide=1000,scale=Math.min(1,maxSide/Math.max(bitmap.width,bitmap.height));
  const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*scale));canvas.height=Math.max(1,Math.round(bitmap.height*scale));
  canvas.getContext('2d').drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close?.();
  let data=canvas.toDataURL('image/jpeg',.72);
  if(data.length>1100000){const s=Math.min(1,700/Math.max(canvas.width,canvas.height));const small=document.createElement('canvas');small.width=Math.round(canvas.width*s);small.height=Math.round(canvas.height*s);small.getContext('2d').drawImage(canvas,0,0,small.width,small.height);data=small.toDataURL('image/jpeg',.60);}
  if(data.length>1100000)throw Error('Image too large after optimisation.');
  const previous=state.image;state.image=data;if(!persist()){state.image=previous;return;}update();
 }catch(e){status.textContent=e.message||'Unable to process this wallpaper.';}
});
remove.addEventListener('click',()=>{state.image='';persist();update();});
slider.addEventListener('input',()=>{state.darkness=Number(slider.value);output.textContent=state.darkness+'%';persist();});
update();
})();
