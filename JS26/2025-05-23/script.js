function helloWorld(text) {
  return `Hello World ${text}`;
}

const result = helloWorld("JavaScript");
console.log(result);

const helloWorld2 = helloWorld;
console.log(helloWorld2("2"));

// TODO: 引数を2つ受け取って、足し算した結果を返す add 関数
function add(a = 0, b = 0) {
  return a + b;
}
console.log(add(1, 2));
console.log(add(10));

// const add2 = add;
// add2(10, 20);
// function の後に関数名がない（無名関数）
const add2 = (a, b) => a + b;
console.log(add2(10, 20));

function add3() {
  return (a, b) => a + b;
}
console.log(add3()(20, 20));

function add4() {
  function add5(a, b) {
    return a + b;
  }
  return add5;
}
console.log(add4()(20, 20));

function add6(a) {
  return function (b) {
    return a + b;
  };
}

console.log(add6(10)(20));
const add100 = add6(100);
console.log(add100(20));
console.log(add100(40));

function add7(func) {
  return func() + 100;
}
const add8 = add7(() => 10 + 20);
console.log(add8);

const sampleArray = [1, 2, 3, 4, 5];
function twice(element) {
  return element * 2;
}
// map メソッドは引数の関数を実行して、
// 新しい関数を返す
const twiceArray = sampleArray.map(twice);
console.log(twiceArray);
console.log(sampleArray.map((element) => element * 3));

twiceArray.forEach((element, index) => {
  const text = `${index}番目の要素は${element}です`;
  console.log(text);
});
