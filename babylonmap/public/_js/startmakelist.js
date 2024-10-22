function studioMakeList(value) {
  let objTemplate = document.getElementById("obj-Template");
  let cloneTagTemplate = objTemplate.content.cloneNode(true);
  cloneTagTemplate.querySelector(".obj-label").textContent = value.name;
  if (value.name == "Group") return;
  let modelView = cloneTagTemplate.querySelector(".obj-view");
  modelView.src = "https://dt.gractor.com/demoModeling/" + value.name + ".glb";
  modelView.setAttribute("auto-rotate", null);

  let createDiv = cloneTagTemplate.querySelector(".obj-div");
  createDiv.ondblclick = function () {
    createStudioModel(value.name);
  };
  document
    .querySelector("#objList-create-studio")
    .appendChild(cloneTagTemplate);
}
//처음 model-view를 이용해 import창에 object 목록 생성
function startmakelist(value) {
  if (
    value.type != "sensor" &&
    value.type != "Group" &&
    value.name != facility_name
  ) {
    let objtable = document.getElementById("new-obj-box-list");
    let selectBox = document.createElement("div");
    let selectBox_model = document.createElement("div");
    let newmodel = document.createElement("model-viewer");
    let selectBox_model_name = document.createElement("div");

    selectBox_model.appendChild(newmodel);
    selectBox.appendChild(selectBox_model);
    selectBox.appendChild(selectBox_model_name);
    objtable.appendChild(selectBox);
    newmodel.id = "model_viewer";

    selectBox.classList.add("new-obj-box-selectBox", "box-Objlist");
    selectBox.style.cursor = "pointer";
    selectBox.onclick = covertcreatepage;
    selectBox.id = value.type;
    //selectBox.onclick = connectimport;
    selectBox_model.className = "new-obj-box-selectBox-model";
    selectBox_model.id = value.name;

    selectBox_model_name.className = "new-obj-box-selectBox-model-name";
    selectBox_model_name.innerText = value.name;
    if (value.name != "Group") {
      newmodel.src =
        "https://dt.gractor.com/demoModeling/" + value.name + ".glb";
      newmodel.setAttribute("auto-rotate", null);
    }
  }
}

function obj_select() {
  let selectTag = document.getElementById("objlist-control-select").options[
    document.getElementById("objlist-control-select").selectedIndex
  ].value;
}
function covertcreatepage() {
  $("#main-new-obj-box-assets").css("display", "none");

  $("#main-new-obj-box-createobj").css("display", "block");
  $("#main-new-obj-box-back").css("visibility", "visible");

  document.getElementById("obj-box-Objlist-searching").value = "";
  $("#main-new-obj-box-title-3dassets").text(
    $(this).children().first().attr("id")
  );
  $("#editor-view-modelProperty-import").css("display", "flex");

  searchinput();
}
