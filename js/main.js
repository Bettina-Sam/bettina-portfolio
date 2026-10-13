/* Bettina Anne Sam — portfolio interactions
   Sections: theme, text splitting, résumé, visitor counter, projects, certificates,
   reveals, contact, cursor, planes, journey game, gravity, install, scroll plane, toolbox physics,
   loader and the particle entrance (Three.js). */
const HERO_SRC="assets/images/hero.webp";
const PHOTOS={podium:"assets/images/podium-1-0.webp",m1:"assets/images/podium-pitch.webp",debug:"assets/images/debugathon-certificate.webp",debug2:"assets/images/debugathon-prize.webp",drdoid:"assets/images/drdo-intern-id.webp",techno:"assets/images/technoxian-world-cup.webp",m0:"assets/images/college-day-stage.webp",guest:"assets/images/college-day-chief-guest.webp",aura:"assets/images/aura-hackathon.webp",nec:"assets/images/nec-certificate.webp",lab:"assets/images/lab-session.webp",trophies:"assets/images/trophy-pile.webp"};
const RESUME_URL="assets/resume/Bettina_Anne_Sam_Resume.pdf";
document.getElementById('heroImg').src=HERO_SRC;
document.querySelectorAll('[data-ph]').forEach(im=>im.src=PHOTOS[im.dataset.ph]);

const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer=matchMedia('(pointer: fine)').matches;
const isMobile=()=>matchMedia('(max-width: 900px)').matches;
const lerp=(a,b,t)=>a+(b-a)*t;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const svgIcon=(k,fill)=>ICONS[k]?`<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="${fill}" d="${ICONS[k][1]}"/></svg>`:'';
function toast(t,ms){const el=document.getElementById('toast'); el.textContent=t; el.classList.add('on'); clearTimeout(toast._t); toast._t=setTimeout(()=>el.classList.remove('on'),ms||2400);}

