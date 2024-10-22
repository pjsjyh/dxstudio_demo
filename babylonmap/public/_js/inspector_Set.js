document
  .getElementById("editor-modelProperty-fix-name")
  .addEventListener("input", function () {
    get_inspector_name();
    set_inspector_JSON();
  });

document
  .getElementById("editor-view-modelProperty-fix-explanation-input")
  .addEventListener("input", function () {
    get_inspector_explane();
    set_inspector_explane();
    set_inspector_JSON();
    //console.log(selectedMesh.explane)
  });
document
  .getElementById("editor-view-modelProperty-fix-JsonEditor-input")
  .addEventListener("input", function () {
    get_inspector_JSON();
  });
document
  .getElementById("position_Value_x")
  .addEventListener("input", function () {
    loactionInputSet();
  });
document
  .getElementById("position_Value_y")
  .addEventListener("input", function () {
    loactionInputSet();
  });
document
  .getElementById("position_Value_z")
  .addEventListener("input", function () {
    loactionInputSet();
  });

// document.getElementById("editor-modelProperty-fix-location-name")
function geoGetInspector(e) {
  if (e.keyCode == 13) {
    loactionInputGet();
  }
}
function checkpassword(e) {
  if (e.keyCode == 13) {
    if ($("#manage-user-password-input").val() == password) {
      managermodecheck = true;
      changemangermode();
    }
  }
}

function adressSet() {
  let gps_location = [
    document.getElementById("position_Value_x").value,
    document.getElementById("position_Value_z").value,
  ];
  const query = gps_location[0] + "," + gps_location[1];
  geoGetAddress(gps_location[0], gps_location[1], function (e) {

    document.getElementById("editor-modelProperty-fix-location-name").value = e;

  });
}

function loactionInputSet() {
  let gps_location = [
    document.getElementById("position_Value_x").value,
    document.getElementById("position_Value_z").value,
  ];
  const query = gps_location[0] + "," + gps_location[1];
  geoGetAddress(gps_location[0], gps_location[1], function (e) {

    document.getElementById("editor-modelProperty-fix-location-name").value = e;

    geoGetGPS(e, function (en) {
      let babylonPos = ToBabylonPos(GetMercatorPos(en));
      selectedMesh.model_.position.x = babylonPos.x;
      selectedMesh.model_.position.y = document.getElementById("position_Value_y").value;
      selectedMesh.model_.position.z = babylonPos.z;
    });
  });
  objmarker.forEach((element) => {
    if (element._element.id == selectedMesh.divId) {
      element.setLngLat(parseFloat(gps_location[0]), parseFloat(gps_location[1]));
    }
  });

} //127.04672,37.73835699999998
function loactionInputGet() {
  const query = document.getElementById(
    "editor-modelProperty-fix-location-name"
  ).value;
  console.log("query", query);
  let obj_jsonEditorContent = JSON.parse(
    document.getElementById("editor-view-modelProperty-fix-JsonEditor-input")
      .value
  );
  geoGetGPS(query, function (e) {
    //console.log(e);
    let babylonPos = ToBabylonPos(GetMercatorPos(e));
    selectedMesh.model_.position.x = babylonPos.x;
    selectedMesh.model_.position.y = document.getElementById("position_Value_y").value;
    selectedMesh.model_.position.z = babylonPos.z;
  });
}

function visible_inspector() {
  //객체 생성 및 클릭시에 inspector창 보이도록
  // document.getElementById("inspector").style.display = "flex";
  // document.getElementById("showInspector").style.display = "none";
  // hideInspector
}

function hide_inspector() {
  // document.getElementById("inspector").style.display = "none";
  // document.getElementById("showInspector").style.display = "flex";
}

