// var xhr = new XMLHttpRequest();
// xhr.open(
//   "GET",
//   "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/2471217/",
//   true
// );

// xhr.onload = function () {
//   var cities = JSON.parse(xhr.response);
//   console.log(cities);
// };

// xhr.onload = function () {
//   document
//     .querySelector(".weather__loader")
//     .classList.add("weather__loader--is-hidden");
//   var cities = JSON.parse(xhr.response);
//   var weatherIcon, weatherStatus, weatherTemp, location;
//   location = cities.title + ", " + cities.parent.title;
//   weatherStatus = cities.consolidated_weather[0].weather_state_name;
//   weatherTemp =
//     Math.round((cities.consolidated_weather[0].the_temp * 9) / 5 + 32) +
//     "&deg;";
//   document.querySelector(".weather__heading").innerHTML = location;
//   document.querySelector(".weather__feed__icon").src =
//     "https://www.metaweather.com/static/img/weather/" +
//     cities.consolidated_weather[0].weather_state_abbr +
//     ".svg";
//   document.querySelector(".weather__feed__status").innerHTML = weatherStatus;
//   document.querySelector(".weather__feed__temperature").innerHTML = weatherTemp;
//   console.log("onload.");
// };

// xhr.onerror = function () {
//   console.log("Couldn't retrieve weather.");
//   document
//     .querySelector(".weather__feed")
//     .classList.add("weather__feed--is-hidden");
// };

