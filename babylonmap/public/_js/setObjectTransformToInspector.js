function setObjectTransformToInspector() {
  let babylonPos = ToBabylonPos(
    GetMercatorPos([
      document.getElementById("position_Value_x").value,
      document.getElementById("position_Value_z").value,
    ])
  );
  //console.log("dasfasf ",document.getElementById("position_Value_x").value)
  selectedMesh.model_._absolutePosition.x = babylonPos.x;
  selectedMesh.model_._absolutePosition.y = parseFloat(
    document.getElementById("position_Value_y").value
  );
  selectedMesh.model_._absolutePosition.z = babylonPos.z;

  selectedMesh.model_.rotation.x = degreesToRadians(
    document.getElementById("rotation_Value_x").value
  );
  selectedMesh.model_.rotation.y = degreesToRadians(
    document.getElementById("rotation_Value_y").value
  );
  selectedMesh.model_.rotation.z = degreesToRadians(
    document.getElementById("rotation_Value_z").value
  );

  //savescale();

  selectedMesh.model_.scaling.x =
    document.getElementById("scale_Value_x").value * selectedMesh.originx_;
  selectedMesh.model_.scaling.y =
    document.getElementById("scale_Value_y").value * selectedMesh.originy_;
  selectedMesh.model_.scaling.z =
    document.getElementById("scale_Value_z").value * selectedMesh.originz_;
  //selectedMesh.scalingDeterminant 전체 적인 사이즈 변동
  //selectedMesh.scalingDeterminant = document.getElementById("scale_Value_z").value;
  //console.log(selectedMesh);
}
