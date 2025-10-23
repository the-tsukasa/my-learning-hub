// jQueryとは、JavaScriptを簡単に書けるようにするライブラリ。
// 特徴: DOM操作、アニメーション、イベント処理、Ajax通信を短いコードで実現できます。

// DOM読み込み前の処理
alert("はじまるよ");

// JSで「はじめます」を表示（要素が存在する場合のみ）
const msg = document.getElementById("message");
if (msg) {
  msg.textContent = "JavaScript:はじめます";
}

// バニラJSでDOM読み込み完了時
document.addEventListener("DOMContentLoaded", function () {
  alert("バニラJS：DOM読み込み完了！");
});

// jQueryでDOM読み込み完了時（1回だけ）
$(function () {
  alert("jQuery：DOM読み込み完了！");
});

// 質問：JavaScript と   バニラJS　   とjQuery      関係
// 　　　言語そのもの/純粋なJavaScript/JSのライブラリ

//質問②：なぜDOM読み込み前の処理するのか？
//　　　HTMLの要素がまだ読み込まれていない状態でJSが実行されると、
//　　　要素を操作しようとしても存在しないためエラーになる可能性があるから。

//質問③：jQueryの$とは？
//　　　jQueryのエイリアス（別名）で、jQuery関数を簡潔に呼び出すためのシンボル。