// xhr.send();
let deviceCheck = true;
function occurEvent() {
  // Example: var audio = new Audio('path/to/file.mp3');
  // audio.play();

  let sound = document.getElementById("eventpopup-sound");
  sound.play();
  // highlightCrack = new BABYLON.HighlightLayer("Crackhighlight", viewScene);
  // highlightCrack.removeAllMeshes();
  $(".modelinfo-view-eventpopup").css("display", "flex");
  let children = advancedTexture4.rootContainer.children.slice();
  children.forEach((child) => {
    if (child.id == "target" + 1) {
      child.source = bridgepointerror_base;
      child.width = "170px";
      child.height = "170px";
    }
  });
  let currentTime = new Date();

  // 시, 분, 초 추출
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();

  // 시, 분, 초를 "00" 형식으로 포맷팅
  let formattedHours = String(hours).padStart(2, "0");
  let formattedMinutes = String(minutes).padStart(2, "0");
  let formattedSeconds = String(seconds).padStart(2, "0");

  // "hour:min:sec" 형식으로 조합

  let formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  $(".modelinfo-view-eventpopup-time").text("발생 시각 - " + formattedTime);
  $(".modelinfo-view-eventpopup-btn-move").on("click", function () {
    let spherecrackgui = BABYLON.MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 0.1 },
      viewScene
    );
    spherecrackgui.position = eventCrack.absolutePosition; // 공을 크랙 위치에 생성
    spherecrackgui.isVisible = false;
    crackgui(spherecrackgui, advancedTextureCrack);

    $("#Device").prop("checked", function () {
      return true;
    });
    document.getElementById("device-leftWidget-sensor1").checked = true;

    $(".modelinfo-view-top-tab-device-right img").attr(
      "src",
      "./img/bridgePage/itemSensor/item_box_panel-0_occur.png"
    );
    $(".modelinfo-view-top-tab-device-right").css("display", "flex");
    $(".modelinfo-view-top-tab-device-bottom").css("display", "flex");

    $(".modelinfo-view-top-tab-overview").css("display", "none");
    $(".modelinfo-view-top-tab-device").css("display", "flex");
    $(".modelinfo-view-top-tab-population_density").css("display", "none");
    $(".modelinfo-view-eventpopup").css("display", "none");
    for (let j = 0; j < inclination.length; j++) {
      inclination[j].isVisible = false;
    }
    advancedTextureCrack.isVisible = true;
    for (let j = 0; j < crackani.length; j++) {
      if (crackani[j].name.includes(1)) {
        console.log(crackani[j].name);
        // var animationGroupToPlay = animationGroups.find(
        //   (group) => group.name === crackani[j].name
        // );

        // 애니메이션 그룹이 찾아졌다면, 실행.
        if (crackani[j]) {
          crackani[j].stop();
        }
      }
    }
    camani(viewScene.cameras[0]._position, cam[1 - 1]._position, 1 - 1);
    ver4(1 - 1);

    // highlightCrack.isEnabled = true;
    // eventCrack.forEach(crackpart => {
    //   highlightCrack.addMesh(crackpart, new BABYLON.Color3(0.64, 0, 0));
    // })
    // highlightCrack.blurVerticalSize = 0.5;
    // highlightCrack.blurHorizontalSize = 0.5;
    // highlightCrack.innerGlow = false;

    //eventCrack highlightCrack
  });

  // 체크박스 이미지 바꾸기
  // 클래스로 구별하기 왜냐,, x누르면 다시 원상복귀가 되어야함.. 그래야 이벤트 처리 가능
  $(".modelinfo-view-top-tab-device-leftWidget-list").addClass("eventoccur");

  $(".modelinfo-view-top-tab-device-right img").attr(
    "src",
    "./img/bridgePage/itemSensor/item_box_panel-0_occur.png"
  );
}
$(document).ready(function () {
  // 페이지가 로드되면 최초 한 번 시간 업데이트 실행
  updateClock();

  // 1초마다 updateClock 함수 호출하여 시간 업데이트
  setInterval(updateClock, 30000);

  //AlarmDiv-contents-list-content-alram1
  $("#AlarmDiv-contents-list-content-alram1").on("change", function () {
    //탭이동

    $(".modelinfo-view-top-tab-overview").css("display", "none");
    $(".modelinfo-view-top-tab-population_density").css("display", "none");
    $(".modelinfo-view-top-tab-device").css("display", "flex");

    advancedTexture4.rootContainer.children.forEach(function (control) {
      if (control.name == "target") control.isVisible = true;
    });
    advancedTexture6.rootContainer.children.forEach(function (control) {
      control.isVisible = false;
    });
    console.log("check");
    //해당 장치로 카메라 이동
    let getid = 2;
    //console.log(viewScene.environmentTexture);

    //camani(viewScene.cameras[0]._position, cam[getid - 1]._position, getid - 1);
    //combinedCamAnimation(
    //   viewScene.cameras[0]._position,
    //   cam[getid - 1]._position,
    //   era[getid - 1]._position,
    //   getid - 1
    // );advancedTextureCrack

    if (deviceCheck) {
      document.getElementById("device-leftWidget-sensor2").checked = true;

      let spherecrackgui02 = BABYLON.MeshBuilder.CreateSphere(
        "sphere_02",
        { diameter: 0.1 },
        viewScene
      );
      spherecrackgui02.position = eventCrack02.absolutePosition; // 공을 크랙 위치에 생성
      spherecrackgui02.isVisible = false;
      crackgui(spherecrackgui02, advancedTextureCrack02);
      advancedTexture4.rootContainer.children.forEach(function (control) {
        if (control.name == "target") control.isVisible = false;
      });
      camani(
        viewScene.cameras[0]._position,
        cam[getid - 1]._position,
        getid - 1
      );

      ver4(getid - 1);
      //시나리오 구성
      occurEventHandler = setTimeout(function () {
        occurEvent();
      }, 6000);
      $("#Device").prop("checked", function () {
        return true;
      });
      advancedTextureCrack02.isVisible = true;

      deviceCheck = false;
    }
  });

  //cctv div 생성
  //modelinfo-view-top-tab-population_density-cctv
  //population_density-cctv-div-template
  $(".modelinfo-view-eventpopup-btn-close").on("click", function () {
    //소리 끄기
    //창 닫기
    $(".modelinfo-view-eventpopup").css("display", "none");
  });
  CCTVTemplate = document.getElementById(
    "population_density-cctv-div-template"
  );
  let cctvTitle = ["계단 3방면", "다리 중앙", "하향 방면"];

  if (CCTVTemplate) {
    cctvTitle.forEach((ctvtitle, index) => {
      let cloneCCTVTemplate = CCTVTemplate.content.cloneNode(true);

      // DocumentFragment에서 루트 요소를 추출합니다.
      let cctvbackground = cloneCCTVTemplate.querySelector(
        ".population_density-cctv-div"
      );
      cctvbackground.setAttribute("id", "cctv" + index);
      let cctvpanel = cloneCCTVTemplate.querySelector(
        ".population_density-cctv-div-title-position"
      );

      // 요소가 존재하는지 확인한 후 스타일을 설정합니다.
      if (cctvpanel) {
        document
          .querySelector(".modelinfo-view-top-tab-population_density-cctv")
          .appendChild(cloneCCTVTemplate);
        cctvpanel.innerHTML = ctvtitle;
      } else {
        console.error("템플릿에서 obj-info-view 요소를 찾을 수 없습니다.");
      }
    });
  } else {
    console.error(
      "'obj-info-view-template' ID를 가진 템플릿 엘리먼트를 찾을 수 없습니다."
    );
  }
  let videos = document.getElementsByClassName("videocctv");
  console.log(videos);
  Array.from(videos).forEach((video) => {
    if (Hls.isSupported()) {
      let hls = new Hls();
      // HLS 스트림 URL을 'src'에 지정합니다.
      hls.loadSource("https://dt.gractor.com/video/live.m3u8");
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // HLS.js를 지원하지 않지만, 내장 HLS를 지원하는 브라우저(예: Safari)의 경우
      video.src = "https://dt.gractor.com/video/live.m3u8";
      video.addEventListener("loadedmetadata", function () {
        video.play();
      });
    } else {
      console.log("can`t");
    }
  });
  //adjustVideoSize();
  let mapStyleRadio = document.querySelectorAll(
    ".modelinfo-view-top-tab-radioBtns input[type='radio']"
  );
  mapStyleRadio.forEach((radioButton) => {
    radioButton.addEventListener("change", function () {
      let stylemapSet = $(
        "input[name='modelinfo-view-top-tabs']:checked"
      ).val();
      $(".modelinfo-view-top-tab-overview").css("display", "none");
      $(".modelinfo-view-top-tab-device").css("display", "none");
      $(".modelinfo-view-top-tab-population_density").css("display", "none");

      $("#population_density-device-part1").prop("checked", false);
      $("#population_density-device-part2").prop("checked", false);
      $("#population_density-device-part3").prop("checked", false);

      // viewScene.cameras[0].setPosition(
      //   new BABYLON.Vector3(-5, 2.0147617632807735, -0.16621254058732557)
      // );
      // viewScene.cameras[0].setTarget(BABYLON.Vector3.Zero());
      //cameraSet_viewer(BABYLON.Vector3.Zero());

      advancedTextureCrack.rootContainer.children.forEach(function (control) {
        control.isVisible = false;
      });
      advancedTextureCrack02.rootContainer.children.forEach(function (control) {
        control.isVisible = false;
      });
      console.log(stylemapSet);
      switch (stylemapSet) {
        case "Overview":
          $(".modelinfo-view-top-tab-overview").css("display", "flex");
          // advancedTexture4.rootContainer.children.forEach(function (control) {
          //   control._isVisible = false;
          // });
          // advancedTexture4.dispose();
          // advancedTexture6.dispose();
          advancedTexture4.rootContainer.children.forEach(function (control) {
            control.isVisible = false;
          });
          advancedTexture6.rootContainer.children.forEach(function (control) {
            control.isVisible = false;
          });
          break;
        case "Device":
          $(".modelinfo-view-top-tab-device").css("display", "flex");

          advancedTextureCrack.isVisible = true;

          advancedTexture4.rootContainer.children.forEach(function (control) {
            if (control.name == "target") control.isVisible = true;
          });
          advancedTexture6.rootContainer.children.forEach(function (control) {
            control.isVisible = false;
          });
          break;
        case "population_density":
          bridgeSenorClicked = false;
          bridgeClickednum = -1;
          $(".modelinfo-view-top-tab-population_density").css(
            "display",
            "flex"
          );
          adjustVideoSize();

          //////////영업용
          advancedTexture4.rootContainer.children.forEach(function (control) {
            if (control.name == "target") control.isVisible = true;
          });
          viewScene.cameras[0].setPosition(
            new BABYLON.Vector3(-5, 2.0147617632807735, -0.16621254058732557)
          );
          viewScene.cameras[0].setTarget(BABYLON.Vector3.Zero());
          cameraSet_viewer(BABYLON.Vector3.Zero());

          setGridVisibilitys(false, gridlineList);
          advancedTextureCrack.rootContainer.children.forEach(function (
            control
          ) {
            control.isVisible = false;
          });
          advancedTextureCrack02.rootContainer.children.forEach(function (
            control
          ) {
            control.isVisible = false;
          });
          //////////영업용

          //체크박스 해제하기
          let radioBoxes = document.getElementsByName(
            "device-leftWidget-sensors"
          );
          for (let i = 0; i < radioBoxes.length; i++) {
            radioBoxes[i].checked = false;
          }

          //탭바꿀때도, 인구밀집만.
          $("#population_density-device-part1").prop("checked", false);
          $("#population_density-device-part2").prop("checked", false);
          $("#population_density-device-part3").prop("checked", false);

          advancedTexture4.rootContainer.children.forEach(function (control) {
            control.isVisible = false;
          });
          advancedTexture6.rootContainer.children.forEach(function (control) {
            if (control.name == "target") control.isVisible = true;
          });
          break;
      }
    });
  });
  $(".modelinfo-view-top-tab-overview-right-widget-doc").click(function () {
    window.open(
      "https://dt.gractor.com/file/044.구신흥경로당.pdf_2024_01_30_14_29_30_788.pdf",
      "_blank"
    );
  });

  let alarmEventBtn = document.querySelector(
    ".modelinfo-view-title-right-topAlarm input[type='checkbox']"
  );

  // checkbox의 변경 사항을 감지하여 처리합니다.
  alarmEventBtn.addEventListener("change", function () {
    // checkbox의 checked 상태에 따라 div 요소를 보이거나 숨깁니다.
    if (alarmEventBtn.checked) {
      $(".AlarmDiv-position").css("display", "flex");
    } else {
      $(".AlarmDiv-position").css("display", "none");
    }
  });
  let AlarmEventListCheck = document.querySelectorAll(
    ".AlarmDiv-contents-list-content input[type='checkbox']"
  );

  AlarmEventListCheck.forEach((AlarmEventListCheckButton) => {
    AlarmEventListCheckButton.addEventListener("change", function () {
      if (this.checked) {
        // 만약 checkbox가 체크되었다면
        this.parentNode.classList.add("AlarmDiv-check");
      } else {
        // 체크가 해제되었다면
        this.parentNode.classList.remove("AlarmDiv-check");
      }
    });
  });

  //장치 리스트 클릭 시 이미지 및 정보 변경
  let deviceRadio = document.querySelectorAll(
    ".modelinfo-view-top-tab-device-leftWidget-list input[type='radio']"
  );
  deviceRadio.forEach((deviceRadioButton) => {
    deviceRadioButton.addEventListener("change", function () {
      let deviceRadioButtonset = $(
        "input[name='device-leftWidget-sensors']:checked"
      ).val();
      $(".modelinfo-view-top-tab-device-center").css("display", "none");
      $(".modelinfo-view-top-tab-device-right").css("display", "none");
      $(".modelinfo-view-top-tab-device-right-graphBtn").prop("checked", false);
      $(".modelinfo-view-top-tab-device-bottom").css("display", "none");
      let rightPanelUrl = "";

      switch (deviceRadioButtonset) {
        case "sensor1":
          if (
            document
              .querySelector(".modelinfo-view-top-tab-device-leftWidget-list")
              .classList.contains("eventoccur")
          )
            rightPanelUrl =
              "./img/bridgePage/itemSensor/item_box_panel-0_occur.png";
          else rightPanelUrl = "./img/bridgePage/itemSensor/item_box_panel.png";
          break;
        case "sensor2":
          rightPanelUrl = "./img/bridgePage/itemSensor/item_box_panel-1.png";
          break;
        case "sensor3":
          rightPanelUrl = "./img/bridgePage/itemSensor/item_box_panel-2.png";
          break;
        case "sensor4":
          rightPanelUrl = "./img/bridgePage/itemSensor/item_box_panel-3.png";
          break;
        case "sensor5":
          rightPanelUrl = "./img/bridgePage/itemSensor/item_box_panel-4.png";
          break;
        case "sensor6":
          rightPanelUrl = "./img/bridgePage/itemSensor/item_box_panel-5.png";
          break;
        case "sensor7":
          rightPanelUrl = "./img/bridgePage/itemSensor/item_box_panel-6.png";
          break;
        default:
          break;
      }

      $(".modelinfo-view-top-tab-device-right img").attr("src", rightPanelUrl);
      if (deviceRadioButton.checked) {
        $(".modelinfo-view-top-tab-device-right").css("display", "flex");
        $(".modelinfo-view-top-tab-device-bottom").css("display", "flex");
      }
    });
  });

  let devicepanelChart = document.querySelector(
    ".modelinfo-view-top-tab-device-right-graphBtn"
  );

  devicepanelChart.addEventListener("change", function () {
    if (this.checked) {
      // 만약 checkbox가 체크되었다면
      $(".modelinfo-view-top-tab-device-center").css("display", "flex");
    } else {
      // 체크가 해제되었다면
      $(".modelinfo-view-top-tab-device-center").css("display", "none");
    }
  });
  $(".modelinfo-view-top-tab-device-center-eventPanel-closeBtn").click(
    function () {
      $(".modelinfo-view-top-tab-device-center").css("display", "none");

      $(".modelinfo-view-top-tab-device-right-graphBtn").prop("checked", false);
    }
  );
  document
    .querySelector("#modelinfo-view-top-tab-device-bottom-checked")
    .addEventListener("change", function () {
      if (this.checked) {
        console.log("checked");
        // 만약 checkbox가 체크되었다면
        $(".modelinfo-view-top-tab-device-bottom").toggleClass("clickedupdown");
      } else {
        // 체크가 해제되었다면
        $(".modelinfo-view-top-tab-device-bottom").toggleClass("clickedupdown");
      }
    });

  $("#population_density-device-part1").click(function () {
    advancedTexture6.getControlByName("peoplecluster0").isVisible =
      !advancedTexture6.getControlByName("peoplecluster0").isVisible;
    if (advancedTexture6.getControlByName("peoplecluster0").isVisible) {
      $("#cctv0").css("border", "1.8px solid rgba(7, 255, 255, 1)");
    } else {
      $("#cctv0").css("border", "1.8px solid rgba(122, 199, 255, 0.10)");
    }
  });
  $("#population_density-device-part2").click(function () {
    advancedTexture6.getControlByName("peoplecluster1").isVisible =
      !advancedTexture6.getControlByName("peoplecluster1").isVisible;
    if (advancedTexture6.getControlByName("peoplecluster1").isVisible) {
      $("#cctv1").css("border", "1.8px solid rgba(7, 255, 255, 1)");
    } else {
      $("#cctv1").css("border", "1.8px solid rgba(122, 199, 255, 0.10)");
    }
  });
  $("#population_density-device-part3").click(function () {
    advancedTexture6.getControlByName("peoplecluster2").isVisible =
      !advancedTexture6.getControlByName("peoplecluster2").isVisible;
    if (advancedTexture6.getControlByName("peoplecluster2").isVisible) {
      $("#cctv2").css("border", "1.8px solid rgba(7, 255, 255, 1)");
    } else {
      $("#cctv2").css("border", "1.8px solid rgba(122, 199, 255, 0.10)");
    }
  });
});

