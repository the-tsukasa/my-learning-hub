// ===== Onboarding flow =====
const onboarding = document.getElementById('onboarding');
const welcomeScreen = document.getElementById('welcomeScreen');
const nameScreen = document.getElementById('nameScreen');
const entryAnim = document.getElementById('entryAnim');
const entryWrap = document.getElementById('entryWrap');
const entryText = document.getElementById('entryText');
const nickInput = document.getElementById('nickInput');
const stage = document.getElementById('stage');
const welcomeName = document.getElementById('welcomeName');

const seedNames = ['Sora','Ren','Aoi','Mio','Kai','Yui','Noa','Haru','Rio','Nagi','Luna','Nova','Rei'];
const seedAffix = ['Wave','Pulse','Echo','Flux','Aura','Nova','Beam','Holo'];

function goName(){
  welcomeScreen.classList.add('hide');
  nameScreen.classList.remove('hide');
  nickInput.focus();
}

function autoFill(){
  const base = seedNames[Math.floor(Math.random()*seedNames.length)];
  const aff = seedAffix[Math.floor(Math.random()*seedAffix.length)];
  const num = String(Math.floor(100 + Math.random()*899));
  nickInput.value = `${aff}_${base}-${num}`;
}

function startSync(){
  const name = (nickInput.value || '').trim() || seedNames[Math.floor(Math.random()*seedNames.length)];
  localStorage.setItem('vib_name', name);
  entryText.textContent = '共感チャンネルを接続中…';
  nameScreen.classList.add('hide');
  entryAnim.classList.add('show');
  spawnParticles();
  setTimeout(()=>{ entryText.textContent = `${name} の波長を同調中…`; }, 600);
  setTimeout(()=>{ finishEntry(); }, 1800);
}

function spawnParticles(){
  entryWrap.querySelectorAll('.pt').forEach(n=>n.remove());
  for(let i=0;i<64;i++){
    const s = document.createElement('span');
    s.className='pt';
    const sx = (Math.random()*-140-60) + 'px';
    const sy = (Math.random()*160-80) + 'px';
    const ex = (Math.random()*340+160) + 'px';
    const ey = (Math.random()*160-80) + 'px';
    s.style.setProperty('--sx', sx); s.style.setProperty('--sy', sy);
    s.style.setProperty('--ex', ex); s.style.setProperty('--ey', ey);
    s.style.left = '50%'; s.style.top = '50%';
    s.style.animationDelay = (Math.random()*1.4).toFixed(2)+'s';
    s.style.opacity = 0.6 + Math.random()*0.4;
    entryWrap.appendChild(s);
  }
}

function finishEntry(){
  const name = localStorage.getItem('vib_name') || 'あなた';
  welcomeName.textContent = name;
  onboarding.style.display = 'none';
  stage.style.display = 'grid';
  pushHistory('デモ準備完了。Vibへようこそ。');
}

// ===== Tab navigation =====
const tabs=[...document.querySelectorAll('.tab')];
const views={
  home:document.getElementById('home'),
  radar:document.getElementById('radar'),
  matches:document.getElementById('matches'),
  profile:document.getElementById('profile')
};
tabs.forEach(t=>t.addEventListener('click',()=>{
  tabs.forEach(x=>x.classList.remove('active'));
  t.classList.add('active');
  Object.values(views).forEach(v=>v.classList.remove('active'));
  views[t.dataset.view].classList.add('active');
}));

// ===== Demo state =====
const names=['Sora','Ren','Aoi','Mio','Kai','Yui','Noa','Haru','Rio','Nagi'];
const moods=['静けさ','探究心','やさしさ','集中','希望','感謝','誠実さ','余白'];
let stats={vibes:0, encounters:0, matches:0};
const elV=document.getElementById('statVibes');
const elE=document.getElementById('statEncounters');
const elM=document.getElementById('statMatches');
const hList=document.getElementById('history');
const mList=document.getElementById('matchList');
const noMatch=document.getElementById('noMatchMsg');

function updateStats(){elV.textContent=stats.vibes; elE.textContent=stats.encounters; elM.textContent=stats.matches;}

function pushHistory(text){
  const item=document.createElement('div');
  item.className='item';
  item.innerHTML=`<div class="avatar">✨</div><div><div>${text}</div><div class="meta">${ts()}</div></div>`;
  hList.prepend(item);
}

