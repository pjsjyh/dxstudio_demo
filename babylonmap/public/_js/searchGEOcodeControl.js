const apiKey =
  "AAPK8cfa151f3d13466ea5609c005309d321cBMxTI9_jMHazzvGP_6FGDN-TygEuFDvNH-FsW7W2Fyg0m-4Csrur08NTOGEpy3e";
function geoChangeCode(e) {
  if (e.keyCode == 13) {
    const query = document.getElementById(
      "main-view-side-btn-search-input"
    ).value;

    geoChangefun(query);
  }
}

function geoChangefun(q) {
  const authentication = arcgisRest.ApiKeyManager.fromKey(apiKey);
  q = $("#main-view-side-btn-search-input").val();
  //console.log(q);

  let url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
    q
  )}`;

  $.ajax({
    url: url,
    method: "GET",
    headers: {
      Authorization: "KakaoAK 79eda16c9171fc26b435b70bf6d787e9",
    },
    success: function (data) {
      // 성공 시 처리 로직을 여기에 추가
      map.panTo([
        parseFloat(data.documents[0].x),
        parseFloat(data.documents[0].y),
      ]);
    },
    error: function (error) {
      // 에러 발생 시 처리 로직을 여기에 추가
      console.error(error);
    },
  });
}

function geoGetGPS(q, geofun) {
  let url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
    q
  )}`;

  $.ajax({
    url: url,
    method: "GET",
    headers: {
      Authorization: "KakaoAK 79eda16c9171fc26b435b70bf6d787e9",
    },
    success: function (data) {
      // 성공 시 처리 로직을 여기에 추가
      try {
        parseFloat(data.documents[0].x);
      } catch {
        return geofun([0, 0], "error");
      }

      return geofun(
        [parseFloat(data.documents[0].x), parseFloat(data.documents[0].y)],
        null
      );
    },
    error: function (error) {
      // 에러 발생 시 처리 로직을 여기에 추가
      console.error("geoGPS error", error.status);
      return geofun([0, 0], error.status);
    },
  });
  //geo => GPS 좌표, 위도 경도 알아내기
  //   const authentication = arcgisRest.ApiKeyManager.fromKey(apiKey);
  //   arcgisRest
  //     .geocode({
  //       singleLine: q,
  //       authentication,
  //       params: {
  //         location: map.getCenter().toArray().join(","), // center of map as longitude,latitude
  //         outFields: "*", // return all fields
  //       },
  //     })
  //     .then((response) => {
  //       const result = response.candidates[0];
  //       if (!result) {
  //         alert("That query didn't match any geocoding results.");
  //         return;
  //       }
  //       const lngLat = [result.location.x, result.location.y];
  //       //console.log(result);
  //       return geofun(result);
  //     })
  //     .catch((error) => {
  //       alert(
  //         "There was a problem using the geocoder. See the console for details."
  //       );
  //       console.error(error);
  //     });
}
function geoGetAddress(longitude, latitude, geofun) {
  //역geo => 주소알아내기
  let url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`;

  $.ajax({
    url: url,
    method: "GET",
    headers: {
      Authorization: "KakaoAK 79eda16c9171fc26b435b70bf6d787e9",
    },
    success: function (data) {
      // 성공 시 처리 로직을 여기에 추가
      if (data.documents.length != 0) {
        let address = data.documents[0].address.address_name;
        return geofun(address);
      }
    },
    error: function (error) {
      // 에러 발생 시 처리 로직을 여기에 추가
      console.error(error);
    },
  });
}
function changeDotCoordinates(newCoordinates) {
  pulsingDot.setCoordinates(newCoordinates);

  changeCoordinates(newCoordinates);
}
function changeCoordinates(newCoordinates) {
  let centers = newCoordinates;
  //console.log("d:", centers)

  // 변경된 좌표로 소스 업데이트
  map.getSource("points").setData({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: centers, // 변경된 좌표 값
        },
      },
    ],
  });
  //console.log("dd", map.getSource('points')._data.features[0].geometry.coordinates)
}