function changeText(clickedDiv) {
  // 클릭된 div의 자식 요소 중에 update-div-data-date 클래스를 가진 요소를 찾아 텍스트 변경
  const dateElement = clickedDiv.querySelector(".update-div-data-date");
  if (dateElement) {
    let currentTime = new Date();

    // 시, 분, 초 추출
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    // 시, 분, 초를 "00" 형식으로 포맷팅
    let formattedHours = String(hours).padStart(2, "0");
    let formattedMinutes = String(minutes).padStart(2, "0");
    let formattedSeconds = String(seconds).padStart(2, "0");

    // "hour:min:sec" 형식으로 조합

    let formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    dateElement.textContent = formattedTime;
  }
}

function updateClock() {
  let currentTime = new Date();
  let year = currentTime.getFullYear();
  let month = currentTime.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
  let day = currentTime.getDate();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";

  // 12시간 형식으로 변환
  hours = hours % 12;
  hours = hours ? hours : 12; // 0시인 경우 12시로 표시

  // 한 자리 숫자일 경우 앞에 0을 추가
  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;
  hours = (hours < 10 ? "0" : "") + hours;
  minutes = (minutes < 10 ? "0" : "") + minutes;
  // HTML 요소에 현재 시간 업데이트
  document.getElementById("modelinfo-view-date").innerHTML =
    year + ". " + month + ". " + day;
  document.getElementById("modelinfo-view-time").innerHTML =
    hours + ":" + minutes + " " + ampm;
}

