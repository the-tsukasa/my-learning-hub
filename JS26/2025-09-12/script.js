const mapElement = document.querySelector(".map");
const locationButton = document.querySelector(".get-location-button");
const latInput = document.querySelector(".lat");
const lngInput = document.querySelector(".lng");

const basePosition = {
  lat: 35.690282021452454,
  lng: 139.69161383694552,
};

window.initMap = async function initMap() {
  // Google Map が読み込まれたら実行される
  // async / await を書くと読み込みを待つ
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const map = new Map(mapElement, {
    center: basePosition,
    zoom: 16,
    mapId: "JS26-map",
  });

  // ベース位置のマーカーの作成
  const basePositionMarker = new AdvancedMarkerElement({
    map,
    position: basePosition,
    gmpClickable: true,
  });

  locationButton.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log(lat, lng);
      },
      () => {
        console.log("座標取得に失敗しました");
      }
    );
  });
};
