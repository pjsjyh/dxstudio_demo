// gizmo로 움직임 끝나고 scale저장
function savescale() {
  console.log();

  if (
    selectedMesh.model_._parentNode == null ||
    selectedMesh.model_._parentNode.id.includes("Group")
  ) {
    if (
      selectedMesh.model_.scaling.x != selectedMesh.scalex_ ||
      selectedMesh.scaley_ != selectedMesh.model_.scaling.y ||
      selectedMesh.scalez_ != selectedMesh.model_.scaling.z
    ) {
      let sechild = selectedMesh.model_._children;
      if (sechild.length >= 2) {
        childchange(sechild);
      }
      selectedMesh.scalex_ = selectedMesh.model_.scaling.x;
      selectedMesh.scaley_ = selectedMesh.model_.scaling.y;
      selectedMesh.scalez_ = selectedMesh.model_.scaling.z;
    }
    selectedMesh.originscale._x = selectedMesh.scalex_;
    selectedMesh.originscale._y = selectedMesh.scaley_;
    selectedMesh.originscale._z = selectedMesh.scalez_;
  } else {
    console.log("otherin");
    if (
      selectedMesh.model_.scaling.x != selectedMesh.scalex_ ||
      selectedMesh.scaley_ != selectedMesh.model_.scaling.y ||
      selectedMesh.scalez_ != selectedMesh.model_.scaling.z
    ) {
      console.log("change");
      console.log(selectedMesh.model_.scaling.x / selectedMesh.scalex_);
      selectedMesh.originscale._x *=
        selectedMesh.model_.scaling.x / selectedMesh.scalex_;
      selectedMesh.originscale._y *=
        selectedMesh.model_.scaling.y / selectedMesh.scaley_;
      selectedMesh.originscale._z *=
        selectedMesh.model_.scaling.z / selectedMesh.scalez_;

      let sechild = selectedMesh.model_._children;
      childchange(sechild);

      selectedMesh.scalex_ = selectedMesh.model_.scaling.x;
      selectedMesh.scaley_ = selectedMesh.model_.scaling.y;
      selectedMesh.scalez_ = selectedMesh.model_.scaling.z;
    }
  }
  //console.log(selectedMesh.originscale);
}
function childchange(ch) {
  let sechild = ch;
  console.log(sechild);
  for (let i = 1; i < sechild.length; i++) {
    let childm;
    if (managermodecheck) {
      childm = findmodelmanager(sechild[i].name);
    } else {
      childm = findmodel(sechild[i].name);
    }
    console.log(selectedMesh.model_.scaling, selectedMesh);
    childm.originscale._x *=
      selectedMesh.model_.scaling.x / selectedMesh.scalex_;
    childm.originscale._y *=
      selectedMesh.model_.scaling.y / selectedMesh.scaley_;
    childm.originscale._z *=
      selectedMesh.model_.scaling.z / selectedMesh.scalez_;

    console.log(childm.originscale);
    if (childm.model_._children.length >= 2) {
      childchange(childm.model_._children);
    }
  }
}
//scale 재할당
function rescale() {
  selectedMesh.model_.scaling.x = selectedMesh.scalex_;
  selectedMesh.model_.scaling.y = selectedMesh.scaley_;
  selectedMesh.model_.scaling.z = selectedMesh.scalez_;
}

function objectinrescale(parentm, childm) {
  console.log("in", childm.originscale, parentm.originscale);
  if (
    selectedMesh.model_._parentNode == null ||
    selectedMesh.model_._parentNode.id.includes("Group")
  ) {
    document.getElementById("scale_Value_x").value = childm.model_.scaling._x /=
      parentm.originscale._x;
    document.getElementById("scale_Value_y").value = childm.model_.scaling._y /=
      parentm.originscale._y;
    document.getElementById("scale_Value_z").value = childm.model_.scaling._z /=
      parentm.originscale._z;
    console.log(childm.model_.scaling._x / parentm.originscale._x);
  } else {
    document.getElementById("scale_Value_x").value = childm.model_.scaling._x =
      childm.originscale._x / parentm.originscale._x;
    document.getElementById("scale_Value_y").value = childm.model_.scaling._y =
      childm.originscale._y / parentm.originscale._y;
    document.getElementById("scale_Value_z").value = childm.model_.scaling._z =
      childm.originscale._z / parentm.originscale._z;
    console.log(childm.originscale._x / parentm.originscale._x);
  }
  childm.scalex_ = childm.model_.scaling._x;
  childm.scaley_ = childm.model_.scaling._y;
  childm.scalez_ = childm.model_.scaling._z;
}

function objectoutrescale(parentm, childm) {
  console.log("out", childm.originscale, parentm.originscale);
  childm.model_.scaling._x *= parentm.originscale._x;
  childm.model_.scaling._y *= parentm.originscale._y;
  childm.model_.scaling._z *= parentm.originscale._z;

  document.getElementById("scale_Value_x").value = childm.model_.scaling._x;
  document.getElementById("scale_Value_y").value = childm.model_.scaling._y;
  document.getElementById("scale_Value_z").value = childm.model_.scaling._z;
}
