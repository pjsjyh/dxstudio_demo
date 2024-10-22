function gizmooff() {
  customLayer.changeeditor();
  if (!iseditormode && selectedMesh.model_ != null) {
    customLayer.deselectMesh();

    //객체 선택이 안되어있으니 안보이게
    propertyReset();

    customLayer.allgizmofalse();
  }
}