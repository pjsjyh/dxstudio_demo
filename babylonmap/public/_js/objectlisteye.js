function objectlisteye() {
  let thismodel;
  if (managermodecheck) {
    thismodel = manager_modelObj;
  } else {
    thismodel = modelObj;
  }
  let pickmodel;
  if (this.checked) {
    this.previousSibling.style.opacity = "0.5";
    for (let i = 0; i < thismodel.length; i++) {
      if (thismodel[i].model_.name == this.previousSibling.id) {
        pickmodel = thismodel[i].model_.getChildMeshes();
      }
    }
    if (pickmodel != null) {
      pickmodel.forEach((m) => (m.visibility = 0));
    }
  } else {
    this.previousSibling.style.opacity = "1";
    for (let i = 0; i < thismodel.length; i++) {
      if (thismodel[i].model_.name == this.previousSibling.id) {
        pickmodel = thismodel[i].model_.getChildMeshes();
      }
    }

    if (pickmodel != null) {
      pickmodel.reverse();
      pickmodel.forEach((m, index) => {
        m.visibility = 1;
        if (index > 0 && pickmodel[index - 1].name == "__root__") {
          m.visibility = 0;
        }
      });
    }
  }
}

//잠금
function objectListLock() {
  console.log(this.previousSibling.previousSibling.id);
  let pickmodel;
  let thismodel;
  if (managermodecheck) {
    thismodel = manager_modelObj;
  } else {
    thismodel = modelObj;
  }
  if (this.checked) {
    //해당 체크박스가 체크 되어있는지 확인
    //잠기면 해당 객체 + 하위 객체
    for (let i = 0; i < thismodel.length; i++) {
      //모델링 배열에서 해당하는 이름을 찾은 뒤, 자식 객체 가져옴
      if (thismodel[i].model_.name == this.previousSibling.previousSibling.id) {
        pickmodel = thismodel[i].model_.getChildMeshes();
      }
    }
    if (pickmodel != null) {
      pickmodel.forEach((m) => ((m.isPickable = false), (selectedMesh = null))); //클릭 안되게
    }
  } else {
    for (let i = 0; i < thismodel.length; i++) {
      if (thismodel[i].model_.name == this.previousSibling.previousSibling.id) {
        pickmodel = thismodel[i].model_.getChildMeshes();
      }
    }

    if (pickmodel != null) {
      pickmodel.reverse();
      pickmodel.forEach((m, index) => {
        m.isPickable = true;
        if (index > 0 && pickmodel[index - 1].name == "__root__") {
          m.visibility = 0;
          m.isPickable = false;
        }
      });
    }
  }
}
