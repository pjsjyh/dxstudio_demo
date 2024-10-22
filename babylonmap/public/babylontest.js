// Babylon.js를 사용하여 3D 모델 표시
let viewerCam;
let gridlineList;
$("#renderCanvas").on("canvasAnimationback", function () {
  console.log("애니메이션이 끝났습니다.");
});
function maekviewmodel() {
  let canvasrr = document.getElementById("renderCanvas");
  let enginerr = new BABYLON.Engine(canvasrr, true);
  viewScene = new BABYLON.Scene(enginerr);

  viewerCam = new BABYLON.ArcRotateCamera(
    "Camera",
    0,
    0,
    10,
    new BABYLON.Vector3(0, 3, 5),
    viewScene
  );
  viewerCam.setPosition(new BABYLON.Vector3(0, 3, 0));

  viewScene.cameras[0].setPosition(new BABYLON.Vector3(0, 3, 5));
  viewScene.cameras[0].setTarget(new BABYLON.Vector3(0, 3, 0));
  viewerCam.attachControl(canvasrr, true);
  viewScene.activeCamera = viewerCam;

  // let lightview = new BABYLON.HemisphericLight(
  //   "hemiLight",
  //   new BABYLON.Vector3(1, 5, 0),
  //   viewScene
  // );
  // lightview.intensity = 10;

  let lighting = BABYLON.CubeTexture.CreateFromPrefilteredData(
    "https://assets.babylonjs.com/environments/environmentSpecular.env",
    viewScene
  );
  lighting.name = "runyonCanyon";
  lighting.gammaSpace = false;
  viewScene.environmentTexture = lighting;
  const skybox = viewScene.createDefaultSkybox(
    null,
    true,
    (viewScene.activeCamera.maxZ - viewScene.activeCamera.minZ) / 2,
    0.3,
    false
  );
  viewScene.createDefaultLight();
  viewScene.environmentTexture.intensity = 10;
  let objectPosition = new BABYLON.Vector3(-1, -0.8, 0.5);

  //그리드 생성
  let gridSize = 20;
  gridlineList = createGridView(gridSize, viewScene);
  //skybox.material.alpha = 0;
  // 배경을 투명하게 만들기
  viewScene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

  //skybox.setEnabled(false);
  // pointLight.intensity = 10.0; // 필요에 따라 조절
  viewScene.createDefaultCameraOrLight(false, false, true);
  viewerCam.detachControl(canvasrr);

  //클릭시 해당객체로 카메라 이동

  canvasrr.addEventListener("click", function (event) {
    if (
      $(".modelinfo-view-title-bottom-name").text() ==
      "Smart Green Industrial Complex"
    ) {
      // 클릭한 화면 좌표
      var pickInfo = viewScene.pick(viewScene.pointerX, viewScene.pointerY);

      // 클릭한 객체 확인
      if (pickInfo.hit) {
        if (!pickInfo.pickedMesh.name.includes("Cylinder_space")) {
          //카메라를 옮기기 무브투.. camera_position
          console.log(0)
          cameraMoving(viewerCam, facility_cam, pickInfo.pickedMesh);
        }
      }
    }
  });

  // setGridVisibility(false, gridlineList);

  $("#icon-grid-checkbox").on("change", function () {
    if (this.checked) {
      setGridVisibilitys(true, gridlineList);
    } else {
      setGridVisibilitys(false, gridlineList);
    }
  });

  // enginerr.runRenderLoop(function () {
  //   console.log("render");
  //   viewScene.render();
  // });
  // window.addEventListener("resize", function () {
  //   enginerr.resize();
  // });
  //loadJsondata("firth", findm.divId, viewScene);
  advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
    "UI",
    undefined,
    viewScene
  );
  $("#view-model").click(function () {
    viewerCam.attachControl(canvasrr);
    //$("#view-model-control-btn").css("display", "none");
  });
  $(".model-view-icon-exit-btn").click(function (e) {

    advancedTextureclear(advancedTexture3);
    advancedTextureclear(advancedTexture);
    newpositionsphere.position = new BABYLON.Vector3(0, 0, 0);

    if (createclickobj) {
      enginerr.stopRenderLoop();

      advancedTextureclear(advancedTexture);
      viewScene.meshes.forEach(function (mesh) {
        if (mesh.name != "linesX" && mesh.name != "linesZ") mesh.dispose();
      });
      //createclickobj.dispose();
      viewerCam.detachControl(canvasrr);
      $(".new-memo-div").remove();
      $("#model-view-right-memo-list").css("justify-content", "center");
      $("#model-view-right-memo-list").css("flex-direction", "row");
      $("#model-view-right-memo-list-info").css("display", "flex");
      $("#model-view-right-memo-list-background").css("display", "block");
      $("#model-view-right-memo-list").css("overflow-y", "visible");
      $("#model-view-right-memo-list").css("overflow-x", "visible");
    }

    viewmodecheck = false;
    $("#modelinfo-view").css("display", "none");
    $(".eventoccur").removeClass("eventoccur");
  });
  // $("#lock-checkbox").change(function () {
  //   if ($(this).is(":checked")) {
  //     camera.detachControl(canvasrr);
  //   } else {
  //     camera.attachControl(canvasrr);
  //   }
  // });

  $("#model-view-icon-eye-checkbox").click(function () {
    if ($(this).is(":checked")) {
      $("#model-view-infogroup").css("visibility", "hidden");
      $("#model-view-group-right").css("visibility", "hidden");
    } else {
      $("#model-view-infogroup").css("visibility", "visible");
      $("#model-view-group-right").css("visibility", "visible");
    }
  });
  $("#reset-checkbox").click(function () {
    viewScene.cameras[0].setPosition(
      new BABYLON.Vector3(-5, 2.0147617632807735, -0.16621254058732557)
    );
    viewScene.cameras[0].setTarget(BABYLON.Vector3.Zero());
    cameraSet_viewer(BABYLON.Vector3.Zero());

    setGridVisibilitys(false, gridlineList);
  });
  viewerCam.wheelPrecision = 20;
  let zoomSpeed = 0.01; // 줌 속도 조절
  canvasrr.addEventListener("wheel", function (event) {
    let delta = event.deltaY;

    // 현재 카메라와의 거리 계산
    let currentRadius = viewerCam.radius;

    // 감속 적용 (더 빠르게 줌 아웃하도록 함)
    let zoomFactor = 1.0 + (delta * zoomSpeed) / currentRadius;

    // 새로운 카메라 거리 설정
    viewerCam.radius *= zoomFactor;
  });
  viewerModel_distance =
    viewerModel_distance / (2 * Math.tan(viewerCam.fov / 2));
  viewerCam.radius = viewerModel_distance;

  viewerCam.lowerRadiusLimit = viewerModel_distance - 2;
  viewerCam.upperRadiusLimit = viewerModel_distance + 2;

  viewerCam = viewerCam;
}