function set_inspector_name() {
  console.log(selectedMesh)
  document.getElementById("editor-modelProperty-fix-name").value = selectedMesh.model_.name;
}
function get_inspector_name() {
  let name = selectedMesh.model_.name;
  //console.log(listIdname)
  let listIdname = document.getElementById(selectedMesh.divId);
  // listIdname.id = document.getElementById("editor-modelProperty-fix-name").value;
  // selectedMesh.model_.name = document.getElementById("editor-modelProperty-fix-name").value;

  let elements = document.getElementsByClassName("objlist");
  let selectedDiv;
  let equalNumber = 0;
  let selectObjid = selectedMesh.model_.id.slice(0, -3);
  for (let i = 0; i < elements.length; i++) {

    //console.log("elements[i].id == selectedMesh.divId",elements[i].id ,"==", selectedMesh.divId)
    if (elements[i].id == selectObjid) {
      selectedDiv = elements[i];
      //console.log(3,selectedDiv ,"  d",selectedDiv.innerHTML ,"d", obj_jsonEditorContent.name)
    }
    if (
      elements[i].innerHTML ==
      document.getElementById("editor-modelProperty-fix-name").value
    ) {
      equalNumber++;
      //console.log(2)
    }
  }
  if (equalNumber == 0) {
    selectedMesh.model_.name = document.getElementById(
      "editor-modelProperty-fix-name"
    ).value;
    // console.log(selectedDiv)
    selectedDiv.innerHTML = document.getElementById(
      "editor-modelProperty-fix-name"
    ).value;

    selectedMesh.divId = document.getElementById("editor-modelProperty-fix-name").value
    set_inspector_name(); //selectedMesh.model_.name
  } else if (equalNumber > 0) {
    document.getElementById("editor-modelProperty-fix-name").value = name;
    set_inspector_JSON();
    equalNumber = 0;
  }
}

function set_inspector_type() {
  document.getElementById("editor-modelProperty-fix-type").innerText =
    selectedMesh.type;
  //console.log(selectedMesh.type)
}

function get_inspector_explane() {
  selectedMesh.explane = document.getElementById(
    "editor-view-modelProperty-fix-explanation-input"
  ).value;
}

function set_inspector_explane() {
  //아직 json연결 안함
  document.getElementById(
    "editor-view-modelProperty-fix-explanation-input"
  ).value = selectedMesh.explane;
}

//아직 코드 미완성
function get_inspector_JSON() {
  let name = selectedMesh.model_.name;
  //document.getElementById("inspector-obj-JsonEditor").value = jsonContents;
  let obj_jsonEditorContent = JSON.parse(
    document.getElementById("editor-view-modelProperty-fix-JsonEditor-input")
      .value
  );
  //console.log(obj_jsonEditorContent)
  let elements = document.getElementsByClassName("objlist");
  let selectedDiv;
  let equalNumber = 0;
  for (let i = 0; i < elements.length; i++) {
    console.log(
      "elements[i].id == selectedMesh.divId",
      elements[i].id,
      "==",
      selectedMesh.divId
    );
    if (elements[i].id == selectedMesh.divId) {
      selectedDiv = elements[i];
      console.log(
        3,
        selectedDiv,
        "  d",
        selectedDiv.innerHTML,
        "d",
        obj_jsonEditorContent.name
      );
    }
    if (elements[i].innerHTML == selectedMesh.name) {
      equalNumber++;
      console.log(2);
    }
  }
  if (equalNumber == 0) {
    console.log(1);
    selectedMesh.model_.name = obj_jsonEditorContent.name;
    set_inspector_name(); //selectedMesh.model_.name
    selectedDiv.innerHTML = obj_jsonEditorContent.name;
  } else if (equalNumber > 0) {
    console.log(0);
    obj_jsonEditorContent.name = name;
    set_inspector_JSON();
  }

  selectedMesh.explane = obj_jsonEditorContent.explane;
  set_inspector_explane(); //selectedMesh.explane

  let babylonPos = ToBabylonPos(
    GetMercatorPos([
      obj_jsonEditorContent.transform.position.x,
      obj_jsonEditorContent.transform.position.z,
    ])
  );
  selectedMesh.model_.position.x = babylonPos.x;
  selectedMesh.model_.position.y = obj_jsonEditorContent.transform.position.y;
  selectedMesh.model_.position.z = babylonPos.z;

  selectedMesh.model_.rotation.x = obj_jsonEditorContent.transform.rotation.x;
  selectedMesh.model_.rotation.y = obj_jsonEditorContent.transform.rotation.y;
  selectedMesh.model_.rotation.z = obj_jsonEditorContent.transform.rotation.z;

  selectedMesh.model_.scaling.x = obj_jsonEditorContent.transform.scale.x;
  selectedMesh.model_.scaling.y = obj_jsonEditorContent.transform.scale.y;
  selectedMesh.model_.scaling.z = obj_jsonEditorContent.transform.scale.z;
  setObjectTransformToInspector(); //selectedMesh.model_.position.x = babylonPos.x;(gps to babylon)
  loactionInputGet();
}