/* ---------- theme ---------- */
function toggleTheme(){ const root=document.documentElement; const cur=root.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'); const next=cur==='dark'?'light':'dark'; root.setAttribute('data-theme',next); try{localStorage.setItem('bas-theme',next);}catch(e){} }
(function(){
  const root=document.documentElement;
  try{const t=localStorage.getItem('bas-theme'); if(t) root.setAttribute('data-theme',t);}catch(e){}
  document.getElementById('themeBtn').addEventListener('click',toggleTheme);
  const cord=document.getElementById('cord'), knob=document.getElementById('knob'); const BASE=isMobile()?34:84;
  let sy=0, pulled=0, moved=false;
  knob.addEventListener('pointerdown',e=>{ e.preventDefault(); knob.setPointerCapture(e.pointerId); sy=e.clientY; pulled=0; moved=false; cord.classList.add('drag'); cord.classList.remove('swing'); });
  knob.addEventListener('pointermove',e=>{ if(!cord.classList.contains('drag')) return; pulled=Math.max(0,Math.min(110,e.clientY-sy)); if(pulled>4) moved=true; cord.style.setProperty('--len',(BASE+pulled)+'px'); });
  const release=()=>{ if(!cord.classList.contains('drag')) return; cord.classList.remove('drag'); cord.style.setProperty('--len',BASE+'px');
    if(pulled>36 || !moved){ toggleTheme(); cord.classList.add('used'); void cord.offsetWidth; cord.classList.add('swing'); } pulled=0; };
  knob.addEventListener('pointerup',release); knob.addEventListener('pointercancel',release);
})();

/* ---------- split text ---------- */
document.querySelectorAll('.hero-name span').forEach((line,li)=>{
  const txt=line.textContent; line.textContent='';
  [...txt].forEach((c,i)=>{const s=document.createElement('span'); s.className='ch'; s.style.setProperty('--i',i+li*7); s.textContent=c===' '?'\u00A0':c; line.appendChild(s);});
});
document.querySelectorAll('.split').forEach(el=>{
  const txt=el.textContent; el.textContent=''; let k=0, j=0;
  txt.split(/(\s+)/).forEach(part=>{ if(!part) return; if(/^\s+$/.test(part)){el.appendChild(document.createTextNode(' ')); return;}
    const w=document.createElement('span'); w.className='w'; const i=document.createElement('span'); [...part].forEach(ch=>{const c=document.createElement('span'); c.className='c'; c.style.setProperty('--j',j++); c.textContent=ch; i.appendChild(c);}); i.style.setProperty('--k',k++); w.appendChild(i); el.appendChild(w); });
});

/* ---------- résumé download ---------- */
document.querySelectorAll('.resume-dl').forEach(a=>{
  a.href=RESUME_URL; a.setAttribute('download','Bettina_Anne_Sam_Resume.pdf');
  a.addEventListener('click',()=>toast('Résumé on its way 📄'));
});

/* ---------- live visitor counter ---------- */
(async function(){
  let seen=false; try{seen=sessionStorage.getItem('bas-v')==='1';}catch(e){}
  const show=n=>{ document.querySelectorAll('[data-visits-pill]').forEach(e=>e.classList.remove('vis-hide')); document.querySelectorAll('[data-visits]').forEach(e=>countTo(e,n)); try{sessionStorage.setItem('bas-v','1');}catch(e){} };
  // free public counter (counterapi.dev)
  try{
    const ctl=new AbortController(); setTimeout(()=>ctl.abort(),4000);
    const r=await fetch('https://api.counterapi.dev/v1/bettina-portfolio/visits'+(seen?'':'/up'),{signal:ctl.signal});
    if(r.ok){ const j=await r.json(); if(typeof j.count==='number') show(j.count); }
  }catch(e){}
})();
function countTo(el,to){ if(reduce){el.textContent=to.toLocaleString('en-IN'); return;} const t0=performance.now(); (function f(now){const t=Math.min(1,(now-t0)/1400), e=1-Math.pow(1-t,4); el.textContent=Math.round(to*e).toLocaleString('en-IN'); if(t<1) requestAnimationFrame(f);})(t0); }

/* ---------- projects ---------- */
const GH='https://github.com/Bettina-Sam/';
const P=[
 {n:'UAV Flight Envelope Platform', w:'ML internship at DRDO', c:['proud'], tag:'proud of this one', u:'https://uav-flight-envelope-platform.vercel.app/', g:GH+'uav-flight-envelope-platform', f:'uav', bg:'#2340FF',
  d:'Can this UAV fly this mission? A physics-informed ML model predicts range, endurance and altitude performance, with live mission planning, 3D flight views and engine-out simulation.', s:['FastAPI','React','TypeScript','XGBoost']},
 {n:'ResQHub', w:'Real-time disaster management', c:['proud','people'], tag:'proud of this one', u:'https://disaster-mgmt-resqhub.netlify.app/', g:GH+'disaster-mgmt-resqhub', f:'resq', bg:'#FF5B37',
  d:'Live hazards on a map, alerts for everyone inside the danger zone, and emergency reports that reach everyone the moment they happen.', s:['Node.js','MongoDB','WebSockets','Leaflet']},
 {n:'Air Sculpt Studio', w:'Computer vision and 3D', c:['proud','fun'], tag:'proud of this one', u:'https://air-sculpt-studio.netlify.app/', f:'air', bg:'#6C4BFF',
  d:'Build 3D shapes just by waving at your webcam. MediaPipe tracks your hand and Three.js turns gestures into objects. No mouse needed.', s:['React','Three.js','MediaPipe']},
 {n:'Study Notebook', w:'Interactive science for students', c:['learn'], tag:'new', u:'https://study-notebook-psi.vercel.app/', g:GH+'study-notebook', f:'study', bg:'#34D399',
  d:'Learn science by exploring. Interactive modules across Physics, Chemistry and Biology, built so students can poke at the ideas instead of memorising them.', s:['HTML','CSS','JavaScript','Vercel']},
 {n:'NPTEL Practice Rooms', w:'Built for my department', c:['learn','people'], tag:'new', u:'https://it-practice-room.vercel.app/', u2:['Java room','https://java-practice-room.vercel.app/'], g:GH+'it-practice-room', f:'npt', bg:'#0B6E4F',
  d:'Week-by-week practice tests for NPTEL courses like Industry 4.0 and IIoT, and Java, so students and teachers in my department can prep before the real exam.', s:['React','Vercel']},
 {n:'Particle Observatory', w:'Interactive simulation', c:['fun'], u:'https://bettina-sam.github.io/particle-observatory/', f:'par', bg:'#0F1A4A',
  d:'A tiny universe in your browser. Change the forces and watch thousands of particles react in real time.', s:['JavaScript','Canvas']},
 {n:'Ocean Depths Dive', w:'Immersive web experience', c:['fun'], u:'https://ocean-depths-dive.netlify.app/', g:GH+'ocean-depths-dive', f:'sea', bg:'linear-gradient(180deg,#7FD6D9 0%, #0E7C86 45%, #062A3A 100%)',
  d:'Scroll down and you sink, from sunlit water all the way to the deep sea.', s:['React','Three.js','Framer Motion']},
 {n:'Digital Labs', w:'Interactive learning platform', c:['learn'], u:'https://creative-digital-labs.netlify.app/', g:GH+'creative-digital-labs', f:'lab', bg:'#FFD23F',
  d:'Learn tech by actually doing it. Coding simulations and hands-on modules instead of walls of text.', s:['React','Node.js','MongoDB']},
 {n:'ISHI Prayer Fellowship', w:'Website for a Christian ministry', c:['people'], u:'https://project-kkt4o.vercel.app/', f:'ishi', bg:'#B8CDB0',
  d:'The online home of a Christian ministry in Thoothukudi, sharing their prayer meetings, teaching and fellowship with the community.', s:['React','Vercel']},
 {n:'Volume \u2260 Control', w:'A UX joke, done properly', c:['fun'], u:'https://volume-chaos.netlify.app/', g:GH+'volume-control-chaos', f:'vol', bg:'#FF4FA3',
  d:'Fifteen of the worst volume controls I could dream up. Every rule of good design, broken on purpose.', s:['React','TypeScript']},
 {n:'Luxe Salon', w:'Website for a salon brand', c:['people'], u:'https://luxe-salons.netlify.app/', f:'luxe', bg:'#17171A',
  d:'A glossy site for a salon, made to feel premium on any screen.', s:['React','Netlify']}
];
const W='#fff';
const FACES={
 uav:`<svg viewBox="0 0 400 300"><line x1="40" y1="280" x2="380" y2="280" stroke="rgba(255,255,255,.55)" stroke-width="2"/><line x1="40" y1="280" x2="40" y2="20" stroke="rgba(255,255,255,.55)" stroke-width="2"/><text class="lbl" x="380" y="300" text-anchor="end" fill="rgba(255,255,255,.85)" font-size="24">speed</text><text class="lbl" x="48" y="28" fill="rgba(255,255,255,.85)" font-size="24">altitude</text><path d="M60 270 C 80 130, 160 60, 250 54 C 320 50, 350 110, 352 270 Z" fill="rgba(255,255,255,.12)" stroke="#fff" stroke-width="3" stroke-dasharray="8 7"/><g class="env-dot"><circle r="10" fill="#fff"/><circle r="20" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="2"/></g><text class="lbl" x="205" y="185" text-anchor="middle" fill="#fff" font-size="36">safe to fly</text></svg>`,
 resq:`<svg viewBox="0 0 400 300"><g stroke="rgba(26,14,10,.22)" stroke-width="2" fill="none"><path d="M0 70 H400 M0 150 H400 M0 230 H400 M80 0 V300 M210 0 V300 M330 0 V300"/><path d="M0 200 C 90 170, 140 270, 240 220 S 360 150, 400 180" stroke="rgba(26,14,10,.35)" stroke-width="10"/></g><circle class="ping" cx="210" cy="150" r="60" fill="none" stroke="#1A0E0A" stroke-width="3"/><circle class="ping p2" cx="210" cy="150" r="60" fill="none" stroke="#1A0E0A" stroke-width="3"/><circle class="ping p3" cx="210" cy="150" r="60" fill="none" stroke="#1A0E0A" stroke-width="3"/><circle cx="210" cy="150" r="13" fill="#1A0E0A"/><circle cx="80" cy="230" r="8" fill="#fff"/><circle cx="330" cy="70" r="8" fill="#fff"/><circle cx="300" cy="230" r="8" fill="#fff"/><text class="lbl" x="232" y="122" fill="#1A0E0A" font-size="30">alert zone</text></svg>`,
 air:`<div class="cube"><div class="q1"></div><div class="q2"></div><div class="q3"></div><div class="q4"></div><div class="q5"></div><div class="q6"></div></div><span class="lbl note">made of thin air</span>`,
 study:`<svg viewBox="0 0 400 300" fill="none" stroke="#0B2A1F" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><path d="M200 250 C 160 232, 110 230, 70 240 V 140 C 110 130, 160 132, 200 150 Z" fill="rgba(255,255,255,.35)"/><path d="M200 250 C 240 232, 290 230, 330 240 V 140 C 290 130, 240 132, 200 150 Z" fill="rgba(255,255,255,.55)"/><path d="M95 170 h70 M95 190 h60 M95 210 h66 M235 170 h70 M235 190 h55 M235 210 h64" stroke-width="2.4" opacity=".55"/><circle cx="200" cy="120" r="7" fill="#0B2A1F"/><g class="orb"><ellipse cx="200" cy="120" rx="44" ry="15"/><circle cx="244" cy="120" r="5" fill="#fff" stroke="none"/></g><g class="orb o2"><ellipse cx="200" cy="120" rx="44" ry="15" transform="rotate(60 200 120)"/></g><g class="bobsvg"><path d="M86 70 v26 l-12 22 h40 l-12 -22 v-26 z" fill="rgba(255,255,255,.6)"/><path d="M82 70 h24"/></g><g class="bobsvg d2"><path d="M318 108 C 300 84, 316 60, 342 60 C 344 86, 334 104, 318 108 Z M318 108 L 336 72" fill="rgba(255,255,255,.6)"/></g><text class="lbl" x="200" y="290" text-anchor="middle" fill="#0B2A1F" stroke="none" font-size="28">physics, chemistry, biology</text></svg>`,
 npt:`<svg viewBox="0 0 400 300" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><rect x="90" y="30" width="220" height="240" rx="18" fill="rgba(255,255,255,.08)"/><text class="lbl" x="112" y="72" fill="#fff" stroke="none" font-size="30">Week 7, Q3</text><path d="M112 88 h150" opacity=".5"/><rect x="112" y="110" width="176" height="32" rx="9" fill="rgba(255,255,255,.12)" stroke="none"/><rect x="112" y="152" width="176" height="32" rx="9" fill="rgba(255,255,255,.12)" stroke="none"/><rect x="112" y="194" width="176" height="32" rx="9" fill="rgba(255,255,255,.12)" stroke="none"/><rect class="optmove" x="112" y="110" width="176" height="32" rx="9" stroke="#fff" fill="rgba(255,255,255,.22)"/><path class="tick" d="M258 206 l8 9 l16 -18" stroke-width="4"/><text class="lbl" x="300" y="290" text-anchor="end" fill="#fff" stroke="none" font-size="26">nailed it</text></svg>`,
 vol:`<svg viewBox="0 0 400 300" fill="none" stroke="#fff" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"><path d="M70 120 h28 l34 -28 v116 l-34 -28 h-28 z" fill="rgba(255,255,255,.25)"/><path class="arc" d="M150 120 q14 30 0 60"/><path class="arc a2" d="M166 104 q26 46 0 92"/><path class="arc a3" d="M182 88 q38 62 0 124"/><rect x="70" y="236" width="260" height="10" rx="5" fill="rgba(255,255,255,.35)" stroke="none"/><g class="knobrun"><circle cx="86" cy="241" r="17" fill="#fff" stroke="none"/></g><text class="lbl" x="250" y="96" fill="#fff" stroke="none" font-size="34" transform="rotate(8 250 96)">turn it to 11?</text></svg>`,
 par:`<svg viewBox="0 0 400 300" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.5"><circle class="glow" cx="200" cy="150" r="26" fill="rgba(140,160,255,.55)" stroke="none"/><circle cx="200" cy="150" r="9" fill="#fff" stroke="none"/><g class="rot"><ellipse cx="200" cy="150" rx="70" ry="70"/><circle cx="270" cy="150" r="6" fill="#fff" stroke="none"/><circle cx="130" cy="150" r="4" fill="#8CA0FF" stroke="none"/></g><g class="rot r2"><ellipse cx="200" cy="150" rx="110" ry="110"/><circle cx="200" cy="40" r="5" fill="#fff" stroke="none"/><circle cx="310" cy="150" r="3.5" fill="#8CA0FF" stroke="none"/><circle cx="122" cy="228" r="4" fill="#fff" stroke="none"/></g><g class="rot r3"><ellipse cx="200" cy="150" rx="150" ry="150" stroke-dasharray="3 9"/><circle cx="50" cy="150" r="4" fill="#fff" stroke="none"/><circle cx="306" cy="256" r="3" fill="#8CA0FF" stroke="none"/></g><text class="lbl" x="390" y="290" text-anchor="end" fill="#fff" stroke="none" font-size="28">a tiny universe</text></svg>`,
 sea:`<svg viewBox="0 0 400 300" fill="none" stroke="#fff" stroke-linecap="round"><g class="wavemove"><path d="M0 44 C 50 20, 100 68, 150 44 S 250 20, 300 44 S 400 68, 450 44 S 550 20, 600 44" stroke-width="3" opacity=".8"/></g><path d="M330 70 V 280" stroke-width="2" opacity=".6"/><path d="M322 70 h16 M322 140 h16 M322 210 h16 M322 280 h16" stroke-width="2" opacity=".6"/><text class="lbl" x="346" y="78" fill="#fff" stroke="none" font-size="20">0 m</text><text class="lbl" x="346" y="148" fill="#fff" stroke="none" font-size="20">200 m</text><text class="lbl" x="346" y="218" fill="#fff" stroke="none" font-size="20">1000 m</text><g class="diver"><circle cx="190" cy="80" r="11" fill="#fff" stroke="none"/><circle class="bub" cx="196" cy="62" r="4" stroke-width="1.6"/><circle class="bub b2" cx="186" cy="58" r="3" stroke-width="1.6"/><circle class="bub b3" cx="192" cy="54" r="2.5" stroke-width="1.6"/></g><text class="lbl" x="40" y="285" fill="#fff" stroke="none" font-size="28">keep sinking</text></svg>`,
 lab:`<svg viewBox="0 0 400 300" fill="none" stroke="#1C1A10" stroke-width="3" stroke-linecap="round"><rect x="60" y="40" width="280" height="200" rx="16" fill="rgba(255,255,255,.45)"/><path d="M60 76 H340" /><circle cx="84" cy="58" r="5" fill="#1C1A10"/><circle cx="102" cy="58" r="5" fill="#1C1A10"/><circle cx="120" cy="58" r="5" fill="#1C1A10"/><path class="type" d="M88 110 h150" stroke-width="7"/><path class="type t2" d="M110 140 h120" stroke-width="7" opacity=".7"/><path class="type t3" d="M110 170 h170" stroke-width="7" opacity=".7"/><path class="type t4" d="M88 200 h90" stroke-width="7"/><rect class="caret" x="188" y="190" width="5" height="20" fill="#1C1A10" stroke="none"/><text class="lbl" x="340" y="285" text-anchor="end" fill="#1C1A10" stroke="none" font-size="28">learn by doing</text></svg>`,
 ishi:`<svg viewBox="0 0 400 300" fill="none" stroke="#1E321E" stroke-width="3" stroke-linecap="round"><circle class="ping slow" cx="200" cy="140" r="70" opacity=".5"/><circle class="ping slow p2" cx="200" cy="140" r="70" opacity=".5"/><circle class="ping slow p3" cx="200" cy="140" r="70" opacity=".5"/><path d="M200 80 V 205 M168 115 H 232" stroke-width="9"/><text class="lbl" x="200" y="270" text-anchor="middle" fill="#1E321E" stroke="none" font-size="28">prayer, teaching and fellowship</text></svg>`,
 luxe:`<svg viewBox="0 0 400 300" fill="none" stroke="#D9B66C" stroke-width="3.5" stroke-linecap="round"><g class="bladeA"><path d="M200 150 L 320 112"/><circle cx="160" cy="185" r="22"/><path d="M200 150 L 176 172"/></g><g class="bladeB"><path d="M200 150 L 320 188"/><circle cx="160" cy="115" r="22"/><path d="M200 150 L 176 128"/></g><circle cx="200" cy="150" r="4" fill="#D9B66C"/><text class="shimmer" x="200" y="268" text-anchor="middle" fill="#D9B66C" stroke="none" font-family="Georgia, serif" font-style="italic" font-size="44">Luxe</text></svg>`
};
const ARROW='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>';
const grid=document.getElementById('grid');
P.forEach((p,i)=>{
  const a=document.createElement('article'); a.className='card rv'+(i>=9?' extra more-hidden':''); a.dataset.c=p.c.join(' ');
  a.style.setProperty('--d',(i%3)*0.08+'s');
  a.innerHTML=`${p.tag?`<span class="proud ${p.tag==='new'?'newtag':''}">${p.tag}</span>`:''}<a class="face f-${p.f}" href="${p.u}" target="_blank" rel="noopener" data-cursor="Open site" style="background:${p.bg}" aria-label="Open ${p.n}">${FACES[p.f]}</a><div class="txt"><span class="where">${p.w}</span><h3>${p.n}</h3><p>${p.d}</p><div class="stack">${p.s.map(x=>`<i>${x}</i>`).join('')}</div><div class="acts"><a class="sm live" href="${p.u}" target="_blank" rel="noopener">${ARROW}Live site</a>${p.u2?`<a class="sm" href="${p.u2[1]}" target="_blank" rel="noopener">${ARROW}${p.u2[0]}</a>`:''}${p.g?`<a class="sm" href="${p.g}" target="_blank" rel="noopener" data-cursor="Code">${svgIcon('github','currentColor')}GitHub</a>`:''}</div></div>`;
  grid.appendChild(a);
});
let moreOpen=false, curF='all';
const moreWrap=document.getElementById('moreWrap');
function applyFilter(){
  grid.querySelectorAll('.card').forEach(c=>{
    const match=curF==='all'||c.dataset.c.split(' ').includes(curF);
    c.classList.toggle('hide',!match);
    c.classList.toggle('more-hidden', curF==='all' && c.classList.contains('extra') && !moreOpen);
  });
  moreWrap.style.display=curF==='all'?'flex':'none';
}
const FL=[['all','All'],['proud','Proudest'],['learn','Learning tools'],['fun','Just for fun'],['people','For real people']];
const pf=document.getElementById('pFilters');
FL.forEach(([k,l],i)=>{const n=k==='all'?P.length:P.filter(p=>p.c.includes(k)).length; const b=document.createElement('button'); b.innerHTML=`${l}<em>${n}</em>`; if(!i) b.className='on';
  b.addEventListener('click',()=>{pf.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b)); curF=k; applyFilter(); grid.querySelectorAll('.card:not(.hide):not(.more-hidden)').forEach(c=>{c.classList.remove('in'); requestAnimationFrame(()=>requestAnimationFrame(()=>c.classList.add('in')));});});
  pf.appendChild(b);});
