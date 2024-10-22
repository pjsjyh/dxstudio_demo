function bridgeinit(mesh) {
  mesh.forEach((element) => {
    let meshname = element.name;
    if (meshname.includes("full")) {
      full.push(element);
    } else if (meshname.includes("_cam")) {
      cam.push(element);
    } else if (meshname.includes("_era")) {
      era.push(element);
    } else if (meshname.includes("_look_at")) {
      lookat.push(element);
    } else if (meshname.includes("people")) {
      people.push(element);
    } else if (meshname.includes("cctv")) {
      cctvpoint.push(element);
    } else if (meshname.includes("cluster")) {
      cluster.push(element);
    }
  });
  cameranamesort(cam);
  cameranamesort(era);
  cameranamesort(lookat);
  cameranamesort(people);
  cameranamesort(cctvpoint);
  cameranamesort(cluster);

  viewScene.cameras[0].setPosition(full[0]._position);
  setxposition(cam);
  setxposition(era);
  setxposition(lookat);
  setxposition(people);
  setxposition(cctvpoint);
  setxposition(cluster);
  setxposition(full);

  $(".btn_cam").click(function () {
    // console.log(parseInt(this.id.match(/\d+/)[0]));
    let getid = (nowclickmemo = parseInt(this.id.match(/\d+/)[0]));
    //console.log(viewScene.environmentTexture);
    // console.log(0)
    for (let j = 0; j < inclination.length; j++) {
      inclination[j].isVisible = false;
    }
    for (let k = 0; k < gui_ani.length; k++) {
      gui_ani[k].isVisible = false;
    }
    crack_Text[0].isVisible = false;
    crack_Text[1].isVisible = false;
    for (let j = 0; j < crackani.length; j++) {
      if (crackani[j].name.includes(getid)) {
        // var animationGroupToPlay = animationGroups.find(
        //   (group) => group.name === crackani[j].name
        // );

        // 애니메이션 그룹이 찾아졌다면, 실행.
        if (crackani[j]) {
          crackani[j].stop();
        }
      }
    }
    if (animationGroupCam)
      animationGroupCam.stop()
    viewerCam.animations = [];
    bridgeSenorClicked = true;
    bridgeClickednum = getid - 1;

    //console.log("before", cam[getid - 1]._position)
    //  previousAnimationGroup = camAniOnetake(viewScene.cameras[0]._position, cam[getid - 1]._position, getid - 1)
    camani(viewScene.cameras[0]._position, cam[getid - 1]._position, getid - 1);
    //combinedCamAnimation(
    //   viewScene.cameras[0]._position,
    //   cam[getid - 1]._position,
    //   era[getid - 1]._position,
    //   getid - 1
    // );advancedTextureCrack
    advancedTextureclear(advancedTextureCrack);
    advancedTextureclear(advancedTextureCrack02);

    ver4(getid - 1);
  });
}
function bridgecam(mesh) {
  bridgepeoplecctvpointgui();
  loadFonts();
  //bridgepointgui(lookat);
}
function setxposition(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].position._x = -arr[i].position._x;
  }
}
function cameranamesort(getcam) {
  getcam.sort(function (a, b) {
    if (a.name !== b.name) {
      return a.name.localeCompare(b.name);
    }
  });
}
function combinedCamAnimation(startPoint, midPoint, endPoint, clicknum) {
  var animationGroup = new BABYLON.AnimationGroup(
    "Combined Camera Animation",
    viewScene
  );

  // 첫 번째 애니메이션 정의 및 추가
  var animation1 = new BABYLON.Animation(
    "cameraAnimation1",
    "position",
    50,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  );
  var keys1 = [
    { frame: 0, value: startPoint },
    { frame: 30, value: midPoint },
  ];
  animation1.setKeys(keys1);
  animationGroup.addTargetedAnimation(animation1, viewScene.cameras[0]);

  // 두 번째 애니메이션 정의 및 추가
  var animation2 = new BABYLON.Animation(
    "cameraAnimation2",
    "position",
    50,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  );
  var keys2 = [
    { frame: 30, value: midPoint },
    { frame: 60, value: endPoint },
  ];
  animation2.setKeys(keys2);
  animationGroup.addTargetedAnimation(animation2, viewScene.cameras[0]);

  // 애니메이션 그룹 종료 시 호출되는 이벤트
  animationGroup.onAnimationGroupEndObservable.add(() => {
    // 여기에 애니메이션 종료 후 수행할 작업 추가
    inclination[clicknum * 2].isVisible = true;
    inclination[clicknum * 2 + 1].isVisible = true;
    gui_ani[clicknum * 2].isVisible = true;
    gui_ani[clicknum * 2 + 1].isVisible = true;

    for (let j = 0; j < crackani.length; j++) {
      if (crackani[j].name.includes(clicknum + 1)) {
        crackani[j].start(false, 1.0, crackani[j].from, crackani[j].to, false);
      }
    }
  });

  // 애니메이션 그룹 실행
  animationGroup.start(false, 0.2, 0, 60, false);
}
function camani(startPoint, endPoint, clicknum) {
  var animationGroup = new BABYLON.AnimationGroup(
    "My Animation Group",
    viewScene
  );

  // 애니메이션 정의 및 추가
  var animation = new BABYLON.Animation(
    "cameraAnimation",
    "position",
    100,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  );
  var keys = [];
  keys.push({
    frame: 0,
    value: startPoint,
  });
  keys.push({
    frame: 30,
    value: endPoint,
  });
  animation.setKeys(keys);
  animationGroup.addTargetedAnimation(animation, viewScene.cameras[0]);
  // 키 프레임을 애니메이션에 추가
  animationGroup.onAnimationGroupEndObservable.add(() => {
    //camrotateani(clicknum);
    camani2(clicknum);

    // 여기에 추가 작업을 수행할 수 있습니다.
  });
  animationGroup.start(
    false,
    0.2,
    animationGroup.from,
    animationGroup.to,
    false
  );
}
function camani2(clicknum) {
  var animationGroup = new BABYLON.AnimationGroup(
    "My Animation Group",
    viewScene
  );

  // 애니메이션 정의 및 추가
  var animation = new BABYLON.Animation(
    "cameraAnimation",
    "position",
    50,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  );
  var keys = [];
  keys.push({
    frame: 0,
    value: cam[clicknum].position,
  });
  keys.push({
    frame: 50,
    value: era[clicknum].position,
  });
  animation.setKeys(keys);
  animationGroup.addTargetedAnimation(animation, viewScene.cameras[0]);
  // 키 프레임을 애니메이션에 추가
  animationGroup.onAnimationGroupEndObservable.add(() => {
    inclination[clicknum * 2].isVisible = true;
    inclination[clicknum * 2 + 1].isVisible = true;
    // console.log(gui_ani[clicknum * 2]);
    gui_ani[clicknum * 2].isVisible = true;
    gui_ani[clicknum * 2 + 1].isVisible = true;
    gui_ani[clicknum * 2].lookAt(viewerCam.position);
    gui_ani[clicknum * 2].rotation.y += Math.PI;

    gui_ani[clicknum * 2 + 1].lookAt(viewerCam.position);
    gui_ani[clicknum * 2 + 1].rotation.y += Math.PI;
    if (clicknum < 2) {
      crack_Text[clicknum].isVisible = true;
      if (
        !document
          .querySelector(".modelinfo-view-top-tab-device-leftWidget-list")
          .classList.contains("eventoccur")
      )
        if (clicknum == 0) crack_Text[clicknum].isVisible = false;
      crack_Text[2].isVisible = false;
      crack_Text[1].isVisible = true;
    }

    for (let j = 0; j < crackani.length; j++) {
      if (crackani[j].name.includes(clicknum + 1)) {
        // var animationGroupToPlay = animationGroups.find(
        //   (group) => group.name === crackani[j].name
        // );

        // 애니메이션 그룹이 찾아졌다면, 실행.
        if (crackani[j]) {
          if (clicknum != 2)
            crackani[j].start(
              false,
              1.0,
              crackani[j].from,
              crackani[j].to,
              false
            );
        }
      }
    }
  });
  animationGroup.start(
    false,
    1.5,
    animationGroup.from,
    animationGroup.to,
    false
  );
  animationGroup.start(
    false,
    1.5,
    animationGroup.from,
    animationGroup.to,
    false
  );
}
function camAniOnetake(startPoint, endPoint, clicknum) {
  if (previousAnimationGroup) {
    previousAnimationGroup.stop();
    previousAnimationGroup = null;
  }
  console.log(startPoint, endPoint);

  let animationGroup_b = new BABYLON.AnimationGroup(
    "My Animation Group",
    viewScene
  );

  // 첫 번째 애니메이션 정의 및 추가
  var animation1 = new BABYLON.Animation(
    "cameraAnimation1",
    "position",
    50,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  );
  var keys1 = [];
  keys1.push({ frame: 0, value: startPoint });
  keys1.push({ frame: 60, value: endPoint });
  animation1.setKeys(keys1);
  animationGroup_b.addTargetedAnimation(animation1, viewScene.cameras[0]);

  // 두 번째 애니메이션 정의 및 추가
  var animation2 = new BABYLON.Animation(
    "cameraAnimation2",
    "position",
    50,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  );
  var keys2 = [];
  keys2.push({ frame: 0, value: cam[clicknum].position });
  keys2.push({ frame: 30, value: era[clicknum].position });
  animation2.setKeys(keys2);
  animationGroup_b.addTargetedAnimation(animation2, viewScene.cameras[0]);

  // 애니메이션 종료 시 이벤트 핸들러
  animationGroup_b.onAnimationGroupEndObservable.add(() => {
    previousAnimationGroup.stop();
    previousAnimationGroup = null;
    inclination[clicknum * 2].isVisible = true;
    inclination[clicknum * 2 + 1].isVisible = true;
    gui_ani[clicknum * 2].isVisible = true;
    gui_ani[clicknum * 2 + 1].isVisible = true;
    gui_ani[clicknum * 2].lookAt(viewerCam.position);
    gui_ani[clicknum * 2].rotation.y += Math.PI;

    gui_ani[clicknum * 2 + 1].lookAt(viewerCam.position);
    gui_ani[clicknum * 2 + 1].rotation.y += Math.PI;
    if (clicknum < 2) {
      crack_Text[clicknum].isVisible = true;
      if (
        !document
          .querySelector(".modelinfo-view-top-tab-device-leftWidget-list")
          .classList.contains("eventoccur")
      ) {
        if (clicknum == 1) crack_Text[clicknum].isVisible = false;
      }
      console.log(crack_Text);
      crack_Text[2].isVisible = false;
    }

    for (let j = 0; j < crackani.length; j++) {
      if (crackani[j].name.includes(clicknum + 1)) {
        if (crackani[j]) {
          if (clicknum != 2)
            crackani[j].start(
              false,
              1.0,
              crackani[j].from,
              crackani[j].to,
              false
            );
        }
      }
    }
  });

  // 애니메이션 그룹 재생
  animationGroup_b.start(
    false,
    0.2,
    animationGroup_b.from,
    animationGroup_b.to,
    false
  );

  // 이전 애니메이션 그룹 저장
  previousAnimationGroup = animationGroup_b;

  return animationGroup_b;
}

