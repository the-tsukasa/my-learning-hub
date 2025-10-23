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
  favorites: [],
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
function syncFavoritesFromStorage() {
  try {
    const stored = JSON.parse(localStorage.getItem(LS_KEYS.FAVS) || "[]");
    state.favorites = Array.isArray(stored) ? stored : [];
  } catch (err) {
    console.error("Failed to parse favorites", err);
    state.favorites = [];
  }
}

function persistFavorites() {
  localStorage.setItem(LS_KEYS.FAVS, JSON.stringify(state.favorites));
}

function isFaved(item) {
  return state.favorites.some(x => x.id === item.id && x.animal === item.animal);
}

function toggleFav(item) {
  const idx = state.favorites.findIndex(x => x.id === item.id && x.animal === item.animal);
  if (idx >= 0) state.favorites.splice(idx, 1);
  else state.favorites.unshift(item);
  persistFavorites();
}

// API GET
async function apiGet(path, params = {}) {
  const base = API_BASES[state.animal];
  const url = new URL(base + path);
  Object.entries(params).forEach(([key, value]) => value && url.searchParams.set(key, value));
  const headers = {};
  if (state.apiKey) headers["x-api-key"] = state.apiKey;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`API request failed: ${res.status} ${res.statusText} for ${url}`);
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
}
function renderFavs() {
  clearGallery();
  state.favorites.forEach(it => gallery.appendChild(createCard(it)));
  setStatus(`お気に入り ${state.favorites.length} 件`);
}

// 品種取得
async function loadBreeds() {
  try {
    const breeds = await apiGet("/breeds");
    breedSelect.innerHTML = "<option value=''>任意</option>";
    breeds.forEach(b=>{
      const option = document.createElement("option");
      option.value = b.id;
      option.textContent = b.name;
      breedSelect.appendChild(option);
    });
  } catch (err) {
    console.error("Failed to load breeds", err);
    setStatus("品種の取得に失敗しました");
  }
}

// 画像取得
async function loadImages({append=false}={}) {
  setStatus("画像を取得中...");
  try {
    const params={ limit: state.limit, page: state.page, breed_ids: state.breedId||undefined };
    const data = await apiGet("/images/search", params);
    const items = data.map(imageData => ({ id: imageData.id, url: imageData.url, animal: state.animal }));
    render(items, append);
    if (items.length === 0) {
      setStatus("条件に合う画像が見つかりませんでした");
    } else {
      const prefix = append ? "追加で" : "";
      setStatus(`${prefix}${items.length} 件取得`);
    }
  } catch (err) {
    console.error("Failed to load images", err);
    setStatus("画像の取得に失敗しました");
  }
}

// イベント
function handleFetchClick() {
  state.page = 0;
  state.showFavoritesOnly = false;
  loadImages();
}

function handleMoreClick() {
  if (state.showFavoritesOnly) {
    setStatus("お気に入り表示中は追加できません");
    return;
  }
  state.page++;
  loadImages({ append: true });
}

function handleShowFavorites() {
  syncFavoritesFromStorage();
  state.showFavoritesOnly = true;
  renderFavs();
}

function handleClearFavorites() {
  state.showFavoritesOnly = true;
  state.favorites = [];
  persistFavorites();
  renderFavs();
}

function bindEvents() {
  saveKeyBtn.addEventListener("click", () => {
    state.apiKey = apiKeyInput.value.trim();
    localStorage.setItem(LS_KEYS.API_KEY, state.apiKey);
    setStatus("APIキーを保存しました");
  });

  animalSelect.addEventListener("change", () => {
    state.animal = animalSelect.value;
    state.page = 0;
    state.breedId = "";
    state.showFavoritesOnly = false;
    loadBreeds()
      .catch(() => {})
      .finally(() => {
        breedSelect.value = "";
        handleFetchClick();
      });
  });

  limitSelect.addEventListener("change", () => {
    state.limit = Number(limitSelect.value);
    if (!state.showFavoritesOnly) {
      handleFetchClick();
    }
  });

  breedSelect.addEventListener("change", () => {
    state.breedId = breedSelect.value;
    handleFetchClick();
  });

  fetchBtn.addEventListener("click", handleFetchClick);
  moreBtn.addEventListener("click", handleMoreClick);
  showFavBtn.addEventListener("click", handleShowFavorites);
  clearFavBtn.addEventListener("click", handleClearFavorites);
}

// 初期化
async function init() {
  state.apiKey = localStorage.getItem(LS_KEYS.API_KEY) || "";
  apiKeyInput.value = state.apiKey;
  animalSelect.value = state.animal;
  limitSelect.value = String(state.limit);
  syncFavoritesFromStorage();
  bindEvents();
  try {
    await loadBreeds();
  } finally {
    await loadImages();
  }
}

init();
