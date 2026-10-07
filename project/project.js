/* every project: drives the (NN) number and the "next project" card */
const REG=[{"s": "01-numero-netherlands-x-normani", "t": "Numero Netherlands x Normani", "c": ["#0d3550", "#c9772f"], "a": "https://images.unsplash.com/photo-1632765866070-3fadf25d3d5b?auto=format&fit=crop&w=900&h=1200&q=75"}, {"s": "02-converse-x-billie-eilish", "t": "Converse x Billie Eilish", "c": ["#1b1b1b", "#3d7a3a"], "a": "https://images.unsplash.com/photo-1709010499458-74a6b5f6188f?auto=format&fit=crop&w=900&h=1200&q=75"}, {"s": "03-genesis", "t": "Genesis", "c": ["#0a0f14", "#7a5b3a"], "a": "https://images.unsplash.com/photo-1655837425341-b59fc33c5898?auto=format&fit=crop&w=900&h=1200&q=75"}, {"s": "04-culligan", "t": "Culligan", "c": ["#08324d", "#5fb4d6"], "a": "https://images.unsplash.com/photo-1519455953755-af066f52f1a6?auto=format&fit=crop&w=900&h=1200&q=75"}, {"s": "05-nylon-france", "t": "Nylon France", "c": ["#2a1030", "#d04b7a"], "a": "https://images.unsplash.com/photo-1671485429799-249e8acb2ee6?auto=format&fit=crop&w=900&h=1200&q=75"}, {"s": "06-katseye-x-instyle", "t": "Katseye x InStyle", "c": ["#301a10", "#e0a060"], "a": "https://images.unsplash.com/photo-1767570280633-b8446dcbd80e?auto=format&fit=crop&w=900&h=1200&q=75"}, {"s": "07-eilish-no-3", "t": "Eilish No.3", "c": ["#10251a", "#9ad0a0"], "a": "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&h=1200&q=75"}, {"s": "08-your-turn", "t": "Your Turn", "c": ["#1a1a30", "#5a6ad0"], "a": "https://images.unsplash.com/photo-1485846147915-69f12fbd03b9?auto=format&fit=crop&w=900&h=1200&q=75"}, {"s": "09-guest-in-residence", "t": "Guest in Residence", "c": ["#2b2620", "#cbbd9e"], "a": "https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?auto=format&fit=crop&w=900&h=1200&q=75"}, {"s": "10-ysl-x-lenny-kravitz", "t": "YSL x Lenny Kravitz", "c": ["#100c0c", "#a02020"], "a": "https://images.unsplash.com/photo-1592245734204-6561336cbc6f?auto=format&fit=crop&w=900&h=1200&q=75"}, {"s": "11-netflix-the-mother", "t": "Netflix - The Mother", "c": ["#0c1420", "#c03030"], "a": "https://images.unsplash.com/photo-1519381950710-20a66031fe2a?auto=format&fit=crop&w=900&h=1200&q=75"}, {"s": "12-gq-x-mgk-x-megan-fox", "t": "GQ x MGK x Megan Fox", "c": ["#201010", "#d08030"], "a": "https://images.unsplash.com/photo-1770543774604-627428e99231?auto=format&fit=crop&w=900&h=1200&q=75"}, {"s": "13-gentlemans-journal", "t": "Gentlemans Journal", "c": ["#1c2218", "#8a9a60"], "a": "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=900&h=1200&q=75"}, {"s": "14-instyle-mexico", "t": "InStyle Mexico", "c": ["#301020", "#f0a040"], "a": "https://images.unsplash.com/photo-1604274859081-898bd2972f55?auto=format&fit=crop&w=900&h=1200&q=75"}, {"s": "15-rockin-eve", "t": "Rockin' Eve", "c": ["#050a10", "#3070a0"], "a": "https://images.unsplash.com/photo-1539136831565-c85f368448a3?auto=format&fit=crop&w=900&h=1200&q=75"}];

