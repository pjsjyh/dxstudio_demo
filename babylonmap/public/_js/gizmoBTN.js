
document.getElementById("editor-icons-select").onclick = function () { gizmoBtnSelect() };
document.getElementById("editor-icons-scale").onclick = function () { gizmoBtnScale() };
document.getElementById("editor-icons-move").onclick = function () { gizmoBtnMove() };
document.getElementById("editor-icons-rotation").onclick = function () { gizmoBtnRotate() };


function gizmoBtnSelect() {
  gizmoReset();
}
function gizmoBtnScale() {
  gizmoReset();
  gizmoManager.scaleGizmoEnabled = true;
  gizmoManager.gizmos.scaleGizmo.updateGizmoScaleToMatchAttachedMesh = true;
}
function gizmoBtnMove() {
  gizmoReset();
  gizmoManager.positionGizmoEnabled = true;
  gizmoManager.gizmos.positionGizmo.updateGizmoPositionToMatchAttachedMesh = true;
}
function gizmoBtnRotate() {
  gizmoReset();
  gizmoManager.rotationGizmoEnabled = true;
  gizmoManager.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh = true;
}

function gizmoReset() {
  gizmoManager.rotationGizmoEnabled = false;
  gizmoManager.positionGizmoEnabled = false;
  gizmoManager.scaleGizmoEnabled = false;

  gizmoManager.gizmos.positionGizmo.updateGizmoPositionToMatchAttachedMesh = false;
  gizmoManager.gizmos.scaleGizmo.updateGizmoScaleToMatchAttachedMesh = false;
  gizmoManager.gizmos.rotationGizmo.updateGizmoRotationToMatchAttachedMesh = false;
  gizmoManager.boundingBoxGizmoEnabled = false;
}
