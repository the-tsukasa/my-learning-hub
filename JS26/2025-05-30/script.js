// TODO: 引数の文字列が電話番号かBooleanで返す関数
function isPhoneNumber(num) {
  // ^: 文字列の先頭
  // \d: 数字
  // {10,11}: 10か11文字
  // $: 文字列の末尾
  const regex = /^\d{10,11}$/;
  return regex.test(num);
}

console.log(isPhoneNumber("09012341234")); // true
console.log(isPhoneNumber("0120444444")); // true
console.log(isPhoneNumber("090123412345")); //false
console.log(isPhoneNumber("abcd")); // false
console.log(isPhoneNumber("abcabcdabcd")); // false

const phoneNumbers = [
  "09012341234",
  "0120444444",
  "090123412345",
  "abcd",
  "abcabcdabcd",
  "090-1234-5678",
  "0120-117-117",
  "090-1234-12345",
];

// map: 配列の各要素を処理して、新しい配列を作成する
phoneNumbers
  .map((phoneNumber) => phoneNumber.replaceAll("-", ""))
  .filter(isPhoneNumber)
  .forEach((phoneNumber) => {
    console.log(phoneNumber);
  });

// オブジェクト
const profile = {
  name: "こんどう",
  age: 32,
  favoriteFoods: ["すし", "メロン", "トマト"],
};
console.log(profile.name);
profile.favoriteFoods.forEach((food) => {
  console.log(food);
});
profile.name = "すぎやま";
console.log(profile.name);
const { age, favoriteFoods: daisukiTabemono } = profile;
console.log(age);
console.log(daisukiTabemono);

const student = {
  name: "こんどう",
  number: 10,
  subjects: [
    {
      name: "JS26",
      attendanceRate: 90, // 出席率
      grade: "5A", // 評価
    },
    {
      name: "JV27",
      attendanceRate: 80,
      grade: "5B",
    },
  ],
};

// 出席率が90%以上の科目を抽出したい
const { subjects } = student;
subjects
  .filter(({ attendanceRate }) => attendanceRate >= 90)
  .forEach(({ name, attendanceRate }) => {
    console.log(`${name} ${attendanceRate}%`);
  });
