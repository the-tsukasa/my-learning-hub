const ojisanImg = document.querySelector(".ojisan");
// ojisanImg.src = "./images/gameover.png";

const timeElement = document.querySelector(".time");
let time = Number(timeElement.textContent);

// 1000ミリ秒ごとに実行される関数
const timer = setInterval(() => {
  time--;

  if (time === 0) {
    alert("ゲームオーバー");
    // ページを更新させる
    window.location.reload();
  }

  timeElement.textContent = time;
}, 1000);

const btnList = document.querySelectorAll(".btn");

// 1~5のランダムな数字を生成
const gameOverNumber = Math.floor(Math.random() * btnList.length) + 1;
console.log("gameOverNumber", gameOverNumber);

btnList.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    // event.target イベントが発生した要素
    // console.log(event.target);
    const btnText = event.target.textContent;
    console.log(`${btnText} ボタン押されたよ`);
    event.target.disabled = true;

    if (btnText === gameOverNumber.toString()) {
      clearInterval(timer);
      ojisanImg.src = "./images/gameover.png";
    }
  });
});
