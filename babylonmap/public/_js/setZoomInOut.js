document.getElementById("main-view-side-btn-plus").onclick = function () { zoomIn_Btn() };
document.getElementById("main-view-side-btn-minus").onclick = function () { zoomOut_Btn() };

function zoomIn_Btn() {
    let zoom = map.transform.zoom + 0.5;
    this.map.zoomTo(zoom);
    
}
function zoomOut_Btn() {
    let zoom = map.transform.zoom - 0.5;
    this.map.zoomTo(zoom);
    
}