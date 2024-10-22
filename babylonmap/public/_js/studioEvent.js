let pickMeshName = null;

$(document).ready(function () {
  $("#top-tool-icon").css("display", "none");
  setGridVisibility(false, gridLines);
  $("#objCreate").css("display", "none");

  gizmoManagerStudio.gizmos.positionGizmo.updateGizmoPositionToMatchAttachedMesh = false;
  gizmoManagerStudio.gizmos.scaleGizmo.updateGizmoScaleToMatchAttachedMesh = false;
  gizmoManagerStudio.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh = false;
  gizmoManagerStudio.positionGizmoEnabled = false;
  gizmoManagerStudio.rotationGizmoEnabled = false;
  gizmoManagerStudio.scaleGizmoEnabled = false;
  gizmoManagerStudio.boundingBoxGizmoEnabled = false;
  $("#exit-tool").click(function () {
    $("#studio").css("display", "none");
    document.removeEventListener("keydown", studiokeydown);
    document.addEventListener("keydown", mainkeydown);
    $(".studio-obj-func").css("display", "none");
  });
  $("#modeChanged-view").click(function () {
    $(this).css("background", "#3988E5");
    $("#modeChanged-editor").css("background", "#373737");
    $("#objCreate").css("display", "none");
    advancedTexture2.rootContainer.children.forEach(function (control) {
      control.isVisible = false;
    });
  });
  $("#modeChanged-editor").click(function () {
    $(this).css("background", "#3988E5");
    $("#modeChanged-view").css("background", "#373737");
    $("#objCreate").css("display", "flex");
    advancedTexture2.rootContainer.children.forEach(function (control) {
      control.isVisible = true;
    });
  });

  $("#modeChanged-view").click(function () {
    $(".studio-obj-func").css("display", "none");
    $("#top-tool-icon").css("display", "none");
    setGridVisibility(false, gridLines);
    viewCheck = true;

    gizmoManagerStudio.gizmos.positionGizmo.updateGizmoPositionToMatchAttachedMesh = false;
    gizmoManagerStudio.gizmos.scaleGizmo.updateGizmoScaleToMatchAttachedMesh = false;
    gizmoManagerStudio.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh = false;
    gizmoManagerStudio.positionGizmoEnabled = false;
    gizmoManagerStudio.rotationGizmoEnabled = false;
    gizmoManagerStudio.scaleGizmoEnabled = false;
    gizmoManagerStudio.boundingBoxGizmoEnabled = false;
  });

  $("#modeChanged-editor").click(function () {
    $("#top-tool-icon").css("display", "flex");
    setGridVisibility(true, gridLines);
    viewCheck = false;
  });

  $("#studio-obj-func-scale").click(function () {
    gizmoManagerStudio.gizmos.positionGizmo.updateGizmoPositionToMatchAttachedMesh = false;
    gizmoManagerStudio.gizmos.scaleGizmo.updateGizmoScaleToMatchAttachedMesh = false;
    gizmoManagerStudio.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh = false;
    gizmoManagerStudio.positionGizmoEnabled = false;
    gizmoManagerStudio.rotationGizmoEnabled = false;
    gizmoManagerStudio.scaleGizmoEnabled = false;
    gizmoManagerStudio.boundingBoxGizmoEnabled = false;

    gizmoManagerStudio.scaleGizmoEnabled = true;
    gizmoManagerStudio.gizmos.scaleGizmo.updateGizmoRotationToMatchAttachedMesh = true;
  });
  $("#studio-obj-func-rotate").click(function () {
    gizmoManagerStudio.gizmos.positionGizmo.updateGizmoPositionToMatchAttachedMesh = false;
    gizmoManagerStudio.gizmos.scaleGizmo.updateGizmoScaleToMatchAttachedMesh = false;
    gizmoManagerStudio.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh = false;
    gizmoManagerStudio.positionGizmoEnabled = false;
    gizmoManagerStudio.rotationGizmoEnabled = false;
    gizmoManagerStudio.scaleGizmoEnabled = false;
    gizmoManagerStudio.boundingBoxGizmoEnabled = false;

    gizmoManagerStudio.rotationGizmoEnabled = true;
    gizmoManagerStudio.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh = false;
  });
  $("#studio-obj-func-move").click(function () {
    gizmoManagerStudio.gizmos.positionGizmo.updateGizmoPositionToMatchAttachedMesh = false;
    gizmoManagerStudio.gizmos.scaleGizmo.updateGizmoScaleToMatchAttachedMesh = false;
    gizmoManagerStudio.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh = false;
    gizmoManagerStudio.positionGizmoEnabled = false;
    gizmoManagerStudio.rotationGizmoEnabled = false;
    gizmoManagerStudio.scaleGizmoEnabled = false;
    gizmoManagerStudio.boundingBoxGizmoEnabled = false;

    gizmoManagerStudio.positionGizmoEnabled = true;
    gizmoManagerStudio.gizmos.positionGizmo.updateGizmoPositionToMatchAttachedMesh = true;
  });
  $("#studio-obj-func-delete").click(function () {
    gizmoManagerStudio._attachedMesh.dispose();

    $(".studio-obj-func").css("display", "none");
  });

  $("#objCreate_btn").on("change", function () {
    if ($(this).is(":checked")) {
      // 체크박스가 체크되었을 때 실행되는 함수 호출

      $("#objCreate").css("display", "flex");
    } else {
      $("#objCreate").css("display", "none");
    }
  });
  $("#markerEditor_btn").on("change", function () {
    if ($(this).is(":checked")) {
      // 체크박스가 체크되었을 때 실행되는 함수 호출

      $("#markEditor").css("display", "flex");
    } else {
      $("#markEditor").css("display", "none");
    }
  });
});
// 그리드 생성 함수
function createGrid(size, TargetScene) {
  let gridLines = [];

  for (let i = -size; i <= size; i++) {
    let lineX = BABYLON.MeshBuilder.CreateLines(
      "lineX",
      {
        points: [
          new BABYLON.Vector3(i * 2, 0, -size * 2),
          new BABYLON.Vector3(i * 2, 0, size * 2),
        ],
      },
      TargetScene
    );

    // GizmoManager에서 메시 제거
    //gizmoManagerStudio.attachableMeshes.pop(lineX);

    let lineZ = BABYLON.MeshBuilder.CreateLines(
      "lineZ",
      {
        points: [
          new BABYLON.Vector3(-size * 2, 0, i * 2),
          new BABYLON.Vector3(size * 2, 0, i * 2),
        ],
      },
      TargetScene
    );

    //클릭방지
    lineX.isPickable = false;

    // lineZ 메시 생성 후
    lineZ.isPickable = false;
    // GizmoManager에서 메시 제거
    //gizmoManagerStudio.attachableMeshes.pop(lineZ);

    lineX.color = new BABYLON.Color3(0.79, 0.79, 0.79); // 흰색
    lineX.alpha = 0.5;
    lineZ.color = new BABYLON.Color3(0.79, 0.79, 0.79); // 흰색
    lineZ.alpha = 0.5;

    gridLines.push(lineX, lineZ);
  }
  return gridLines;
}

