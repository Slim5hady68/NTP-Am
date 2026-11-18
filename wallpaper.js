'use strict';
(() => {
const KEY='ntp-am-wallpaper-v1';
const fileInput=document.getElementById('wallpaper-file');
const remove=document.getElementById('remove-wallpaper');
const controls=document.getElementById('wallpaper-controls');
const slider=document.getElementById('wallpaper-darkness');
const output=document.getElementById('wallpaper-percent');
const status=document.getElementById('wallpaper-status');
let state={image:'',darkness:35};
try {const stored=JSON.parse(localStorage.getItem(KEY));if(stored && typeof stored==='object')state={image:typeof stored.image==='string'?stored.image:'',darkness:Number.isFinite(Number(stored.darkness))?Math.max(0,Math.min(90,Number(stored.darkness))):35};}catch{}
const previewImage=document.getElementById('wallpaper-preview-image');
const previewMessage=document.getElementById('wallpaper-preview-message');
function updatePreview(){
 if(!state.image){previewImage.style.display='none';previewImage.removeAttribute('src');previewMessage.textContent='No wallpaper stored';return;}
 previewMessage.textContent='Saved image found; checking preview…';
 previewImage.onload=()=>{previewImage.style.display='block';previewMessage.textContent='Preview loaded: '+previewImage.naturalWidth+' × '+previewImage.naturalHeight;};
 previewImage.onerror=()=>{previewImage.style.display='none';previewMessage.textContent='Preview could not decode saved image';};
 if(previewImage.src!==state.image)previewImage.src=state.image;
 else if(previewImage.complete && previewImage.naturalWidth)previewImage.onload();
}
const update=()=>{controls.hidden=!state.image;slider.value=String(state.darkness);output.textContent=state.darkness+'%';updatePreview();};
function persist() {try {if(state.image)localStorage.setItem(KEY,JSON.stringify(state));else localStorage.removeItem(KEY);window.parent.postMessage({type:'ntpam-wallpaper-updated'},location.origin);status.textContent='Background saved.';return true;}catch{status.textContent='Not enough browser storage. Try a smaller wallpaper or export a backup.';return false;}}
fileInput.addEventListener('change',async()=>{
 const file=fileInput.files?.[0];if(!file){status.textContent='No image selected.';return;}
 status.textContent='Processing '+file.name+'…';
 if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>12*1024*1024){status.textContent='Choose a PNG, JPG or WebP under 12 MB.';return;}
 try {
  // Android WebViews may not implement createImageBitmap; decode via Image instead.
  const objectURL=URL.createObjectURL(file);
  let image;
  try {
    image=await new Promise((resolve,reject)=>{
      const img=new Image();
      img.onload=()=>resolve(img);
      img.onerror=()=>reject(new Error('Unable to read this image.'));
      img.src=objectURL;
    });
  } finally {URL.revokeObjectURL(objectURL);}
  const maxSide=1000,scale=Math.min(1,maxSide/Math.max(image.naturalWidth,image.naturalHeight));
  const canvas=document.createElement('canvas');
  canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));
  canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));
  canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);
  let data=canvas.toDataURL('image/jpeg',.72);
  if(data.length>1100000){const s=Math.min(1,700/Math.max(canvas.width,canvas.height));const small=document.createElement('canvas');small.width=Math.round(canvas.width*s);small.height=Math.round(canvas.height*s);small.getContext('2d').drawImage(canvas,0,0,small.width,small.height);data=small.toDataURL('image/jpeg',.60);}
  if(data.length>1100000)throw Error('Image too large after optimisation.');
  const previous=state.image;state.image=data;if(!persist()){state.image=previous;return;}update();status.textContent='Wallpaper saved. Applying background…';
 }catch(e){status.textContent='Upload failed: '+(e?.message||'Unable to process this wallpaper.');console.error('NTPure wallpaper upload:',e);}
});
window.addEventListener('message',event=>{
 if(event.origin!==location.origin||event.source!==window.parent)return;
 if(event.data?.type==='ntpure-wallpaper-diagnostic') {status.textContent='Display check: '+event.data.detail;return;}
 if(event.data?.type!=='ntpure-wallpaper-applied')return;
 status.textContent=event.data.visible?'Wallpaper detected. Checking image…':'Wallpaper not detected on main page.';
 window.parent.postMessage({type:'ntpure-wallpaper-check'},location.origin);
});
remove.addEventListener('click' ,()=>{state.image='';persist();update();});
slider.addEventListener('input',()=>{state.darkness=Number(slider.value);output.textContent=state.darkness+'%';window.parent.postMessage({type:'ntpure-wallpaper-dim',value:state.darkness},location.origin);});
slider.addEventListener('change',()=>{state.darkness=Number(slider.value);persist();});
update();
setTimeout(()=>window.parent.postMessage({type:'ntpure-wallpaper-check'},location.origin),500);
})();