document.getElementById('moreBtn').addEventListener('click',()=>{
  moreOpen=!moreOpen; moreWrap.classList.toggle('open',moreOpen); document.getElementById('moreTxt').textContent=moreOpen?'Show fewer':'See 2 more';
  applyFilter(); if(moreOpen){ grid.querySelectorAll('.card.extra').forEach((c,i)=>{c.classList.remove('in'); setTimeout(()=>c.classList.add('in'),60+i*90);}); }
});

/* ---------- certificates ---------- */
const CERTS=[
 ['NPTEL','Internet of Things','Top 2%, 92%'],['NPTEL','The Joy of Computing using Python','Elite + Gold'],
 ['HackerRank','SQL'],['HackerRank','Java'],['HackerRank','C'],['HackerRank','Python'],['HackerRank','JavaScript'],
 ['Udemy','Java Bootcamp','66 hours'],['Udemy','C Programming','44 hours'],['Udemy','Appium Mobile Automation','26 hours'],['Udemy','Node.js Fundamentals'],
 ['LinkedIn','Gen AI Essentials','Microsoft and Google'],['LinkedIn','Ethics in Generative AI'],['LinkedIn','GitHub Copilot'],['LinkedIn','React.js Essentials'],['LinkedIn','Prompt Engineering'],
 ['Great Learning','Cloud Computing'],['Great Learning','DevOps'],['Great Learning','Linux'],['Great Learning','Cybersecurity'],['Great Learning','Data Analysis'],
 ['SkillRack','Python Hands-On'],['SkillRack','C Problem Solving'],
 ['AICTE','Java Full Stack with React and AI','National STTP, 2024'],['Microsoft','Cybersecurity Awareness'],['Coursera','Git and GitHub'],['freeCodeCamp','Responsive Web Design'],['BYTS','Core C Programming']
];
const PROV={NPTEL:['#0B6E4F',null,'NP'],HackerRank:['#00EA64','hackerrank'],Udemy:['#A435F0','udemy'],LinkedIn:['#0A66C2','linkedin'],'Great Learning':['#1E5BD6',null,'GL'],SkillRack:['#FF8A00',null,'SR'],AICTE:['#C62828',null,'AI'],Microsoft:['#5E5E5E','microsoft'],Coursera:['#0056D2','coursera'],freeCodeCamp:['#0A0A23','freecodecamp'],BYTS:['#16181D',null,'BY']};
const icoFor=k=>{const p=PROV[k]; return `<span class="ico" style="background:${p[0]}">${p[1]?svgIcon(p[1],k==='HackerRank'?'#0E141E':'#fff'):p[2]}</span>`;};
const ticket=c=>`<div class="ticket">${icoFor(c[0])}<div><h4>${c[1]}</h4><small>${c[0]}${c[2]?', '+c[2]:''}</small></div></div>`;
const MEDALS=[['NPTEL','Internet of Things','Top 2% in India','#FFD23F','2%'],['NPTEL','The Joy of Computing using Python','Elite with Gold','#F5B700','Au'],['AICTE','STTP: Java Full Stack with React and AI','national programme, 2024','#7389FF','STTP']];
document.getElementById('medals').innerHTML=MEDALS.map((m,i)=>`<div class="medal rv" style="--d:${i*.08}s"><svg viewBox="0 0 80 104"><path d="M22 0 L 34 44 L 40 40 L 46 44 L 58 0 Z" fill="#2340FF"/><path d="M30 0 L 40 38 L 50 0" fill="#FF5B37"/><g class="mcoin"><circle cx="40" cy="70" r="30" fill="${m[3]}" stroke="#16181D" stroke-width="3"/><circle cx="40" cy="70" r="22" fill="none" stroke="#16181D" stroke-width="1.6" stroke-dasharray="3 4"/><text x="40" y="77" text-anchor="middle" font-family="Bricolage Grotesque, Arial Black, sans-serif" font-weight="800" font-size="${m[4].length>2?14:20}" fill="#16181D">${m[4]}</text></g></svg><div class="by">${m[0]}</div><h3>${m[1]}</h3><div class="x">${m[2]}</div></div>`).join('');
const counts={}; CERTS.forEach(c=>counts[c[0]]=(counts[c[0]]||0)+1);
document.getElementById('tally').innerHTML=Object.entries(counts).sort((a,b)=>b[1]-a[1]).map(([k,n])=>`<span>${PROV[k][1]?svgIcon(PROV[k][1],PROV[k][0]):''}${k} <b>${n}</b></span>`).join('');
const rows=[...document.querySelectorAll('#belt .row')];
const half=Math.ceil(CERTS.length/2);
[CERTS.slice(0,half),CERTS.slice(half)].forEach((set,i)=>{const html=set.map(ticket).join(''); rows[i].innerHTML=html+html;});
document.getElementById('allCerts').innerHTML=CERTS.map(ticket).join('');
document.getElementById('certToggle').addEventListener('click',e=>{const o=document.getElementById('allCerts').classList.toggle('open'); e.currentTarget.textContent=o?'Hide the list':'Show them as a list';});
const belt={x:[0,0],paused:false};
const beltEl=document.getElementById('belt'); beltEl.addEventListener('pointerenter',()=>belt.paused=true); beltEl.addEventListener('pointerleave',()=>belt.paused=false);

/* ---------- reveal + count ---------- */
function countUp(el){
  const to=parseFloat(el.dataset.count), dec=+(el.dataset.dec||0), plus=el.dataset.plus;
  if(reduce){el.textContent=to.toFixed(dec)+(plus?'+':''); return;}
  const t0=performance.now(), dur=1600;
  (function tick(now){const t=Math.min(1,(now-t0)/dur), e=1-Math.pow(1-t,4); el.textContent=(to*e).toFixed(dec).replace(/\B(?=(\d{3})+(?!\d))/g,dec?'':',')+(plus&&t===1?'+':''); if(t<1) requestAnimationFrame(tick);})(t0);
}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in'); e.target.querySelectorAll('[data-count]').forEach(countUp); io.unobserve(e.target);}}),{rootMargin:'0px 0px -10% 0px'});
document.querySelectorAll('.rv,.split,.scribble').forEach(el=>{ if(!el.classList.contains('more-hidden')) io.observe(el); else el.classList.add('in'); });

/* ---------- rotating roles ---------- */
(function(){const rs=[...document.querySelectorAll('.roles .r')]; let i=0; if(reduce) return;
  setInterval(()=>{const a=rs[i]; a.classList.remove('on'); a.classList.add('out'); i=(i+1)%rs.length; const b=rs[i]; b.classList.remove('out'); b.classList.add('on'); setTimeout(()=>a.classList.remove('out'),650);},2400);})();