let gizmoManagerStudio;
let selectemodel_;
let advancedTextures;
let gridLines;
let viewCheck = true;
// Babylon.js를 사용하여 3D 모델 표시
function makeStudiomodel() {
  let canvasStudio = document.getElementById("studioBablonCanvas");
  let engineStudio = new BABYLON.Engine(canvasStudio, true);
  studioScene = new BABYLON.Scene(engineStudio);

  // 배경을 투명하게 만들기
  studioScene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

  let camera = new BABYLON.ArcRotateCamera(
    "Camera",
    0,
    0,
    10,
    new BABYLON.Vector3(0, 0, 0),
    this.studioScene
  );
  camera.setPosition(new BABYLON.Vector3(0, 10, 0));
  camera.attachControl(canvasStudio, true);

  //this.studioScene.activeCamera = camera;
  // let lightview = new BABYLON.HemisphericLight(
  //     "hemiLight",
  //     new BABYLON.Vector3(1, 5, 0),
  //     studioScene
  // );
  // lightview.intensity = 100;
  // let objectPosition = new BABYLON.Vector3(-1, -0.8, 0.5);

  // // pointLight.intensity = 10.0; // 필요에 따라 조절
  // studioScene.createDefaultCameraOrLight(false, false, true);
  let lighting = BABYLON.CubeTexture.CreateFromPrefilteredData(
    "https://dt.gractor.com/babylon_img/Texture2.dds",
    studioScene
  );
  lighting.name = "runyonCanyon";
  lighting.gammaSpace = false;
  studioScene.environmentTexture = lighting;
  const skybox = studioScene.createDefaultSkybox(
    null,
    true,
    (studioScene.activeCamera.maxZ - studioScene.activeCamera.minZ) / 2,
    0.3,
    false
  );
  studioScene.createDefaultLight();
  studioScene.environmentTexture.intensity = 10;
  let objectPosition = new BABYLON.Vector3(-1, -0.8, 0.5);

  //skybox.material.alpha = 0;
  // 배경을 투명하게 만들기
  studioScene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

  //skybox.setEnabled(false);
  // pointLight.intensity = 10.0; // 필요에 따라 조절
  studioScene.createDefaultCameraOrLight(false, false, true);

  camera.detachControl(canvasStudio, true);

  camera.attachControl(canvasStudio, true);
  advancedTextures = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI(
    "UI",
    undefined,
    studioScene
  );
  $("#exit-tool").click(function (e) {
    if (createclickobj) {
      engineStudio.stopRenderLoop();
      camera.attachControl(canvasStudio);

      advancedTextureclear(advancedTextures);
      //createclickobj.dispose();
    }
    viewmodecheck = false;
  });
  camera.wheelPrecision = 20;
  let zoomSpeed = 0.01; // 줌 속도 조절
  canvasStudio.addEventListener("wheel", function (event) {
    let delta = event.deltaY;

    // 현재 카메라와의 거리 계산
    let currentRadius = camera.radius;

    // 감속 적용 (더 빠르게 줌 아웃하도록 함)
    let zoomFactor = 1.0 + (delta * zoomSpeed) / currentRadius;

    // 새로운 카메라 거리 설정
    camera.radius *= zoomFactor;
  });
  camera.lowerRadiusLimit = 3;
  camera.upperRadiusLimit = 1000;

  gizmoManagerStudio = new BABYLON.GizmoManager(studioScene);
  gizmoManagerStudio.positionGizmoEnabled = true;
  gizmoManagerStudio.rotationGizmoEnabled = true;
  gizmoManagerStudio.scaleGizmoEnabled = true;

  gizmoManagerStudio.rotationGizmoEnabled = false;
  gizmoManagerStudio.scaleGizmoEnabled = false;
  gizmoManagerStudio.gizmos.positionGizmo.updateScale = false;
  gizmoManagerStudio.gizmos.scaleGizmo.updateScale = false;
  gizmoManagerStudio.gizmos.rotationGizmo.updateScale = false;
  gizmoManagerStudio.gizmos.scaleGizmo.uniformScaleGizmo.updateScale = false; // scale중심점

  gizmoManagerStudio.gizmos.scaleGizmo.sensitivity = 0.1;

  //로컬 글로벌
  gizmoManagerStudio.gizmos.positionGizmo.updateGizmoRotationToMatchAttachedMesh = false;
  gizmoManagerStudio.gizmos.scaleGizmo.updateGizmoRotationToMatchAttachedMesh = false;
  gizmoManagerStudio.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh = false;

  gizmoManagerStudio.scaleRatio = 100;

  //공조기 모델링 생성
  // createStudioModel("Kaishan-compressor");

  let gridSize = 50;
  gridLines = createGrid(gridSize, studioScene);

  //loadJsondata("ten4", "test0001glb (0)", studioScene, false);
  studioScene.getEngine().runRenderLoop(function () {
    studioScene.render();
  });
  studioScene.cameras[0].setPosition(
    new BABYLON.Vector3(-5, 1.0147617632807735, -0.16621254058732557)
  );
  studioScene.cameras[0].setTarget(new BABYLON.Vector3(0, 0.5, 0));
  camera.radius = 7;

  studioScene.getEngine().resize();
}

