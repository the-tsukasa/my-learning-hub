console.log('Hello World3!');

// 文字列はシングルクォーテーションか、
// ダブルクォーテーションで囲む
// （違いなし）
console.log('hogehoge');
console.log("hogehoge");

// 数字はそのまま書ける
console.log(100);
console.log(100 + 200);
// TODO: 引き算、掛け算・割り算も書いてみて
console.log(100 - 50);
console.log(100 * 2);
console.log(100 / 2);

// セミコロンはなくても動くけど、
// 付けよう
console.log(100 ** 2)
console.log(100 % 3)

const a = 100;
let b = 200;
var c = 300;

// d = 100; エラーになるよ
// a = 200; const は再代入できない
b = 500; // let は再代入できる
c = 800; // var は再代入できる

if (true) {
  const e = 'hoge'; // if 文の外で使えない
  let f = 'fuga'; // if 文の外で使えない
  var g = 'piyo'; // if 文の外でも使える
}
// console.log(e); エラーになる
// console.log(f); // エラーになる
console.log(g);

// 基本的に const / let を使う
// 再代入が不要な場合は const を使う
// var は使わない