let savedFrame;

let animationRotateStart = false;
let animationGroupCam;
let gridBoolean = false;
let clickedObj = false;
let objectPositions = BABYLON.Vector3.Zero();
function makeview_facility() {
  adjustVideoSize();
  let viewCanvas = document.getElementById("renderCanvas");
  let viewerEngin = new BABYLON.Engine(viewCanvas, true);
  viewScene = new BABYLON.Scene(viewerEngin);

  viewerCam = new BABYLON.ArcRotateCamera(
    "Camera",
    0,
    0,
    10,
    new BABYLON.Vector3(0, 3, 5),
    viewScene
  );
  viewerCam.setPosition(new BABYLON.Vector3(0, 3, 0));

  viewScene.cameras[0].setPosition(new BABYLON.Vector3(0, 3, 5));
  viewScene.cameras[0].setTarget(new BABYLON.Vector3(0, 3, 0));
  viewerCam.attachControl(viewCanvas, true);
  viewScene.activeCamera = viewerCam;
  // let lightview = new BABYLON.HemisphericLight(
  //   "hemiLight",
  //   new BABYLON.Vector3(1, 5, 0),
  //   viewScene
  // );
  // lightview.intensity = 10;
  viewScene
    .getEngine()
    .getRenderingCanvas()
    .addEventListener("pointermove", moveGUIIcon);
  let lighting = BABYLON.CubeTexture.CreateFromPrefilteredData(
    "https://assets.babylonjs.com/environments/environmentSpecular.env",
    viewScene
  );
  lighting.name = "runyonCanyon";
  lighting.gammaSpace = false;
  viewScene.environmentTexture = lighting;
  const skybox = viewScene.createDefaultSkybox(
    null,
    true,
    (viewScene.activeCamera.maxZ - viewScene.activeCamera.minZ) / 2,
    0.3,
    false
  );
  viewScene.createDefaultLight();
  viewScene.environmentTexture.intensity = 10;

  let objectPosition = new BABYLON.Vector3(-1, -0.8, 0.5);

  //그리드 생성
  let gridSize = 20;
  gridlineList = createGridView(gridSize, viewScene);
  //skybox.material.alpha = 0;
  // 배경을 투명하게 만들기
  viewScene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

  //skybox.setEnabled(false);
  // pointLight.intensity = 10.0; // 필요에 따라 조절
  viewScene.createDefaultCameraOrLight(false, false, true);
  viewerCam.detachControl(viewCanvas);

  compressorhighlightLayer = new BABYLON.HighlightLayer(
    "highlightLayer",
    viewScene
  );
  compressorhighlightLayer.blurVerticalSize = 0.7;
  compressorhighlightLayer.blurHorizontalSize = 0.7;
  compressorhighlightLayer.innerGlow = false;
  //클릭시 해당객체로 카메라 이동

  viewCanvas.addEventListener("click", function (event) {
    // console.log("??????");
    var pickInfo = viewScene.pick(viewScene.pointerX, viewScene.pointerY);
    // console.log(pickInfo.pickedMesh);
    if (
      $(".modelinfo-view-title-bottom-name").text() ==
      "Smart Green Industrial Complex"
    ) {
      // 클릭한 화면 좌표
      var pickInfo = viewScene.pick(viewScene.pointerX, viewScene.pointerY);

      // 클릭한 객체 확인
      if (pickInfo.hit) {
        if (
          !pickInfo.pickedMesh.name.includes("Cylinder_space") &&
          !pickInfo.pickedMesh.name.includes("sphere") &&
          !pickInfo.pickedMesh.name.includes("label")
        ) {
          clearInterval(toggleInterval);
          toggleInterval = null;
          compressorhighlightLayer.removeAllMeshes();

          //카메라를 옮기기 무브투.. camera_position
          animationRotateStart = false;
          if (animationRotateStart) {
            animationGroupCam.restart();
            animationGroupCam.stop();
          }
          viewerCam.animations = [];
          clickedObj = true;
          objectPositions = pickInfo.pickedMesh.absolutePosition;
          animationSet(
            0,
            30,
            viewerCam.position.clone(),
            facility_cam.position.clone(),
            "animationGroup_cam",
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT,
            new BABYLON.Vector3(
              objectPositions.x,
              objectPositions.y,
              objectPositions.z
            ),
            "position"
          ); ///고장할 떄 풀기
          //cameraMoving(viewerCam, facility_cam, pickInfo.pickedMesh)
          //console.log(pickInfo.pickedMesh); //"internal-06-03_primitive0"

          //cameraMoving(viewerCam, facility_cam, pickInfo.pickedMesh);
          let findparnet = pickInfo.pickedMesh;
          while (true) {
            if (findparnet._parentNode != null) {
              findparnet = findparnet._parentNode;
            } else {
              break;
            }
          }
          let minVertex = new BABYLON.Vector3(
            Number.MAX_VALUE,
            Number.MAX_VALUE,
            Number.MAX_VALUE
          );
          let maxVertex = new BABYLON.Vector3(
            Number.MIN_VALUE,
            Number.MIN_VALUE,
            Number.MIN_VALUE
          );

          findparnet.getChildMeshes().forEach((mesh) => {
            if (
              !mesh.name.includes("space") &&
              !mesh.name.includes("arrow") &&
              !mesh.name.includes("label") &&
              !mesh.name.includes("camera") &&
              !mesh.name.includes("cam") &&
              !mesh.name.includes("era") &&
              !mesh.name.includes("full_cam")
            ) {
              let boundingBox = mesh.getBoundingInfo();
              minVertex = BABYLON.Vector3.Minimize(
                minVertex,
                boundingBox.boundingBox.centerWorld
              );
              maxVertex = BABYLON.Vector3.Maximize(
                maxVertex,
                boundingBox.boundingBox.centerWorld
              );
            }
          });
          let center = BABYLON.Vector3.Center(minVertex, maxVertex);
          let height = maxVertex.y - minVertex.y;
          // GUI 요소를 추가할 위치 계산
          let guiPosition = new BABYLON.Vector3(
            center.x,
            center.y + height,
            center.z
          );
          if (
            newpositionsphere.position._x == 0 &&
            newpositionsphere.position._y == 0 &&
            newpositionsphere.position._z == 0
          ) {
            newpositionsphere = BABYLON.MeshBuilder.CreateSphere(
              "sphere",
              { diameter: 0.8 },
              viewScene
            );

            //newpositionsphere.parent = findparnet[0];

            newpositionsphere.position = guiPosition;
            var material = new BABYLON.StandardMaterial("material", viewScene);
            // 투명도 설정
            material.alpha = 0;
            // 메시에 재질 할당
            newpositionsphere.material = material;
            advancedTextureclear(advancedTexture3);
            makeViewerlabel(newpositionsphere);
          }
        } else {
          //console.log(pickInfo.pickedMesh.name);
          if (!pickInfo.pickedMesh.name.includes("sphere")) {
            advancedTextureclear(advancedTexture3);
            newpositionsphere.position = new BABYLON.Vector3(0, 0, 0);
            advancedTexture.rootContainer.children.forEach(function (control) {
              if (control.name == "target") {
                control.isVisible = false;
              }
            });
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
          }
        }
      } else {
        // console.log(pickInfo.pickedMesh);
        advancedTextureclear(advancedTexture3);
        newpositionsphere.position = new BABYLON.Vector3(0, 0, 0);
        advancedTexture.rootContainer.children.forEach(function (control) {
          if (control.name == "target") {
            control.isVisible = false;
          }
        });
      }
    }
  });
  viewCanvas.addEventListener("pointerdown", function (event) {
    // 카메라의 위치를 가져옴
    var cameraPosition = viewerCam.position;

    // 마우스 클릭한 위치를 화면 좌표로부터 바빌론 좌표로 변환
    var pickResult = viewScene.pick(viewScene.pointerX, viewScene.pointerY);

    let elements = document.querySelectorAll(".new-memo-div");

    elements.forEach((element) => {
      element.style.background = "rgba(0, 0, 0, 0.20)"; // 배경색 변경
    });
    let children = advancedTexture5.rootContainer.children.slice();
    children.forEach((child) => {
      if (child.name.includes("memolist_background"))
        child._children[0].source = input_demo;
    });
    //console.log(event, pickResult);
    if (
      pickResult.pickedMesh != null &&
      pickResult &&
      pickResult.hit & (pickResult.pickedMesh.name != "Ground") &&
      memoclickon
    ) {
      // 레이캐스트를 통해 교차한 객체의 위치를 얻음
      var intersectionPoint = pickResult.pickedPoint;

      // 레이 시작점을 카메라의 위치로 설정
      var rayOrigin = cameraPosition;

      // 카메라의 시선 방향으로 레이 방향 설정
      var rayDirection = BABYLON.Vector3.Normalize(
        intersectionPoint.subtract(cameraPosition)
      );

      var rayLength = 100; // 레이의 최대 길이

      // 레이 쏘기
      // var ray = new BABYLON.Ray(rayOrigin, rayDirection, rayLength);
      let ray = pickResult.ray;
      var rayHelper = new BABYLON.RayHelper(ray);
      //rayHelper.show(viewScene, new BABYLON.Color3(1, 1, 1));

      let sphere = BABYLON.MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 0.1 },
        viewScene
      );
      sphere.position = intersectionPoint; // 공을 카메라의 위치에 생성
      let material = new BABYLON.StandardMaterial("material", viewScene);
      // 투명도 설정
      material.alpha = 0;
      // 메시에 재질 할당
      sphere.material = material;
      console.log("??" + memolistnum);
      makememogui(sphere);
      makememoinputgui(sphere);
      makememo(sphere.position);
      //crackgui(sphere);
      memolistnum += 1;
      console.log(memoclickon);
      //memoclickon = false;
    } else {
      let ray = pickResult.ray;
      var rayHelper = new BABYLON.RayHelper(ray);
      //rayHelper.show(viewScene, new BABYLON.Color3(0, 0, 1));
    }

    memoclickon = false;
  });
  //그리드 Visible 버튼
  var gridBtns = document.querySelectorAll(".model-view-icon-grid");

  gridBtns.forEach(function (grid_btn) {
    grid_btn.addEventListener("click", function () {
      gridBoolean = !gridBoolean;
      setGridVisibilitys(gridBoolean, gridlineList);
    });
    let gridBtnCheckbox = grid_btn.querySelector('input[type = "checkbox"]');
    gridBtnCheckbox.addEventListener("change", function () {
      if (this.checked) {
        setGridVisibilitys(true, gridlineList);
      } else {
        setGridVisibilitys(false, gridlineList);
      }
    });
  });

  advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
    "UI",
    undefined,
    viewScene
  );

  //viewer page 활성화
  $(".view-model").click(function () {
    viewerCam.attachControl(viewCanvas);
    // $(".view-model-control-btn").css("display", "none");
  });
  $(".model-view-icon-exit-btn").click(function (e) {

    bridgeSenorClicked = false;
    bridgeClickednum = -1;
    if (animationGroupCam) {
      animationRotateStart = false;
      animationGroupCam.restart();
      animationGroupCam.stop();
      viewerCam.animations = [];
      clickedObj = false; $(".videoplay-checkbox-btn").prop("checked", false);
    }
    if (previousAnimationGroup) {
      previousAnimationGroup.stop();
      previousAnimationGroup = null;
    }
    if (toggleInterval != null) clearInterval(toggleInterval);
    toggleInterval = null;
    if (occurEventHandler != null) clearTimeout(occurEventHandler);
    setGridVisibilitys(false, gridlineList);

    deviceCheck = true;
    $(".modelinfo-view-eventpopup").css("display", "none");
    $("#main-top-bar").css("display", "flex");
    advancedTextureclear(advancedTexture3);
    advancedTextureclear(advancedTexture);
    advancedTextureclear(advancedTexture6);
    advancedTextureclear(advancedTextureCrack);
    advancedTextureclear(advancedTextureCrack02);

    $("#AlarmDiv-contents-list-content-alram1").prop("checked", function () {
      return false;
    });
    // 가장 가까운 부모 div 중 클래스가 'AlarmDiv-contents-list-content' 인 요소를 찾습니다.
    let AlarmDivparentDiv = $("#AlarmDiv-contents-list-content-alram1").closest(
      ".AlarmDiv-check"
    );
    // 만약 해당 부모 요소가 존재한다면, 그 안에서 클래스 'AlarmDiv-check'를 제거합니다.
    if (AlarmDivparentDiv) {
      AlarmDivparentDiv.removeClass("AlarmDiv-check");
    }
    newpositionsphere.position = new BABYLON.Vector3(0, 0, 0);
    $("#model-view-right-memo").css("display", "none");
    memoclickon = false;
    guimemoon(false);
    gui_ani = [];
    crack_Text = [];
    if (createclickobj) {
      viewerEngin.stopRenderLoop();
      advancedTextureclear(advancedTexture);
      advancedTextureclear(advancedTexture4);
      advancedTextureclear(advancedTexture5);
      viewScene.meshes.forEach(function (mesh) {
        if (mesh.name != "linesX" && mesh.name != "linesZ") mesh.dispose();
      });
      //createclickobj.dispose();
      viewerCam.detachControl(viewCanvas);
      $(".new-memo-div").remove();
      $("#model-view-right-memo-list").css("justify-content", "center");
      $("#model-view-right-memo-list").css("flex-direction", "row");
      $("#model-view-right-memo-list-info").css("display", "flex");
      $("#model-view-right-memo-list-background").css("display", "block");
      $("#model-view-right-memo-list").css("overflow-y", "visible");
      $("#model-view-right-memo-list").css("overflow-x", "visible");
    }
    viewmodecheck = false;
    $("#modelinfo-view").css("display", "none");
    $(".modelinfo-view-top-tab-device-leftWidget-list").removeClass(
      "eventoccur"
    );
    //highlightCrack.removeAllMeshes();

    //다리 버전 안보이게 하기
    $("#Overview").prop("checked", function () {
      return true;
    });

    $(".modelinfo-view-top-tab-overview").css("display", "flex");
    $(".modelinfo-view-top-tab-device").css("display", "none");
    $(".modelinfo-view-top-tab-population_density").css("display", "none");
    $(".AlarmDiv-position").css("display", "none");
    $("#topAlarmBn input").prop("checked", false);
    $("#memo-checkbox").prop("checked", false);
    //device
    let radioBoxes = document.getElementsByName("device-leftWidget-sensors");
    for (let i = 0; i < radioBoxes.length; i++) {
      radioBoxes[i].checked = false;
    }
    $(".modelinfo-view-top-tab-device-center").css("display", "none");
    $(".modelinfo-view-top-tab-device-right").css("display", "none");
    $(".modelinfo-view-top-tab-device-right-graphBtn").prop("checked", false);
    $(".modelinfo-view-top-tab-device-bottom").css("display", "none");

    viewScene
      .getEngine()
      .getRenderingCanvas()
      .classList.remove("animateCanvas");
    viewScene
      .getEngine()
      .getRenderingCanvas()
      .classList.remove("animateCanvasback");
  });

  //카메라 원상복귀
  $(".model-view-icon-reset").click(function () {

    bridgeSenorClicked = false;
    bridgeClickednum = -1;
    if (animationGroupCam) {
      animationRotateStart = false;
      animationGroupCam.restart();
      animationGroupCam.stop();
      viewerCam.animations = [];
      clickedObj = false;
    }
    if (previousAnimationGroup) {
      previousAnimationGroup.stop();
      previousAnimationGroup = null;
    }
    $(".modelinfo-view-top-tab-device-right").css("display", "none");
    viewScene.cameras[0].setPosition(
      new BABYLON.Vector3(-5, 2.0147617632807735, -0.16621254058732557)
    );
    viewScene.cameras[0].setTarget(BABYLON.Vector3.Zero());
    cameraSet_viewer(BABYLON.Vector3.Zero());

    setGridVisibilitys(false, gridlineList);
    advancedTextureCrack.rootContainer.children.forEach(function (control) {
      control.isVisible = false;
    });
    advancedTextureCrack02.rootContainer.children.forEach(function (control) {
      control.isVisible = false;
    });

    advancedTextureclear(advancedTexture3);
    if (toggleHighlight != null && toggleInterval == null) {
      toggleInterval = setInterval(toggleHighlight, 1000);
    }

    //체크박스 해제하기
    let radioBoxes = document.getElementsByName("device-leftWidget-sensors");
    for (let i = 0; i < radioBoxes.length; i++) {
      radioBoxes[i].checked = false;
    }
    //탭바꿀때도, 인구밀집만.
    $("#population_density-device-part1").prop("checked", false);
    $("#population_density-device-part2").prop("checked", false);
    $("#population_density-device-part3").prop("checked", false);
  });

  $(".videoplay-checkbox-btn").on("change", function () {
    viewerCam.animations = [];
    if (this.checked) {
      if (animationRotateStart) {
        animationGroupCam.restart();
      } else {
        animationRotateStart = true;
        if (!clickedObj) {
          console.log("Dontclickedobj")

          //만약 제목이 센트럴시티 보도육교 면. 시작하는 지점이....
          if ($(".modelinfo-view-title-bottom-name").text() == "센트럴시티 보도육교") {
            if (animationGroupCam)
              animationGroupCam.stop()
            viewerCam.animations = [];
            //만약 장치를 클릭했다면 클릭한 장치의 위치가 중점이 되도록
            if (bridgeSenorClicked) {
              animationRotateStart = false;

              let angle_radians = Math.atan2(viewerCam.position.y - lookat[bridgeClickednum].position.y, viewerCam.position.x - lookat[bridgeClickednum].position.x)
              console.log(angle_radians)

              // let angle_degrees = angle_radians * 180 / Math.PI
              animationSet(
                0,
                300,
                angle_radians,
                2 * Math.PI + angle_radians,
                "animationGroup_camRot",
                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE,
                lookat[bridgeClickednum].position,
                "alpha"
              );

            } else {

              animationSet(
                0,
                300,
                0.8,
                - 2 * Math.PI + 0.8,
                "animationGroup_camRot",
                BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE,
                BABYLON.Vector3.Zero(),
                "alpha"
              );
            }


          }
          else
            animationSet(
              0,
              300,
              -1.5708,
              2 * Math.PI,
              "animationGroup_camRot",
              BABYLON.Animation.ANIMATIONTYPE_FLOAT,
              BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE,
              BABYLON.Vector3.Zero(),
              "alpha"
            );
        }
        else {
          console.log("clickedobj")
          animationSet(
            0,
            300,
            -3,
            Math.PI,
            "animationGroup_camRot",
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE,
            new BABYLON.Vector3(
              objectPositions.x,
              objectPositions.y,
              objectPositions.z
            ),
            "alpha"
          );
        }
      }
    } else {
      animationGroupCam.pause();
      viewerCam.animations = [];
    }
  });

  //카메라 거리 세팅
  viewerCam.wheelPrecision = 20;
  let zoomSpeed = 0.01; // 줌 속도 조절
  viewCanvas.addEventListener("wheel", function (event) {
    let delta = event.deltaY;

    // 현재 카메라와의 거리 계산
    let currentRadius = viewerCam.radius;

    // 감속 적용 (더 빠르게 줌 아웃하도록 함)
    let zoomFactor = 1.0 + (delta * zoomSpeed) / currentRadius;

    // 새로운 카메라 거리 설정
    viewerCam.radius *= zoomFactor;
  });
  viewerModel_distance =
    viewerModel_distance / (2 * Math.tan(viewerCam.fov / 2));
  viewerCam.radius = viewerModel_distance;

  viewerCam.lowerRadiusLimit = viewerModel_distance - 2;
  viewerCam.upperRadiusLimit = viewerModel_distance + 2;
}