/* ---------- page-to-page wipe (Work / Index / About / Contact) ---------- */
gsap.set('#wipe',{y:0,yPercent:100});
const wipeIn=href=>{try{sessionStorage.setItem('wipe','1')}catch(x){}gsap.to('#wipe',{yPercent:0,duration:.7,ease:'expo.inOut',onComplete:()=>{location.href=href}})};
const wipeOut=(delay=0)=>gsap.to('#wipe',{yPercent:-100,duration:.8,ease:'expo.inOut',delay,onComplete:()=>gsap.set('#wipe',{yPercent:100})});
document.addEventListener('click',e=>{
  const a=e.target.closest('a[data-go]');if(!a)return;
  if(e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  const u=new URL(a.href,location.href);
  if(u.pathname===location.pathname&&u.search===location.search){if(!u.hash)e.preventDefault();return}
  e.preventDefault();wipeIn(a.href);
});
try{if(sessionStorage.getItem('wipe')){sessionStorage.removeItem('wipe');gsap.set('#wipe',{yPercent:0});wipeOut(.1)}}catch(e){}
addEventListener('pageshow',e=>{if(e.persisted&&gsap.getProperty('#wipe','yPercent')===0)wipeOut()});
function tick(){try{$('#clock').textContent='Phnom Penh, (CAM) '+new Date().toLocaleTimeString('en-US',{timeZone:'Asia/Phnom_Penh',hour:'numeric',minute:'2-digit'})}catch(e){}}

const $=(s,c=document)=>c.querySelector(s),pad=n=>String(n).padStart(2,'0'),cl=(v,a,b)=>Math.min(b,Math.max(a,v));
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,OVER=110,PULL=320;
const grad=(c,a=0)=>`linear-gradient(${150+a}deg,${c[0]},${c[1]} ${140+a}%)`;
let cur=null,M=null; // M = the card that grows into the next hero (lives on <body> so it survives the page swap)

/* ---------- panels ---------- */
function html(P){
  const m=P.media||{},i=Math.max(0,REG.findIndex(r=>r.t===P.title)),n=REG[(i+1)%REG.length]; // last project loops to the first
  // only the intro image loads straight away; the rest load as they near the screen, videos start when they scroll into view
  const ph=(k,a=0,inner='')=>{const f=m[k],v=f&&/\.(mp4|webm)$/i.test(f),eager=k==='a',ld=eager?'fetchpriority="high"':'loading="lazy"';return `<div class="ph" style="--g:${grad(P.c,a)}">${f?(v?`<video data-src="${f}" muted loop playsinline preload="none"></video>`:`<img src="${f}" alt="" draggable="false" decoding="async" ${ld}>`):''}${inner}</div>`};
  return [
`<section class="p intro">${ph('a',0,`<div class="big">${P.word}</div>`)}<div class="txt"><div class="yr">${P.year}</div><h1>${P.title}</h1><div class="ind">${P.ind}</div><div class="pnum">(${pad(i+1)})</div><p class="brief">${P.brief}</p><div class="hint">Drag / scroll</div></div></section>`,
`<section class="p stk about">${ph('c',-30,`<div class="abt"><div class="big2">About</div><p class="sm">${P.about}</p></div>`)}</section>`,
`<section class="p stk top">${ph('e',10)}</section>`,
`<section class="p stk">${ph('f',-40)}</section>`,
`<section class="p stk top">${ph('g',30)}</section>`,
`<section class="p wide">${ph('i',20)}</section>`,
`<section class="p stk">${ph('j',-20)}</section>`,
`<section class="p stk top">${ph('k',50)}</section>`,
`<section class="p cred"><h2>Credits</h2><dl>${P.credits.map(c=>`<div><dt>${c[0]}</dt><dd>${c[1]}</dd></div>`).join('')}</dl><div class="yr">${P.year} // ${P.ind}</div></section>`,
`<section class="p nextcard"><a href="../${n.s}/index.html" data-barba-link><small>Scroll to navigate to the next project</small><div class="ncbox ph" style="--g:${grad(n.c)}"><img src="${n.a}" alt="" draggable="false" decoding="async" loading="lazy"><b>${n.t}</b></div></a></section>`
  ].join('');
}

/* ---------- one mounted project: horizontal scroll engine ---------- */
function mount(container,P,o={}){
  const track=$('#track',container);track.innerHTML=html(P);
  const els=[...track.children],texts=[...$$('.intro .yr,.intro h1,.intro .ind,.intro .pnum,.intro .brief,.intro .hint,.intro .big',track)],others=els.slice(1);
  $('#count',container).innerHTML=`<span class="ci">01</span><span>//</span><span>${pad(els.length)}</span>`;
  const ci=$('.ci',container),S={t:0,x:0};
  let max=0,st_,pt,pull=0,endSince=0,busy=false,down=false,frozen=false,sx=0,sy=0,ax=0,s0=0,lx=0,vel=0;
  const ac=new AbortController(),on=(t,e,f,op)=>t.addEventListener(e,f,{...op,signal:ac.signal});
  // videos: fetch when within a screen width of view, pause when off screen
  const vids=[...track.querySelectorAll('video[data-src]')],io='IntersectionObserver' in window?new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;
    if(e.isIntersecting){if(!v.src)v.src=v.dataset.src;v.play().catch(()=>{})}else v.pause()}),{rootMargin:'0px 100% 0px 100%'}):null;
  vids.forEach(v=>io?io.observe(v):(v.src=v.dataset.src,v.autoplay=true));
  ac.signal.addEventListener('abort',()=>io&&io.disconnect());
  const measure=()=>{max=Math.max(0,track.scrollWidth-innerWidth)},out=v=>v<0||v>max;
  measure();on(window,'load',measure);on(window,'resize',measure);requestAnimationFrame(measure);
  gsap.set(track,{transformOrigin:'50% 50%'});
  const loop=()=>{
    if(frozen)return;
    S.x=Math.floor((S.x+(S.t-S.x)*.085)*100)/100;
    const velo=RM?0:cl((S.t-S.x)/innerWidth,-1,1);
    gsap.set(track,{x:-S.x,scaleY:1-Math.abs(velo*.25),skewX:velo*7.5});
    let i=0;els.forEach((e,k)=>{if(e.offsetLeft-S.x<innerWidth*.45)i=k});ci.textContent=pad(i+1);
    if(max>0&&S.x>=max-2){endSince=endSince||performance.now()}else endSince=0; // "arrived at the end" clock
  };
  gsap.ticker.add(loop);
  const settle=()=>{clearTimeout(st_);st_=setTimeout(()=>{if(out(S.t))gsap.to(S,{t:cl(S.t,0,max),duration:1.4,ease:'elastic.out(1,0.45)',overwrite:true})},130)};
  // keep scrolling past the end -> go to the next project (Barba); without Barba it falls back to the normal wipe
  const next=()=>{if(busy)return;busy=true;const a=$('.nextcard a',track);window.barba?barba.go(a.href):wipeIn(a.href)};
  const push=d=>{
    if(d>0&&endSince&&performance.now()-endSince>450){pull+=d;clearTimeout(pt);pt=setTimeout(()=>pull=0,500);if(pull>PULL)return next()}
    const n=S.t+d;S.t=cl(out(S.t)||out(n)?S.t+d*.35:n,-OVER,max+OVER);settle();
  };
  on(window,'wheel',e=>{e.preventDefault();if(frozen)return;gsap.killTweensOf(S);push((Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY)*1.2)},{passive:false});
  on(window,'keydown',e=>{if(frozen)return;const s=innerWidth/3;if(e.key==='ArrowRight'||e.key==='ArrowDown'){gsap.killTweensOf(S);push(s)}if(e.key==='ArrowLeft'||e.key==='ArrowUp'){gsap.killTweensOf(S);push(-s)}});
  on(track,'pointerdown',e=>{if(e.target.closest('a'))return;down=true;sx=e.clientX;sy=e.clientY;ax=0;lx=null;s0=S.t;vel=0;gsap.killTweensOf(S);track.classList.add('drag');track.setPointerCapture(e.pointerId)});
  on(track,'pointermove',e=>{if(!down)return;
    // follow whichever axis the gesture started on, so a vertical swipe on a phone moves the row too
    const dx=e.clientX-sx,dy=e.clientY-sy;if(!ax&&Math.max(Math.abs(dx),Math.abs(dy))>6)ax=Math.abs(dx)>=Math.abs(dy)?1:2;const d=ax===2?dy:dx;
    let r=s0-d;if(r>max+150){down=false;track.classList.remove('drag');return next()}if(r<0)r*=.35;else if(r>max)r=max+(r-max)*.35;S.t=cl(r,-OVER,max+OVER);vel=lx===null?0:lx-d;lx=d});
  const up=()=>{if(!down)return;down=false;track.classList.remove('drag');S.t=cl(S.t+vel*14,-OVER,max+OVER);if(out(S.t))gsap.to(S,{t:cl(S.t,0,max),duration:1.4,ease:'elastic.out(1,0.45)',overwrite:true})};
  on(track,'pointerup',up);on(track,'pointercancel',up);

  const im=$('.intro img',track),imgReady=!im||im.complete?Promise.resolve():new Promise(r=>{im.onload=im.onerror=r});
  if(o.morph){gsap.set(texts,{opacity:0,y:28});gsap.set(others,{opacity:0,x:160})} // hero image is already on screen (the morph card); text + rest arrive after
  else if(o.first)gsap.from(els,{x:160,opacity:0,duration:1.2,ease:'expo.out',stagger:.07,delay:.2});
  return{track,imgReady,
    freeze(){frozen=true;gsap.killTweensOf(S);gsap.set(track,{skewX:0,scaleY:1})},
    destroy(){ac.abort();gsap.ticker.remove(loop);clearTimeout(st_);clearTimeout(pt)},
    reveal(){gsap.to(texts,{opacity:1,y:0,duration:1,ease:'expo.out',stagger:.06});gsap.to(others,{opacity:1,x:0,duration:1.2,ease:'expo.out',stagger:.07,delay:.15})}};
}
function $$(s,c=document){return c.querySelectorAll(s)}

