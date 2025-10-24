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

// ===== 光粒入場アニメーション =====
function spawnParticles() {
  const wrap = document.getElementById('entryWrap');
  if (!wrap) return;
  wrap.querySelectorAll('.pt').forEach(n => n.remove());

  for (let i = 0; i < 60; i++) {
    const s = document.createElement('span');
    s.className = 'pt';
    const sx = (Math.random() * -100 - 50) + 'px';
    const sy = (Math.random() * 120 - 60) + 'px';
    const ex = (Math.random() * 300 + 100) + 'px';
    const ey = (Math.random() * 120 - 60) + 'px';
    s.style.setProperty('--sx', sx);
    s.style.setProperty('--sy', sy);
    s.style.setProperty('--ex', ex);
    s.style.setProperty('--ey', ey);
    s.style.left = '50%';
    s.style.top = '50%';
    s.style.animationDelay = (Math.random() * 1.2).toFixed(2) + 's';
    s.style.opacity = 0.6 + Math.random() * 0.4;
    wrap.appendChild(s);
  }
}

function startEntryAnim() {
  const entryAnim = document.getElementById('entryAnim');
  entryAnim.classList.add('show');
  spawnParticles();
  const text = document.getElementById('entryText');
  text.textContent = '共感チャンネルを接続中…';

  setTimeout(() => {
    text.textContent = '波長を同調中…';
  }, 1200);

  setTimeout(() => {
    text.textContent = 'エネルギー同期完了';
    finishEntry();
  }, 2400);
}

function startSync(){
  const name = (nickInput.value || '').trim() || seedNames[Math.floor(Math.random()*seedNames.length)];
  localStorage.setItem('vib_name', name);
  nameScreen.classList.add('hide');
  startEntryAnim(); // ← 新动画启动
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

// ===== Radar Simulation (Enhanced) =====
const radarZone = document.getElementById('radarZone');

function scanRadar() {
  radarZone.innerHTML = '';
  const count = Math.floor(3 + Math.random() * 3); // 3〜5人
  for (let i = 0; i < count; i++) {
    setTimeout(() => spawnTarget(i), i * 600); // 依次生成
  }
  pushHistory('スキャン完了。' + count + '人の波長を検出しました。');
}

function spawnTarget(index) {
  const iconList = ['🧑‍🚀','🧑‍🎤','🧑‍💻','🧑‍🔬','🧑‍🎨','🧑‍🚴','🧘','🧑‍🍳'];
  const icon = iconList[Math.floor(Math.random()*iconList.length)];
  const el = document.createElement('div');
  el.className = 'target';
  el.textContent = icon;

  const angle = Math.random() * 360;
  const distance = 90 + Math.random() * 50; // 外側から内側へ
  const rad = angle * Math.PI / 180;

  // 初始位置
  el.style.left = `calc(50% + ${Math.cos(rad) * distance}px)`;
  el.style.top  = `calc(50% + ${Math.sin(rad) * distance}px)`;
  radarZone.appendChild(el);

  // 动画延迟（滑入 + 停留 + 消失）
  el.animate([
    { transform: 'scale(0)', opacity: 0 },
    { transform: 'scale(1.2)', opacity: 1, offset: 0.3 },
    { transform: 'scale(1)', opacity: 1, offset: 0.7 },
    { transform: 'scale(0.5)', opacity: 0 }
  ], {
    duration: 3000 + Math.random() * 1000,
    easing: 'ease-in-out',
    fill: 'forwards'
  });

  // 点消失后随机触发共鸣
  setTimeout(() => {
    if (Math.random() < 0.4) simulateEncounter();
  }, 2500 + Math.random() * 800);
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
