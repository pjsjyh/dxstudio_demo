function makelable(m) {
  let target = new BABYLON.GUI.Image("target", base64Image);
  target.width = "50px";
  target.height = "50px";

  advancedTexture.addControl(target);
  target.linkWithMesh(m);

  let rect = new BABYLON.GUI.Rectangle();
  rect.height = "50px";
  rect.width = "200px"; // 너비 설정
  rect.thickness = 0;
  rect.isVisible = false; // 초기에는 숨김
  advancedTexture.addControl(rect);

  let blurredBackground = new BABYLON.GUI.Image("background", inforect);
  blurredBackground.stretch = BABYLON.GUI.Image.STRETCH_FILL; // 이미지를 늘려서 채우기
  rect.addControl(blurredBackground); // Rectangle에 이미지 추가
  //rect.background = "rgba(0, 0, 0, 0.5)";
  rect.cornerRadius = 5;

  let text1 = new BABYLON.GUI.TextBlock();
  m.name = m.name.slice(0, -6);

  text1.text = m.name;
  text1.color = "white";
  text1.top = "-5px";
  rect.addControl(text1);
  advancedTexture.addControl(rect);

  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  context.font = "1rem Arial";
  let metrics = context.measureText(m.name);
  let textWidth = metrics.width;
  rect.width = textWidth * 1.5 + "px";
  rect.linkWithMesh(m);
  rect.linkOffsetX = 50;
  rect.linkOffsetY = 50;

  let rect2 = new BABYLON.GUI.Rectangle();
  rect2.height = "173px";
  rect2.width = "421px"; // 너비 설정
  rect2.thickness = 0;
  rect2.isVisible = false; // 초기에는 숨김
  advancedTexture.addControl(rect2);

  let blurredBackground2 = new BABYLON.GUI.Image("background", infoboximg);
  blurredBackground2.stretch = BABYLON.GUI.Image.STRETCH_FILL; // 이미지를 늘려서 채우기
  rect2.addControl(blurredBackground2); // Rectangle에 이미지 추가
  rect2.linkWithMesh(m);
  rect2.linkOffsetX = 50;
  rect2.linkOffsetY = 150;
  target.onPointerDownObservable.add(() => {
    if (m.name == "‘sky’_series_air_end_label") {
      rect2.isVisible = true;
    }
  });
  target.onPointerEnterObservable.add(() => {
    rect.isVisible = true; // 마우스 오버 시 Rect 표시
  });

  target.onPointerOutObservable.add(() => {
    rect.isVisible = false; // 마우스가 벗어나면 Rect 숨김
    rect2.isVisible = false;
  });
}