/* ---------- contact: big letters, composer, copy ---------- */
(function(){
  const chips=[...document.querySelectorAll('#reason button')]; let reason=chips[0].textContent;
  chips.forEach(b=>b.addEventListener('click',()=>{chips.forEach(x=>x.classList.toggle('on',x===b)); reason=b.textContent;}));
  const form=document.getElementById('composer');
  form.addEventListener('submit',e=>{e.preventDefault(); const name=document.getElementById('fname').value.trim(), msg=document.getElementById('fmsg').value.trim();
    if(!msg){ document.getElementById('fmsg').focus(); toast('Write a little something first'); return; }
    const subject=`${reason}${name?' — from '+name:''}`; const body=`${msg}\n\n${name?'— '+name:''}`;
    const go=()=>{ location.href=`mailto:bettyliz1808@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; };
    if(reduce){ go(); toast('Opening your email app'); return; }
    const r=form.getBoundingClientRect();
    const pl=document.createElement('div'); pl.className='fold-plane'; pl.innerHTML='<svg viewBox="0 0 40 30"><path d="M0 3 L40 15 L13 17 Z" fill="#EDECE8"/><path d="M13 17 L40 15 L9 27 Z" fill="#B9BCC4"/><path d="M13 17 L9 27 L11 19 Z" fill="#16181D" opacity=".35"/></svg>';
    document.body.appendChild(pl);
    const cx=r.left+r.width/2, cy=r.top+r.height/2;
    form.animate([{transform:'none',opacity:1},{transform:'perspective(900px) rotateX(70deg) scale(.7,.5)',opacity:.9,offset:.45},{transform:'perspective(900px) rotateX(85deg) scale(.15,.1)',opacity:0}],{duration:700,easing:'cubic-bezier(.6,0,.4,1)',fill:'forwards'});
    pl.animate([{transform:`translate(${cx}px,${cy}px) scale(.2) rotate(0deg)`,opacity:0,offset:0},{transform:`translate(${cx}px,${cy}px) scale(2.2) rotate(-10deg)`,opacity:1,offset:.35},{transform:`translate(${cx-60}px,${cy+40}px) scale(2.4) rotate(-25deg)`,opacity:1,offset:.5},{transform:`translate(${innerWidth+200}px,${-200}px) scale(1.2) rotate(-35deg)`,opacity:1}],{duration:1900,delay:450,easing:'cubic-bezier(.55,0,.45,1)',fill:'forwards'}).onfinish=()=>{ pl.remove(); go(); toast('Note folded and flying to my inbox ✈️');
      form.animate([{transform:'translateY(30px)',opacity:0},{transform:'none',opacity:1}],{duration:600,easing:'cubic-bezier(.2,.8,.15,1)',fill:'forwards'}); };
  });
  document.getElementById('copyMail').addEventListener('click',async()=>{ try{ await navigator.clipboard.writeText('bettyliz1808@gmail.com'); toast('Email copied!'); }catch(e){ location.href='mailto:bettyliz1808@gmail.com'; } });
})();

/* ---------- cursor, magnets, tilt ---------- */
const mouse={x:innerWidth/2,y:innerHeight/2,t:0};
addEventListener('pointermove',e=>{mouse.x=e.clientX; mouse.y=e.clientY; mouse.t=performance.now();},{passive:true});
if(finePointer && !reduce){
  document.body.classList.add('has-cursor');
  const pc=document.getElementById('pc'), label=document.getElementById('clabel'), tc=document.getElementById('trailc'), tx=tc.getContext('2d');
  let ang=-135, bank=1, hot=false, px=mouse.x, py=mouse.y, svx=0, svy=0, angV=0; const dots=[]; let lastDot=null;
  const sizeT=()=>{const d=Math.min(devicePixelRatio||1,2); tc.width=innerWidth*d; tc.height=innerHeight*d; tx.setTransform(d,0,0,d,0,0);}; sizeT(); addEventListener('resize',sizeT);
  const LIFE=1700;
  (function loop(){
    const now=performance.now();
    const ppx=px, ppy=py; px=lerp(px,mouse.x,.42); py=lerp(py,mouse.y,.42);
    svx=lerp(svx,px-ppx,.18); svy=lerp(svy,py-ppy,.18);
    const sp=Math.hypot(svx,svy);
    if(sp>.5){ const target=Math.atan2(svy,svx)*180/Math.PI; const d=((target-ang+540)%360)-180; angV=lerp(angV,d*.1,.25); }
    else angV*=.85;
    ang+=angV;
    bank=lerp(bank,1-Math.min(.5,Math.abs(angV)/9),.12);
    pc.style.transform=`translate(${px}px,${py}px) rotate(${ang}deg) scaleY(${bank})`;
    label.style.transform=`translate(${px}px,${py}px)`;
    const tailX=px-Math.cos(ang*Math.PI/180)*30, tailY=py-Math.sin(ang*Math.PI/180)*30;
    if(sp>.6 && (!lastDot || Math.hypot(tailX-lastDot.x,tailY-lastDot.y)>7)){ lastDot={x:tailX,y:tailY,t:now}; dots.push(lastDot); }
    while(dots.length>1 && now-dots[0].t>LIFE) dots.shift();
    tx.clearRect(0,0,innerWidth,innerHeight);
    if(dots.length>1){ tx.shadowColor='rgba(20,22,28,.4)'; tx.shadowBlur=3; tx.lineCap='round'; tx.strokeStyle='#fff';
      for(let i=1;i<dots.length;i++){ if(i%2) continue; const a=1-(now-dots[i].t)/LIFE; if(a<=0) continue; const e=a*a*(3-2*a);
        tx.globalAlpha=e; tx.lineWidth=1+2.4*e; tx.beginPath(); tx.moveTo(dots[i-1].x,dots[i-1].y); tx.lineTo(dots[i].x,dots[i].y); tx.stroke(); }
      tx.globalAlpha=1; tx.shadowBlur=0; }
    requestAnimationFrame(loop);})();
  const SPK=['#2340FF','#FF5B37','#FFC93C','#20C46B','#6C4BFF'];
  addEventListener('pointerdown',e=>{ for(let i=0;i<9;i++){ const s=document.createElement('span'); s.className='spark'; s.style.background=SPK[i%SPK.length]; document.body.appendChild(s);
      const a=Math.PI*2*i/9+Math.random()*.4, r=34+Math.random()*26;
      s.animate([{transform:`translate(${e.clientX}px,${e.clientY}px) scale(1) rotate(0deg)`,opacity:1},{transform:`translate(${e.clientX+Math.cos(a)*r}px,${e.clientY+Math.sin(a)*r}px) scale(.2) rotate(180deg)`,opacity:0}],{duration:620,easing:'cubic-bezier(.2,.8,.15,1)'}).onfinish=()=>s.remove(); } });
  document.addEventListener('pointerover',e=>{
    const ball=e.target.closest('.ball'), pol=e.target.closest('.polaroid'), c=e.target.closest('[data-cursor]'), l=e.target.closest('a,button,input,textarea');
    const txt= ball?'Throw me': pol?'Drag me': c?c.dataset.cursor: '';
    label.textContent=txt; label.classList.toggle('on',!!txt);
    hot=!!(ball||pol||c||l); pc.classList.toggle('hot',hot);
  });
  document.querySelectorAll('.mag').forEach(m=>{
    m.addEventListener('pointermove',e=>{const r=m.getBoundingClientRect(); m.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`;});
    m.addEventListener('pointerleave',()=>{m.style.transition='transform .5s cubic-bezier(.2,.8,.15,1), background .25s, color .25s, border-color .25s'; m.style.transform=''; setTimeout(()=>m.style.transition='',500);});
  });
  grid.addEventListener('pointermove',e=>{const c=e.target.closest('.card'); if(!c) return; const r=c.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
    c.style.setProperty('--ry',(x-.5)*9+'deg'); c.style.setProperty('--rx',(.5-y)*7+'deg'); c.style.setProperty('--mx',x*100+'%'); c.style.setProperty('--my',y*100*1.6+'%');});
  grid.addEventListener('pointerout',e=>{const c=e.target.closest('.card'); if(c && !c.contains(e.relatedTarget)){c.style.setProperty('--rx','0deg'); c.style.setProperty('--ry','0deg');}});
  const badges=document.getElementById('badges');
  addEventListener('pointermove',e=>{ if(scrollY>innerHeight) return; const nx=(e.clientX/innerWidth-.5), ny=(e.clientY/innerHeight-.5); badges.querySelectorAll('.badge').forEach((b,i)=>{const k=(i%2?1:-1)*(10+i*4); b.style.translate=`${nx*k}px ${ny*k}px`;}); },{passive:true});
}

/* ---------- badges follow the photo box ---------- */
function placeBadges(){const f=document.getElementById('heroFig').getBoundingClientRect(), h=document.getElementById('top').getBoundingClientRect();
  ['badges','halo'].forEach(id=>{const b=document.getElementById(id); b.style.left=(f.left-h.left)+'px'; b.style.top=(f.top-h.top)+'px'; b.style.width=f.width+'px'; b.style.height=f.height+'px';});
  document.querySelectorAll('#halo .ring').forEach(r=>{const items=[...r.querySelectorAll('.orb-i')]; const rad=r.offsetWidth/2; items.forEach((it,i)=>{it.style.setProperty('--a',(i/items.length*360+(r.classList.contains('r2')?30:0))+'deg'); it.style.setProperty('--rad',rad+'px');});});}
document.querySelectorAll('#halo .orb-i').forEach(o=>{const k=o.dataset.k; if(ICONS[k]) o.innerHTML=svgIcon(k,'#'+(ICONS[k][0].toLowerCase()==='000000'||ICONS[k][0]==='181717'?'16181D':ICONS[k][0]));});
function fitHero(){
  const name=document.querySelector('.hero-name'), copy=document.querySelector('.hero-copy');
  name.style.fontSize=''; if(isMobile()) return;
  let fs=parseFloat(getComputedStyle(name).fontSize), guard=0;
  while(copy.getBoundingClientRect().bottom+18>name.getBoundingClientRect().top && fs>48 && guard++<40){ fs-=4; name.style.fontSize=fs+'px'; }
}
placeBadges(); fitHero(); addEventListener('resize',()=>{fitHero(); placeBadges();});
if(document.fonts&&document.fonts.ready) document.fonts.ready.then(()=>{fitHero(); placeBadges();});

/* ---------- hero letters breathe near the cursor ---------- */
const chars=[...document.querySelectorAll('.hero-name .ch')];
let charPos=[];
function measureChars(){charPos=chars.map(c=>{const r=c.getBoundingClientRect(); return [r.left+r.width/2+scrollX, r.top+r.height/2+scrollY];});}
addEventListener('resize',()=>setTimeout(measureChars,100));