// 그리드의 가시성을 설정하는 함수
function setGridVisibility(visible, gridLineslist) {
  for (let i = 0; i < gridLineslist.length; i++) {
    gridLineslist[i].isVisible = visible;
  }
}

//클릭시 모델링 생성 이벤트
function createStudioModel(name) {
  BABYLON.SceneLoader.LoadAssetContainerAsync(
    " https://dt.gractor.com/demoModeling/",
    name + ".glb",
    studioScene
  ).then((c) => {
    c.addAllToScene();
    let rootMesh = c.createRootMesh();
    c.meshes.forEach((mesh) => {
      // 메시가 클릭되었을 때 이벤트 핸들러 등록
      mesh.isPickable = true;
      mesh.actionManager = new BABYLON.ActionManager(studioScene);
      mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnPickTrigger,
          function () {
            // 클릭된 메시를 선택하고 색상 변경 또는 다른 동작 수행
            mesh.name = rootMesh.name;
            console.log(mesh.name);
          }
        )
      );
    });
    rootMesh.position.x += -0.5;
    rootMesh.position.z += 0.5;

    //기즈모 연결
    gizmoManagerStudio.attachToMesh(rootMesh);

    //console.log(c)
    let animationGroup = new BABYLON.AnimationGroup("myAnimationGroup");
    //let animationGroups = result.animationGroups;

    let animationGroups2 = c.animationGroups;
    let animationGroups = [];
    for (let i = 0; i < animationGroups2.length; i++) {
      animationGroups.push(animationGroups2[i]);
    }
    // 나중에 애니메이션 멈추기
    setTimeout(function () {
      // 첫 번째 애니메이션 멈추기
      if (animationGroups[0] != null) animationGroups[0].pause();
    }, 2000);
    let gltfMesh = c.meshes[0];
    gltfMesh.rotation.y = 0;
    gltfMesh.rotation.z = 0;
    // let boundingBox =
    //   BABYLON.BoundingBoxGizmo.MakeNotPickableAndWrapInBoundingBox(gltfMesh);
    // gltfMesh.position.y = 0;
    // //container = boundingBox;
    // boundingBox.renderingGroupId = 0;
    // boundingBox.isPickable = true;
    // boundingBox.rotation.y = 0;
    // boundingBox.rotation.z = 0;

    // advancedTexture2.getDescendants().forEach((control) => {
    //   control.linkWithMesh(sphere);
    //   //control.linkOffsetYInPixels = guiPosition._y; // 중심점 기준으로 위치 조정
    // });

    studioScene.getEngine().resize();
  });

  studioScene.onPointerDown = (evt) => {
    const pickInfo = studioScene.pick(
      studioScene.pointerX,
      studioScene.pointerY,
      (mesh) => mesh != null
    );
    const worldPointer = pickInfo.pickedPoint;
    if (pickInfo.pickedPoint != null && !viewCheck) {
      //console.log(pickInfo.pickedMesh);
      let findparnet = pickInfo.pickedMesh;
      while (true) {
        if (findparnet._parentNode != null) {
          findparnet = findparnet._parentNode;
        } else {
          break;
        }
      }
      if (positionsphere != null) {
        positionsphere.parent = null;
        positionsphere.position = new BABYLON.Vector3(0, 0, 0);
        console.log(positionsphere.position);
      }
      findobjguipos(findparnet.getChildMeshes());
      // let getmesh = pickInfo.getChildren();
      // console.log(getmesh);

      //$(".studio-obj-func").css("display", "flex");

      document.removeEventListener("keydown", mainkeydown);
      document.addEventListener("keydown", studiokeydown);
      // studioFucPopup(gizmoManagerStudio._attachedMesh)

      //let rootMesh = getRootMesh(pickInfo.pickedMesh);
      // console.log("rootMesh:", gizmoManagerStudio._attachedMesh);
      // let gpspost = toGPS([worldPointer.x, worldPointer.z]);
      // bearingData = map.getBearing();
      // pitchData = map.getPitch();
      // startpointx = evt.clientX;
      // startpointy = evt.clientY;
      // ismouseclick = true;
      // inputmousenum = evt.inputIndex;
      // prepointx = clientwidth - evt.clientX;
      // prepointy = evt.clientY;
      //console.log(findTopLevelParent(evt.pickedMesh))
    } else {
      advancedTextureclear(advancedTexture2);
      if (positionsphere != null) {
        positionsphere.position = new BABYLON.Vector3(0, 0, 0);
        positionsphere.parent = null;
      }
    }
  };
}
// rootMesh를 찾는 함수
function getRootMesh(mesh) {
  let scene = mesh.getScene();

  // 씬의 meshes 배열에서 해당 메시 찾기
  let rootMesh = scene.meshes.find(
    (m) => m.uniqueId === mesh.rootMesh.uniqueId
  );

  return rootMesh;
}
// 최상위 부모 찾는 함수
function findTopLevelParent(mesh) {
  if (!mesh.parent) {
    return mesh; // 부모가 없으면 현재 메시가 최상위 부모
  } else {
    return findTopLevelParent(mesh.parent); // 재귀적으로 부모를 찾음
  }
}
function studioFucPopup(e) {
  // Load a GUI from the snippet server.
  // let advancedTextures = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("GUI", true, studioScene);

  let studio_obj_func = new BABYLON.GUI.Rectangle();
  studio_obj_func.width = "226px";
  studio_obj_func.height = "36px";
  studio_obj_func.cornerRadius = 50;
  studio_obj_func.color = "#303030FF";
  studio_obj_func.thickness = 0;
  studio_obj_func.background = "#303030FF";

  let scaleBtn = new BABYLON.GUI.Button.CreateImageButton(
    "scaleBtn",
    "",
    "https://dt.gractor.com/babylon_img/scale mini.png"
  );

  scaleBtn.onPointerUpObservable.add(function () { });
  studio_obj_func.addControl(scaleBtn); // Rectangle에 이미지 추가

  advancedTextures.addControl(studio_obj_func);

  studio_obj_func.linkWithMesh(gizmoManagerStudio._attachedMesh);
  studio_obj_func.linkOffsetY = -400;
  studio_obj_func.linkOffsetX = 100;

  // // Set the ideal W and H if you wish to scale with the window.
  // advancedTextures.idealWidth = 1920;
  // advancedTextures.idealHeight = 1080;

  // // loadedGUI.height = 50;
  // advancedTextures.addControl(loadedGUI);
  // advancedTextures.parent = gizmoManagerStudio._attachedMesh;
  // loadedGUI.linkWithMesh(gizmoManagerStudio._attachedMesh);

  const objStudioveiw = document.querySelector(".studio-obj-func");
  // objStudioveiw.style.display = "flex";

  // let x = e.clientX;
  // let y = e.clientY;
  // objStudioveiw.style.left = x - 200 + "px";
  // objStudioveiw.style.top = y - 100 + "px";
}

