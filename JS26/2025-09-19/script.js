// Cat & Dog API ビューア

const API_BASES = {
  cat: "https://api.thecatapi.com/v1",
  dog: "https://api.thedogapi.com/v1"
};

let state = {
  animal: "cat",
  apiKey: "",
  page: 0,
  limit: 6,
  breedId: "",
  showFavoritesOnly: false,
};

const apiKeyInput = document.getElementById("apiKey");
const saveKeyBtn = document.getElementById("saveKeyBtn");
const animalSelect = document.getElementById("animalSelect");
const breedSelect = document.getElementById("breedSelect");
const limitSelect = document.getElementById("limitSelect");
const fetchBtn = document.getElementById("fetchBtn");
const moreBtn = document.getElementById("moreBtn");
const showFavBtn = document.getElementById("showFavBtn");
const clearFavBtn = document.getElementById("clearFavBtn");
const gallery = document.getElementById("gallery");
const statusBox = document.getElementById("statusBox");
const cardTpl = document.getElementById("cardTpl");

const LS_KEYS = { API_KEY: "animal_api_key", FAVS: "animal_favorites" };

// お気に入り関連
const getFavs = () => JSON.parse(localStorage.getItem(LS_KEYS.FAVS) || "[]");
const setFavs = (arr) => localStorage.setItem(LS_KEYS.FAVS, JSON.stringify(arr));
const isFaved = (item) => getFavs().some(x => x.id === item.id && x.animal === item.animal);
const toggleFav = (item) => {
  const favs = getFavs();
  const idx = favs.findIndex(x => x.id === item.id && x.animal === item.animal);
  if (idx >= 0) favs.splice(idx, 1);
  else favs.unshift(item);
  setFavs(favs);
};

// API GET
async function apiGet(path, params = {}) {
  const base = API_BASES[state.animal];
  const url = new URL(base + path);
  Object.entries(params).forEach(([k,v]) => v && url.searchParams.set(k,v));
  const headers = {};
  if (state.apiKey) headers["x-api-key"] = state.apiKey;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

// ステータス
function setStatus(msg) { statusBox.textContent = msg; }

// カード作成
function createCard(item) {
  const node = cardTpl.content.firstElementChild.cloneNode(true);
  const img = node.querySelector("img");
  const favBtn = node.querySelector(".favBtn");
  const link = node.querySelector("a");
  img.src = item.url;
  link.href = item.url;
  favBtn.textContent = isFaved(item) ? "お気に入り済" : "お気に入り";
  favBtn.onclick = () => {
    toggleFav(item);
    favBtn.textContent = isFaved(item) ? "お気に入り済" : "お気に入り";
    if (state.showFavoritesOnly) renderFavs();
  };
  return node;
}

// 表示
function clearGallery() { gallery.innerHTML = ""; }
function render(items, append=false) {
  if (!append) clearGallery();
  items.forEach(it => gallery.appendChild(createCard(it)));
  setStatus(`${items.length} 件取得`);
}
function renderFavs() {
  clearGallery();
  const favs = getFavs();
  favs.forEach(it => gallery.appendChild(createCard(it)));
  setStatus(`お気に入り ${favs.length} 件`);
}

// 品種取得
async function loadBreeds() {
  const breeds = await apiGet("/breeds");
  breedSelect.innerHTML = "<option value=''>任意</option>";
  breeds.forEach(b=>{
    const opt=document.createElement("option");
    opt.value=b.id;
    opt.textContent=b.name;
    breedSelect.appendChild(opt);
  });
}

// 画像取得
async function loadImages({append=false}={}) {
  const params={ limit: state.limit, page: state.page, breed_ids: state.breedId||undefined };
  const data = await apiGet("/images/search", params);
  const items=data.map(d=>({id:d.id,url:d.url,animal:state.animal}));
  render(items, append);
}

// イベント
saveKeyBtn.onclick = ()=>{ state.apiKey=apiKeyInput.value.trim(); localStorage.setItem(LS_KEYS.API_KEY,state.apiKey); };
animalSelect.onchange = ()=>{ state.animal=animalSelect.value; loadBreeds(); loadImages(); };
limitSelect.onchange = ()=> state.limit=Number(limitSelect.value);
breedSelect.onchange = ()=> state.breedId=breedSelect.value;
fetchBtn.onclick = ()=>{ state.page=0; state.showFavoritesOnly=false; loadImages(); };
moreBtn.onclick = ()=>{ if(state.showFavoritesOnly)return; state.page++; loadImages({append:true}); };
showFavBtn.onclick = ()=>{ state.showFavoritesOnly=true; renderFavs(); };
clearFavBtn.onclick = ()=>{ setFavs([]); renderFavs(); };

// 初期化
(function init(){
  state.apiKey=localStorage.getItem(LS_KEYS.API_KEY)||"";
  apiKeyInput.value=state.apiKey;
  loadBreeds().then(loadImages);
})();
