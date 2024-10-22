//modelobj에서 원하는 모델 찾기, id값 받아 찾기
function findmodel(data) {
  let c;
  modelObj.forEach((m) => {
    if (m.divId == data) {
      c = m;
    }
  });

  return c;
}
function findmodelmanager(data) {
  let c;
  manager_modelObj.forEach((m) => {
    if (m.divId == data) {
      c = m;
    }
  });

  return c;
}

function findchild(finddiv, parentm) {
  let child = finddiv.childNodes;
  child.forEach((c) => {
    if (c.id.includes("Group")) {
      findchild(c, parnetm);
    } else {
      let findc = findmodel(c.id);
      if (managermodecheck) {
        findc = findmodelmanager(c.id);
      } else {
        findc = findmodel(c.id);
      }
      findc.model_.parent = parentm.model_;
      //console.log(modelObj);
    }
  });
}
function createPopUp() {
  const popUps = document.getElementsByClassName("mapboxgl-popup");
  /** Check if there is already a popup on the map and if so, remove it */
  if (popUps[0]) popUps[0].remove();

  let mainDiv = document.createElement("div");
  mainDiv.id = "mainDiv";

  let headDiv = document.createElement("div");
  headDiv.id = "headDiv";

  let titleDiv = document.createElement("div");
  titleDiv.id = "titleDiv";

  let customDiv = document.createElement("div");
  customDiv.id = "customDiv";

  let titlewordDiv = document.createElement("div");
  titlewordDiv.id = "titlewordDiv";

  let titletype = document.createElement("div");
  titletype.id = "titletype";
  titletype.innerText = "sensor";

  let titlename = document.createElement("div");
  titlename.id = "titlename";
  titlename.innerText = "Industrial air compressor";

  let morebtn = document.createElement("input");
  morebtn.type = "button";
  morebtn.id = "morebtn";
  morebtn.value = "more";

  let exitDiv = document.createElement("div");
  exitDiv.id = "exitDiv";

  let exitbtn = document.createElement("input");
  exitbtn.type = "button";
  exitbtn.id = "exitbtn";
  //exitbtn.style.backgroundImage = "url('./img/icons/cancel.png')";
  exitbtn.addEventListener("click", function () {
    mainDiv.style.display = "none";
  });

  let infoDiv = document.createElement("div");
  infoDiv.id = "infoDiv";
  infoDiv.style.backgroundColor = "var(--modeling-info-background-color)";

  let modelnamediv = document.createElement("div");
  modelnamediv.id = "modelnameDiv";
  modelnamediv.className = "infolistDiv";

  let modelname = document.createElement("div");
  modelname.id = "modelname";
  modelname.className = "infolistname";
  modelname.innerText = "Model name";

  let ac_modelname = document.createElement("div");
  ac_modelname.id = "ac_modelname";
  ac_modelname.className = "ac_infolistname";
  ac_modelname.innerText = "KRSP100-100V";

  let under_div = document.createElement("div");
  under_div.className = "underDiv";

  modelnamediv.append(modelname);
  modelnamediv.append(ac_modelname);

  let Locationdiv = document.createElement("div");
  Locationdiv.className = "infolistDiv";

  let Location = document.createElement("div");
  Location.innerText = "Location";
  Location.className = "infolistname";

  let ac_Location = document.createElement("div");
  ac_Location.innerText = "경기 의정부시 의정부동 99-6";
  ac_Location.id = "ac_Location";
  ac_Location.className = "ac_infolistname";

  let under_div3 = document.createElement("div");
  under_div3.className = "underDiv";

  Locationdiv.append(Location);
  Locationdiv.append(ac_Location);

  let Explanationdiv = document.createElement("div");
  Explanationdiv.className = "infolistDiv";

  let Explanation = document.createElement("div");
  Explanation.innerText = "Explanation";
  Explanation.className = "infolistname";
  Explanation.style.height = "auto";

  let ac_Explanation = document.createElement("div");
  ac_Explanation.id = "ac_Explanation";
  ac_Explanation.innerText =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry.";
  ac_Explanation.className = "ac_infolistname";

  Explanationdiv.append(Explanation);
  Explanationdiv.append(ac_Explanation);

  let modelextrainfo = document.createElement("div");
  modelextrainfo.id = "modelextrainfo";

  let under_div4 = document.createElement("div");
  under_div4.className = "underDiv";

  let CalorificationDiv = document.createElement("div");
  CalorificationDiv.className = "infolistDiv";

  let Calorification = document.createElement("div");
  Calorification.className = "infolistname underinfolistname";
  Calorification.innerText = "ACFM";

  let ac_Calorification = document.createElement("div");
  ac_Calorification.className = "ac_info";
  ac_Calorification.innerText = "500";

  let verticalbar = document.createElement("div");
  verticalbar.className = "verticalbar";

  CalorificationDiv.append(Calorification);
  CalorificationDiv.append(verticalbar);
  CalorificationDiv.append(ac_Calorification);

  let under_div5 = document.createElement("div");
  under_div5.className = "underDiv";

  let Forced_ventilationDiv = document.createElement("div");
  Forced_ventilationDiv.className = "infolistDiv";

  let Forced_ventilation = document.createElement("div");
  Forced_ventilation.className = "infolistname underinfolistname";
  Forced_ventilation.innerText = "Full load pressure \n(psig)";

  let ac_Forced_ventilation = document.createElement("div");
  ac_Forced_ventilation.className = "ac_info wordcolor";
  ac_Forced_ventilation.innerText = "100";

  let verticalbar2 = document.createElement("div");
  verticalbar2.className = "verticalbar";

  Forced_ventilationDiv.append(Forced_ventilation);
  Forced_ventilationDiv.append(verticalbar2);
  Forced_ventilationDiv.append(ac_Forced_ventilation);

  let under_div6 = document.createElement("div");
  under_div6.className = "underDiv";

  let CoolingDiv = document.createElement("div");
  CoolingDiv.className = "infolistDiv";

  let Cooling = document.createElement("div");
  Cooling.innerText = "Motor HP";
  Cooling.className = "infolistname underinfolistname";

  let ac_Cooling = document.createElement("div");
  ac_Cooling.innerText = "100";
  ac_Cooling.className = "ac_info wordcolor";

  let verticalbar3 = document.createElement("div");
  verticalbar3.className = "verticalbar";

  CoolingDiv.append(Cooling);
  CoolingDiv.append(verticalbar3);
  CoolingDiv.append(ac_Cooling);

  let under_div7 = document.createElement("div");
  under_div7.className = "underDiv";

  titleDiv.append(customDiv);
  titlewordDiv.append(titletype);
  titlewordDiv.append(titlename);
  titlewordDiv.append(morebtn);
  infoDiv.append(modelnamediv);
  infoDiv.append(under_div);
  infoDiv.append(Locationdiv);
  infoDiv.append(under_div3);
  infoDiv.append(Explanationdiv);

  modelextrainfo.append(under_div4);
  modelextrainfo.append(CalorificationDiv);
  modelextrainfo.append(under_div5);
  modelextrainfo.append(Forced_ventilationDiv);
  modelextrainfo.append(under_div6);
  modelextrainfo.append(CoolingDiv);
  modelextrainfo.append(under_div7);
  titleDiv.append(titlewordDiv);
  exitDiv.append(exitbtn);
  headDiv.append(titleDiv);
  headDiv.append(exitDiv);

  mainDiv.append(headDiv);
  mainDiv.append(infoDiv);
  mainDiv.append(modelextrainfo);

  // let view = document.getElementById("info-view");
  // view.append(mainDiv);
  // mainDiv.style.display = "none";

  ////////////////////////////////////////////////////////////////////
}

