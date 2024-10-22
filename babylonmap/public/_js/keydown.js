function mainkeydown(e) {
  if (
    document.getElementById("view-bar-editorChange-btn-checkbox").checked &&
    cursoron == false &&
    (e.key == "w" ||
      e.key == "e" ||
      e.key == "r" ||
      e.key == "q" ||
      e.key == " " ||
      e.key == "Delete" ||
      e.key == "p" ||
      e.key == "o")
  ) {
    // Switch gizmo type
    customLayer.allgizmofalse();

    gizmoManager.gizmos.positionGizmo.updateGizmoPositionToMatchAttachedMesh = false;
    gizmoManager.gizmos.scaleGizmo.updateGizmoScaleToMatchAttachedMesh = false;
    gizmoManager.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh = false;
    gizmoManager.boundingBoxGizmoEnabled = false;
    if (iseditormode && cursoron == false) {
      if (e.key == "w") {
        gizmoManager.positionGizmoEnabled = true;
        gizmoManager.gizmos.positionGizmo.updateGizmoPositionToMatchAttachedMesh = true;
        document.getElementById("editor-icons-move").checked = true;
      }
      if (e.key == "e") {
        gizmoManager.rotationGizmoEnabled = true;
        gizmoManager.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh = false;
        document.getElementById("editor-icons-rotation").checked = true;
      }
      if (e.key == "r") {
        gizmoManager.scaleGizmoEnabled = true;
        gizmoManager.gizmos.scaleGizmo.updateGizmoRotationToMatchAttachedMesh = true;
        document.getElementById("editor-icons-scale").checked = true;
      }
      if (e.key == "q") {
        document.getElementById("editor-icons-select").checked = true;
      }
      if (e.key == "Delete") {
        if (!inputState) {
          customLayer.allgizmofalse();

          customLayer.deleteobjectlist(selectedMesh);
          selectsomething = false;
          selectedMesh.model_.dispose();
          modelObj.splice(modelObj.indexOf(selectedMesh), 1);
        }
      }
    }
  }
}
function studiokeydown(e) {
  //전제 if문에 에디터 모드인지 확인하는 if문 추가. 추후에 highlight에 객체가 있냐 없냐에 따라 작동하게 해도 괜찮을거같음.

  if (
    !viewCheck &&
    gizmoManagerStudio._attachedMesh.name != "lineX" &&
    gizmoManagerStudio._attachedMesh.name != "lineZ" &&
    (e.key == "w" ||
      e.key == "e" ||
      e.key == "r" ||
      e.key == "q" ||
      e.key == " " ||
      e.key == "Delete" ||
      e.key == "p" ||
      e.key == "o")
  ) {
    gizmoManagerStudio.gizmos.positionGizmo.updateGizmoPositionToMatchAttachedMesh = false;
    gizmoManagerStudio.gizmos.scaleGizmo.updateGizmoScaleToMatchAttachedMesh = false;
    gizmoManagerStudio.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh = false;
    gizmoManagerStudio.positionGizmoEnabled = false;
    gizmoManagerStudio.rotationGizmoEnabled = false;
    gizmoManagerStudio.scaleGizmoEnabled = false;
    gizmoManagerStudio.boundingBoxGizmoEnabled = false;
    if (e.key == "w") {
      gizmoManagerStudio.positionGizmoEnabled = true;
      gizmoManagerStudio.gizmos.positionGizmo.updateGizmoPositionToMatchAttachedMesh = true;
    }
    if (e.key == "e") {
      gizmoManagerStudio.rotationGizmoEnabled = true;
      gizmoManagerStudio.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh = false;
    }
    if (e.key == "r") {
      gizmoManagerStudio.scaleGizmoEnabled = true;
      gizmoManagerStudio.gizmos.scaleGizmo.updateGizmoRotationToMatchAttachedMesh = true;
    }
    if (e.key == "q") {
      gizmoManagerStudio.boundingBoxGizmoEnabled = true;
    }
    if (e.key == "Delete") {
      customLayer.allgizmofalse();

      console.log(gizmoManagerStudio._attachedMesh);
      gizmoManagerStudio._attachedMesh.dispose();
    }
  }
}