/* ---------- buttery scroll (desktop wheel) ---------- */
const smooth={on:finePointer && !reduce, target:scrollY, cur:scrollY, active:false};
if(smooth.on){
  addEventListener('wheel',e=>{
    if(e.ctrlKey || document.body.classList.contains('loading')) return;
    if(e.target.closest && e.target.closest('textarea')) return;
    e.preventDefault();
    if(!smooth.active){smooth.target=smooth.cur=scrollY;}
    smooth.target=clamp(smooth.target+e.deltaY*(e.deltaMode===1?36:1), 0, document.documentElement.scrollHeight-innerHeight);
    smooth.active=true;
  },{passive:false});
}
document.querySelectorAll('a[href^="#"]').forEach(a=>{ if(a.getAttribute('href')==='#') return; a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href')); if(!t) return; e.preventDefault();
  const y=clamp(t.getBoundingClientRect().top+scrollY,0,document.documentElement.scrollHeight-innerHeight);
  if(smooth.on){ smooth.cur=scrollY; smooth.target=y; smooth.active=true; } else scrollTo({top:y,behavior:reduce?'auto':'smooth'}); }); });

/* ---------- paper planes ---------- */
const PLANE_COLORS=[['#2340FF','#1A2FC0'],['#FF5B37','#C9411F'],['#FFC93C','#D9A21E'],['#20C46B','#14904D'],['#6C4BFF','#4E31D6'],['#FF4FA3','#D23383']];
const planeSVG=(a,b)=>`<svg viewBox="0 0 40 30"><path d="M0 3 L40 15 L13 17 Z" fill="${a}"/><path d="M13 17 L40 15 L9 27 Z" fill="${b}"/><path d="M13 17 L9 27 L11 19 Z" fill="#16181D" opacity=".35"/></svg>`;
const flies=[]; let pc=0;
function addPlane(x,y,h,boost){
  const layer=document.getElementById('flies'); const el=document.createElement('div'); el.className='fly'; const c=PLANE_COLORS[pc++%PLANE_COLORS.length]; el.innerHTML=planeSVG(c[0],c[1]); layer.appendChild(el);
  flies.push({el,x,y,h,v:1.3+Math.random()*.7,s:.85+Math.random()*.45,wob:Math.random()*10,scared:0,loop:0,boost:boost||0});
  while(flies.length>14){ const f=flies.shift(); f.el.remove(); }
}
function spawnFlies(){
  if(reduce) return;
  const n=isMobile()?2:4;
  for(let i=0;i<n;i++) addPlane(innerWidth*(.1+Math.random()*.8), innerHeight*(.15+Math.random()*.7), Math.random()*6.28, 0);
  addEventListener('click',e=>{ if(!goFired || e.target.closest('a,button,input,textarea,label,.ball,.polaroid,.card,.chips,#composer,.filters,#cord')) return;
    const hit=flies.findIndex(f=>Math.hypot(f.x-e.clientX,f.y-e.clientY)<30*f.s);
    if(hit>=0){ catchPlane(hit,e.clientX,e.clientY); return; }
    for(let k=0;k<(e.detail>1?3:1);k++) addPlane(e.clientX,e.clientY,-Math.PI/2+(Math.random()-.5)*1.4,7+Math.random()*3); });
}
let caught=0;
function catchPlane(i,x,y){
  const f=flies.splice(i,1)[0]; f.el.animate([{opacity:1},{opacity:0, transform:f.el.style.transform+' scale(2.2) rotate(200deg)'}],{duration:380,easing:'ease-out'}).onfinish=()=>f.el.remove();
  const C=['#2340FF','#FF5B37','#FFC93C','#20C46B','#6C4BFF'];
  for(let k=0;k<12;k++){ const sp=document.createElement('span'); sp.className='spark'; sp.style.background=C[k%5]; document.body.appendChild(sp); const a=Math.PI*2*k/12, r=40+Math.random()*30;
    sp.animate([{transform:`translate(${x}px,${y}px)`,opacity:1},{transform:`translate(${x+Math.cos(a)*r}px,${y+Math.sin(a)*r}px) scale(.2)`,opacity:0}],{duration:600,easing:'cubic-bezier(.2,.8,.15,1)'}).onfinish=()=>sp.remove(); }
  caught++; const cc=document.getElementById('caught'); cc.querySelector('b').textContent=caught; cc.classList.add('show'); cc.classList.remove('bump'); void cc.offsetWidth; cc.classList.add('bump');
  const msgs={1:'Nice catch! ✈️',5:'5 planes! Air traffic control is worried',10:'10 planes! You have been promoted to Chief Plane Catcher 🏅',20:'20?! Okay, you clearly love this site. Hire me? 😄'};
  if(msgs[caught]) toast(msgs[caught]);
  if(flies.length<3) setTimeout(()=>addPlane(-40, innerHeight*(.2+Math.random()*.6), (Math.random()-.5)*.6, 2), 900);
}
function stepFlies(){
  flies.forEach(f=>{
    if(f.loop>0){ f.h+=.13; f.loop--; }
    else { f.wob+=.02; f.h+=Math.sin(f.wob*1.7+f.x*.003)*.03+Math.cos(f.wob*.9)*.012; if(Math.random()<.0016) f.loop=48; }
    const dx=f.x-mouse.x, dy=f.y-mouse.y, d=Math.hypot(dx,dy);
    if(d<140 && performance.now()-mouse.t<3000 && f.loop===0){ const away=Math.atan2(dy,dx); let diff=((away-f.h+Math.PI*3)%(Math.PI*2))-Math.PI; f.h+=diff*.16; f.scared=1; } else f.scared*=.97;
    f.boost*=.965;
    const sp=f.v*(1+f.scared*1.8)+f.boost;
    f.x+=Math.cos(f.h)*sp; f.y+=Math.sin(f.h)*sp+Math.sin(f.wob*5)*.35;
    if(f.x>innerWidth+50) f.x=-50; if(f.x<-50) f.x=innerWidth+50; if(f.y>innerHeight+50) f.y=-50; if(f.y<-50) f.y=innerHeight+50;
    const bank=1-Math.min(.45,Math.abs(Math.sin(f.h))*.25+(f.loop?0:0));
    f.el.style.transform=`translate(${f.x}px,${f.y}px) rotate(${f.h*180/Math.PI}deg) scale(${f.s},${f.s*bank})`;
  });
}

/* ---------- journey: a road you play through ---------- */
const road=document.getElementById('road'), roadBg=document.getElementById('roadBg'), roadFg=document.getElementById('roadFg'), roadSvg=document.getElementById('roadSvg'), marker=document.getElementById('marker');
const lvs=[...road.querySelectorAll('.lv')];
let roadLen=0, nodeLens=[];
function buildRoad(){
  const W=road.clientWidth, mob=isMobile(); const pts=[];
  lvs.forEach((lv,i)=>{ const card=lv.querySelector('.lvcard'); const y=lv.offsetTop+28; const x= mob? 22 : (lv.classList.contains('L')? W*.2 : W*.8);
    lv.querySelector('.node').style.left=x+'px'; lv.querySelector('.node').style.top='28px'; pts.push([x,y]); });
  const start=[pts[0][0], -20]; const end=[pts[pts.length-1][0], road.clientHeight];
  const all=[start,...pts,end];
  let d=`M${all[0][0]} ${all[0][1]}`; const segLens=[]; let acc=0; nodeLens=[];
  const tmp=document.createElementNS('http://www.w3.org/2000/svg','path');
  roadSvg.appendChild(tmp);
  for(let i=1;i<all.length;i++){const [x0,y0]=all[i-1], [x1,y1]=all[i], dy=y1-y0;
    const seg= mob? ` C ${x0+14} ${y0+dy*.33}, ${x1-14} ${y1-dy*.33}, ${x1} ${y1}` : ` C ${x0} ${y0+dy*.55}, ${x1} ${y1-dy*.55}, ${x1} ${y1}`;
    tmp.setAttribute('d',`M${x0} ${y0}`+seg); acc+=tmp.getTotalLength(); d+=seg; if(i<all.length-1) nodeLens.push(acc);}
  tmp.remove();
  roadSvg.setAttribute('viewBox',`0 0 ${W} ${road.clientHeight}`);
  roadBg.setAttribute('d',d); roadFg.setAttribute('d',d); roadLen=roadFg.getTotalLength();
  roadFg.style.strokeDasharray=roadLen; roadFg.style.strokeDashoffset=roadLen;
}
let lastLvl=-1; const hudLvl=document.getElementById('hudLvl'), hudWhat=document.getElementById('hudWhat'), hudXp=document.getElementById('hudXp'), hudXpn=document.getElementById('hudXpn');
let markerLen=0;
function stepRoad(){
  if(!roadLen) return;
  const rr=road.getBoundingClientRect(); if(rr.bottom<-200 || rr.top>innerHeight+200) return;
  const targetY=innerHeight*.58-rr.top;
  let lo=0, hi=roadLen; for(let k=0;k<16;k++){const mid=(lo+hi)/2; if(roadFg.getPointAtLength(mid).y<targetY) lo=mid; else hi=mid;}
  markerLen=lerp(markerLen,lo,.2);
  const p=roadFg.getPointAtLength(markerLen), q=roadFg.getPointAtLength(Math.min(roadLen,markerLen+2));
  const ang=Math.atan2(q.y-p.y,q.x-p.x)*180/Math.PI+90;
  marker.style.transform=`translate(${p.x}px,${p.y}px) rotate(${markerLen<2?180:ang}deg)`;
  roadFg.style.strokeDashoffset=roadLen-markerLen;
  let lvl=-1; nodeLens.forEach((L,i)=>{const on=markerLen>=L-4; lvs[i].classList.toggle('on',on); if(on){ lvl=i; if(!lvs[i]._got){ lvs[i]._got=true; setTimeout(()=>collect(lvs[i]),900); } } });
  if(!isMobile()) lvs.forEach(lv=>{ const y=lv._yr||(lv._yr=lv.querySelector('.bigyr')); if(!y) return; const r=lv.getBoundingClientRect(); y.style.transform=`translateY(${(r.top+r.height/2-innerHeight/2)*-.28}px)`; });
  if(lvl!==lastLvl){ lastLvl=lvl; const i=Math.max(0,lvl); hudLvl.textContent='LV '+(i+1); hudWhat.textContent=lvs[i].querySelector('h3').textContent; }
  const xp=clamp(markerLen/nodeLens[nodeLens.length-2],0,1); hudXp.style.width=(xp*100)+'%'; hudXpn.textContent=Math.round(xp*2027).toLocaleString('en-IN')+' XP';
}