function ver4(clicknum) {
  var epsilon = 0.05; // 목표 지점에 "충분히 가까워졌는지"를 판단하는 임계값
  var lerpRate = 0.105; // 보간 비율

  // 매 프레임마다 실행될 함수를 scene의 onBeforeRenderObservable에 등록
  var observer = viewScene.onBeforeRenderObservable.add(() => {
    // 현재 target과 newTarget 사이의 거리를 계산
    if (
      BABYLON.Vector3.DistanceSquared(
        viewScene.cameras[0].target,
        lookat[clicknum].position
      ) >
      epsilon * epsilon
    ) {
      viewScene.cameras[0].target = BABYLON.Vector3.Lerp(
        viewScene.cameras[0].target,
        lookat[clicknum].position,
        lerpRate
      );
    } else {
      // 목표 지점에 도달했으면, 카메라 target을 최종 목표 지점으로 설정하고 observer를 제거
      //viewScene.cameras[0].target = lookat[clicknum].position;
      viewScene.onBeforeRenderObservable.remove(observer);
    }
  });
}
var createLink = function (fontFamily) {
  var headID = document.head;
  var link = document.createElement("link");
  link.rel = "stylesheet";

  headID.appendChild(link);
  link.href = "https://fonts.googleapis.com/css?family=" + fontFamily;
};
var loadFonts = function () {
  jQuery.getScript(
    "https://cdnjs.cloudflare.com/ajax/libs/fontfaceobserver/2.0.1/fontfaceobserver.js",
    function () {
      var font = new FontFaceObserver("Nunito Sans");
      createLink(font.family);

      font.load().then(function () {
        bridgepointgui(lookat, font.family);
      });
    }
  );
};
function bridgepointgui(lookat, fontf) {
  advancedTexture4 = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
    "UI",
    undefined,
    viewScene
  );
  let textbox = [
    "기울기/균열",
    "기울기/균열",
    "기울기/균열",
    "기울기",
    "기울기",
    "기울기",
    "기울기",
  ];
  let inputs = document.querySelectorAll(
    '.modelinfo-view-top-tab-device-leftWidget-list input[type="radio"]'
  );

  lookat.forEach((arr, index) => {
    let sphere = BABYLON.MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 1 },
      viewScene
    );
    sphere.position.x = arr.position.x;
    sphere.position.y = arr.position.y;
    sphere.position.z = arr.position.z;
    var material = new BABYLON.StandardMaterial("material", viewScene);
    // 투명도 설정
    material.alpha = 0;
    // 메시에 재질 할당
    sphere.material = material;

    let target = new BABYLON.GUI.Image("target", bridgepoint_base);
    target.id = "target" + (index + 1);
    if (index == 1 || index == 2) {
      target.source = bridgepointerror_base;
      target.width = "170px";
      target.height = "170px";
    } else {
      target.width = "100px";
      target.height = "100px";
    }
    target.hoverCursor = "pointer";
    advancedTexture4.addControl(target);
    target.linkWithMesh(sphere);

    let rect = new BABYLON.GUI.Rectangle("rect");

    rect.height = "44px";
    rect.width = "140px"; // 너비 설정
    rect.thickness = 0;
    rect.isVisible = false; // 초기에는 숨김
    advancedTexture4.addControl(rect);

    let blurredBackground = new BABYLON.GUI.Image(
      "background",
      bridgegui_base2
    );
    blurredBackground.stretch = BABYLON.GUI.Image.STRETCH_FILL; // 이미지를 늘려서 채우기
    rect.addControl(blurredBackground); // Rectangle에 이미지 추가
    //rect.background = "rgba(0, 0, 0, 0.5)";
    rect.cornerRadius = 5;

    rect.linkWithMesh(sphere);
    rect.linkOffsetX = 0;
    rect.linkOffsetY = -50;

    let panel = new BABYLON.GUI.StackPanel();
    panel.isVisible = true;
    panel.isVertical = false; // 수평 레이아웃으로 설정
    panel.width = "140px";
    panel.height = "44px";
    rect.addControl(panel); // Rectangle에 패널 추가

    let text1 = new BABYLON.GUI.TextBlock();
    text1.text = "측점" + (index + 1);
    text1.color = "white";
    text1.top = "-2px";
    text1.fontSize = "16px";
    text1.textHorizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    text1.paddingLeft = "16px";
    text1.fontFamily = fontf;
    panel.addControl(text1);

    let text2 = new BABYLON.GUI.TextBlock();
    text2.text = textbox[index];
    text2.color = "#CDCDCD";
    text2.top = "-2px";
    text2.fontSize = "10px";
    text2.textHorizontalAlignment =
      BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    text2.paddingRight = "16px";

    panel.addControl(text2);

    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    context.font = "1rem Noto Sans";
    let metrics = context.measureText("측점 " + (index + 1) + textbox[0]);
    let textWidth = metrics.width;
    rect.width = textWidth * 1.3 + "px";
    target.onPointerEnterObservable.add(() => {
      rect.isVisible = true; // 마우스 오버 시 Rect 표시
    });
    target.onPointerOutObservable.add(() => {
      rect.isVisible = false; // 마우스가 벗어나면 Rect 숨김
    });
    viewScene.onBeforeRenderObservable.add(() => {
      var cameraPosition = viewScene.activeCamera.position;
      var distance = BABYLON.Vector3.Distance(cameraPosition, sphere.position);
      // 거리에 따른 가시성 결정
      let stylemapSet = $(
        "input[name='modelinfo-view-top-tabs']:checked"
      ).val();
      if (stylemapSet == "Device") {
        if (distance < 60) {
          // 예시: 10 유닛 이내에 있을 때만 보이게 설정
          target.isVisible = false;
          rect.isVisible = false;
        } else {
          target.isVisible = true;
        }
      }
    });
    advancedTexture4.rootContainer.children.forEach(function (control) {
      control.isVisible = false;
    });
    target.onPointerClickObservable.add(function (eventData, eventState) {
      if (animationGroupCam) {
        animationGroupCam.restart();
        animationGroupCam.stop();
        animationRotateStart = false;
      }
      viewerCam.animations = [];
      if (!memoclickon) {
        console.log(viewScene.cameras[0]);
        viewScene.cameras[0].animations = [];
        for (let j = 0; j < crackani.length; j++) {
          if (crackani[j].name.includes(index)) {
            // var animationGroupToPlay = animationGroups.find(
            //   (group) => group.name === crackani[j].name
            // );

            // 애니메이션 그룹이 찾아졌다면, 실행.
            if (crackani[j]) {
              crackani[j].stop();
            }
          }
        }

        bridgeSenorClicked = true;
        bridgeClickednum = index;
        camani(viewScene.cameras[0]._position, cam[index]._position, index);
        ver4(index);
        inputs[index];
        let clickinput = document.getElementById(
          "device-leftWidget-sensor" + (index + 1)
        );

        clickinput.checked = true;

        let deviceRadioButtonset = $(
          "input[name='device-leftWidget-sensors']:checked"
        ).val();
        $(".modelinfo-view-top-tab-device-center").css("display", "none");
        $(".modelinfo-view-top-tab-device-right").css("display", "none");
        $(".modelinfo-view-top-tab-device-right-graphBtn").prop(
          "checked",
          false
        );
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
            else
              rightPanelUrl = "./img/bridgePage/itemSensor/item_box_panel.png";
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

        $(".modelinfo-view-top-tab-device-right img").attr(
          "src",
          rightPanelUrl
        );
        $(".modelinfo-view-top-tab-device-right").css("display", "flex");
        $(".modelinfo-view-top-tab-device-bottom").css("display", "flex");
      }
    });

    inputs[index].addEventListener("mouseenter", function () {
      rect.isVisible = true;
    });
    inputs[index].addEventListener("mouseleave", function () {
      rect.isVisible = false;
    });
  });
}
function bridgepeoplecctvpointgui() {
  advancedTexture6 = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
    "UI",
    undefined,
    viewScene
  );
  let index = 1;
  let areaimg = [cctvbox1_base, cctvbox2_base, cctvbox3_base];
  let peopleroundimg = [cctvround1_base, cctvround2_base, cctvround3_base];
  let peoplesize = [170, 177, 257];
  let rearr = [people[0], cctvpoint[0], cctvpoint[1]];
  rearr.forEach((arr, index) => {
    let sphere2 = BABYLON.MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 1 },
      viewScene
    );
    sphere2.position.x = cluster[index].position.x;
    sphere2.position.y = cluster[index].position.y;
    sphere2.position.z = cluster[index].position.z;
    var material2 = new BABYLON.StandardMaterial("material", viewScene);
    material2.alpha = 0;
    sphere2.material = material2;
    var peoplecluster = new BABYLON.GUI.Image(
      "peoplecluster" + index,
      peopleroundimg[index]
    );
    peoplecluster.width = peoplesize[index] + "px";
    peoplecluster.height = peoplesize[index] + "px";
    peoplecluster.isVisible = false;
    peoplecluster.stretch = BABYLON.GUI.Image.STRETCH_FILL;
    advancedTexture6.addControl(peoplecluster);

    peoplecluster.linkWithMesh(sphere2);
    //////////////////
    let sphere = BABYLON.MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 1 },
      viewScene
    );
    sphere.position.x = arr.position.x;
    sphere.position.y = arr.position.y;
    sphere.position.z = arr.position.z;
    var material = new BABYLON.StandardMaterial("material", viewScene);
    material.alpha = 0;
    sphere.material = material;
    let target = new BABYLON.GUI.Image("target", cctv_base);
    target.width = "50px";
    target.height = "50px";

    advancedTexture6.addControl(target);
    target.linkWithMesh(sphere);

    var backgroundRect = new BABYLON.GUI.Rectangle("rect");
    backgroundRect.width = "140px";
    backgroundRect.height = "44px";
    backgroundRect.cornerRadius = 5;
    backgroundRect.color = "white";
    backgroundRect.thickness = 0;
    backgroundRect.isVisible = false;
    backgroundRect.background = "transparent";
    advancedTexture6.addControl(backgroundRect);

    var backgroundImage = new BABYLON.GUI.Image(
      "backgroundImage",
      areaimg[index]
    );
    backgroundImage.width = "100%";
    backgroundImage.height = "100%";

    backgroundImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
    backgroundRect.addControl(backgroundImage);

    backgroundRect.linkWithMesh(sphere);
    backgroundRect.linkOffsetX = 0;
    backgroundRect.linkOffsetY = -50;
    target.onPointerEnterObservable.add(() => {
      backgroundRect.isVisible = true; // 마우스 오버 시 Rect 표시
    });
    target.onPointerOutObservable.add(() => {
      backgroundRect.isVisible = false; // 마우스 오버 시 Rect 표시
    });
    ///////////////////////////////////////////////////////////

    target.onPointerDownObservable.add(() => {
      peoplecluster.isVisible = !peoplecluster.isVisible;

      $("#population_density-device-part" + (index + 1)).prop(
        "checked",
        peoplecluster.isVisible
      );
      if (peoplecluster.isVisible) {
        $("#cctv" + index).css("border", "1.8px solid rgba(7, 255, 255, 1)");
      } else {
        $("#cctv" + index).css(
          "border",
          "1.8px solid rgba(122, 199, 255, 0.10)"
        );
      }

      //div check가 되어야함..  population_density-device-part + (index+1)
    });
  });
  // cctvpoint.forEach((arr, index) => {
  //   let sphere = BABYLON.MeshBuilder.CreateSphere(
  //     "sphere",
  //     { diameter: 1 },
  //     viewScene
  //   );
  //   sphere.position.x = arr.position.x;
  //   sphere.position.y = arr.position.y;
  //   sphere.position.z = arr.position.z;
  //   var material = new BABYLON.StandardMaterial("material", viewScene);
  //   // 투명도 설정
  //   material.alpha = 0;
  //   // 메시에 재질 할당
  //   sphere.material = material;
  //   let target = new BABYLON.GUI.Image("target", cctv_base);
  //   target.width = "50px";
  //   target.height = "50px";

  //   advancedTexture6.addControl(target);
  //   target.linkWithMesh(sphere);
  // });
  advancedTexture6.rootContainer.children.forEach(function (control) {
    control.isVisible = false;
  });
}
function peoplegui() { }
