//object 생성
function testcreateobj(name, getnum, _customname) {
  BABYLON.SceneLoader.LoadAssetContainerAsync(
    " https://dt.gractor.com/demoModeling/",
    name + ".glb",
    this.scene
  ).then((c) => {
    c.addAllToScene();
    let rootMesh = c.createRootMesh();
    c.meshes.forEach((mesh) => {
      // 메시가 클릭되었을 때 이벤트 핸들러 등록
      mesh.isPickable = true;
      mesh.actionManager = new BABYLON.ActionManager(this.scene);
      mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnPickTrigger,
          function () {
            // 클릭된 메시를 선택하고 색상 변경 또는 다른 동작 수행
            mesh.name = rootMesh.name;
            //return console.log(rootMesh.name);
          }
        )
      );
    });

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 100; j++) {
        console.log(0);
        let clone = rootMesh.clone();
        clone.position.x += j * 100;
        clone.position.z += i * 100;
      }
    }

    console.log(0);
    //console.log("container", container);
    let objName = name;
    if (_customname != null) {
      objName = _customname;
    }
    let elements = document.getElementsByClassName("objlist");
    let equalName = objName + " (0)";
    for (let i = 0, j = 1; i < elements.length; i++) {
      if (elements[i].innerHTML == equalName) {
        //이름 비교 및 같으면 (1)식으로 추가 생성
        equalName = objName + " (" + j++ + ")";
        i = 0;
      }
    }

    rootMesh.name = equalName;
    rootMesh.id = equalName + "obj";
  });
}
