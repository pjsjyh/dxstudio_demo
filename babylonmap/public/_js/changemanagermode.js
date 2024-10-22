function changemangermode() {
  gizmoManager.attachToMesh(null);
  recentgroup = "Map";
  managermodecheck = true;
  $("#main-editor-view-property-property-disable").css("visibility", "visible");

  $("#view-bar").css("backgroundColor", "var(--view-bar-change-color)");
  $("#manage-user-div").remove();
  $("#view-bar-name").text("map editor");
  $("#editor-side-view-layer-objects-lists-manager").css("display", "block");
  $("#editor-side-view-layer-objects-lists").css("display", "none");
  $("#obj-box-category-col-btn-device, #obj-box-category-col-btn-traffic").prop(
    "disabled",
    true
  );
  $("#editor-icons-home").css(
    "backgroundColor",
    "var(--view-bar-change-color)"
  );

  $(".obj-box-category-cover").css("display", "block");
  $("#new-obj-box-list-cover").css("display", "none");
  click_categoryBox = "all";
  searchinput();
  document.documentElement.style.setProperty("--view-bar-btn-color", "#4D4D4D");
}

function changegeneralmode() {
  customLayer.allgizmofalse();
  recentgroup = "Group0";
  managermodecheck = false;
  gizmoManager.attachToMesh(null);
  $("#main-editor-view-property-property-disable").css("visibility", "visible");
  $("#view-bar").css("backgroundColor", "var(--view-bar-color)");
  $("#view-bar-name").text("editor");
  $("#editor-side-view-layer-objects-lists-manager").css("display", "none");
  $("#editor-side-view-layer-objects-lists").css("display", "block");
  $(".obj-box-category-cover").css("display", "none");
  $("#editor-icons-home").css("backgroundColor", "var(--view-bar-color)");
  click_categoryBox = "all";
  searchinput();
  document.documentElement.style.setProperty("--view-bar-btn-color", "#2E2E2E");
}
