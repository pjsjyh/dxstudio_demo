function selectMesh(rootMesh, mesh) {
  //객체 생성 및 클릭시에 inspector창 보이도록
  // document.getElementById("objectInfo").style.display = "flex";

  // selectedMesh = mesh;
  // console.log(selectedMesh, rootMesh);
  // changebackgroundcolorobject(rootMesh.name);
  // customLayer.addoutline(gizmoManager);
  // gizmoManager.attachToMesh(rootMesh);
  // isclickobject = true;
  // savescale();
  // console.log(rootMesh);
  document.getElementById("editor-icons-select").checked = true;
  let nowobj;
  if (managermodecheck) {
    nowobj = manager_modelObj;
  } else {
    nowobj = modelObj;
  }
  nowobj.forEach((mObj) => {
    if (mObj.model_.name == rootMesh.name) {
      if (
        (managermodecheck && mesh.objmode == "manager") ||
        (!managermodecheck && mesh.objmode == "general")
      ) {
        selectedMesh = mObj;

        let rootmeshname = selectedMesh.model_.id.slice(0, -3);
        changebackgroundcolorobject(rootmeshname);
        customLayer.addoutline(gizmoManager);
        gizmoManager.attachToMesh(rootMesh);

        isclickobject = true;
        savescale();
      }
    }
  });
  //selectedMesh.model_ = mesh;
}
function findRootMesh(mesh) {
  // 부모가 없을 때까지 올라가며 root mesh를 찾음
  while (mesh && mesh.parent && !mesh.parent.name.includes("Group")) {
    mesh = mesh.parent;
  }
  return mesh;
}
