//import { base64Image } from "./imagedata.js";

//저장하기
function saveDataToJson() {
  //생성한 모델 정보들
  let modelArr = [];
  let childId = [];
  console.log(modelObj);
  modelObj.forEach((element) => {
    let parentName = "";
    try {
      parentName = element.model_._parentNode.id;
    } catch {
      parentName = "";
    }
    childId = [];
    let children = element.model_.getChildren();
    for (let i = 0; i < children.length; i++) {
      if (children[i].id == "__root__") continue;
      childId.push(children[i].name);
    }
    let gpsLnglat = toGPS([
      element.model_._absolutePosition.x,
      element.model_._absolutePosition.z,
    ]);
    let modelsetData = {
      id:
        Math.floor(Math.random() * 90000) +
        10000 +
        element.model_.name[0] +
        (Math.floor(Math.random() * 90000) + 10000),
      obj_id: element.model_.id,
      name: element.model_.name,
      pos: {
        Gps_lng: gpsLnglat.lng,
        Gps_lat: gpsLnglat.lat,
        y: element.model_._absolutePosition.y,
      },
      rot: element.model_.rotation,
      scale: element.model_.scaling,
      url: " https://dt.gractor.com/demoModeling/",
      explane: "",
      type: element.modelingType == "" ? "Group" : element.modelingType,
      child_obj: childId,
      parent_objName: element.model_._parentNode == null ? "" : parentName,
      babylonPos: {
        x: element.model_.position.x,
        y: element.model_.position.y,
        z: element.model_.position.z,
      },
      worldMatrix: {
        x: element.worldMatrix._x,
        y: element.worldMatrix._y,
        z: element.worldMatrix._z,
      },
      originscale: {
        x: element.originscale._x,
        y: element.originscale._y,
        z: element.originscale._z,
      },
    };
    modelArr.push(modelsetData);
    //삭제된것도 들어감.
    //모델정보도 넣어야함.
    /*
                            id: 난수(10000~100000)+(모델링이름중 첫글자)+난수(10000~100000)
                            name : 모델링이름
                            pos : 모델링 GPS 좌표 { Gps_lng: lng, Gps_lat:lat, y:모델링 높이 위치좌표}
                            rot : 모델링 회전
                            scale : 모델링 현재 스케일링 정보
                            url : 모델링 주소
                            explane : 모델링 설명
                            child_obj : 자식 객체 이름 배열
                            parent_objName : 부모 객체 이름
                            babylonPos : 바빌론 상에서의 좌표
                        */
  });
  //console.log("modelArr",JSON.stringify(modelArr));
  //각 모델마다 분류
  //let _modelArrToJson = {};
  Object.keys(objectlist).forEach(function (key) {
    let setContent = [];
    modelArr.forEach((obj) => {
      // console.log("obj", obj.type, " = ", objectlist[key].name)
      //obj.type.includes(objectlist[key].name)
      if (obj.type == objectlist[key].name) {
        // console.log("obj", obj)
        setContent.push(obj);
      }
    });

    _modelArrToJson[objectlist[key].name] = {
      id: objectlist[key].name,
      type: objectlist[key].type,
      _set: setContent,
    };
    /*
                            모델링 이름 : {  id : 모델링 이름
                                            type : 모델링 타입
                                            _set : [모델링 정보들] (pos,rot,scale,url... etc..)
                                        }
                        */
  });

  let _toJson = JSON.stringify(_modelArrToJson);
  //console.log("_modelArrToJson", _toJson);
  temporarysensordata = JSON.parse(_toJson);
  //서버로 저장하기 저장되어있는 이름이 같을 시.. 에 대한 예외는 안해둠.
  mapDataSave("two", _toJson);
  //JsontoModelData(_toJson)
  //서버로 불러오기
}
//불러오기
function JsontoModelData(jsonContents) {
  let urlString =
    "https://dt.gractor.com/babylonjson/" + jsonContents + ".json";
  $.getJSON(urlString, function (dataObj) {
    //console.log(dataObj);
    //객체 생성하기
    let getnum = 0;
    Object.keys(dataObj).forEach(function (key) {
      //console.log(dataObj[key])
      getnum++;
      if (dataObj[key]._set.length > 0) loadAsset_json(dataObj[key], getnum);
    });
    //객체위치 지정하기/타입 지정하기
  });
}

