function connectbtnevent() {
  let btnclass = Array.from(
    document.getElementsByClassName("new-obj-box-selectBox box-Objlist")
  );
  for (let i = 0; i < btnclass.length; i++) {
    let thisid = btnclass[i].firstElementChild.id;
    document.getElementById(thisid).onclick = function () {
      createobject(thisid);
    };
  }
}
//object list에 클릭 시 색상 변경과 정보 저장 함수 연결
function connectimport() {
  let box_Objlist = Array.from(
    document.getElementsByClassName("new-obj-box-selectBox box-Objlist")
  );
  for (let i = 0; i < box_Objlist.length; i++) {
    let thisid = box_Objlist[i].firstElementChild.id;
    document.getElementById(thisid).onclick = function () {
      importReset();

      if (clickobjinfo.name != null) {
        let clickdiv = Array.from(
          document.getElementsByClassName("new-obj-box-selectBox-model")
        );
        clickdiv.forEach((element) => {
          if (element.id == clickobjinfo.name) {
            document.getElementById(
              clickobjinfo.name
            ).nextSibling.style.backgroundColor = "var(--selectBox-model-name)";
            document.getElementById(clickobjinfo.name).nextSibling.style.color =
              "black";
          }
        });
      }
      clickobjinfo.name = thisid;
      clickobjinfo.type = this.parentElement.id;
      this.nextSibling.style.backgroundColor = "var(--select-background-color)";
      this.nextSibling.style.color = "var(--font-default-color)";
      let modelProperty_name = document.getElementById(
        "editor-modelProperty-name"
      );
      modelProperty_name.value = clickobjinfo.name;
      let modelProperty_type = document.getElementById(
        "editor-modelProperty-type"
      );
      modelProperty_type.innerHTML = clickobjinfo.type;
      if (exitbtnclick < 2) exitbtnclick += 1;
    };
  }
}
