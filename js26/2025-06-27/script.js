const submitButton = document.querySelector('input[type="submit"]');
const inputName = document.querySelector('input[name="name"]');
const errorName = document.querySelector(".name-error");
const inputEmail = document.querySelector('input[name="email"]');
const errorEmail = document.querySelector(".email-error");

const selectPlan = document.querySelector('select[name="plan"]');
const errorPlan = document.querySelector(".plan-error");

const inputPayment = document.querySelectorAll('input[name="payment"]');
const errorPayment = document.querySelector(".payment-error");

const checkAgreement = document.querySelectorAll('input[name="agreement"]');
const errorAgreement = document.querySelector(".agreement-error");

submitButton.addEventListener("click", (event) => {
  if (inputName.value === "") {
    errorName.style.display = "block";
    errorName.innerHTML = "名前を入力してください";
    // ボタンが押されたイベントを中断する
    event.preventDefault();
  }

  if (inputEmail.value === "") {
    errorEmail.style.display = "block";
    errorEmail.innerHTML = "メールアドレスを入力してください";
    event.preventDefault();
  }

  if (!inputEmail.value.match(/.+@.+\..+/)) {
    errorEmail.style.display = "block";
    errorEmail.innerHTML = "メールアドレスのフォーマットが間違えています";
    event.preventDefault();
  }

  if (selectPlan.value === "") {
    errorPlan.style.display = "block";
    errorPlan.innerHTML = "プランを選択してください";
    event.preventDefault();
  }

  if (document.querySelector('input[name="payment"]:checked') === null) {
    errorPayment.style.display = "block";
    errorPayment.innerHTML = "お支払い方法を選択してください";
    event.preventDefault();
  }

  if (
    document.querySelectorAll('input[name="agreement"]:checked').length !== 2
  ) {
    errorAgreement.style.display = "block";
    errorAgreement.innerHTML = "どちらもチェックしてください";
    event.preventDefault();
  }
});

inputName.addEventListener("input", (e) => {
  errorName.style.display = "none";

  // event.target イベントが起こった要素（inputタグ）
  // event.target.value inputタグに入力された値
  if (e.target.value === "") {
    errorName.style.display = "block";
    errorName.innerHTML = "名前を入力してください";
  }
});

inputEmail.addEventListener("input", (e) => {
  errorEmail.style.display = "none";

  if (e.target.value === "") {
    errorEmail.style.display = "block";
    errorEmail.innerHTML = "メールアドレスを入力してください";
  }

  // 正規表現（文字列検索）
  // 「.」任意の一文字
  // 「+」1文字以上の繰り返し
  // 「\」エスケープ（ドットを普通の文字とみなす）
  if (!e.target.value.match(/.+@.+\..+/)) {
    errorEmail.style.display = "block";
    errorEmail.innerHTML = "メールアドレスのフォーマットが間違えています";
  }
});

selectPlan.addEventListener("change", (e) => {
  errorPlan.style.display = "none";

  if (e.target.value === "") {
    errorPlan.style.display = "block";
    errorPlan.innerHTML = "プランを選択してください";
  }
});

inputPayment.forEach((element) => {
  element.addEventListener("change", () => {
    errorPayment.style.display = "none";
  });
});

checkAgreement.forEach((element) => {
  element.addEventListener("change", (event) => {
    if (
      document.querySelectorAll('input[name="agreement"]:checked').length === 2
    ) {
      errorAgreement.style.display = "none";
    }

    // チェックが外れたらエラー
    if (!event.target.checked) {
      errorAgreement.style.display = "block";
      errorAgreement.innerHTML = "どちらもチェックしてください";
    }
  });
});
