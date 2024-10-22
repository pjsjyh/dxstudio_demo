function setInspectorTransform() {
  document.getElementById(
    "main-editor-view-property-property-disable"
  ).style.visibility = "hidden";
  document.getElementById("main-editor-view-property-property").scrollTop = 0;
  document.getElementById(
    "main-editor-view-property-property"
  ).style.overflowY = "auto";
  set_inspector_type();
  set_inspector_name();
  set_inspector_JSON();
  set_inspector_explane();
  // if (
  //   selectedMesh.model_._parentNode == null ||
  //   selectedMesh.model_._parentNode.name.includes("Group")
  // ) {
  //   selectedMesh.model_._absolutePosition = selectedMesh.model_._position;
  //   console.log("check");
  // }
  let gpsLnglat = toGPS([
    selectedMesh.model_._absolutePosition.x,
    selectedMesh.model_._absolutePosition.z,
  ]);
  document.getElementById("position_Value_x").value = gpsLnglat.lng;
  document.getElementById("position_Value_y").value =
    selectedMesh.model_._absolutePosition.y; //toGPS(selectedMesh.position.y);
  document.getElementById("position_Value_z").value = gpsLnglat.lat; //0//toGPS(selectedMesh.position.z).y;
  objmarker.forEach((element) => {
    if (element._element.id == selectedMesh.divId) {
      element.setLngLat([gpsLnglat.lng, gpsLnglat.lat]);
    }
  });

  document.getElementById("rotation_Value_x").value = radiansToDegrees(
    selectedMesh.model_.rotation.x
  );
  document.getElementById("rotation_Value_y").value = radiansToDegrees(
    selectedMesh.model_.rotation.y
  );
  document.getElementById("rotation_Value_z").value = radiansToDegrees(
    selectedMesh.model_.rotation.z
  );
  getWorldRotation2(selectedMesh.model_);
  //console.log(selectedMesh)
  document.getElementById("scale_Value_x").value =
    selectedMesh.model_.scaling.x / selectedMesh.originx_;
  document.getElementById("scale_Value_y").value =
    selectedMesh.model_.scaling.y / selectedMesh.originy_;
  document.getElementById("scale_Value_z").value =
    selectedMesh.model_.scaling.z / selectedMesh.originz_;
  //document.getElementById("scale_Value_z").value = selectedMesh.scalingDeterminant;

  //loactionInputSet();
  adressSet();
}
function getWorldRotation2(mesh) {
  let savepos = selectedMesh.model_._absolutePosition;
  let worldMatrix1 = mesh.computeWorldMatrix(true);

  // 분해 결과를 저장할 객체 생성
  let position = new BABYLON.Vector3();
  let rotationQuaternion = new BABYLON.Quaternion();
  let scaling = new BABYLON.Vector3();

  // worldMatrix 분해
  let success = worldMatrix1.decompose(scaling, rotationQuaternion, position);

  if (success) {
    // Quaternion 회전 정보를 Euler 각도로 변환
    let worldRotation = rotationQuaternion.toEulerAngles();
    selectedMesh.worldMatrix._x = worldRotation._x;
    selectedMesh.worldMatrix._y = worldRotation._y;
    selectedMesh.worldMatrix._z = worldRotation._z;
  } else {
    console.log("Decomposition failed");
  }

  selectedMesh.model_._absolutePosition = savepos;
}