let score=0; const scoreEl=document.getElementById('hudScore');
function bumpScore(){ score++; scoreEl.querySelector('b').textContent=score; scoreEl.classList.remove('bump'); void scoreEl.offsetWidth; scoreEl.classList.add('bump'); }
function collect(lv){
  lv.querySelectorAll('.coin').forEach((c,k)=>{
    if(isMobile()||reduce){ c.classList.add('got'); bumpScore(); return; }
    const r=c.getBoundingClientRect(), h=scoreEl.getBoundingClientRect();
    const f=document.createElement('span'); f.className='coin-fly'; f.textContent=c.textContent; document.body.appendChild(f);
    const sx=r.left, sy=r.top, ex=h.left+8, ey=h.top-4;
    setTimeout(()=>{ c.classList.add('got');
      f.animate([{transform:`translate(${sx}px,${sy}px) scale(1)`},{transform:`translate(${(sx+ex)/2}px,${Math.min(sy,ey)-140}px) scale(1.6) rotate(200deg)`},{transform:`translate(${ex}px,${ey}px) scale(.5) rotate(360deg)`,opacity:.7}],{duration:950,easing:'cubic-bezier(.45,0,.25,1)',fill:'forwards'}).onfinish=()=>{f.remove(); bumpScore();};
    },k*200);
  });
}

/* ---------- gravity: everything on screen falls down, then comes back ---------- */
(function(){
  const btn=document.getElementById('gravBtn'); let busy=false;
  btn.addEventListener('click',()=>{
    if(busy) return; busy=true;
    if(reduce){ toast("I told you not to press it 😅"); busy=false; return; }
    toast("I told you not to press it 😅",2600);
    const SEL='h1,h2,h3,p,.btn,.ccard,.composer,.card,.polaroid,.win,.medal,.ticket,.stat,.sbox,.pill,.badge,.lvcard,.chip,.spinner,.scribble,.mail,.visitbox,.big,.hi-row,.foot>span,.dontpress,.tally span';
    const chosen=[];
    document.querySelectorAll(SEL).forEach(el=>{ if(chosen.length>=70) return; if(el.closest('.dock,#loader,#cord,#toast')) return; if(chosen.some(c=>c.contains(el))) return;
      const r=el.getBoundingClientRect(); if(r.bottom<0||r.top>innerHeight||r.width<4||r.height>innerHeight*.85) return; chosen.push(el); });
    const B=chosen.map(el=>{const r=el.getBoundingClientRect(); return {el,x:0,y:0,vx:(Math.random()-.5)*5,vy:-Math.random()*7,rot:0,vr:(Math.random()-.5)*7,floor:innerHeight-r.bottom-2,left:-r.left,right:innerWidth-r.right};});
    const prevOverflow=document.documentElement.style.overflow; document.documentElement.style.overflow='hidden'; smooth.active=false;
    const t0=performance.now();
    (function fall(now){
      B.forEach(b=>{ b.vy+=.85; b.x+=b.vx; b.y+=b.vy; b.rot+=b.vr;
        if(b.y>b.floor){ b.y=b.floor; b.vy*=-.33; b.vx*=.82; b.vr*=.6; }
        if(b.x<b.left){b.x=b.left; b.vx*=-.5;} if(b.x>b.right){b.x=b.right; b.vx*=-.5;}
        b.el.style.translate=`${b.x}px ${b.y}px`; b.el.style.rotate=`${b.rot}deg`; });
      if(now-t0<3300) requestAnimationFrame(fall);
      else {
        toast('okay okay, putting it all back…',1800);
        B.forEach((b,i)=>{ b.el.style.transition='translate 1.1s cubic-bezier(.2,.8,.15,1), rotate 1.1s cubic-bezier(.2,.8,.15,1)'; b.el.style.transitionDelay=(i%12)*40+'ms'; b.el.style.translate='0px 0px'; b.el.style.rotate='0deg'; });
        setTimeout(()=>{ B.forEach(b=>{ b.el.style.translate=''; b.el.style.rotate=''; b.el.style.transition=''; b.el.style.transitionDelay=''; }); document.documentElement.style.overflow=prevOverflow; busy=false; },1700);
      }
    })(t0);
  });
})();

/* ---------- install as an app ---------- */
(function(){
  let deferred=null; const btns=[...document.querySelectorAll('.install-btn')];
  const standalone=matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  if(standalone){ btns.forEach(b=>b.style.display='none'); return; }
  addEventListener('beforeinstallprompt',e=>{ e.preventDefault(); deferred=e; });
  addEventListener('appinstalled',()=>{ toast('Installed! Find Betty on your home screen 🎉',3500); btns.forEach(b=>b.style.display='none'); });
  btns.forEach(b=>b.addEventListener('click',e=>{ e.preventDefault();
    if(deferred){ deferred.prompt(); deferred.userChoice.then(()=>{deferred=null;}); return; }
    const iOS=/iphone|ipad|ipod/i.test(navigator.userAgent);
    toast(iOS?'On iPhone: tap the Share button, then "Add to Home Screen" 📲':'Open your browser menu and choose "Install app" or "Add to Home screen" 📲',5000);
  }));
  if('serviceWorker' in navigator && location.protocol==='https:' && !/claude\.ai|claudeusercontent/.test(location.hostname)){ navigator.serviceWorker.register('sw.js').catch(()=>{}); }
})();

/* ---------- scroll plane ---------- */
const spEl=document.getElementById('sp'), spc=document.getElementById('spc'), sctx=spc.getContext('2d'), spp=document.getElementById('spp');
let spY=null, spAng=90, spW=0, spH=0; const spTrail=[];
function sizeSP(){ const d=Math.min(devicePixelRatio||1,2); spW=spEl.clientWidth; spH=spEl.clientHeight; spc.width=spW*d; spc.height=spH*d; sctx.setTransform(d,0,0,d,0,0); }
sizeSP(); addEventListener('resize',sizeSP);
function stepScrollPlane(y){
  if(reduce) return;
  const now=performance.now(), max=document.documentElement.scrollHeight-innerHeight, p=max>0?y/max:0;
  const ty=30+p*(spH-60); if(spY===null) spY=ty;
  const dy=ty-spY; spY=lerp(spY,ty,.12);
  const wob=Math.sin(now/260)*Math.min(9,Math.abs(vel)*.6);
  const x=spW/2+wob;
  if(Math.abs(dy)>.4){ const target=dy>0?90:-90; spAng=lerp(spAng,target+clamp(wob*3,-25,25),.12); }
  spp.style.transform=`translate(${x}px,${spY}px) rotate(${spAng}deg)`;
  const last=spTrail[spTrail.length-1];
  if(!last || Math.hypot(last.x-x,last.y-spY)>6) spTrail.push({x,y:spY,t:now});
  while(spTrail.length>1 && now-spTrail[0].t>1400) spTrail.shift();
  sctx.clearRect(0,0,spW,spH); sctx.lineCap='round'; sctx.strokeStyle='#7389FF';
  for(let i=1;i<spTrail.length;i++){ if(i%2) continue; const a=1-(now-spTrail[i].t)/1400; if(a<=0) continue; sctx.globalAlpha=a*.9; sctx.lineWidth=1+2*a; sctx.beginPath(); sctx.moveTo(spTrail[i-1].x,spTrail[i-1].y); sctx.lineTo(spTrail[i].x,spTrail[i].y); sctx.stroke(); }
  sctx.globalAlpha=1;
}

/* ---------- marquees, progress, dock, belts: one loop ---------- */
const marqs=[...document.querySelectorAll('.marq')].map(m=>({el:m.querySelector('.track'),dir:+m.dataset.speed,x:0}));
const dockLinks=[...document.querySelectorAll('.dock a')];
const secIds=['top','about','work','journey','wins','toolbox','certs','contact'];
let lastY=scrollY, vel=0;
function tick(t){
  if(smooth.active){ smooth.cur=lerp(smooth.cur,smooth.target,.09); if(Math.abs(smooth.target-smooth.cur)<.5){smooth.cur=smooth.target; smooth.active=false;} scrollTo(0,smooth.cur); }
  const y=scrollY; vel=lerp(vel,y-lastY,.12); lastY=y;
  stepScrollPlane(y);
  if(!reduce){
    marqs.forEach(m=>{ m.x-=(1.1+Math.min(14,Math.abs(vel))*.5)*m.dir; const w=m.el.scrollWidth/2; if(m.x<-w) m.x+=w; if(m.x>0) m.x-=w; m.el.style.transform=`translate3d(${m.x}px,0,0) skewX(${clamp(-vel*.25,-8,8)}deg)`; });
    if(!belt.paused){ rows.forEach((r,i)=>{ const dir=+r.dataset.dir; belt.x[i]-=(.6+Math.min(10,Math.abs(vel))*.25)*dir; const w=r.scrollWidth/2; if(belt.x[i]<-w) belt.x[i]+=w; if(belt.x[i]>0) belt.x[i]-=w; r.style.transform=`translate3d(${belt.x[i]}px,0,0)`; }); }
    stepFlies(t);
  }
  stepRoad();
  const mid=innerHeight*.45; let cur='top'; secIds.forEach(id=>{const el=document.getElementById(id); if(el && el.getBoundingClientRect().top<mid) cur=id;});
  if(cur==='toolbox'||cur==='certs') cur='wins';
  dockLinks.forEach(a=>a.classList.toggle('cur',a.dataset.s===cur));
  if(charPos.length && finePointer && !reduce && y<innerHeight){
    chars.forEach((c,i)=>{const dx=charPos[i][0]-scrollX-mouse.x, dy=charPos[i][1]-y-mouse.y, d=Math.sqrt(dx*dx+dy*dy);
      const w=800-560*Math.exp(-(d*d)/(170*170)); c.style.fontVariationSettings=`"wght" ${w|0}`;});
  }
  requestAnimationFrame(tick);
}