//서버에서 불러오기
function serverJsontoModelData(jsonContents_) {
  getMapData("mapJson", "", function (map_data_) {
    //console.log("   ", map_data_);
    map_data_.items.forEach((t) => {
      if (t.title == jsonContents_) {
        // console.log(t);
        let getnum = 0;
        Object.keys(t.mapData).forEach(function (key) {
          //console.log(dataObj[key])
          getnum++;
          if (t.mapData[key]._set.length > 0) {
            loadAsset_json(t.mapData[key], getnum);
          }
        });
        //객체위치 지정하기/타입 지정하기
      }
    });
  });
}
function noserverJsontoModelData() {
  let getnum = 0;
  Object.keys(mainpageobj).forEach(function (key) {
    //console.log(dataObj[key])
    getnum++;
    if (mainpageobj[key]._set.length > 0 && mainpageobj[key].type != "Group") {
      mainpageobj[key]._set.forEach((data) => {
        loadAsset_json(data, getnum);
      });
    }
  });
}

function loadJsondata(jsonContents_, getname, scenerr, ischild, parentobj) {
  for (const key in objectlist) {
    if (objectlist.hasOwnProperty(key)) {
      if (getname.toUpperCase().includes(objectlist[key].name.toUpperCase())) {
        loadmapdata(jsonContents_, getname, scenerr, ischild, parentobj);
      }
    }
  }
}

function loadmapdata(jsonContents_, getname, scenerr, ischild, parentobj) {
  getMapData("mapJson", "", function (map_data_) {
    map_data_.items.forEach((t) => {
      if (t.title == jsonContents_) {
        let getnum = 0;
        Object.keys(t.mapData).forEach(function (key) {
          getnum++;
          //console.log(t.mapData[key]);
          if (t.mapData[key]._set.length > 0) {
            Object.keys(t.mapData[key]._set).forEach(function (keyname) {
              if (t.mapData[key]._set[keyname].name == getname) {
                loadAndCreateMeshAsync(
                  scenerr,
                  key,
                  t.mapData[key]._set[keyname],
                  ischild,
                  parentobj
                ).then((result) => {
                  if (result) {
                    // if (createclickobj) {
                    //   createclickobj.meshes[0].dispose();
                    // }
                    createclickobj.push(result);
                    //createclickobj = result;
                  }
                  if (t.mapData[key]._set[keyname].child_obj != null) {
                    for (
                      let j = 0;
                      j < t.mapData[key]._set[keyname].child_obj.length;
                      j++
                    ) {
                      parentobj = t.mapData[key]._set[keyname];
                      loadJsondata(
                        jsonContents_,
                        t.mapData[key]._set[keyname].child_obj[j],
                        scenerr,
                        true,
                        parentobj
                      );
                    }
                  }
                });
              }
            });
          }
        });
        //객체위치 지정하기/타입 지정하기
      }
    });
  });
}
function loadmapdata_nojson(
  jsonContents_,
  getname,
  scenerr,
  ischild,
  parentobj
) {
  viewerDataSave();
  let getnum = 0;
  Object.keys(temporarysensordata).forEach(function (key) {
    getnum++;
    if (temporarysensordata[key]._set.length > 0) {
      Object.keys(temporarysensordata[key]._set).forEach(function (keyname) {
        if (temporarysensordata[key]._set[keyname].name === getname) {
          let cut_file_name =
            temporarysensordata[key]._set[keyname].name.split(" ")[0];
          loadAndCreateMeshAsync(
            scenerr,
            cut_file_name,
            temporarysensordata[key]._set[keyname],
            ischild,
            parentobj
          ).then((result) => {
            if (result) {
              // if (createclickobj) {
              //   createclickobj.meshes[0].dispose();
              // }
              createclickobj.push(result);
              //createclickobj = result;
            }
            if (temporarysensordata[key]._set[keyname].child_obj != null) {
              for (
                let j = 0;
                j < temporarysensordata[key]._set[keyname].child_obj.length;
                j++
              ) {
                parentobj = temporarysensordata[key]._set[keyname];
                loadJsondata(
                  jsonContents_,
                  temporarysensordata[key]._set[keyname].child_obj[j],
                  scenerr,
                  true,
                  parentobj
                );
              }
            }
          });
        }
      });
    }
  });
}

