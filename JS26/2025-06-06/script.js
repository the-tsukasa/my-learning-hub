// レシートのオブジェクトを考える
const shopInformation = {
  name: "千代田店",
  address: "東京都千代田区千代田区2番町8-8",
  phone: "03-1234-5678",
};

console.log("店舗名:", shopInformation.name);

const items = [
  {
    name: "手巻きおにぎり辛子明太子",
    price: 130,
  },
  {
    name: "コカ・コーラ500ml",
    price: 140,
  },
];

let sum = 0;
items.forEach(function (item) {
  sum += item.price;
});

console.log(`小計(税抜き 8%): ${sum}円`);

// zozotown
const products = [
  {
    brand: "Dita",
    category: "浴衣",
    price: 15990,
    color: "全20色",
  },
  {
    brand: "OOFOS",
    category: "サンダル",
    price: 8580,
    color: "全3色",
  },
];

const uvCareProducts = products.filter(function (product) {
  return product.category === "日焼け止め/UVケア";
});

const categories = [
  {
    name: "トップス",
    subCategories: [
      {
        name: "Tシャツ/カットソー",
      },
      {
        name: "シャツ/ブラウス",
      },
    ],
  },
];
