/* shared by every page: full screen [+]/[–], theme toggle, header scramble, no drag ghosts */
/* full screen [+] / [–]. Browsers drop full screen on every page load, so this page holds full screen and the site
   keeps running inside a full-screen frame on top of it; links navigate the frame until [–] or Esc */
(function(){var b=document.getElementById('fsBtn');if(!b)return;var de=document.documentElement;
if(window.top!==window){ // inside the full-screen frame: [–] asks the outer page to leave full screen
  b.textContent='[–]';b.setAttribute('aria-pressed','true');
  try{parent.postMessage({fsShell:'url',href:location.href,title:document.title},'*')}catch(e){}
  b.addEventListener('click',function(){parent.postMessage({fsShell:'exit'},'*')});return}
var req=de.requestFullscreen||de.webkitRequestFullscreen,ex=document.exitFullscreen||document.webkitExitFullscreen;
if(!req){b.style.display='none';return}
var on=function(){return document.fullscreenElement||document.webkitFullscreenElement},frame=null,href=location.href;
function open(){
  href=location.href;frame=document.createElement('iframe');frame.src=location.href;frame.title=document.title;frame.allow='autoplay; fullscreen';
  frame.style.cssText='position:fixed;inset:0;width:100%;height:100%;border:0;z-index:2147483647;background:#000;opacity:0;transition:opacity .3s';
  frame.onload=function(){frame&&(frame.style.opacity='1');document.querySelectorAll('video').forEach(function(v){v.pause()})};
  document.body.appendChild(frame);
  de.style.filter='none'; // the frame applies its own theme; inverting it here as well would flip it twice
}
function close(){if(!frame)return;var f=frame;frame=null;de.style.filter='';
  try{var l=localStorage.getItem('theme')==='light',t=document.getElementById('themeBtn'); // pick up a theme change made inside the frame
    l?de.setAttribute('data-theme','light'):de.removeAttribute('data-theme');if(t){t.textContent=l?'F/1.4':'F/2.4';t.setAttribute('aria-pressed',l?'true':'false')}}catch(e){}
  if(href.split('#')[0]!==location.href.split('#')[0]){location.href=href;return} // stay on the page the visitor ended up on
  f.remove();document.querySelectorAll('video[autoplay],video').forEach(function(v){v.play().catch(function(){})});
}
addEventListener('message',function(e){var d=e.data;if(!frame||!d||e.source!==frame.contentWindow)return;
  if(d.fsShell==='url'){href=d.href;if(d.title)document.title=d.title}
  if(d.fsShell==='exit'&&on())ex.call(document)});
b.addEventListener('click',function(){on()?ex.call(document):req.call(de)});
var sync=function(){var f=!!on();b.textContent=f?'[–]':'[+]';b.setAttribute('aria-pressed',f?'true':'false');
  if(f&&!frame)open();else if(!f&&frame)close()};
document.addEventListener('fullscreenchange',sync);document.addEventListener('webkitfullscreenchange',sync);sync()})();
(function(){var b=document.getElementById("themeBtn");if(!b)return;var r=document.documentElement;
// F/2.4 = dark (default), F/1.4 = light; the choice is remembered across pages
function sync(){var l=r.getAttribute("data-theme")==="light";b.textContent=l?"F/1.4":"F/2.4";b.setAttribute("aria-pressed",l?"true":"false");b.setAttribute("aria-label",l?"Switch to dark theme":"Switch to light theme")}
b.addEventListener("click",function(){var l=r.getAttribute("data-theme")!=="light";if(l)r.setAttribute("data-theme","light");else r.removeAttribute("data-theme");try{localStorage.setItem("theme",l?"light":"dark")}catch(e){}sync()});sync()})();
(function(){
// header menu hover: letters scramble through random letters, numbers and symbols, then settle left to right (GSAP). The name/logo is left alone.
if(!window.gsap||matchMedia("(prefers-reduced-motion:reduce)").matches)return;
var C="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+=?/<>[]{}~^",STEP=90; // STEP = ms between random swaps (higher = slower flicker)
document.querySelectorAll("header a:not(.name),header button").forEach(function(el){var tw=null,t="",last=0,cur=[];
  el.addEventListener("mouseenter",function(){if(tw)return;t=el.textContent;cur=t.split("");last=0;var o={p:0};
    tw=gsap.to(o,{p:1,duration:.9+t.length*.05,ease:"none",onUpdate:function(){var n=Math.floor(o.p*t.length),now=performance.now(),swap=now-last>=STEP;if(swap)last=now;
      for(var i=0;i<t.length;i++){if(i<n||t[i]===" ")cur[i]=t[i];else if(swap)cur[i]=C[Math.random()*C.length|0]}el.textContent=cur.join("")},
      onComplete:function(){el.textContent=t;tw=null}})});
  // a click restores the real label first, so the theme / fullscreen buttons can then swap it
  el.addEventListener("click",function(){if(tw){tw.kill();tw=null;el.textContent=t}},true);
});})();
// no ghost image when dragging a photo, video or link (the pages use drag to scroll instead)
document.addEventListener('dragstart',function(e){if(e.target&&e.target.closest&&e.target.closest('img,video,a,#track'))e.preventDefault()});