function animationSet(
  frame1,
  frame2,
  val1,
  val2,
  animationName,
  aniset1,
  aniset2,
  targetObj,
  animationType
) {
  viewerCam.target = targetObj;
  animationGroupCam = new BABYLON.AnimationGroup("animationGroupCam");

  // Animation 생성
  let moveani = new BABYLON.Animation(
    animationName,
    animationType,
    15,
    aniset1,
    aniset2
  );

  let moveKeyFrames = [];
  moveKeyFrames.push({
    frame: frame1,
    value: val1,
  });
  moveKeyFrames.push({
    frame: frame2,
    value: val2,
  });

  moveani.setKeys(moveKeyFrames);
  viewerCam.animations.push(moveani);
  animationGroupCam.addTargetedAnimation(moveani, viewerCam);

  animationGroupCam.onAnimationEndObservable.add(function () {
    //console.log("Animation ended");
    animationRotateStart = false;
    $(".videoplay-checkbox-btn").prop("checked", false);
  });

  animationGroupCam.play();
}

//play할때 카메라 타겟도 바꿔야함

function cameraMoving(camera, targetPosition, targetObj) {

  let objectPositions = targetObj.absolutePosition;
  camera.target = new BABYLON.Vector3(
    objectPositions.x,
    objectPositions.y,
    objectPositions.z
  );

  let animationGroupCam = new BABYLON.AnimationGroup("animationGroup_cam");
  let moveani = new BABYLON.Animation(
    "cameraAnimation",
    "position",
    30,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );
  let moveKeyFrames = [];
  moveKeyFrames.push({
    frame: 0,
    value: camera.position.clone(),
  });
  moveKeyFrames.push({
    frame: 30,
    value: targetPosition.position.clone(),
  });

  moveani.setKeys(moveKeyFrames);
  viewerCam.animations.push(moveani);
  // viewScene.beginAnimation(viewerCam, 0, 100, false);

  // animationGroup_cam.play();
}

