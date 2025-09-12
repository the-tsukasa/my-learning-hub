// HTML要素を取得する
const dialog = document.querySelector("dialog");
const itemsElement = document.querySelector(".items");
const cartElement = document.querySelector(".cart");
const nameElement = document.querySelector(".selected-name");
const priceElement = document.querySelector(".selected-price");
const cartButtonElement = document.querySelector(".cart-button");
const totalPriceElement = document.querySelector(".total");
const clearButtonElement = document.querySelector(".clear-button");

const items = [
  {
    id: 1,
    name: "ハンバーガー",
    price: 200,
  },
  {
    id: 2,
    name: "ポテト",
    price: 300,
  },
  {
    id: 3,
    name: "コーラ",
    price: 150,
  },
];

// 選択された商品を格納する
let selectedItem = null;

items.forEach((item) => {
  // 商品の要素を作成
  const itemElement = document.createElement("div");
  itemElement.innerHTML = `${item.name} ${item.price}円`;
  itemElement.classList.add("item");
  // 作成した要素を商品一覧に追加
  itemsElement.appendChild(itemElement);

  itemElement.addEventListener("click", () => {
    dialog.showModal();
    nameElement.innerHTML = item.name;
    priceElement.innerHTML = item.price;
    selectedItem = item;
  });
});

// カートに追加ボタン
cartButtonElement.addEventListener("click", () => {
  const cartItemElement = document.createElement("div");
  cartItemElement.innerHTML = `${selectedItem.name}`;
  cartItemElement.classList.add("item");
  cartElement.appendChild(cartItemElement);

  // TODO: カートに入れた商品の合計金額を表示する
});

// TODO: カートの中身を空にする、合計金額も0円にする
clearButtonElement.addEventListener("click", () => {
  cartElement.innerHTML = "";
});

// TODO: カートに入れるときに個数を選べるようにする
// TODO: トッピングやサイズを選べるようにしたい
