function success(pos) { // 위치 정보를 가져오는데 성공했을 때 호출되는 콜백 함수 (pos : 위치 정보 객체)
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    console.log(`현위치 : ${lat}, ${lng}`);
    this.map.setCenter([lng,lat])
}

function fail(err) { // 위치 정보를 가져오는데 실패했을 때 호출되는 콜백 함수
    alert('현위치를 찾을 수 없습니다.');
}

document.getElementById("main-view-side-btn-location").onclick = function () { userLocation() };
document.getElementById("main-view-side-btn-compass").onclick = function () { userRotation() };

function userLocation() {
    navigator.geolocation.getCurrentPosition(success, fail);

}

function userRotation() {
    this.map.setBearing(0)
}