function studiotopopup(e, saveinfo, seletingMesh, createModel) {
  studioScene.meshes.forEach(function (mesh) {
    if (mesh.name != "lineX" && mesh.name != "lineZ" && mesh.name != "sphere")
      mesh.dispose();
  });
  createStudioModel(createModel);
  // pickMeshName
  let findm = findmodel(saveinfo);
  let loca;
  markeron = true;
  // const objInfoView = document.querySelector(".obj-info-view");
  // console.log(objInfoView);
  infoTemplate = document.getElementById("obj-studio-view-template");

  if (infoTemplate) {
    let cloneinfoTemplate = infoTemplate.content.cloneNode(true);
    // DocumentFragment에서 루트 요소를 추출합니다.
    let objInfoViewElement =
      cloneinfoTemplate.querySelector(".obj-studio-view");

    // 요소가 존재하는지 확인한 후 스타일을 설정합니다.
    if (objInfoViewElement) {
      document.body.appendChild(cloneinfoTemplate);

      objInfoViewElement.style.display = "flex";
      // let x = e.point.x;
      // let y = e.point.y;

      let x = e.x;
      let y = e.y;

      objInfoViewElement.style.left = x - 48 + "px";
      objInfoViewElement.style.top = y - 100 + "px";
      objInfoViewElement.style.position = "absolute";
    } else {
      console.error("템플릿에서 obj-info-view 요소를 찾을 수 없습니다.");
    }
  } else {
    console.error(
      "'obj-info-view-template' ID를 가진 템플릿 엘리먼트를 찾을 수 없습니다."
    );
  }

  $(".obj-studio-view_dataEvnet").click(function () {
    $("#studio").css("display", "flex");
    studioScene.getEngine().runRenderLoop(function () {
      studioScene.render();
    });

    studioScene.getEngine().resize();
  });
  $(".obj-studio-view_delete").click(function () {
    selectedMesh.model_.dispose();
    selectedMesh = null;
  });
  $(".obj-studio-view").click(function () {
    $(this).remove();
  });
  // $(".moreinfo-btn").click(function () {
  //     objStudioveiw.style.display = "none";
  //     $("#modelinfo-view").css("display", "flex");
  //     let findm = findmodel(saveinfo);
  //     geoGetAddress(e.lngLat.lng, e.lngLat.lat, function (e) {
  //         $(".textbox-location").text(e);
  //         loca = e;
  //     });
  //     linkinfoview(findm.divId, findm, loca);
  //     console.log(findm.divId)
  //     viewmode(findm.divId);
  // });
}