function sendinfotopopup(e, saveinfo) {
  let findm;
  if (managermodecheck) {
    findm = findmodelmanager(saveinfo);
  } else {
    findm = findmodel(saveinfo);
  }
  let loca;
  markeron = true;

  if (findm.type == "building")
    return null;
  $(".modelinfo-view-title-bottom-name").text(findm.modelingType)

  //viewPage 이름, 타입 바꾸기
  let pngName = "";
  switch (findm.type) {
    case "device":
      pngName = "./img/marker/viewerMarker_device.png";
      break;
    case "building":
      pngName = "./img/marker/viewerMarker_building.png";
      break;
    case "ect":
      pngName = "./img/marker/viewerMarker_ect.png";
      break;
    case "facility":
      pngName = "./img/marker/viewerMarker_facility.png";
      break;
    case "traffic":
      pngName = "./img/marker/viewerMarker_traffic.png";
      break;
  }
  $("#modelinfo-view-title-TypeImg img").attr("src", pngName);

  // const objInfoView = document.querySelector(".obj-info-view");
  // console.log(objInfoView);
  infoTemplate = document.getElementById("obj-info-view-template");

  if (infoTemplate) {
    let templateId = "cloned-obj-info-view-template";
    let cloneinfoTemplate = infoTemplate.content.cloneNode(true);
    cloneinfoTemplate.id = templateId;
    // DocumentFragment에서 루트 요소를 추출합니다.
    let objInfoViewElement = cloneinfoTemplate.querySelector(".obj-info-view");

    // 요소가 존재하는지 확인한 후 스타일을 설정합니다.
    if (objInfoViewElement) {
      document.body.appendChild(cloneinfoTemplate);

      objInfoViewElement.style.display = "flex";
      let x = e.point.x;
      let y = e.point.y;
      objInfoViewElement.style.left = x - 200 + "px";
      objInfoViewElement.style.top = y - 100 + "px";
      objInfoViewElement.style.position = "absolute";
      $(".textbox-name").text(findm.model_.name);
      geoGetAddress(e.lngLat.lng, e.lngLat.lat, function (e) {
        $(".textbox-location").text(e);
      });
    } else {
      console.error("템플릿에서 obj-info-view 요소를 찾을 수 없습니다.");
    }
  } else {
    console.error(
      "'obj-info-view-template' ID를 가진 템플릿 엘리먼트를 찾을 수 없습니다."
    );
  }

  // popup = new mapboxgl.Popup({ anchor: "top-right", closeOnClick: false })
  //   .setLngLat([127.077833050751, 37.512026082994595])
  //   .setDOMContent(objInfoView)
  //   .addTo(map);
  // markeron = true;

  //popup = document.createElement("div");
  //popup.classList.add("obj-info-view");

  //document.body.appendChild(popup);

  // let newmodel = document.createElement("model-viewer");
  // newmodel.src = "https://dt.gractor.com/modeling_b/" + value.name + ".glb";
  // newmodel.setAttribute("auto-rotate", null);
  // document.getElementById("mainDiv").style.display = "block";
  // document.getElementById("titletype").innerText = findm.type;
  // document.getElementById("ac_Explanation").innerText = findm.explane;
  // document.getElementById("titlename").innerText = saveinfo;

  $(".obj-info-view-box").click(function () {
    $(".obj-info-view").remove();
    $("#modelinfo-view").css("display", "flex");

    //let findm = findmodel(saveinfo);
    geoGetAddress(e.lngLat.lng, e.lngLat.lat, function (e) {
      $(".textbox-location").text(e);
    });
    linkinfoview(findm.divId, findm, loca);
    viewmode(findm.divId);
  });
}
