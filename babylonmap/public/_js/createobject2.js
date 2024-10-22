//bouding ver objcreate.
function createobject2(name, getnum, _customname) {
  BABYLON.SceneLoader.ImportMeshAsync(
    "",
    " https://dt.gractor.com/demoModeling/",
    name + ".glb",
    this.scene
  ).then((c) => {
    let gltfMesh = c.meshes[0];
    gltfMesh.rotation.y = 0;
    gltfMesh.rotation.z = 0;
    let boundingBox =
      BABYLON.BoundingBoxGizmo.MakeNotPickableAndWrapInBoundingBox(gltfMesh);
    gltfMesh.position.y = 0;
    //container = boundingBox;
    boundingBox.renderingGroupId = 0;
    boundingBox.isPickable = true;
    boundingBox.rotation.y = 0;
    boundingBox.rotation.z = 0;
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
    boundingBox.name = equalName;
    boundingBox.id = equalName;
    rootMesh.name = equalName;
    rootMesh.id = equalName + "obj";

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
    modelObj.push(obj);
    if (isunder) {
      obj.model_.parent = selectedMesh.model_;
      console.log(obj.model_.parent);
      obj.model_._position = new BABYLON.Vector3(0, 0, 0);
    }
    console.log(objectlist[getnum].type)

    customLayer.addobjectlist(rootMesh.name, objectlist[getnum].type, isunder);
    customLayer.deselectMesh();
    selectMesh(rootMesh);
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
      (maxZoom - map.getZoom() + 1) * (maxZoom - map.getZoom() + 1) * 5;
    gizmoManager.gizmos.scaleGizmo.scaleRatio = zoomLevel_;
    gizmoManager.gizmos.rotationGizmo.scaleRatio = zoomLevel_;
    gizmoManager.gizmos.positionGizmo.scaleRatio = zoomLevel_;
    arr.push(rootMesh);

    customLayer.allgizmofalse();
    document.getElementById("editor-icons-select").checked = true;
  });
}
