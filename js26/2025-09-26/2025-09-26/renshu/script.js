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

  // 1. モデル読み込み
  const loader = new GLTFLoader();
  loader.load("Soldier.glb", (gltf) => {
    character = gltf.scene;
    character.scale.set(1, 1, 1); // ← キャラの大きさ（変えてみよう）
    scene.add(character);

    // 2. アニメーション管理
    mixer = new THREE.AnimationMixer(character);
    gltf.animations.forEach((clip) => {
      actions[clip.name] = mixer.clipAction(clip);
    });
    console.log(actions);
    playAction("Idle");
  });

  // 4. キー入力
  window.addEventListener("keydown", (e) => {
    console.log(e.code);
    keyCode = e.code;
  });
  window.addEventListener("keyup", (e) => {
    keyCode = null;
  });
}

// 3. アニメーション切り替え
function playAction(name) {
  if (currentAction === actions[name]) {
    return; // すでに再生中なら何もしない
  }
  if (currentAction) {
    currentAction.fadeOut(0.2); // 前のアニメをなめらかに停止
  }
  currentAction = actions[name];
  currentAction.reset().fadeIn(0.2).play(); // 新しいアニメを再生
}

// 毎フレーム呼ばれる処理
function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  if (mixer) {
    mixer.update(delta); // キャラのアニメーションを進める
  }

  const moveSpeed = 4 * delta; // 前後移動スピード
  const rotSpeed = 4 * delta; // 回転スピード
  let moving = false; // 移動中かどうか

  // 5. キャラクター移動
  if (keyCode === "ArrowUp") {
    character.translateZ(-moveSpeed);
    moving = true;
  }
  if (keyCode === "ArrowDown") {
    character.translateZ(moveSpeed);
    moving = true;
  }
  if (keyCode === "ArrowLeft") {
    character.rotation.y += rotSpeed;
    moving = true;
  }
  if (keyCode === "ArrowRight") {
    character.rotation.y -= rotSpeed;
    moving = true;
  }

  // 6. Idle / Run の切り替え
  if (moving) {
    playAction("Run");
  } else {
    playAction("Idle");
  }

  // 7. カメラをキャラの後ろから追従させる
  const camOffset = new THREE.Vector3(0, 2, 5).applyAxisAngle(
    new THREE.Vector3(0, 1, 0),
    character.rotation.y
  );
  camera.position.copy(character.position).add(camOffset);
  camera.lookAt(character.position);

  // 描画
  renderer.render(scene, camera);
}