function set_inspector_JSON() {
  let gpsjson = toGPS([
    selectedMesh.model_.position.x,
    selectedMesh.model_.position.z,
  ]);
  let setting_json = {
    name: selectedMesh.model_.name,
    transform: {
      position: {
        x: gpsjson.lng,
        y: selectedMesh.model_.position.y,
        z: gpsjson.lat,
      },
      rotation: {
        x: selectedMesh.model_.rotation.x,
        y: selectedMesh.model_.rotation.y,
        z: selectedMesh.model_.rotation.z,
      },
      scale: {
        x: selectedMesh.model_.scaling.x / selectedMesh.scalex_,
        y: selectedMesh.model_.scaling.y / selectedMesh.scaley_,
        z: selectedMesh.model_.scaling.z / selectedMesh.scalez_,
      },
    },
    explane: selectedMesh.explane,
  };
  let jsonContents = JSON.stringify(setting_json, null, 2);

  //jsonContents = jsonContents.split("   ").join("\n");
  //console.log(jsonContents)
  document.getElementById(
    "editor-view-modelProperty-fix-JsonEditor-input"
  ).value = jsonContents;
}

//아직 코드 미완성
function get_inspector_marker() {
  selectedMesh.explane = document.getElementById(
    "editor-view-modelProperty-fix-explanation-input"
  ).value;
}

//아직 코드 미완성
function set_inspector_marker() {
  //아직 json연결 안함
  document.getElementById(
    "editor-view-modelProperty-fix-explanation-input"
  ).innerText = selectedMesh.explane;
}

///마커 삭제 후 생성 반복.(장치마다 마커 다르게..? 할 수 도 있으니께.. =>그럼 선택된 마커는 어케 표시?)
function markerListReset() {
  let elements = document.getElementsByClassName("markerElements");
  //console.log(elements.length)
  let markerListLength = elements.length;
  for (let i = 0; i < markerListLength; i++) {
    //console.log(i," ",elements[0])
    elements[0].remove();
  }

  markerListadd();
}
//객체 생성
function markerListadd() {
  getMapData("markerfile", "", function (map_data_) {
    let markerListElement = document.getElementById("marker-contents");

    map_data_.items.forEach((t) => {
      //console.log(t.Textfont)
      let newMarker = document.createElement("img");
      let newMarkerdiv = document.createElement("div");
      newMarker.className = "inspectorclass";
      newMarkerdiv.className = "inspectorclass markerElements";
      newMarkerdiv.appendChild(newMarker);
      //markerListElement.appendChild(newMarkerdiv);
      newMarker.src = "./img/marker/" + t.Textfont;
    });
  });
  //document.getElementById("gizmo-btn-select-img").src = "./img/marker/"+data.items[0].Textfont;
}

//   let objtable = document.getElementById("editor_view_click_2");
//   let newdiv = document.createElement("div");
//   let newbtn = document.createElement("button");
//   let newmodel = document.createElement("model-viewer");
//   newbtn.appendChild(newmodel);
//   newdiv.appendChild(newbtn);
//   objtable.appendChild(newdiv);
//   newmodel.id = "model_viewer";
//   newdiv.className = "item";
//   newdiv.id = value.type;
//   newbtn.id = value.name;
//   newbtn.className = "btn_class";
//   newmodel.src = "https://dt.gractor.com/modeling_b/" + value.name + ".glb";
//   newmodel.setAttribute("auto-rotate", null);

// 포켓베이스 테스트
function getdata_test() {
  getMapData("markerfile", "", function (map_data_) {
    //console.log("   ", map_data_);
  });
  getMapData("mapJson", "", function (map_data_) {
    //console.log("   ", map_data_);
    map_data_.items.forEach((t) => {
      if (t.title == "third") {
        //console.log(t)
      }
    });
  });

  getMapData("mapJson", "/pkmde7ejfguejbg", function (map_data_) {
    //console.log("   ", map_data_);
  });
}