function cameraSet_viewer(center = viewerCam.target) {
  //viewerModel_distance = viewerModel_distance / (2 * Math.tan(viewerCam.fov / 2))
  //console.log(center)
  viewerCam.target = center;
  viewerCam.position.y = center.y

  viewerCam.lowerRadiusLimit = viewerModel_distance - viewerModel_distance / 4;
  viewerCam.upperRadiusLimit =
    viewerModel_distance + viewerModel_distance / 4 + viewerModel_distance / 2;
  viewerCam.radius = viewerModel_distance + viewerModel_distance / 2;


  if (
    $(".modelinfo-view-title-bottom-name").text() ==
    "Smart Green Industrial Complex" ||
    $(".modelinfo-view-title-bottom-name").text() == "센트럴시티 보도육교" //센트럴시티 보도육교
  ) {
    viewerCam.lowerRadiusLimit = 2;
    viewerCam.upperRadiusLimit = 100;
    viewerCam.radius = 20;
    viewScene.cameras[0].setPosition(
      new BABYLON.Vector3(0, 15.0147617632807735, -25)
    );

    if (
      $(".modelinfo-view-title-bottom-name").text() == "센트럴시티 보도육교"
    ) {
      viewerCam.upperRadiusLimit = 150;
      viewerCam.radius = 100;

      viewScene.cameras[0].setPosition(full[0]._position);

      // var animationGroup = new BABYLON.AnimationGroup(
      //   "My Animation Group",
      //   viewScene
      // );

      // // 애니메이션 정의 및 추가
      // var animation = new BABYLON.Animation(
      //   "cameraAnimation",
      //   "position",
      //   50,
      //   BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
      //   BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
      // );
      // var keys = [];
      // keys.push({
      //   frame: 0,
      //   value: viewScene.cameras[0]._position,
      // });
      // keys.push({
      //   frame: 30,
      //   value: full[0]._position,
      // });
      // animation.setKeys(keys);
      // animationGroup.addTargetedAnimation(animation, viewScene.cameras[0]);
      // // 키 프레임을 애니메이션에 추가

      // animationGroup.start(
      //   false,
      //   0.2,
      //   animationGroup.from,
      //   animationGroup.to,
      //   false
      // );
      viewScene.cameras[0].setTarget(full[1]._position);

      // var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
      //   "https://playground.babylonjs.com/textures/Runyon_Canyon_A_2k_cube_specular.dds",
      //   viewScene
      // );
      // hdrTexture.name = "envTex";
      // hdrTexture.gammaSpace = false;
      // viewScene.environmentTexture = hdrTexture;
      // BABYLON.ParticleHelper.CreateAsync("rain", viewScene, false).then(
      //   (set) => {
      //     set.start();
      //   }
      // );
      // console.log(viewScene.environmentTexture);
    }

    viewerCam.animations = [];
  }

  viewScene.getEngine().resize();

  // camera.lowerRadiusLimit = 3;
  // camera.upperRadiusLimit = 7;
}