/* ---------- draggable polaroids ---------- */
(function(){
  const board=document.getElementById('board'); const ps=[...board.querySelectorAll('.polaroid')]; let z=10;
  function place(){ if(isMobile()){ps.forEach(p=>p.style.setProperty('--rot',p.dataset.r+'deg')); return;}
    const W=board.clientWidth, H=board.clientHeight;
    ps.forEach(p=>{ if(p.dataset.moved) return; const x=+p.dataset.x*W, y=+p.dataset.y*H; p.style.left='0'; p.style.top='0'; p._x=Math.min(x,W-p.offsetWidth-10); p._y=Math.min(y,H-p.offsetHeight-10); p._r=+p.dataset.r; p.style.transform=`translate(${p._x}px,${p._y}px) rotate(${p._r}deg)`; }); }
  place(); addEventListener('resize',place); setTimeout(place,600);
  ps.forEach(p=>{
    p.addEventListener('pointerdown',e=>{ if(isMobile()) return; e.preventDefault(); p.setPointerCapture(e.pointerId); p.classList.add('drag'); p.style.zIndex=++z;
      const sx=e.clientX-p._x, sy=e.clientY-p._y; let lx=e.clientX;
      const mv=ev=>{ const W=board.clientWidth, H=board.clientHeight; p._x=clamp(ev.clientX-sx,-p.offsetWidth*.3,W-p.offsetWidth*.7); p._y=clamp(ev.clientY-sy,-20,H-p.offsetHeight*.6);
        const tl=clamp((ev.clientX-lx)*1.2,-14,14); lx=ev.clientX; p.dataset.moved=1;
        p.style.transform=`translate(${p._x}px,${p._y}px) rotate(${p._r+tl}deg) scale(1.05)`; };
      const up=()=>{ p.classList.remove('drag'); p.style.transform=`translate(${p._x}px,${p._y}px) rotate(${p._r}deg)`; p.removeEventListener('pointermove',mv); p.removeEventListener('pointerup',up); p.removeEventListener('pointercancel',up); };
      p.addEventListener('pointermove',mv); p.addEventListener('pointerup',up); p.addEventListener('pointercancel',up);
    });
  });
})();

/* ---------- toolbox physics with real logos ---------- */
(function(){
  const arena=document.getElementById('arena');
  // [label, icon key or null, weight 1-3, fallback colour]
  const S=[['React','react',3],['TypeScript','typescript',3],['Three.js','threedotjs',3],['JavaScript','javascript',3],['Node.js','nodedotjs',3],['Python','python',3],['FastAPI','fastapi',3],
    ['Flutter','flutter',2],['Framer Motion','framer',2],['Tailwind','tailwindcss',2],['HTML5','html5',2],['Express','express',2],['MongoDB','mongodb',2],['MySQL','mysql',2],['Socket.IO','socketdotio',2],
    ['scikit-learn','scikitlearn',2],['Pandas','pandas',2],['NumPy','numpy',2],['Java','openjdk',2],['C','c',2],['Selenium','selenium',2],['Git','git',2],['GitHub','github',2],['Firebase','firebase',2],
    ['SQLite','sqlite',1],['R','r',1],['Jira','jira',1],['Bitbucket','bitbucket',1],['AWS','amazonaws',1],['Azure','microsoftazure',1],['Linux','linux',1],['GitHub Actions','githubactions',1],['Postman','postman',1],['Leaflet','leaflet',1],
    ['Appium',null,2,'#662D91'],['TestNG',null,1,'#E2231A'],['XGBoost',null,2,'#1A9C3E'],['MediaPipe',null,2,'#0097A7'],['REST APIs',null,1,'#16181D']];
  const lum=h=>{h=h.replace('#',''); const r=parseInt(h.slice(0,2),16)/255,g=parseInt(h.slice(2,4),16)/255,b=parseInt(h.slice(4,6),16)/255; return .2126*r+.7152*g+.0722*b;};
  const B=[]; let W=0,H=0,running=false,started=false;
  const scale=()=>clamp(arena.clientWidth/1150,.5,1);
  S.forEach(([n,k,wt,fb])=>{const el=document.createElement('div'); el.className='ball'+(k?'':' textonly');
    let bg=k&&ICONS[k]?'#'+ICONS[k][0]:fb; if(bg.toLowerCase()==='#000000'||bg.toLowerCase()==='#181717') bg='#16181D';
    const fg=lum(bg)>.6?'#16181D':'#fff'; el.style.background=bg; el.style.color=fg;
    el.innerHTML=(k?svgIcon(k,fg):'')+`<span>${n}</span>`; el.title=n; arena.appendChild(el); B.push({el,wt,x:0,y:0,vx:0,vy:0,r:30,drag:false});});
  function sizeAll(){W=arena.clientWidth; H=arena.clientHeight; const s=scale();
    B.forEach(b=>{b.r=(b.wt===3?56:b.wt===2?44:35)*s; b.el.style.width=b.el.style.height=(b.r*2)+'px'; b.el.style.fontSize=(b.r*.36)+'px';});}
  function drop(){B.forEach(b=>{b.x=b.r+Math.random()*(W-2*b.r); b.y=-b.r-Math.random()*H*(isMobile()?.7:1.4); b.vx=(Math.random()-.5)*4; b.vy=Math.random()*2;});}
  sizeAll(); addEventListener('resize',()=>{sizeAll(); B.forEach(b=>{b.x=clamp(b.x,b.r,W-b.r); b.y=Math.min(b.y,H-b.r);});});
  let mx=-999,my=-999,pmx=0,pmy=0;
  arena.addEventListener('pointermove',e=>{const r=arena.getBoundingClientRect(); pmx=mx; pmy=my; mx=e.clientX-r.left; my=e.clientY-r.top;});
  arena.addEventListener('pointerleave',()=>{mx=my=-999;});
  B.forEach(b=>{
    b.el.addEventListener('pointerdown',e=>{e.preventDefault(); b.el.setPointerCapture(e.pointerId); b.drag=true; const r=arena.getBoundingClientRect(); let lx=e.clientX, ly=e.clientY;
      const mv=ev=>{b.x=clamp(ev.clientX-r.left,b.r,W-b.r); b.y=clamp(ev.clientY-r.top,b.r,H-b.r); b.vx=(ev.clientX-lx)*.9; b.vy=(ev.clientY-ly)*.9; lx=ev.clientX; ly=ev.clientY;};
      const up=()=>{b.drag=false; b.el.removeEventListener('pointermove',mv); b.el.removeEventListener('pointerup',up); b.el.removeEventListener('pointercancel',up);};
      b.el.addEventListener('pointermove',mv); b.el.addEventListener('pointerup',up); b.el.addEventListener('pointercancel',up);});
  });
  document.getElementById('shake').addEventListener('click',()=>{B.forEach(b=>{b.vx+=(Math.random()-.5)*26; b.vy-=8+Math.random()*16;});});
  function step(){
    if(!running) return;
    B.forEach(b=>{ if(b.drag) return; b.vy+=.42; b.vx*=.995; b.vy*=.995;
      if(mx>-900){const dx=b.x-mx, dy=b.y-my, d=Math.hypot(dx,dy); if(d<b.r+30 && d>0){const f=(b.r+30-d)/(b.r+30); b.vx+=dx/d*f*2.2+(mx-pmx)*.05; b.vy+=dy/d*f*2.2+(my-pmy)*.05;}}
      b.x+=b.vx; b.y+=b.vy;
      if(b.y>H-b.r){b.y=H-b.r; b.vy*=-.35; b.vx*=.96;} if(b.x<b.r){b.x=b.r; b.vx*=-.5;} if(b.x>W-b.r){b.x=W-b.r; b.vx*=-.5;}
    });
    for(let it=0;it<3;it++){
      for(let i=0;i<B.length;i++)for(let j=i+1;j<B.length;j++){
        const a=B[i], c=B[j], dx=c.x-a.x, dy=c.y-a.y, rr=a.r+c.r, d2=dx*dx+dy*dy;
        if(d2<rr*rr && d2>0){ const d=Math.sqrt(d2), nx=dx/d, ny=dy/d, ov=(rr-d);
          const wa=a.drag?0:(c.drag?1:.5), wc=c.drag?0:(a.drag?1:.5);
          a.x-=nx*ov*wa; a.y-=ny*ov*wa; c.x+=nx*ov*wc; c.y+=ny*ov*wc;
          const rv=(c.vx-a.vx)*nx+(c.vy-a.vy)*ny; if(rv<0){const imp=-1.3*rv/2; if(!a.drag){a.vx-=imp*nx; a.vy-=imp*ny;} if(!c.drag){c.vx+=imp*nx; c.vy+=imp*ny;}}
        }
      }
    }
    B.forEach(b=>{ if(b.y>H-b.r) b.y=H-b.r; b.el.style.transform=`translate3d(${b.x-b.r}px,${b.y-b.r}px,0)`; });
    requestAnimationFrame(step);
  }
  B.forEach(b=>b.el.style.transform='translate3d(-200px,-200px,0)');
  new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ if(!started){started=true; drop();} if(!running){running=true; requestAnimationFrame(step);} } else running=false; }),{threshold:.15}).observe(arena);
})();

/* ======== LOADER, then the ENTRANCE ======== */
let goFired=false; const goCallbacks=[];
function onGo(fn){ if(goFired) fn(); else goCallbacks.push(fn); }
(function(){
  const pct=document.getElementById('pct'), bar=document.getElementById('lbar'), hello=document.getElementById('hello'), hlang=document.getElementById('hlang'), L0=document.getElementById('loader');
  document.querySelectorAll('.lname .ln').forEach(ln=>{ [...ln.dataset.t].forEach((c,i)=>{const s=document.createElement('span'); s.style.setProperty('--i',i); s.textContent=c===' '?'\u00A0':c; ln.appendChild(s);}); });
  const HI=[['Hello','English'],['வணக்கம்','Tamil'],['नमस्ते','Hindi'],['Hola','Spanish'],['Bonjour','French'],['こんにちは','Japanese'],['Ciao','Italian'],['안녕하세요','Korean'],['Olá','Portuguese'],['Hallo','German'],['مرحبا','Arabic'],['Привет','Russian'],['你好','Chinese'],['Hej','Swedish'],['Merhaba','Turkish'],['Salut','Romanian'],['Jambo','Swahili'],['Namaskara','Kannada']];
  let hi=0, hiT=0, delay=320;
  function nextHi(){ hi=(hi+1)%HI.length; hello.textContent=HI[hi][0]; hlang.textContent=HI[hi][1]; hello.classList.remove('pop'); void hello.offsetWidth; hello.classList.add('pop'); delay=Math.max(165,delay*.93); hiT=setTimeout(nextHi,delay); }
  if(!reduce) hiT=setTimeout(nextHi,delay);
  let shown=0, target=0, heroReady=false, winReady=document.readyState==='complete';
  const heroImg=new Image(); heroImg.onload=()=>heroReady=true; heroImg.src=HERO_SRC;
  addEventListener('load',()=>winReady=true);
  const t0=performance.now(), MIN=reduce?200:2900;
  (function step(now){
    const el=now-t0; target=Math.min(heroReady&&winReady?100:93, el/MIN*100);
    shown=lerp(shown,target,.1); if(target===100 && shown>99.4) shown=100;
    pct.textContent=Math.round(shown); bar.style.width=shown+'%';
    if((shown>=100 && el>=MIN) || el>8000){ clearTimeout(hiT); document.getElementById('lmsg').textContent='ready!';
      if(reduce){ finish(); return; }
      L0.classList.add('named'); setTimeout(finish,1650); return; }
    requestAnimationFrame(step);
  })(t0);
  function finish(){
    const L=document.getElementById('loader'); L.classList.add('out'); document.body.classList.remove('loading');
    setTimeout(()=>{L.remove();},1300);
    goFired=true; document.body.classList.add('go'); goCallbacks.forEach(f=>f());
    if(!reduce) setTimeout(()=>toast(finePointer?'psst… click anywhere to launch a paper plane, or click a flying one to catch it':'psst… tap anywhere to launch a paper plane'),3600);
    setTimeout(measureChars,2400); spawnFlies(); buildRoad(); setTimeout(buildRoad,1500);
    requestAnimationFrame(tick);
  }
  addEventListener('resize',()=>{ if(goFired) buildRoad(); });
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(()=>{ if(goFired) buildRoad(); });
})();

