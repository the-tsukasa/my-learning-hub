console.log('こんにちは');
console.log("こんにちは");

const hoge = 'hogehoge';
let fuga = 'fugagua';

// hoge = 'hoge2';
fuga = 'fuga2';

console.log(hoge, fuga);

// fuga = 'fuga3';

if (fuga == 'fuga2') {
  console.log('trueです');
} else {
  console.log('falseです');
}

const num1 = 10;

// === は型も比較する　← こっちを使う
if (num1 === Number('10')) {
  console.log('trueです1');
}
// == は型を無視して比較する
if (num1 == '10') {
  console.log('trueです2');
}

// 型の変換
console.log('文字列から数値にする', Number('10.5'));
console.log('整数への変換', Number.parseInt('10.5'));
console.log('少数への変換', Number.parseFloat('10.5'));

const num2 = 10.5;
console.log('数値から文字列', num2.toString() === '10.5');

// AND / OR
// 現在の秒数を取得
const second = new Date().getSeconds();
console.log('現在の秒数は' + second + 'です');
// 変数展開
console.log(`現在の秒数は${second}です`);

// TODO: 三項演算子で書いてみる
if (second % 10 === 0) {
  console.log('10の倍数です');
} else {
  console.log('10の倍数ではありません');
}

// 三項演算子
// 条件 ? trueの時の処理 : falseの時の処理
console.log(
  second % 10 === 0
    ? '10の倍数です'
    : '10の倍数ではありません'
);

if (second % 2 === 0 && second % 3 === 0) {
  console.log('2の倍数かつ3の倍数です');
}
if (second % 2 !== 0 || second % 3 !== 0) {
  console.log('2の倍数または3の倍数ではありません');
}

// while / for
let count = 0;
while (count < 5) {
  console.log(`count: ${count}`);
  count++;
}

for (let i = 0; i < 5; i++) {
  console.log(`i: ${i}`);
}