function viewmode(saveinfo) {
  $("#main-top-bar").css("display", "flex");
  $("#model-view-group-right").toggleClass("visible", false);

  $("#main-top-bar").css("display", "none");
  for (let i = 0; i < createclickobj.length; i++) {
    createclickobj[i].meshes[0].dispose();
  }
  loadmapdata_nojson("ten4", saveinfo, viewScene, false);
  callobjmemo();

  //console.log(viewScene);
  viewScene.getEngine().runRenderLoop(function () {
    viewScene.render();
  });

  viewScene.cameras[0].setPosition(
    new BABYLON.Vector3(-5, 1.0147617632807735, -0.16621254058732557)
  );
  viewScene.cameras[0].setTarget(BABYLON.Vector3.Zero());

  viewScene.getEngine().resize();
}

let gridTemp = 5;

function createGridView(size, TargetScene) {
  let gridLines = [];

  for (let i = -size; i <= size; i++) {
    // X 축 방향의 라인
    let lineX = BABYLON.MeshBuilder.CreateLines(
      "linesX",
      {
        points: [
          new BABYLON.Vector3(i * gridTemp, 0.25, -size * gridTemp),
          new BABYLON.Vector3(i * gridTemp, 0.25, size * gridTemp),
        ],
        instance: null,
      },
      TargetScene
    );

    // Z 축 방향의 라인
    let lineZ = BABYLON.MeshBuilder.CreateLines(
      "linesZ",
      {
        points: [
          new BABYLON.Vector3(-size * gridTemp, 0.25, i * gridTemp),
          new BABYLON.Vector3(size * gridTemp, 0.25, i * gridTemp),
        ],
        instance: null,
      },
      TargetScene
    );

    // 클릭 방지
    lineX.isPickable = false;
    lineZ.isPickable = false;

    //안보이게 하기
    lineX.isVisible = false;
    lineZ.isVisible = false;

    lineX.color = new BABYLON.Color3(0.79, 0.79, 0.79); // 흰색
    lineX.alpha = 0.5;
    lineZ.color = new BABYLON.Color3(0.79, 0.79, 0.79); // 흰색
    lineZ.alpha = 0.5;
    // 생성된 라인을 배열에 추가
    gridLines.push(lineX, lineZ);
  }

  return gridLines;
}

