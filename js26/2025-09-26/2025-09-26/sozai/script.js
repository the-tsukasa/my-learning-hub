import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let scene = null;
let camera = null;
let renderer = null;

let mixer = null; // アニメーション管理用
let actions = {}; // アニメーションを入れておく箱
let currentAction = null; // 今再生中のアニメーション

let character = null; // モデル（キャラ）
let keyCode = null; // 押されているキーの状態

const clock = new THREE.Clock(); // アニメーション用の時計

init();
animate();

function init() {
  // シーン全体
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcfcfcf); // TODO: 背景色を変えてみよう

  // カメラ
  camera = new THREE.PerspectiveCamera(
    60, // TODO: 視野角を変えてみよう
    window.innerWidth / window.innerHeight, // アスペクト比
    0.1,
    1000
  );

  // カメラ位置 (x, y, z)
  // TODO: カメラ位置を変えてみよう
  camera.position.set(0, 2, 5);

  // レンダラー
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // body に追加
  document.body.appendChild(renderer.domElement);

  // ライト
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1); // 空と地面からの光
  // ライト位置
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  // 床の模様
  const texture = new THREE.TextureLoader().load(
    "https://threejs.org/examples/textures/checker.png" // TODO: 床のテクスチャを変えてみよう
  );
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(40, 40); // TODO: 模様の細かさ（数字を変えてみよう）

  // 床
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200), // TODO: 床の大きさ（変えてみよう）
    new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide })
  );
  ground.rotation.x = -Math.PI / 2; // 横倒しにして床にする
  scene.add(ground);

  // カメラをマウスで動かせるように
  new OrbitControls(camera, renderer.domElement);
}

// 毎フレーム呼ばれる処理
function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  if (mixer) {
    mixer.update(delta); // キャラのアニメーションを進める
  }

  const moveSpeed = 4 * delta; // 前後移動スピード
  const rotSpeed = 2 * delta; // 回転スピード
  let moving = false; // 移動中かどうか

  // 描画
  renderer.render(scene, camera);
}
