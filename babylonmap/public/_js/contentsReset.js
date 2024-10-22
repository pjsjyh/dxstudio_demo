function propertyReset() {
  document.getElementById(
    "main-editor-view-property-property-disable"
  ).style.visibility = "visible";
  document.getElementById("main-editor-view-property-property").scrollTop = 0;
  document.getElementById("editor-modelProperty-fix-name").value = "";
  document.getElementById("editor-modelProperty-fix-type").innerHTML = "";
  document.getElementById("editor-modelProperty-fix-location-name").value = "";
  document.getElementById("position_Value_x").value = "";
  document.getElementById("position_Value_y").value = "";
  document.getElementById("position_Value_z").value = "";
  document.getElementById("rotation_Value_x").value = "";
  document.getElementById("rotation_Value_y").value = "";
  document.getElementById("rotation_Value_z").value = "";
  document.getElementById("scale_Value_x").value = "";
  document.getElementById("scale_Value_y").value = "";
  document.getElementById("scale_Value_z").value = "";
  document.getElementById(
    "editor-view-modelProperty-fix-explanation-input"
  ).value = "";
  document.getElementById(
    "editor-view-modelProperty-fix-JsonEditor-input"
  ).value = "";

  document.getElementById(
    "main-editor-view-property-property"
  ).style.overflowY = "hidden";
}

function importReset() {
  //x키 누를떄
  //document.getElementById("opt1").checked = true;

  //document.getElementById("editor-transform-multiple-name").value = "";
  //document.getElementById("editor-transform-multiple-locationstart").innerHTML ="";
  // document.getElementById("editor-modelProperty-fix-location-name").value = "";
  // document.getElementById("position_Value_x-multiple-start").value = "";
  // document.getElementById("position_Value_y-multiple-start").value = "";
  // document.getElementById("position_Value_z-multiple-start").value = "";
  // document.getElementById("editor-transform-multiple-locationend").value = "";
  // document.getElementById("position_Value_x-multiple-end").value = "";
  // document.getElementById("position_Value_y-multiple-end").value = "";
  // document.getElementById("position_Value_z-multiple-end").value = "";

  document.getElementById("transform-import-address").value = "";
  document.getElementById("transform-import-position_Value_x").value =
    map.getCenter().lng;
  document.getElementById("transform-import-position_Value_y").value = 1;
  document.getElementById("transform-import-position_Value_z").value =
    map.getCenter().lat;
  loactionInputSetImport();
  document.getElementById("transform-import-rotation_Value_x").value = 0;
  document.getElementById("transform-import-rotation_Value_y").value = 0;
  document.getElementById("transform-import-rotation_Value_z").value = 0;
  document.getElementById("transform-import-scale_Value_x").value = 1;
  document.getElementById("transform-import-scale_Value_y").value = 1;
  document.getElementById("transform-import-scale_Value_z").value = 1;
  document.getElementById("editor-modelProperty-explanation-input").value = "";

  document.getElementById("editor-modelProperty-JsonEditor-input").value = "";
  document.getElementById("editor-modelProperty-marker-input").value = "";
  set_import_JSON();
}

const svg = document.getElementById("check-svg");
svg.classList.add("progress");
document.getElementById("import-completed-animation").classList.add("progress");
svg.onclick = function () {
  svg.classList.toggle("progress");
  document
    .getElementById("import-completed-animation")
    .classList.toggle("progress");
};

//input에서 delete사용시 객체 삭제 방지
let inputDelete = document.getElementsByClassName("inputting");
for (let i = 0; i < inputDelete.length; i++) {
  inputDelete[i].addEventListener("focus", function () {
    //입력중
    inputState = true;
  });
  inputDelete[i].addEventListener("blur", function () {
    //입력끝
    inputState = false;
  });
}