// GUI 아이콘 생성

function moveGUIIcon(event) {
  if (memoclickon && viewScene.getEngine().getRenderingCanvas()) {
    viewScene
      .getEngine()
      .getRenderingCanvas()
      .addEventListener("pointermove", (event) => {
        let canvasRect = viewScene
          .getEngine()
          .getRenderingCanvas()
          .getBoundingClientRect();
        let x = event.clientX - canvasRect.left;
        let y = event.clientY - canvasRect.top;

        // guiIcon의 위치를 마우스 커서에 따라 업데이트
        guiIcon.leftInPixels = x;
        guiIcon.topInPixels = y;
      });
  }
}
// 마우스 위치에 따라 GUI 아이콘을 이동시키는 로직
function makememogui(m, nowclickmemo) {
  let thisnum = nowclickmemo != null ? nowclickmemo : memolistnum;
  let target = new BABYLON.GUI.Image("target", memooutline_base);
  target.width = "50px";
  target.height = "50px";
  target.id = "memolist_memoicon" + thisnum;
  advancedTexture5.addControl(target);
  target.linkWithMesh(m);
  let children = advancedTexture5.rootContainer.children.slice();

  children.forEach((child) => {
    if (child.name == "guiIcon") {
      child.isVisible = false;
    }
  });
  target.onPointerDownObservable.add(() => {
    let children = advancedTexture5.rootContainer.children.slice();

    children.forEach((child) => {
      // if (child.name.includes("memolist_background")) {
      //   child._children[0].source = inputbox_base;
      // }
      console.log(child.name);
      if (child.name == "memolist_background" + thisnum) {
        child.isVisible = !child.isVisible;
        // if (child.isVisible) {
        //   child._children[0].source = inputclick_base;
        //   document.getElementById("memolist" + nowclickmemo).style.background =
        //     "rgba(0, 240, 255, 0.15)";
        // } else {
        //   child._children[0].source = inputbox_base;
        //   document.getElementById("memolist" + nowclickmemo).style.background =
        //     "rgba(0, 0, 0, 0.20)";
        // }
      }
    });
  });
}
function guimemoon(ison) {
  let children = advancedTexture5.rootContainer.children.slice();
  children.forEach((child) => {
    if (ison) {
      advancedTexture5.rootContainer.isVisible = true;
    } else {
      advancedTexture5.rootContainer.isVisible = false;
    }
  });
}