function setGridVisibilitys(visible, gridlineList) {
  for (let i = 0; i < gridlineList.length; i++) {
    gridlineList[i].isVisible = visible;
  }
}
$(document).ready(function () {
  window.addEventListener("resize", function () {
    // 창 크기가 변경되었을 때 실행되는 코드
    viewScene.getEngine().resize();

    // 추가로 필요한 로직을 여기에 추가할 수 있습니다.
  });
  viewScene
    .getEngine()
    .getRenderingCanvas()
    .addEventListener("resize", function () {
      // 창 크기가 변경되었을 때 실행되는 코드
      console.log("?!");
      viewScene.getEngine().resize();

      // 추가로 필요한 로직을 여기에 추가할 수 있습니다.
    });
});
function makeViewerlabel(sphere) {
  //뷰어 객체 마커 달기
  let rect = new BABYLON.GUI.Rectangle();
  rect.height = "58px";
  rect.width = "128px"; // 너비 설정
  rect.thickness = 0;
  rect.cornerRadius = 50;
  rect.background = "#fff";
  // 그림자 효과 설정
  rect.shadowBlur = 4; // 그림자의 흐림 정도
  rect.shadowOffsetX = 0; // 그림자의 X축 오프셋
  rect.shadowOffsetY = 5; // 그림자의 Y축 오프셋
  rect.shadowColor = "rgba(0, 0, 0, 0.25)"; // 그림자의 색상

  advancedTexture3.addControl(rect);

  var container = new BABYLON.GUI.StackPanel();
  container.width = "128px";
  container.height = "58px";
  container.horizontalAlignment =
    BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  container.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
  container.top = "1px";
  container.left = "4px";

  container.background = "#fff";
  container.isVertical = false; // 가로 정렬

  let containerM = new BABYLON.GUI.StackPanel();
  containerM.width = "12px";
  containerM.height = "1px";
  containerM.background = "#fff";

  let containerM2 = new BABYLON.GUI.StackPanel();
  containerM2.width = "12px";
  containerM2.height = "1px";
  containerM2.background = "#fff";

  rect.addControl(container);
  // 각 이미지 버튼 생성
  var createToggleButton = function (id, src) {
    //checkbox같은 토글버튼으로 생성
    var button = BABYLON.GUI.Button.CreateImageOnlyButton(id, src);
    button.width = "40px";
    button.height = "40px";
    button.thickness = 0;
    button.cornerRadius = 50;
    button.isChecked = false;
    return button;
  };
  let btn_internal = createToggleButton("viewer-internal", internal_base);
  let btn_graph = createToggleButton("viewer-graph", graph_base);
  let btn_info = createToggleButton("viewer-info", info_base);
  const toggleButtonColor = function (button) {
    button.background = button.isChecked ? "#3988E5" : "#fff";
  };
  btn_internal.onPointerClickObservable.add(function () {
    //각 버튼 클릭 이벤트
    btn_internal.isChecked = !btn_internal.isChecked; // 상태 토글
    // console.log(btn_internal.isChecked);
    if (btn_internal.isChecked) {
      advancedTexture.rootContainer.children.forEach(function (control) {
        if (control.name == "target") {
          control.isVisible = true;
        }
      });
      btn_internal.image.source = internal_base_white;
    } else {
      advancedTexture.rootContainer.children.forEach(function (control) {
        if (control.name == "target") {
          control.isVisible = false;
        }
      });
      btn_internal.image.source = internal_base;
    }
    viewScene.getEngine().resize();
    toggleButtonColor(btn_internal);
  });

  btn_graph.onPointerClickObservable.add(function () {
    btn_graph.isChecked = !btn_graph.isChecked; // 상태 토글
    toggleButtonColor(btn_graph);
    if (btn_graph.isChecked) {
      viewScene
        .getEngine()
        .getRenderingCanvas()
        .classList.remove("animateCanvasback");
      viewScene.getEngine().getRenderingCanvas().classList.add("animateCanvas"); //화면 애니메이션 붙이기
      runAnimationWithResize(500); //엔진 리사이즈
      btn_graph.image.source = graph_base_white;
    } else {
      viewScene
        .getEngine()
        .getRenderingCanvas()
        .classList.remove("animateCanvas");
      viewScene
        .getEngine()
        .getRenderingCanvas()
        .classList.add("animateCanvasback");
      $("#modelinfo-view-background-img").css(
        "animation",
        "moveImageback 2s forwards"
      );
      runAnimationWithResize(600);
      btn_graph.image.source = graph_base;
    }
    viewScene.getEngine().resize();

    $(".modelinfo-view-background-img").toggleClass("clickedChart");
    $("#model-view-group-right").toggleClass("visible");
  });

  btn_info.onPointerClickObservable.add(function () {
    btn_info.isChecked = !btn_info.isChecked; // 상태 토글
    if (btn_info.isChecked) {
      btn_info.image.source = info_base_white;
    } else {
      btn_info.image.source = info_base;
    }
    toggleButtonColor(btn_info);
  });
  container.addControl(containerM);
  container.addControl(btn_internal);
  container.addControl(containerM2);
  container.addControl(btn_graph);
  //container.addControl(btn_info);
  rect.linkWithMesh(sphere);
}
function runAnimationWithResize(animationDuration) {
  // 엔진의 resize를 호출하는 인터벌 설정
  var resizeInterval = setInterval(function () {
    // 여기서는 단순히 엔진의 resize를 주기적으로 호출합니다.
    // 실제 크기 변경 로직이 필요하다면 여기에 삽입하세요.
    viewScene.getEngine().resize();
  }, 8); // 매 프레임마다 resize 호출 (약 60프레임/초 기준)

  // 지정된 애니메이션 지속 시간이 지난 후에 인터벌 제거
  setTimeout(function () {
    clearInterval(resizeInterval); // setInterval 정지
    viewScene.getEngine().resize(); // 마지막으로 엔진의 resize를 한 번 더 호출하여 확실하게 처리
    //console.log("Animation and resizing completed!");
    viewScene.getEngine().resize(); // 마지막으로 엔진의 resize를 한 번 더 호출하여 확실하게 처리
  }, animationDuration);
}
function advancedTextureclear(clearthing) {
  let children = clearthing.rootContainer.children.slice();
  children.forEach((child) => {
    if (clearthing == advancedTexture5) {
      if (child.name != "guiIcon")
        clearthing.rootContainer.removeControl(child);
    } else {
      clearthing.rootContainer.removeControl(child);
    }
  });
}
function adjustVideoSize() {
  let videos = document.getElementsByClassName("videocctv");
  let aspectRatio = 4 / 3;
  Array.from(videos).forEach((video) => {
    let videoWidth = video.parentElement.offsetWidth;
    let videoHeight = videoWidth / aspectRatio;
    video.style.width = videoWidth + "px";
    video.style.height = 140 + "px";
  });
}
window.addEventListener("resize", adjustVideoSize);

// 초기 로딩 시 비디오 크기 조정
//adjustVideoSize();
