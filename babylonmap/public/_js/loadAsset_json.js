function loadAsset_json(_obj, getnum) {
  BABYLON.SceneLoader.LoadAssetContainerAsync(
    " https://dt.gractor.com/demoModeling/",
    _obj.type + ".glb",
    this.scene
  ).then((c) => {
    c.addAllToScene();
    let rootMesh = c.createRootMesh();
    c.meshes.forEach((mesh) => {
      // 메시가 클릭되었을 때 이벤트 핸들러 등록
      mesh.isPickable = true;
      mesh.actionManager = new BABYLON.ActionManager(this.scene);
      mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnPickTrigger,
          function () {
            // 클릭된 메시를 선택하고 색상 변경 또는 다른 동작 수행
            //mesh.name = rootMesh.name;
            selectMesh(rootMesh, model_obj);
          }
        )
      );
    });
    //_set을 통해 반복문으로 clone하여 객체 위치 지정 및, 회전, 스케일 지정
    let model_obj;
    //let objClone = boundingBox_obj.clone();
    rootMesh._rotation._x = _obj.worldMatrix.x;
    rootMesh._rotation._y = _obj.worldMatrix.y;
    rootMesh._rotation._z = _obj.worldMatrix.z;

    // const currentRotation = new BABYLON.Vector3(
    //   rootMesh._rotation._x,
    //   rootMesh._rotation._y,
    //   rootMesh._rotation._z
    // );
    // const additionalRotationAngle = Math.PI; // 180도
    // // 추가 회전 각도를 Quaternion으로 변환
    // const additionalRotationQuaternion = new BABYLON.Quaternion.RotationAxis(
    //   new BABYLON.Vector3(0, 1, 0),
    //   additionalRotationAngle
    // );

    // // 현재 회전값을 Quaternion으로 변환
    // const currentRotationQuaternion = new BABYLON.Quaternion.FromEulerAngles(
    //   currentRotation.x,
    //   currentRotation.y,
    //   currentRotation.z
    // );

    // // 현재 회전값에 추가 회전을 곱하여 새로운 회전을 얻음
    // const newRotationQuaternion = BABYLON.Quaternion.Identity();
    // currentRotationQuaternion.multiplyToRef(
    //   additionalRotationQuaternion,
    //   newRotationQuaternion
    // );

    // // 새로운 회전값을 Euler 각도로 변환
    // const newRotationEulerAngles = new BABYLON.Vector3();
    // newRotationQuaternion.toEulerAnglesToRef(newRotationEulerAngles);

    // // bounding box 객체에 적용
    // rootMesh._rotation._x = newRotationEulerAngles.x;
    // rootMesh._rotation._y = newRotationEulerAngles.y;
    // rootMesh._rotation._z = newRotationEulerAngles.z;

    // // 메시에도 적용
    // rootMesh.rotationQuaternion = newRotationQuaternion;
    rootMesh._position.y = _obj.pos.y;
    let babylonPos = ToBabylonPos(
      GetMercatorPos([_obj.pos.Gps_lng, _obj.pos.Gps_lat])
    );
    // console.log(_obj.name, _obj.pos.Gps_lng, _obj.pos.Gps_lat);
    // console.log(toGPS([babylonPos._x, babylonPos._z]));
    rootMesh._position.x = _obj.babylonPos.x;
    rootMesh._position.z = _obj.babylonPos.z;
    rootMesh._scaling._x *= _obj.originscale.x;
    rootMesh._scaling._y *= _obj.originscale.y;
    rootMesh._scaling._z *= _obj.originscale.z;

    rootMesh.id = _obj.name + "obj";
    rootMesh.name = _obj.name;
    // + objectlist[getnum].num
    model_obj = {
      allmesh_: c,
      model_: rootMesh,
      scalex_: rootMesh.scaling.x,
      scaley_: rootMesh.scaling.y,
      scalez_: rootMesh.scaling.z,
      originx_: rootMesh.scaling.x,
      originy_: rootMesh.scaling.y,
      originz_: rootMesh.scaling.z,
      divId: rootMesh.name,
      zoomlevel_: objectlist[getnum].zoom,
      type: objectlist[getnum].type,
      explane: "",
      JSONEditor: "",
      marker: 0,
      modelingType: rootMesh.name.replace(/\s\(\d+\)$/, ""),
      worldMatrix: { _x: 0, _y: 0, _z: 0 },
      originscale: { _x: 1, _y: 1, _z: 1 },
      objmode: "general",
    };
    objectlist[getnum].num++;

    modelObj.push(model_obj);
    let isunder = false;
    if (selectsomething) {
      for (let key in objectlist) {
        if (objectlist[key].name == selectedMesh.model_.id) {
          if (objectlist[key].type == "Sensor") {
            isunder = true;
          }
        }
      }
    }
    console.log(objectlist[getnum].type)

    customLayer.addobjectlist(rootMesh.name, objectlist[getnum].type);
    customLayer.deselectMesh();

    gizmoManager.attachToMesh(rootMesh);
    // let objlists_obj = document.getElementById(objClone.name);
    // objlists_obj.addEventListener("click", function () {
    //   // 하이라키에 생성된 객체 리스트 클릭시 인스펙터에 해당 객체 좌표값 반영
    //   setInspectorTransform();
    // });
    customLayer.allgizmofalse();

    gizmoManager.gizmos.positionGizmo.updateGizmoPositionToMatchAttachedMesh = true;
    //gizmoManager.positionGizmoEnabled = true;

    arr.push(rootMesh);

    let zoomLevel_ =
      (maxZoomuse - map.getZoom() + 1) * (maxZoomuse - map.getZoom() + 1) * 5;
    gizmoManager.gizmos.scaleGizmo.scaleRatio = zoomLevel_;
    gizmoManager.gizmos.rotationGizmo.scaleRatio = zoomLevel_;
    gizmoManager.gizmos.positionGizmo.scaleRatio = zoomLevel_;

    //type은 나중.
    let el = document.createElement("div");
    el.className = "marker";
    let imgname =
      "url(./img/main_icon/marker_" + objectlist[getnum].type + ".png)";
    el.style.backgroundImage = imgname;
    el.style.width = "2.25rem"; // 이미지의 너비
    el.style.height = "2.25rem"; // 이미지의 높이
    el.style.backgroundRepeat = "no-repeat";
    el.style.backgroundSize = "contain";

    let newobjmarker = new maplibregl.Marker({
      element: el,
      draggable: false,
    })
      .setLngLat([_obj.pos.Gps_lng, _obj.pos.Gps_lat]) // 마커의 경도와 위도 설정
      .addTo(map);
    newobjmarker.getElement().setAttribute("id", rootMesh.name);
    objmarker.push(newobjmarker);
    let currentZoom = map.getZoom();
    if (currentZoom < markermaxZoomLevel) {
      newobjmarker.getElement().style.display = "block";
    } else {
      newobjmarker.getElement().style.display = "none";
    }

    // 새로운 JSON 저장소를 만들기 위해 빈 객체를 생성
    const newData = {};
    var existingDataString = localStorage.getItem(rootMesh.name);
    if (existingDataString == null) {
      // 새로운 JSON 저장소를 로컬 스토리지에 저장
      localStorage.setItem(rootMesh.name, JSON.stringify(newData));
    }
  });
}