function makememoinputgui(m, nowclickmemo, keyname) {
  let thisnum = nowclickmemo != null ? nowclickmemo : memolistnum;

  var backgroundRect = new BABYLON.GUI.Rectangle(
    "memolist_background" + thisnum
  );
  backgroundRect.id = "memolist_background" + thisnum;
  backgroundRect.width = "384px";
  backgroundRect.height = "97px";
  backgroundRect.cornerRadius = 5;
  backgroundRect.color = "white";
  backgroundRect.thickness = 0;

  backgroundRect.background = "transparent";
  advancedTexture5.addControl(backgroundRect);

  var backgroundImage = new BABYLON.GUI.Image("backgroundImage", input_demo);
  backgroundImage.id = "memolist_backgroundimg" + thisnum;
  backgroundImage.width = "100%";
  backgroundImage.height = "100%";

  backgroundImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
  backgroundRect.addControl(backgroundImage);

  // 수직 배치를 위한 메인 패널
  var verticalPanel = new BABYLON.GUI.StackPanel();
  verticalPanel.width = "90%";
  verticalPanel.height = "90%";
  verticalPanel.isVertical = true;
  verticalPanel.background = "transparent";

  backgroundRect.addControl(verticalPanel);

  // todayText와 moresee를 수평으로 배치하기 위한 패널
  var horizontalPanel = new BABYLON.GUI.StackPanel();
  horizontalPanel.isVertical = false;
  horizontalPanel.width = "100%";
  horizontalPanel.height = "20px"; // 적절한 높이 설정
  //   horizontalPanel.horizontalAlignment =
  //     BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  horizontalPanel.verticalAlignment =
    BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
  horizontalPanel.background = "transparent";

  verticalPanel.addControl(horizontalPanel);

  // TodayText 추가
  var todayText = new BABYLON.GUI.TextBlock();
  todayText.text = getCurrentDate();
  todayText.fontSize = "14px";
  todayText.color = "#CDCDCD";
  todayText.height = "20px";
  todayText.textHorizontalAlignment =
    BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  todayText.top = "5px";
  //todayText.left = "80px";
  horizontalPanel.addControl(todayText);

  // Moresee를 오른쪽 상단에 배치하기 위해 Spacer 사용
  var spacer = new BABYLON.GUI.Rectangle();
  spacer.width = "90%";
  spacer.height = "0px";
  spacer.background = "white";
  spacer.isHitTestVisible = false; // 이 Spacer는 클릭이나 터치를 받지 않음

  // Moresee 추가
  var moresee = new BABYLON.GUI.Image("moresee", moresee_base);
  moresee.width = "36px";
  moresee.height = "36px";
  moresee.paddingRight = "2px"; // 오른쪽 패딩 설정
  moresee.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT; // 오른쪽 정렬

  //   horizontalPanel.addControl(spacer);
  //   horizontalPanel.addControl(moresee);

  // 입력 창 생성 및 verticalPanel에 추가
  var inputText = new BABYLON.GUI.InputText();
  inputText.width = "300px";
  inputText.height = "60px";
  inputText.text = "메모를 입력하세요...";
  inputText.color = "#7C7C7C";
  inputText.background = "transparent";
  inputText.id = "memolist_input" + thisnum;
  inputText.textWrapping = true;
  inputText.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
  inputText.thickness = 0;
  inputText.left = "-10px";
  inputText.focusedBackground = "transparent";
  verticalPanel.addControl(inputText);

  var placeholderText = "메모를 입력하세요...";
  if (keyname != null) {
    inputText.color = "white";
    inputText.text = keyname;
  }
  let findinputtext;
  inputText.onFocusObservable.add(function () {
    findinputtext = parseInt(inputText.id.match(/\d+/)[0]);
    console.log(findinputtext);
    inputText.color = "white";
    if (inputText.text === placeholderText) {
      inputText.text = ""; // 텍스트 필드를 비웁니다.
    } else {
      inputText.color = "white";
    }
  });
  inputText.onBlurObservable.add(function () {
    if (inputText.text === "") {
      inputText.text = placeholderText;
      inputText.color = "#7C7C7C";
    }
  });
  inputText.onTextChangedObservable.add(function (input) {
    //console.log(input.text); // 현재 입력 필드의 텍스트를 콘솔에 출력합니다.
    // console.log("memolist" + findinputtext);
    nowclickmemo = findinputtext;
    document
      .getElementById("memolist" + findinputtext)
      .querySelector("textarea").value = input.text;
    console.log(input.text);
  });
  inputText.onBlurObservable.add(function () {
    //마우스 커서 밖

    if (!issetting) {
      memoopenbtn(findinputtext);
      memosave(findinputtext);
    }

    $("[id='new-memo-control']").css("display", "none");
  });
  backgroundRect.linkWithMesh(m);
  //backgroundRect.linkOffsetX = 50;
  backgroundRect.linkOffsetY = -100;
}

