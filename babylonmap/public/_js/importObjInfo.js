//import 클릭시 호출
function importOBJ() {
  let named_ = null;
  if (clickobjinfo != null) {
    setting_json.name = document.getElementById(
      "editor-modelProperty-name"
    ).value;
    createobject(clickobjinfo.name, setting_json.name);
    completedEventImport();
    handleChange(clickobjinfo.type, true);
  }
}

//실시간(이벤트 작동시) 객체에 값 수정 [인스펙터]
let elements = document.getElementsByClassName("import-Property-toJson");
for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener("input", function () {
    // 이벤트가 발생할 때 수행할 동작을 여기에 작성
    set_import_JSON();
  });
}
document
  .getElementById("editor-modelProperty-JsonEditor-input")
  .addEventListener("input", function () {
    setImportProperty();
    loactionInputSetImport();
  });
//이름 비교 및 같으면 (1)식으로 추가 생성
//값이 없으면 default값으로 import / 1.import후 객체 값 설정 및 화면 이동,
let setting_json = {
  name: "",
  transform: {
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    scale: {
      x: 1,
      y: 1,
      z: 1,
    },
  },
  explane: "",
};

function getImportProperty() {
  //값 객체에 저장
  setting_json.name = document.getElementById(
    "editor-modelProperty-name"
  ).value;
  setting_json.transform.position.x = document.getElementById(
    "transform-import-position_Value_x"
  ).value;
  setting_json.transform.position.y = document.getElementById(
    "transform-import-position_Value_y"
  ).value;
  setting_json.transform.position.z = document.getElementById(
    "transform-import-position_Value_z"
  ).value;
  setting_json.transform.rotation.x = document.getElementById(
    "transform-import-rotation_Value_x"
  ).value;
  setting_json.transform.rotation.y = document.getElementById(
    "transform-import-rotation_Value_y"
  ).value;
  setting_json.transform.rotation.z = document.getElementById(
    "transform-import-rotation_Value_z"
  ).value;
  setting_json.transform.scale.x = document.getElementById(
    "transform-import-scale_Value_x"
  ).value;
  setting_json.transform.scale.y = document.getElementById(
    "transform-import-scale_Value_y"
  ).value;
  setting_json.transform.scale.z = document.getElementById(
    "transform-import-scale_Value_z"
  ).value;
  setting_json.explane = document.getElementById(
    "editor-modelProperty-explanation-input"
  ).value;
}
function setImportProperty() {
  //json입력시 내용 입력
  //이름추가

  let obj_jsonEditorContent = JSON.parse(
    document.getElementById("editor-modelProperty-JsonEditor-input").value
  );
  document.getElementById("editor-modelProperty-name").value =
    obj_jsonEditorContent.name;
  document.getElementById("transform-import-position_Value_x").value =
    obj_jsonEditorContent.transform.position.x;
  document.getElementById("transform-import-position_Value_y").value =
    obj_jsonEditorContent.transform.position.y;
  document.getElementById("transform-import-position_Value_z").value =
    obj_jsonEditorContent.transform.position.z;

  document.getElementById("transform-import-rotation_Value_x").value =
    obj_jsonEditorContent.transform.rotation.x;
  document.getElementById("transform-import-rotation_Value_y").value =
    obj_jsonEditorContent.transform.rotation.y;
  document.getElementById("transform-import-rotation_Value_z").value =
    obj_jsonEditorContent.transform.rotation.z;
  document.getElementById("transform-import-scale_Value_x").value =
    obj_jsonEditorContent.transform.scale.x;
  document.getElementById("transform-import-scale_Value_y").value =
    obj_jsonEditorContent.transform.scale.y;
  document.getElementById("transform-import-scale_Value_z").value =
    obj_jsonEditorContent.transform.scale.z;
  document.getElementById("editor-modelProperty-explanation-input").value =
    obj_jsonEditorContent.explane;
}

