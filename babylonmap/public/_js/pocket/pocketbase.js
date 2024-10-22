//getMapData()

function getMapData(dataUrl, id_data, callbackFunc) {
  //dataUrl = DataCollection 이름 , id_data = id값 , callbackFunc = 콜백 함수 (동기처리)
  // API 엔드포인트 URL
  //let apiUrl = 'http://192.168.0.55:8090/api/collections/mapJson/records';
  let apiUrl =
    "http://192.168.0.55:8090/api/collections/" +
    dataUrl +
    "/records" +
    id_data;

  // GET 요청 보내기
  $.get(apiUrl, function (data) {
    // 요청이 성공적으로 완료됐을 때
    // console.log(data);
    return callbackFunc(data);
    console.log(data.items[0]);
    document.getElementById("gizmo-btn-select-img").src =
      "./img/marker/" + data.items[0].Textfont;
  }).fail(function (xhr, status, error) {
    // 요청이 실패했을 때
    console.error("Request failed. Status:", status);
  });
}

function mapDataSave(title_, mapData_json) {
  let apiUrl = "http://192.168.0.55:8090/api/collections/mapJson/records";
  let dd = {
    title: "test",
    mapData: {},
  };

  const dataToSend = {
    title: title_,
    mapData: mapData_json,
  };

  // 데이터를 JSON 형태로 변환
  const jsonData = JSON.stringify(dataToSend);

  // fetch를 사용하여 POST 요청 보내기
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // 성공적으로 응답을 받았을 때의 작업
      console.log("API 응답:", data);
    })
    .catch((error) => {
      // 요청이 실패하거나 에러가 발생했을 때의 처리
      console.error("There was a problem with the fetch operation:", error);
    });
}
function modelinfo(name, type, obj_count, zoom) {
  let apiUrl = "http://192.168.0.55:8090/api/collections/Model_info/records";
  let dd = {
    name: "test",
    type: "sensor",
    obj_count: 0,
    zoom: 0,
  };
}
