// ====================== Radar with Avatar Targets ======================
const radarZone = document.getElementById('radarZone');
const encounterZone = document.getElementById('encounterZone');

// 模拟头像数据（可替换为真实 API 返回）
const avatars = [
  "https://i.pravatar.cc/100?img=3",
  "https://i.pravatar.cc/100?img=5",
  "https://i.pravatar.cc/100?img=7",
  "https://i.pravatar.cc/100?img=9",
  "https://i.pravatar.cc/100?img=11",
  "https://i.pravatar.cc/100?img=15",
  "https://i.pravatar.cc/100?img=17",
  "https://i.pravatar.cc/100?img=20"
];

// 扫描按钮触发
function scanRadar() {
  radarZone.innerHTML = '';
  encounterZone.innerHTML = '';
  const count = Math.floor(3 + Math.random() * 3); // 3〜5人

  for (let i = 0; i < count; i++) {
    setTimeout(() => spawnAvatar(i), i * 500);
  }

  setTimeout(() => {
    encounterZone.innerHTML = `<div class="muted">${count}人の波長を検出しました。</div>`;
  }, count * 500 + 1200);
}

// 生成头像点
function spawnAvatar(index) {
  const el = document.createElement('div');
  el.className = 'avatar-target';
  const img = document.createElement('img');
  img.src = avatars[Math.floor(Math.random() * avatars.length)];
  el.appendChild(img);

  // 随机分布在雷达圆内
  const angle = Math.random() * 360;
  const distance = 60 + Math.random() * 80;
  const rad = angle * Math.PI / 180;
  el.style.left = `calc(50% + ${Math.cos(rad) * distance - 20}px)`; // 40px / 2 修正偏移
  el.style.top  = `calc(50% + ${Math.sin(rad) * distance - 20}px)`;

  radarZone.appendChild(el);

  // 3秒后随机触发共鸣
  setTimeout(() => {
    if (Math.random() < 0.3) simulateEncounter(img.src);
  }, 3000 + Math.random() * 800);
}

// 模拟すれ違い
function simulateEncounter(src = "https://i.pravatar.cc/100?img=3") {
  encounterZone.innerHTML = `
    <div class="card" style="text-align:center">
      <img src="${src}" style="width:60px;height:60px;border-radius:50%;box-shadow:0 0 15px rgba(102,227,255,.5);">
      <div>共鳴リンクが発生しました！</div>
      <div class="muted">${new Date().toLocaleTimeString('ja-JP')}</div>
    </div>
  `;
}
