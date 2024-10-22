function linkinfoview(saveinfo, findm, loca) {
  // $("#view-model-control-btn").ready(function () {
  //   $("#view-model-control-btn").css("display", "block");
  // });
  $("#mainDiv").css("display", "none");
  $(".modelinfo-view-title-bottom-name").innerText = findm.modelingType;
  $(".modelinfo-view-title-bottom-name").attr("id", findm.divId);

  //$("#modelinfo-view-title-right-type").text(saveinfo.type);
  //$("#info-list-ac_modelname").text(saveinfo);
  //$("#info-list-ac_location").text(loca);
  //$("#info-list-ac_explanation").text(findm.explane);

  //document.getElementById("info-list-ac_modelname").innerText = saveinfo;
}