document
  .getElementById("transform-import-position_Value_x")
  .addEventListener("input", function () {
    loactionInputSetImport();
  });
document
  .getElementById("transform-import-position_Value_z")
  .addEventListener("input", function () {
    loactionInputSetImport();
  });

//GPS입력시 location 입력되기
function loactionInputSetImport() {
  let gps_location = [
    document.getElementById("transform-import-position_Value_x").value,
    document.getElementById("transform-import-position_Value_z").value,
  ];
  const query = gps_location[0] + "," + gps_location[1];
  geoGetAddress(gps_location[0], gps_location[1], function (e) {
    document.getElementById("transform-import-address").value = e;
  });
} //127.04672,37.73835699999998
function loactionInputGetImport() {
  //주소로 GPS좌표 알기
  const query = document.getElementById("transform-import-address").value;
  geoGetGPS(query, function (e) {
    console.log(e);
    document.getElementById("transform-import-position_Value_x").value = e[0];
    document.getElementById("transform-import-position_Value_z").value = e[1];
    set_import_JSON();
  });
}
function geoGetValueImport(e) {
  //엔터시 위 함수 호출
  if (e.keyCode == 13) {
    loactionInputGetImport();
  }
}

//json 자동동기화
function set_import_JSON() {
  getImportProperty();

  let jsonContents = JSON.stringify(setting_json, null, 2);

  document.getElementById("editor-modelProperty-JsonEditor-input").value =
    jsonContents;
}

//다되면 완료 이벤트
function completedEventImport() {
  $("#main-new-obj-box-import-disable").css("visibility", "visible");
  document.getElementById("main-new-obj-box-import-disable").style.display =
    "flex";
}

//객체 값 설정하기
function setObjImportData() {
  //console.log(setting_json);
  let babylonPos = ToBabylonPos(
    GetMercatorPos([
      setting_json.transform.position.x,
      setting_json.transform.position.z,
    ])
  );

  selectedMesh.model_._absolutePosition._x = babylonPos.x;
  //selectedMesh.model_.position.y = parseFloat(setting_json.transform.position.y);
  selectedMesh.model_.position.y = babylonPos.y;
  selectedMesh.model_._absolutePosition._z = babylonPos.z;
  selectedMesh.model_.rotation.x = degreesToRadians(
    parseFloat(setting_json.transform.rotation.x)
  );
  selectedMesh.model_.rotation.y = degreesToRadians(
    parseFloat(setting_json.transform.rotation.y)
  );
  selectedMesh.model_.rotation.z = degreesToRadians(
    parseFloat(setting_json.transform.rotation.z)
  );

  selectedMesh.model_.scaling.x = parseFloat(setting_json.transform.scale.x);
  selectedMesh.model_.scaling.y = parseFloat(setting_json.transform.scale.y);
  selectedMesh.model_.scaling.z = parseFloat(setting_json.transform.scale.z);
  selectedMesh.explane = setting_json.explane;
}

$(document).ready(function () {
  // 애니메이션이 끝날 때 발생하는 이벤트
  $("#check-import").on(
    "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
    function () {
      if (setting_json.name != "") {
        //   console.log(setting_json);
        // display 상태를 변경할 요소 선택
        $("#main-new-obj-box-import-disable").css("display", "none");

        //import시 해당 오브젝트로 화면이동

        let setzoom = map.getZoom() < 18 ? 18 : map.getZoom();
        if (map.getZoom() < 18) {
        }
        //console.log(setting_json);
        map.flyTo({
          // center: [
          //   setting_json.transform.position.x,
          //   setting_json.transform.position.z,
          // ],
          zoom: setzoom,
        });
      }
    }
  );
});

//멀티플 오브젝트 구현
//멀티플 선택 시 div display flex하고, 내용비우기
// 시작 위치에서 끝위치 입력시.. 근데 이건 나중에 축적 되고. 마우스로 입력할 수 도 있으니.. 나중에..
