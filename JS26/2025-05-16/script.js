// 150万円を貯金するのに必要な月数
// 初任給20万円
// 月に給料の10%を貯金する
// 毎年10%ずつ給料が上がる
const goal = 1500000;
let savings = 0;
let salary = 200000;
let months = 0;

while (savings < goal) {
  months++;

  // 給料の10%を貯金する
  savings += salary * 0.1;

  // 毎年10%ずつ給料が上がる
  if (months % 12 === 0) {
    salary *= 1.1;
  }
}

console.log(`${goal.toLocaleString()}円貯金するのに${months}ヶ月かかります`);

const sampleArray = ["河西", "杉山", "近藤"];

console.log(sampleArray[1]);
console.log("配列の長さ", sampleArray.length);

// 配列に要素の追加
sampleArray.push("中川");

// TODO: for 文を使って配列の中身を全部出力しよう
for (let i = 0; i < sampleArray.length; i++) {
  console.log(sampleArray[i]);
}

// チンチロリンシミュレーター
// 1〜6のサイコロを2個振る
const dice1 = Math.floor(Math.random() * 6) + 1;
const dice2 = Math.floor(Math.random() * 6) + 1;

// 1のゾロ目が出たら倍量・無料
// 他のゾロ目が通常のジョッキ・無料

console.log(`サイコロ1: ${dice1}`);
console.log(`サイコロ2: ${dice2}`);
console.log("飲み物の量: ");
console.log("料金: ");

// コクーンタワーエレベーター判定プログラム
// 教職員用は全部止まる
// 緑：2, 4, 6  ... 30階に止まる
// 青: 2, 4, 24 ... 36階
// 赤: 2, 4, 30 ... 45階
for (let floor = -3; floor <= 50; floor++) {
  // 地下〇〇階みたいな表示にしたい
  // console.logの 赤・青・緑 に色をつけたい
  console.log(`${floor}階 教職員用エレベーター`);
}