function pushMatch(entry){
  const item=document.createElement('div');
  item.className='item';
  item.innerHTML=`<div class="avatar">${entry.icon}</div><div><div><b>${entry.name}</b> と共鳴しました（${entry.compat}%）</div><div class="meta">${entry.tags.join(' / ')} ・ ${ts()}</div></div>`;
  mList.prepend(item); noMatch.style.display='none';
}

function ts(){
  const d=new Date();
  return `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
}

// ===== Radar simulation =====
const zone=document.getElementById('encounterZone');
function fakeWalk(){
  pushHistory('周囲をスキャンしました。あなたの波長は安定しています。');
}
function simulateEncounter(){
  stats.encounters++; updateStats();
  const name=names[Math.floor(Math.random()*names.length)];
  const tag1=moods[Math.floor(Math.random()*moods.length)];
  const tag2=moods[Math.floor(Math.random()*moods.length)];
  const compat=70+Math.floor(Math.random()*30);
  const icon=['🧑‍🚀','🧑‍🎤','🧑‍💻','🧑‍🔬','🧑‍🎨','🧑‍🚴','🧘','🧑‍🍳'][Math.floor(Math.random()*8)];
  const payload={name,tags:[tag1,tag2],compat,icon};
  zone.innerHTML=`
  <div class="encounter">
    <div class="row">
      <div class="avatar">${icon}</div>
      <div><div><b>${name}</b></div><div class="muted">${tag1}・${tag2}</div></div>
      <div class="compat">${compat}%</div>
    </div>
    <div style="display:flex;gap:10px;margin-top:12px">
      <button class="btn primary" id="sendBtn">非言語「いいね！」を送る</button>
      <button class="btn" onclick="dismissEncounter()">スルー</button>
    </div>
  </div>`;
  document.getElementById('sendBtn').onclick=()=>sendVibe(payload);
  pushHistory(`${name} とすれ違いました（${compat}%）`);
}

function dismissEncounter(){ zone.innerHTML=''; }
function sendVibe(p){
  stats.vibes++; stats.matches++; updateStats();
  pushMatch(p); pushHistory(`非言語「いいね！」を送信 → ${p.name} と共鳴`);
  showOverlay(p); zone.innerHTML='';
}

// ===== Overlay =====
const overlay=document.getElementById('overlay');
const other=document.getElementById('other');
const text=document.getElementById('matchText');
function showOverlay(p){
  overlay.classList.add('show');
  other.textContent=p.icon;
  text.textContent=`${p.name} と ${p.compat}% の共感リンク！`;
}
function closeOverlay(){ overlay.classList.remove('show'); }

// ===== Like =====
function toggleLike(btn){
  btn.classList.toggle('active');
  if(btn.classList.contains('active')){
    pushHistory('タイムライン上で静かな「いいね」を送りました。');
    stats.vibes++; updateStats();
  }
}

// ===== Revisit logic =====
(function init(){
  const saved=localStorage.getItem('vib_name');
  if(saved){
    welcomeName.textContent=saved;
    onboarding.style.display='none';
    stage.style.display='grid';
    pushHistory('再訪問ありがとうございます。');
  }
})();

// ===== Reset =====
function resetOnboarding(){
  localStorage.removeItem('vib_name');
  alert('データをリセットしました。再読み込みすると、入場画面から再体験できます。');
  location.reload();
}

// ===== Device mock =====
const deviceStatus=document.getElementById('deviceStatus');
function connectWatch(){
  deviceStatus.textContent='⌚ スマートウォッチを検索中…';
  setTimeout(()=>{
    deviceStatus.textContent='✅ スマートウォッチ接続完了（脈拍データ同期中）';
    pushHistory('スマートウォッチから感情データを受信しました。');
  },1200);
}
function connectVR(){
  deviceStatus.textContent='🕶 VR眼鏡をリンク中…';
  setTimeout(()=>{
    deviceStatus.textContent='✅ VR眼鏡リンク成功';
    pushHistory('VR空間で共感セッションを開始しました。');
    showVRScene();
  },1400);
}
function showVRScene(){
  overlay.classList.add('show');
  overlay.querySelector('.match').innerHTML=`
    <div class="muted">🕶 VR共感セッション</div>
    <div style="margin:16px 0;font-size:14px">
      あなたの視界に光の波紋が広がり、他のユーザーの波長と共鳴しています。
    </div>
    <button class="btn" onclick="closeOverlay()">終了</button>`;
}

// ===== Service Worker =====
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('./service-worker.js')
    .then(()=>console.log('✅ Service Worker registered'))
    .catch(err=>console.error('SW failed:',err));
  });
}
