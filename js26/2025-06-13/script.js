// ブラウザ全般の操作
console.log(window);

// HTML関係の操作
console.log(document);

// window.open("https://hal.ac.jp/tokyo");
// window.print();
// 横に500px, 縦に700pxスクロール
// window.scrollTo(500, 700);

console.log(document.body);
// h1タグが取得できるはずなんだけど、nullになる
console.log(document.querySelector("h1"));

// クリックされたら実行される関数
// イベントリスナー、イベントハンドラー
window.addEventListener("click", () => {
  console.log("クリック！");
});

// DOM（HTML）が読み込まれたら実行される関数
// JSからHTMLを操作する場合は
// 読み込まれるのを待たないといけない
window.addEventListener("DOMContentLoaded", () => {
  window.console.log(document.querySelector("h1"));
});

const h1 = window.document.querySelector("h1");
h1.style.color = "orange";
// 複数単語のプロパティはキャメルケース
h1.style.fontSize = "30px";
h1.style.border = "1px solid #ccc";
h1.textContent = "夏にやりたいこと";

const liList = document.querySelectorAll("li");
liList.forEach((li) => {
  li.style.color = "green";
});

// 「.」はクラス名で取得
const birthday = document.querySelector(".birthday");
birthday.style.color = "red";

// 「#」はIDで取得
const festival = document.querySelector("#festival");
festival.style.color = "blue";
