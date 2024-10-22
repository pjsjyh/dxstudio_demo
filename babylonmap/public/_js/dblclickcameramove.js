//하이라키 더블 클릭시 obj가까이로 카메라 이동
function dblclickcameramove() {
  let gpsLnglat;
  gpsLnglat = toGPS([
    selectedMesh.model_.position.x,
    selectedMesh.model_.position.z,
  ]);
  // map.transform.zoom = selectedMesh.zoomlevel_;
  map.transform.zoom = 18;
  //map.setCenter([gpsLnglat.lng, gpsLnglat.lat]);
  map.panTo([gpsLnglat.lng, gpsLnglat.lat]);
  console.log(gpsLnglat.lng, gpsLnglat.lat);
  zoomLevel_ =
    (maxZoomuse - map.getZoom() + 1) * (maxZoomuse - map.getZoom() + 1) * 5;

  gizmoManager.gizmos.scaleGizmo.scaleRatio = zoomLevel_;
  gizmoManager.gizmos.rotationGizmo.scaleRatio = zoomLevel_;
  gizmoManager.gizmos.positionGizmo.scaleRatio = zoomLevel_;

  objmarker.forEach((element) => {
    element.getElement().style.display = "none";
  });
}