/* particles gather into the portrait, then hand over to the photo */
(function(){
  let gl=null;
  try{const c=document.createElement('canvas'); gl=c.getContext('webgl')||c.getContext('experimental-webgl');}catch(e){}
  if(!window.THREE || !gl){document.body.classList.add('no-gl'); return;}
  const mobile=isMobile();
  const N=mobile?8000:14000;
  const canvas=document.getElementById('gl');
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:false});
  const PR=Math.min(devicePixelRatio||1,2);
  renderer.setPixelRatio(PR); renderer.setClearColor(0x000000,0);
  const scene=new THREE.Scene();
  const FOV=35, CAMZ=10;
  const camera=new THREE.PerspectiveCamera(FOV,1,0.1,100); camera.position.z=CAMZ;
  const worldH=2*CAMZ*Math.tan(FOV*Math.PI/360);
  let VW=0,VH=0,pxToWorld=1;
  function resize(){const w=canvas.clientWidth||innerWidth, h=canvas.clientHeight||innerHeight; if(w===VW&&h===VH) return; VW=w; VH=h; renderer.setSize(w,h,false); camera.aspect=w/h; camera.updateProjectionMatrix(); pxToWorld=worldH/h;}
  resize();
  let seed=7; const rnd=()=>{seed=(seed*16807)%2147483647; return (seed-1)/2147483646;};
  const pos=new Float32Array(N*3), col=new Float32Array(N*3), scl=new Float32Array(N), rid=new Float32Array(N), spd=new Float32Array(N), dir=new Float32Array(N*3);
  for(let i=0;i<N;i++){
    const r=4+rnd()*5, t=rnd()*Math.PI*2, ph=Math.acos(2*rnd()-1);
    pos[i*3]=r*Math.sin(ph)*Math.cos(t)+2; pos[i*3+1]=r*Math.sin(ph)*Math.sin(t)*0.7; pos[i*3+2]=r*Math.cos(ph)*0.6-2;
    col[i*3]=col[i*3+1]=col[i*3+2]=0.35;
    scl[i]=0.55+Math.pow(rnd(),2.2)*1.25; rid[i]=rnd(); spd[i]=0.045+rnd()*0.07;
    const a=rnd()*Math.PI*2, b=Math.acos(2*rnd()-1), m=0.4+rnd()*1.2;
    dir[i*3]=Math.sin(b)*Math.cos(a)*m*1.3; dir[i*3+1]=Math.sin(b)*Math.sin(a)*m; dir[i*3+2]=Math.cos(b)*m;
  }
  const geo=new THREE.BufferGeometry();
  geo.setAttribute('position',new THREE.BufferAttribute(pos,3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('color',new THREE.BufferAttribute(col,3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('aScale',new THREE.BufferAttribute(scl,1));
  geo.setAttribute('aRand',new THREE.BufferAttribute(rid,1));
  const uniforms={uTime:{value:0},uSize:{value:mobile?2.3:2.5},uPR:{value:PR},uAlpha:{value:0}};
  const mat=new THREE.ShaderMaterial({uniforms,transparent:true,depthWrite:false,vertexColors:true,
    vertexShader:`attribute float aScale; attribute float aRand; uniform float uTime,uSize,uPR; varying vec3 vC;
      void main(){ vec3 p=position; p.x+=sin(uTime*.9+aRand*31.)*.006; p.y+=cos(uTime*.8+aRand*17.)*.006;
        vec4 mv=modelViewMatrix*vec4(p,1.); gl_Position=projectionMatrix*mv; gl_PointSize=uSize*aScale*uPR*(10./-mv.z); vC=color; }`,
    fragmentShader:`uniform float uAlpha; varying vec3 vC; void main(){ float d=length(gl_PointCoord-.5); if(d>.5) discard; gl_FragColor=vec4(vC, smoothstep(.5,.32,d)*uAlpha); }`
  });
  const points=new THREE.Points(geo,mat); points.frustumCulled=false; scene.add(points);
  const IMG_AR=632/900;
  const tex=new THREE.TextureLoader().load(HERO_SRC); tex.minFilter=THREE.LinearFilter; tex.generateMipmaps=false;
  const photoMat=new THREE.MeshBasicMaterial({map:tex,transparent:true,opacity:0,depthTest:false,depthWrite:false});
  const photoGeo=new THREE.PlaneGeometry(IMG_AR,1); photoGeo.translate(0,.5,0);
  const photo=new THREE.Mesh(photoGeo,photoMat); photo.renderOrder=2; scene.add(photo);
  let portrait=null, portraitCol=null, started=0;
  const img=new Image();
  img.onload=()=>{
    const W=170, H=Math.round(W/IMG_AR), c=document.createElement('canvas'); c.width=W; c.height=H;
    const cx=c.getContext('2d'); cx.drawImage(img,0,0,W,H); const d=cx.getImageData(0,0,W,H).data;
    const px=[]; for(let y=0;y<H;y++)for(let x=0;x<W;x++){const o=(y*W+x)*4; if(d[o+3]>150) px.push(o);}
    portrait=new Float32Array(N*3); portraitCol=new Float32Array(N*3);
    for(let i=0;i<N;i++){
      const o=px[Math.floor(rnd()*px.length)], idx=o/4, x=idx%W, y=Math.floor(idx/W);
      const xx=(x+rnd())/W-.5, yy=.5-(y+rnd())/H;
      portrait[i*3]=xx*IMG_AR; portrait[i*3+1]=yy; portrait[i*3+2]=Math.sqrt(Math.max(0,1-xx*xx*4))*.07;
      portraitCol[i*3]=d[o]/255; portraitCol[i*3+1]=d[o+1]/255; portraitCol[i*3+2]=d[o+2]/255;
    }
  };
  img.src=HERO_SRC;
  onGo(()=>{started=performance.now()-(reduce?1e6:0);});
  const heroFig=document.getElementById('heroFig'), heroEl=document.getElementById('top');
  const INTRO=reduce?0:2800;
  const ss=(a,b,x)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a))); return t*t*(3-2*t);};
  let alpha=0, photoA=0, sleeping=false, tiltX=0, tiltY=0;
  const clock=new THREE.Clock();
  function frame(){
    requestAnimationFrame(frame);
    resize();
    if(!portrait || !started){renderer.render(scene,camera); return;}
    const now=performance.now(), since=now-started, intro=since<INTRO;
    const hr=heroEl.getBoundingClientRect();
    if(!intro && hr.bottom<0){ if(!sleeping){renderer.clear(); sleeping=true;} return; }
    sleeping=false;
    uniforms.uTime.value=clock.getElapsedTime();
    const heroP=Math.min(1,Math.max(0,-hr.top/(hr.height*.7)));
    const r=heroFig.getBoundingClientRect();
    const Ax=(r.left+r.width/2-VW/2)*pxToWorld, Ay=-(r.top+r.height/2-VH/2)*pxToWorld, As=r.height*pxToWorld;
    const nx=clamp((mouse.x/VW-.5)*2,-1,1), ny=clamp((mouse.y/VH-.5)*2,-1,1);
    tiltY=lerp(tiltY,(finePointer&&!reduce&&!intro)?nx*.2:0,.06); tiltX=lerp(tiltX,(finePointer&&!reduce&&!intro)?ny*.06:0,.06);
    photo.rotation.set(tiltX,tiltY,0);
    const scatter=reduce?0:heroP*heroP*3;
    const pa=intro? ss(INTRO*.62,INTRO*.95,since) : 1-ss(.03,.4,heroP);
    photoA+=(pa-photoA)*(intro?1:.4);
    const ta= intro? 1-ss(INTRO*.9,INTRO,since) : (reduce?0:ss(.0,.2,heroP)*(1-ss(.55,.95,heroP)));
    alpha+=(ta-alpha)*(intro?1:.4);
    uniforms.uAlpha.value=alpha;
    photo.position.set(Ax,Ay-As/2,0); photo.scale.set(As,As,1); photoMat.opacity=photoA;
    if(alpha>.004){
      const k=intro?1:4;
      for(let i=0;i<N;i++){
        const j=i*3;
        let tx=portrait[j]*As+Ax, ty=portrait[j+1]*As+Ay, tz=portrait[j+2]*As;
        if(scatter>0){tx+=dir[j]*scatter; ty+=dir[j+1]*scatter; tz+=dir[j+2]*scatter;}
        const sp=reduce?1:Math.min(.85,spd[i]*k);
        pos[j]+=(tx-pos[j])*sp; pos[j+1]+=(ty-pos[j+1])*sp; pos[j+2]+=(tz-pos[j+2])*sp;
        col[j]+=(portraitCol[j]-col[j])*.07; col[j+1]+=(portraitCol[j+1]-col[j+1])*.07; col[j+2]+=(portraitCol[j+2]-col[j+2])*.07;
      }
      geo.attributes.position.needsUpdate=true; geo.attributes.color.needsUpdate=true;
    }
    points.visible=alpha>.004;
    renderer.render(scene,camera);
  }
  frame();
})();