/* ---------- Barba transition: the "next" card grows into the next project's hero ---------- */
function leave(d){
  cur.freeze();
  const box=$('.ncbox',d.current.container),small=$('small',d.current.container);
  const simple=(typeof d.trigger==='string'&&/back|forward/.test(d.trigger))||RM||innerWidth<=900||!box; // history / mobile: plain fade
  if(simple)return gsap.to(d.current.container,{opacity:0,duration:.35});
  const r=box.getBoundingClientRect(),tr=cur.track.getBoundingClientRect(),W=innerWidth*.38; // 38vw = width of the intro image on the next page
  M=box.cloneNode(true);M.classList.add('morph');
  Object.assign(M.style,{left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'});
  box.style.visibility='hidden';document.body.appendChild(M);
  return gsap.timeline({defaults:{ease:'expo.inOut'}})
    .to(small,{opacity:0,duration:.3,ease:'power2.out'},0)
    .to(M,{top:tr.top,height:tr.height,left:innerWidth-W,width:W,duration:1.1},0)      // 1. card grows to full height
    .to(M,{left:20,duration:1.1},'-=.25')                                              // 2. slides to the hero position...
    .to(cur.track,{x:'-='+innerWidth*.6,opacity:0,duration:1.1},'<')                   //    ...while the old project leaves
    .to($('b',M),{opacity:0,duration:.4,ease:'power2.out'},'<.15');
}
async function enter(d){
  const m=d.next.html.match(/window\.PROJECT\s*=\s*(\{[\s\S]*?\});?\s*<\/script>/);
  if(!m){location.href=d.next.url.href;return}
  const morph=!!M;cur&&cur.destroy();
  cur=mount(d.next.container,JSON.parse(m[1]),{morph});
  if(morph){await Promise.race([cur.imgReady,new Promise(r=>setTimeout(r,900))]);M.remove();M=null} // same image, same rect: the swap is invisible
  else gsap.fromTo(d.next.container,{opacity:0},{opacity:1,duration:.4});
  if(morph)cur.reveal();
}

cur=mount($('[data-barba="container"]'),window.PROJECT,{first:true});
try{barba.init({
  prevent:({el})=>!el.hasAttribute('data-barba-link'), // only project -> project uses Barba; everything else keeps the wipe
  preventRunning:true,
  transitions:[{name:'next-project',from:{namespace:['project']},to:{namespace:['project']},leave,enter}]
})}catch(e){}
tick();setInterval(tick,20000);