function viewerDataSave() {
  //생성한 모델 정보들
  let modelArr = [];
  let childId = [];
  modelObj.forEach((element) => {
    let parentName = "";
    try {
      parentName = element.model_._parentNode.id;
    } catch {
      parentName = "";
    }
    childId = [];
    let children = element.model_.getChildren();
    for (let i = 0; i < children.length; i++) {
      if (children[i].id == "__root__") continue;
      childId.push(children[i].name);
    }
    let gpsLnglat = toGPS([
      element.model_._absolutePosition.x,
      element.model_._absolutePosition.z,
    ]);
    let modelsetData = {
      id:
        Math.floor(Math.random() * 90000) +
        10000 +
        element.model_.name[0] +
        (Math.floor(Math.random() * 90000) + 10000),
      obj_id: element.model_.id,
      name: element.model_.name,
      pos: {
        Gps_lng: gpsLnglat.lng,
        Gps_lat: gpsLnglat.lat,
        y: element.model_._absolutePosition.y,
      },
      rot: element.model_.rotation,
      scale: element.model_.scaling,
      url: " https://dt.gractor.com/demoModeling/",
      explane: "",
      type: element.modelingType == "" ? "Group" : element.modelingType,
      child_obj: childId,
      parent_objName: element.model_._parentNode == null ? "" : parentName,
      babylonPos: {
        x: element.model_.position.x,
        y: element.model_.position.y,
        z: element.model_.position.z,
      },
      worldMatrix: {
        x: element.worldMatrix._x,
        y: element.worldMatrix._y,
        z: element.worldMatrix._z,
      },
      originscale: {
        x: element.originscale._x,
        y: element.originscale._y,
        z: element.originscale._z,
      },
    };
    modelArr.push(modelsetData);
    //삭제된것도 들어감.
    //모델정보도 넣어야함.
    /*
                            id: 난수(10000~100000)+(모델링이름중 첫글자)+난수(10000~100000)
                            name : 모델링이름
                            pos : 모델링 GPS 좌표 { Gps_lng: lng, Gps_lat:lat, y:모델링 높이 위치좌표}
                            rot : 모델링 회전
                            scale : 모델링 현재 스케일링 정보
                            url : 모델링 주소
                            explane : 모델링 설명
                            child_obj : 자식 객체 이름 배열
                            parent_objName : 부모 객체 이름
                            babylonPos : 바빌론 상에서의 좌표
                        */
  });

  //공장을 위한... 데이터 추가
  let space_ = {
    id:
      Math.floor(Math.random() * 90000) +
      10000 +
      facility_name +
      (Math.floor(Math.random() * 90000) + 10000),
    obj_id: facility_name,
    name: facility_name,
    pos: {
      Gps_lng: 0,
      Gps_lat: 0,
      y: 0,
    },
    rot: { _isDirty: false, _x: 0, _y: 0, _z: 0 },
    scale: { _isDirty: false, _x: 1, _y: 1, _z: 1 },
    url: " https://dt.gractor.com/demoModeling/",
    explane: "",
    type: facility_name,
    child_obj: [],
    parent_objName: "",
    babylonPos: { x: 0, y: 0, z: 0 },
    worldMatrix: { x: 0, y: 0, z: 0 },
    originscale: { x: 1, y: 1, z: 1 },
  };
  modelArr.push(space_);
  // console.log(space_);

  //console.log("modelArr",JSON.stringify(modelArr));
  //각 모델마다 분류
  //let _modelArrToJson = {};
  Object.keys(objectlist).forEach(function (key) {
    let setContent = [];
    modelArr.forEach((obj) => {
      // console.log("obj", obj.type, " = ", objectlist[key].name)

      if (obj.type.includes(objectlist[key].name)) {
        // console.log("obj", obj)
        setContent.push(obj);
      }
    });

    _modelArrToJson[objectlist[key].name] = {
      id: objectlist[key].name,
      type: objectlist[key].type,
      _set: setContent,
    };
    /*
                            모델링 이름 : {  id : 모델링 이름
                                            type : 모델링 타입
                                            _set : [모델링 정보들] (pos,rot,scale,url... etc..)
                                        }
                        */
  });

  let _toJson = JSON.stringify(_modelArrToJson);
  //  console.log("_modelArrToJson", _toJson);
  temporarysensordata = JSON.parse(_toJson);
}
async function loadAndCreateMeshAsync(scene, key, data, ischild, parentobj) {
  try {
    if (scene == viewScene) {
      let overlapWrapper = document.querySelector(".overlap-wrapper");
      if (key == "centralcity_bridges") {
        $(".modelinfo-view-title-bottom-name").text("센트럴시티 보도육교");
        if (!overlapWrapper.classList.contains("useCaseSeochoBridgeVer")) {
          // useCaseSeochoBridgeVer 클래스가 없으면 추가
          overlapWrapper.classList.add("useCaseSeochoBridgeVer");
        }
      } else {
        if (overlapWrapper.classList.contains("useCaseSeochoBridgeVer")) {
          // useCaseSeochoBridgeVer 클래스가 있으면 제거
          overlapWrapper.classList.remove("useCaseSeochoBridgeVer");
        }
      }

      viewScene.meshes.forEach(function (mesh) {
        if (mesh.name != "linesX" && mesh.name != "linesZ") mesh.dispose();
      });
    }
    const result = await BABYLON.SceneLoader.ImportMeshAsync(
      "",
      "https://dt.gractor.com/demoModeling/",
      key + ".glb",
      scene
    );

    const gltfMesh_obj = result.meshes[0];
    if (key == "centralcity_bridges") {
      let findparnet = gltfMesh_obj;
      while (true) {
        if (findparnet._parentNode != null) {
          findparnet = findparnet._parentNode;
        } else {
          break;
        }
      }
      if (justfirst) bridgeinit(findparnet.getChildMeshes());
      justfirst = false;
      bridgecam(findparnet.getChildMeshes());
    }

    let getmesh = gltfMesh_obj.getChildMeshes();
    getmesh.forEach((m, index) => {
      if (key == "Kaishan-compressor" && m.name.includes("body")) {
        m.visibility = 0;
      }
      if (
        (key == "Kaishan-compressor" && m.name.includes("_label")) ||
        (key == facility_name && m.name.includes("_label"))
      ) {
        makelable(m);
      }
      if (
        (key == "Kaishan-compressor" && m.name.includes("_pipe")) ||
        (key == facility_name && m.name.includes("_pipe"))
      ) {
        //에너지 애니메이션
        let waterMat = viewScene.getMaterialByName("dark-gray-t");
        //waterMat.albedoTexture = new BABYLON.Texture('https://i.imgur.com/fuyNXw9.png', scene);
        waterMat.alpha = 1;
        waterMat.transparencyMode = 3;
        waterMat.lightmapTexture = new BABYLON.Texture(
          "https://dt.gractor.com/babylon_img/04.png",
          viewScene
        ); //line_trasn  centerblueline
        waterMat.lightmapTexture.level = 1;
        waterMat.lightmapTexture.uScale = 1;

        waterMat.detailMap.texture = new BABYLON.Texture(
          "https://dt.gractor.com/babylon_img/black.png",
          viewScene
        );
        waterMat.detailMap.texture.level = 0.1;
        waterMat.detailMap.texture.uScale = 8;
        waterMat.detailMap.isEnabled = true;
        const glow = new BABYLON.GlowLayer("glow", viewScene, {
          blurKernelSize: 124, // 예: 작은 사이즈로 수정
        });
        glow.intensity = 1.2;
        m.material = waterMat;
        glow.addIncludedOnlyMesh(m);
        //opacityTexture work but diffuseTexture
        //waterMat.opacityTexture = waterMat.diffuseTexture;
        //waterMat.diffuseTexture.vScale = 10;
        //waterMat.diffuseTexture.uScale = 10;
        if (isanimationstart) {
          //vOffset은 세로
          //uoffset은 가로
          BABYLON.Animation.CreateAndStartAnimation(
            "textureMove",
            waterMat,
            "lightmapTexture.vOffset",
            5,
            5,
            0,
            1,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
          );
          BABYLON.Animation.CreateAndStartAnimation(
            "textureMove1",
            waterMat,
            "detailMap.texture.vOffset",
            5,
            5,
            0,
            1,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
          );
        }
      }
      if (key == facility_name && m.name.includes("camera")) {
        facility_cam = m;
      }
      if (key == "centralcity_bridges" && m.name.includes("crack-01")) {
        eventCrack = m;
        // let sphere = BABYLON.MeshBuilder.CreateSphere(
        //   "sphere",
        //   { diameter: 0.1 },
        //   viewScene
        // );
        // sphere.position = intersectionPoint; // 공을 카메라의 위치에 생성
        // crackgui(sphere);
      }
      if (key == "centralcity_bridges" && m.name.includes("crack-02")) {
        eventCrack02 = m;
        // let sphere = BABYLON.MeshBuilder.CreateSphere(
        //   "sphere",
        //   { diameter: 0.1 },
        //   viewScene
        // );
        // sphere.position = intersectionPoint; // 공을 카메라의 위치에 생성
        // crackgui(sphere);
      }
      if (key == "centralcity_bridges" && m.name.includes("Ground")) {
        if (m.name.includes("Ground")) {
          var mainmaterial = new BABYLON.StandardMaterial(m.name, scene);
          mainmaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);

          m.material = mainmaterial;
          //  console.log();
          var probe = new BABYLON.ReflectionProbe("mainmaterial", 2160, scene);
          result.meshes.forEach((mesh) => {
            probe.renderList.push(mesh);
          });

          // Mesh의 정확한 위치를 사용
          // console.log(m.position);
          //probe.position = m.position;
          probe.position = new BABYLON.Vector3(0, -50, 0);
          // Reflection texture 업데이트 확인 후 적용
          //console.log(probe);
          // probe.refreshRate =
          //   BABYLON.RenderTargetTexture.REFRESHRATE_RENDER_ONCE;
          mainmaterial.reflectionTexture = probe.cubeTexture;
        }
      }
      if (key == "centralcity_bridges" && m.name.includes("crack_sub")) {
        //crack_Text
        // GUI
        let planecrack = BABYLON.Mesh.CreatePlane("planecrack", 2, viewScene);
        //  console.log(m);
        if (m.name.includes("01")) {
          planecrack.position = m
            .getAbsolutePosition()
            .add(new BABYLON.Vector3(0.26, 0, 0));

          planecrack.rotation.y = Math.PI;
        }
        if (m.name.includes("02")) {
          planecrack.position = m
            .getAbsolutePosition()
            .add(new BABYLON.Vector3(-0.02, 0.16, 0));
          planecrack.rotation.y = 1.43;
        }
        //plane2.rotation = m.absoluteRoation;
        let crackTextGUI =
          BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(planecrack);

        //gui_ani GUI생성 후 여기넣기 advancedTexture_zoomInGUI

        // TextBlock 생성
        let textBlockC = new BABYLON.GUI.TextBlock();
        textBlockC.fontFamily = "Noto Sans";
        textBlockC.text = "균열 감지";
        textBlockC.color = "#EC7272";
        textBlockC.fontSize = 30;
        textBlockC.fontWeight = "bold";
        textBlockC.shadowBlur = 5; // 그림자 흐림 정도
        textBlockC.shadowColor = "#000000AA"; // 그림자 색상
        textBlockC.shadowOffsetX = 3; // 그림자 X 축 오프셋
        textBlockC.shadowOffsetY = 3; // 그림자 Y 축 오프셋
        crackTextGUI.addControl(textBlockC);

        if (m.name.includes("03")) {
          planecrack.position = m
            .getAbsolutePosition()
            .add(new BABYLON.Vector3(0, 0, 0));
        }

        planecrack.isVisible = false;
        crack_Text.push(planecrack);
      }
      if (key == "centralcity_bridges" && m.name.includes("inclination")) {
        console.log(1234);
        inclination.push(m);
        m.isVisible = false;
        if (m.name.includes("inclination_primitive0")) {
          // GUI
          let plane2 = BABYLON.Mesh.CreatePlane("plane2", 2, viewScene);
          plane2.position = m
            .getAbsolutePosition()
            .add(new BABYLON.Vector3(0, 0.05, 0));
          //plane2.rotation = m.absoluteRoation;
          let rldnfrl =
            BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane2);

          //gui_ani GUI생성 후 여기넣기 advancedTexture_zoomInGUI

          // TextBlock 생성
          let textBlock = new BABYLON.GUI.TextBlock();
          textBlock.fontFamily = "Noto Sans";
          textBlock.text = "기울기 Y";
          textBlock.color = "white";
          textBlock.fontSize = 25;
          textBlock.fontWeight = "bold";
          textBlock.shadowBlur = 5; // 그림자 흐림 정도
          textBlock.shadowColor = "#000000AA"; // 그림자 색상
          textBlock.shadowOffsetX = 3; // 그림자 X 축 오프셋
          textBlock.shadowOffsetY = 3; // 그림자 Y 축 오프셋
          rldnfrl.addControl(textBlock);

          // GUI
          let plane = BABYLON.Mesh.CreatePlane("planeV", 2, viewScene);
          plane.position = m
            .getAbsolutePosition()
            .add(new BABYLON.Vector3(0, 0.135, 0)); // m의 절대 위치에서 y 좌표를 100만큼 추가하여 위치 설정
          //plane2.rotation = m.absoluteRoation;
          let angle = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);

          //gui_ani GUI생성 후 여기넣기 advancedTexture_zoomInGUI

          // TextBlock 생성
          let textBlockA = new BABYLON.GUI.TextBlock();
          textBlockA.fontFamily = "Noto Sans";
          textBlockA.text = "-2.98°";
          textBlockA.color = "#EC7272";
          textBlockA.fontWeight = "bold";
          textBlockA.fontSize = 45;
          textBlockA.shadowBlur = 5; // 그림자 흐림 정도
          textBlockA.shadowColor = "#000000AA"; // 그림자 색상
          textBlockA.shadowOffsetX = 3; // 그림자 X 축 오프셋
          textBlockA.shadowOffsetY = 3; // 그림자 Y 축 오프셋
          angle.addControl(textBlockA);

          plane2.isVisible = false;
          plane.isVisible = false;

          gui_ani.push(plane2);
          gui_ani.push(plane);
        }
      }
    });
    //console.log(key);
    if (key == "space3_1") {
      // 하이라이트 토글 함수
      toggleHighlight = function () {
        getmesh.forEach((child) => {
          if (!child.name.includes("Cylinder_space"))
            if (
              child instanceof BABYLON.Mesh &&
              !compressorhighlightLayer.hasMesh(child)
            ) {
              compressorhighlightLayer.addMesh(
                child,
                new BABYLON.Color4(0 / 255, 224 / 255, 255 / 255, 0.7)
              );
            } else {
              //console.warn("Child is not a Mesh:", child);
              compressorhighlightLayer.removeMesh(child);
            }
        });
      };
      toggleInterval = setInterval(toggleHighlight, 1000);
    }
    advancedTexture.rootContainer.children.forEach(function (control) {
      control.isVisible = false;
    });
    //Access to image at 'file:///c%3A/babylon_/map/babylonmap_0113/babylonmap/babylonmap/img/view_icon/modeling_pin.png' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, isolated-app, chrome-extension, chrome, https, chrome-untrusted.
    //result.meshes[0]._position = data.babylonPos;
    if (scene != viewScene) {
      const boundingBox_obj =
        BABYLON.BoundingBoxGizmo.MakeNotPickableAndWrapInBoundingBox(
          gltfMesh_obj
        );
      gltfMesh_obj.position.y = 0;

      gltfMesh_obj.rotation.y = 0;
      gltfMesh_obj.rotation.z = 0;

      boundingBox_obj.rotation.y = 0;
      boundingBox_obj.rotation.z = 0;
      //gltfMesh_obj._position._y += gltfMesh_obj._position._y;
      boundingBox_obj.name = key;
      let caldata = ToBabylonPos(
        GetMercatorPos([data.pos.Gps_lng, data.pos.Gps_lat])
      );
      if (ischild) {
        boundingBox_obj._position._x = caldata._x;
        boundingBox_obj._position._y = data.pos.y;
        boundingBox_obj._position._z = caldata._z;

        boundingBox_obj._scaling._x *= data.originscale.x;
        boundingBox_obj._scaling._y *= data.originscale.y;
        boundingBox_obj._scaling._z *= data.originscale.z;

        boundingBox_obj._rotation._x = data.worldMatrix.x;
        boundingBox_obj._rotation._y = data.worldMatrix.y;
        boundingBox_obj._rotation._z = data.worldMatrix.z;
        // // 추가 회전 각도
        // console.log(boundingBox_obj);

        //boundingBox_obj.parent = parentobj.meshes;
      } else {
        boundingBox_obj._position._x = -1;
        boundingBox_obj._position._y = -0.8;
        boundingBox_obj._position._z = 0.5;

        boundingBox_obj._rotation._x = data.worldMatrix.x;
        boundingBox_obj._rotation._y = data.worldMatrix.y;
        boundingBox_obj._rotation._z = data.worldMatrix.z;

        boundingBox_obj._scaling._x *= data.originscale.x;
        boundingBox_obj._scaling._y *= data.originscale.y;
        boundingBox_obj._scaling._z *= data.originscale.z;
        // scene.cameras[0].setPosition(
        //   new BABYLON.Vector3(caldata._x, data.pos.y, caldata._z)
        // );
      }
      const currentRotation = new BABYLON.Vector3(
        boundingBox_obj._rotation._x,
        boundingBox_obj._rotation._y,
        boundingBox_obj._rotation._z
      );
      const additionalRotationAngle = Math.PI; // 180도
      0;
      // 추가 회전 각도를 Quaternion으로 변환
      const additionalRotationQuaternion = new BABYLON.Quaternion.RotationAxis(
        new BABYLON.Vector3(0, 1, 0),
        additionalRotationAngle
      );

      // 현재 회전값을 Quaternion으로 변환
      const currentRotationQuaternion = new BABYLON.Quaternion.FromEulerAngles(
        currentRotation.x,
        currentRotation.y,
        currentRotation.z
      );

      // 현재 회전값에 추가 회전을 곱하여 새로운 회전을 얻음
      const newRotationQuaternion = BABYLON.Quaternion.Identity();
      currentRotationQuaternion.multiplyToRef(
        additionalRotationQuaternion,
        newRotationQuaternion
      );

      // 새로운 회전값을 Euler 각도로 변환
      const newRotationEulerAngles = new BABYLON.Vector3();
      newRotationQuaternion.toEulerAnglesToRef(newRotationEulerAngles);

      // bounding box 객체에 적용
      boundingBox_obj._rotation._x = newRotationEulerAngles.x;
      boundingBox_obj._rotation._y = newRotationEulerAngles.y;
      boundingBox_obj._rotation._z = newRotationEulerAngles.z;

      // 메시에도 적용
      boundingBox_obj.rotationQuaternion = newRotationQuaternion;
      //boundingBox_obj.checkCollisions = true;
      // viewScene.getBoundingBoxRenderer().showBackLines = true;
      // viewScene.meshes.forEach((mesh) => {
      //   mesh.showBoundingBox = true;
      //   mesh.showBoundingBox.checkCollisions = true;
      // });
    }

    let animationGroup = new BABYLON.AnimationGroup("myAnimationGroup");
    //let animationGroups = result.animationGroups;
    let animationGroups2 = result.animationGroups;
    let animationGroups = [];
    for (let i = 0; i < animationGroups2.length; i++) {
      animationGroups.push(animationGroups2[i]);
    }
    //animationGroups = animationGroups2[1];
    isanimationstart = true;
    animationstop(animationGroup, animationGroups);
    animationstart(animationGroup, animationGroups);
    if (
      $(".modelinfo-view-title-bottom-name").text() == "센트럴시티 보도육교"
    ) {
      let findparnet = gltfMesh_obj;
      while (true) {
        if (findparnet._parentNode != null) {
          findparnet = findparnet._parentNode;
        } else {
          break;
        }
      }
      if (justfirst) {
        bridgeinit(findparnet.getChildMeshes());
        bridgecam(findparnet.getChildMeshes());
      }
      justfirst = false;

      animationstop(animationGroup, animationGroups);
      crackani = animationGroups;
      $(".btn_cam").click(function () {
        let getid = (nowclickmemo = parseInt(this.id.match(/\d+/)[0]));
      });
    }

    // $("#videostop-checkbox").click(function () {
    //   if ($("#lock-checkbox").is(":checked") == false) {
    //     animationstop(animationGroup, animationGroups);
    //     $("#videoplay-checkbox").prop("checked", false);

    //     $("#videoplay-checkbox").next("div").text("Play");
    //   }
    // });

    //옮겨보기  //객체 크기
    if (scene == viewScene) {
      //getmesh.position.y -= 10;
      let combinedMesh = null;
      if (key == facility_name || key == "centralcity_bridges") {
        combinedMesh = null;
      } else {
        combinedMesh = BABYLON.Mesh.MergeMeshes(
          getmesh,
          true,
          true,
          undefined,
          false,
          true
        );
      }
      let maxSize = 5;
      let center = BABYLON.Vector3.Zero();
      // 객체가 카메라 화면에 꽉 맞도록 확대
      if (combinedMesh != null) {
        let boundingBox = combinedMesh.getBoundingInfo().boundingBox;
        let size = boundingBox.maximum.subtract(boundingBox.minimum);
        maxSize = Math.max(size.x, size.y, size.z);
        center = boundingBox.center;
        //console.log("boundingBoxsize", size);
      }

      viewerModel_distance = maxSize;
      // viewScene.activeCamera.radius = viewerModel_distance;
      // console.log("viewerModel_distance : ", viewerModel_distance)
      // viewScene.getEngine().runRenderLoop(function () {
      //   viewScene.render();
      // });
      cameraSet_viewer(center);
    }
    return result;
  } catch (error) {
    if (scene == viewScene) {
      viewerModel_distance = 30;
      cameraSet_viewer(BABYLON.Vector3.Zero());
      viewScene.getEngine().resize();
    }
    console.error("Error loading and creating mesh:", error);
    return null; // 또는 오류 처리 방식에 따라 다르게 처리
  }
}
function animationstart(animationGroup, animationGroups) {
  animationGroups.forEach((group) => {
    for (let i = 0; i < group.targetedAnimations.length; i++) {
      animationGroup.addTargetedAnimation(
        group.targetedAnimations[i].animation,
        group.targetedAnimations[i].target
      );
    }
    //group.stop(true);
  });
  if (isanimationstart) {
    animationGroup.start(true);
  } else {
    animationGroup.restart(true);
  }
  isanimationstart = true;
}
function animationpause(animationGroup, animationGroups) {
  animationGroups.forEach((group) => {
    for (let i = 0; i < group.targetedAnimations.length; i++) {
      animationGroup.addTargetedAnimation(
        group.targetedAnimations[i].animation,
        group.targetedAnimations[i].target
      );
    }

    //group.pause(true);
  });
  animationGroup.pause(true);
  isanimationstart = false;
}
function animationstop(animationGroup, animationGroups) {
  animationGroups.forEach((group) => {
    for (let i = 0; i < group.targetedAnimations.length; i++) {
      animationGroup.addTargetedAnimation(
        group.targetedAnimations[i].animation,
        group.targetedAnimations[i].target
      );
    }

    isanimationstart = true;
    group.pause();
  });
  //animationGroup.reset();
  animationGroup.stop();
  //$("#videoplay-checkbox").prop("checked", true);
}
