//object 생성
function createobj(name, getnum, _customname) {
  BABYLON.SceneLoader.LoadAssetContainerAsync(
    " https://dt.gractor.com/demoModeling/",
    name + ".glb",
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
            selectMesh(rootMesh, obj);
          }
        )
      );
    });

    //console.log("container", container);
    let objName = name;
    if (_customname != null) {
      objName = _customname;
    }
    let elements = document.getElementsByClassName("objlist");
    let equalName = objName + " (0)";
    for (let i = 0, j = 1; i < elements.length; i++) {
      if (elements[i].innerHTML == equalName) {
        //이름 비교 및 같으면 (1)식으로 추가 생성
        equalName = objName + " (" + j++ + ")";
        i = 0;
      }
    }
    rootMesh.name = equalName;
    rootMesh.id = equalName + "obj";
    let currentmode;
    if (managermodecheck) {
      currentmode = "manager";
    } else {
      currentmode = "general";
    }
    let obj = {
      allmesh_: c,
      model_: rootMesh,
      scalex_: rootMesh.scaling.x,
      scaley_: rootMesh.scaling.y,
      scalez_: rootMesh.scaling.z,
      originx_: rootMesh.scaling.x,
      originy_: rootMesh.scaling.y,
      originz_: rootMesh.scaling.z,
      divId: equalName,
      zoomlevel_: objectlist[getnum].zoom,
      type: objectlist[getnum].type,
      explane: "",
      JSONEditor: "",
      marker: 0,
      modelingType: name,
      worldMatrix: { _x: 0, _y: 0, _z: 0 },
      originscale: { _x: 1, _y: 1, _z: 1 },
      objmode: currentmode,
    };
    objectlist[getnum].num += 1;
    let isunder = false;
    if (selectsomething) {
      for (let key in objectlist) {
        if (selectedMesh.model_.id.includes(objectlist[key].name)) {
          isunder = true; //일단 모두 하위객체 가능하도록
          if (
            objectlist[key].type == "building" &&
            objectlist[getnum].type == "sensor"
          ) {
            isunder = true;
          }
        }
      }
    }
    selectsomething = false;
    if (managermodecheck) {
      manager_modelObj.push(obj);
    } else {
      modelObj.push(obj);
    }
    if (isunder) {
      obj.model_._rotation._x = 0;
      obj.model_._rotation._y = 0;
      obj.model_._rotation._z = 0;
      obj.model_.parent = selectedMesh.model_;
      obj.model_._position = new BABYLON.Vector3(0, 0, 0);
    }

    //rootmesh 에러 나면 selectedMesh.model_.id.slice(0, -3);로 변경 지향
    console.log(objectlist[getnum].type)
    customLayer.addobjectlist(
      rootMesh.name,
      objectlist[getnum].type,
      isunder,
      managermodecheck
    );
    customLayer.deselectMesh();
    selectMesh(rootMesh, obj);
    gizmoManager.attachToMesh(rootMesh);
    let localModelingPos = ToBabylonPos(
      GetMercatorPos([map.getCenter().lng, map.getCenter().lat])
    );
    if (!isunder) {
      rootMesh.position = localModelingPos;
    }

    setObjImportData();
    //console.log("c.position", map.getCenter());
    setInspectorTransform();
    let objlists_obj = document.getElementById(rootMesh.name);
    objlists_obj.addEventListener("click", function () {
      // 하이라키에 생성된 객체 리스트 클릭시 인스펙터에 해당 객체 좌표값 반영
      setInspectorTransform();
    });
    customLayer.allgizmofalse();

    gizmoManager.gizmos.positionGizmo.updateGizmoPositionToMatchAttachedMesh = true;
    // gizmoManager.positionGizmoEnabled = true;

    let zoomLevel_ =
      (maxZoomuse - map.getZoom() + 1) * (maxZoomuse - map.getZoom() + 1) * 5;
    gizmoManager.gizmos.scaleGizmo.scaleRatio = zoomLevel_;
    gizmoManager.gizmos.rotationGizmo.scaleRatio = zoomLevel_;
    gizmoManager.gizmos.positionGizmo.scaleRatio = zoomLevel_;
    arr.push(rootMesh);

    customLayer.allgizmofalse();
    document.getElementById("editor-icons-select").checked = true;

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
      .setLngLat([map.getCenter().lng, map.getCenter().lat]) // 마커의 경도와 위도 설정
      .addTo(map);
    newobjmarker.getElement().setAttribute("id", equalName);
    objmarker.push(newobjmarker);
    let currentZoom = map.getZoom();
    if (currentZoom < markermaxZoomLevel) {
      newobjmarker.getElement().style.display = "block";
    } else {
      newobjmarker.getElement().style.display = "none";
    }

    // 새로운 JSON 저장소를 만들기 위해 빈 객체를 생성
    const newData = {};
    var existingDataString = localStorage.getItem(equalName);
    if (existingDataString == null) {
      // 새로운 JSON 저장소를 로컬 스토리지에 저장
      localStorage.setItem(equalName, JSON.stringify(newData));
    }
  });
}