function findmemo(texture, id, find) {
  var background = null,
    memoicon = null,
    memoinput = null;
  if (find == null) {
    texture.getDescendants(false).forEach(function (control) {
      if (control.id === "memolist_background" + id) {
        background = control;
      }
      if (control.id === "memolist_input" + id) {
        memoinput = control;
      }
      if (control.id === "memolist_memoicon" + id) {
        memoicon = control;
      }
    });
    return { back: background, input: memoinput, icon: memoicon };
  } else {
    texture.getDescendants(false).forEach(function (control) {
      if (control.id == find) {
        return control;
      }
    });
  }
}
function crackgui(sphere, advancedTextureCracks) {
  // TextBlock 생성
  // var textBlock = new BABYLON.GUI.TextBlock();
  // textBlock.text = "Hello, Babylon.js GUI!";
  // textBlock.color = "white";
  // textBlock.fontSize = 24;
  // textBlock.top = "-100px"; // 화면 중앙에서 위로 100px
  // textBlock.left = "20px"; // 화면 중앙에서 왼쪽으로 20px

  let ellipse = new BABYLON.GUI.Ellipse();
  ellipse.width = "380px";
  ellipse.height = "380px";
  ellipse.color = "red";
  ellipse.thickness = 2;
  ellipse.background = "rgba(255, 0, 0, 0.1)"; // 반투명한 빨간색으로 설정

  advancedTextureCracks.addControl(ellipse);

  ellipse.linkWithMesh(sphere);
}