function findobjguipos(c) {
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

  // 모든 메시에 대해 바운딩 박스를 비교하여 최소 및 최대 값을 찾음
  c.forEach((mesh) => {
    if (
      !mesh.name.includes("space") &&
      !mesh.name.includes("arrow") &&
      !mesh.name.includes("label") &&
      !mesh.name.includes("camera") &&
      !mesh.name.includes("cam") &&
      !mesh.name.includes("era")
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

  // 최소 및 최대 값으로부터 바운딩 박스의 중심점 및 높이 계산
  let center = BABYLON.Vector3.Center(minVertex, maxVertex);
  let height = maxVertex.y - minVertex.y;
  // GUI 요소를 추가할 위치 계산
  let guiPosition = new BABYLON.Vector3(center.x, center.y + height, center.z);
  //console.log(guiPosition);

  advancedTextureclear(advancedTexture2);

  let rect = new BABYLON.GUI.Rectangle();
  rect.height = "46px";
  rect.width = "238px"; // 너비 설정
  rect.thickness = 0;
  rect.cornerRadius = 50;
  rect.background = "#303030";
  advancedTexture2.addControl(rect);

  var container = new BABYLON.GUI.StackPanel();
  container.width = "238px";
  container.height = "46px";
  container.horizontalAlignment =
    BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  container.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
  container.top = "1px";
  container.left = "7px";

  container.background = "#303030";
  container.isVertical = false; // 가로 정렬

  rect.addControl(container);
  var leftMargin = 0; // 초기 왼쪽 마진
  var marginIncrement = 1.92; // 추가할 마진 크기
  // 각 이미지 버튼 생성
  var createButton = function (id, src) {
    var button = BABYLON.GUI.Button.CreateImageOnlyButton(id, src);
    button.width = "36px";
    button.height = "36px";
    button.left = leftMargin + "px";
    button.thickness = 0;
    leftMargin += 36 + marginIncrement;
    return button;
  };
  var createSpacer = function (width) {
    var spacer = new BABYLON.GUI.Control();
    spacer.width = width + "px";
    return spacer;
  };

  // 버튼 추가
  let btn_scale = createButton("studio-obj-func-scale", studio_scale_img);
  let btn_rotate = createButton("studio-obj-func-rotate", studio_rotate);
  let btn_move = createButton("studio-obj-func-move", studio_move);
  let btn_delete = createButton("studio-obj-func-delete", studio_delete);
  let btn_info = createButton("studio-obj-func-info", studio_info);
  let btn_more = createButton("studio-obj-func-more", studio_more);

  btn_scale.onPointerClickObservable.add(function () {
    gizmoManagerStudio.gizmos.positionGizmo.updateGizmoPositionToMatchAttachedMesh = false;
    gizmoManagerStudio.gizmos.scaleGizmo.updateGizmoScaleToMatchAttachedMesh = false;
    gizmoManagerStudio.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh = false;
    gizmoManagerStudio.positionGizmoEnabled = false;
    gizmoManagerStudio.rotationGizmoEnabled = false;
    gizmoManagerStudio.scaleGizmoEnabled = false;
    gizmoManagerStudio.boundingBoxGizmoEnabled = false;

    gizmoManagerStudio.scaleGizmoEnabled = true;
    gizmoManagerStudio.gizmos.scaleGizmo.updateGizmoRotationToMatchAttachedMesh = true;
  });
  btn_rotate.onPointerClickObservable.add(function () {
    gizmoManagerStudio.gizmos.positionGizmo.updateGizmoPositionToMatchAttachedMesh = false;
    gizmoManagerStudio.gizmos.scaleGizmo.updateGizmoScaleToMatchAttachedMesh = false;
    gizmoManagerStudio.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh = false;
    gizmoManagerStudio.positionGizmoEnabled = false;
    gizmoManagerStudio.rotationGizmoEnabled = false;
    gizmoManagerStudio.scaleGizmoEnabled = false;
    gizmoManagerStudio.boundingBoxGizmoEnabled = false;

    gizmoManagerStudio.rotationGizmoEnabled = true;
    gizmoManagerStudio.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh = false;
  });
  btn_move.onPointerClickObservable.add(function () {
    gizmoManagerStudio.gizmos.positionGizmo.updateGizmoPositionToMatchAttachedMesh = false;
    gizmoManagerStudio.gizmos.scaleGizmo.updateGizmoScaleToMatchAttachedMesh = false;
    gizmoManagerStudio.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh = false;
    gizmoManagerStudio.positionGizmoEnabled = false;
    gizmoManagerStudio.rotationGizmoEnabled = false;
    gizmoManagerStudio.scaleGizmoEnabled = false;
    gizmoManagerStudio.boundingBoxGizmoEnabled = false;

    gizmoManagerStudio.positionGizmoEnabled = true;
    gizmoManagerStudio.gizmos.positionGizmo.updateGizmoPositionToMatchAttachedMesh = true;
  });

  btn_delete.onPointerClickObservable.add(function () {
    gizmoManagerStudio._attachedMesh.dispose();

    $(".studio-obj-func").css("display", "none");
    customLayer.allgizmofalse();
    let children = advancedTexture2.rootContainer.children.slice();
    children.forEach((child) => {
      advancedTexture2.rootContainer.removeControl(child);
    });
  });

  btn_info.onPointerClickObservable.add(function () { });

  btn_more.onPointerClickObservable.add(function () { });

  container.addControl(btn_scale);
  container.addControl(createSpacer(3)); // 10px 간격
  container.addControl(btn_rotate);
  container.addControl(createSpacer(3)); // 10px 간격

  container.addControl(btn_move);
  container.addControl(createSpacer(3)); // 10px 간격

  container.addControl(btn_delete);
  container.addControl(createSpacer(3)); // 10px 간격
  container.addControl(btn_info);
  container.addControl(createSpacer(3)); // 10px 간격

  container.addControl(btn_more);

  // ... 나머지 버튼 추가

  //advancedTexture2.addControl(target);
  // BABYLON.GUI.GUIEditor.ParseJsonToGUI(
  //   advancedTexture2,
  //   guitexture,
  //   studioScene
  // );

  positionsphere = BABYLON.MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 1 },
    studioScene
  );

  positionsphere.parent = c[0];

  positionsphere.position = guiPosition;
  var material = new BABYLON.StandardMaterial("material", studioScene);

  // 투명도 설정
  material.alpha = 0;

  // 메시에 재질 할당
  positionsphere.material = material;
  rect.linkWithMesh(positionsphere);
}
