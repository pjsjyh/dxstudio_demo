//하이라키 우클릭 시 이름 변경 기능
function changename() {
  console.log("changename");
  cursoron = true;
  let val = this.innerText;
  let input = document.createElement("input");
  input.id = "input";
  input.value = val;
  let orignName = val;

  this.innerText = "";
  this.appendChild(input);
  input.focus();
  clickdiv = this;
  let savei = 0;
  for (let i = 0; i < modelObj.length; i++) {
    if (modelObj[i].model_.name == val) {
      savei = i;
    }
  }
  input.onblur = function () {
    let val = this.value;

    if (val == "") {
      val = "null";
    }
    //같으면..
    let elements = document.getElementsByClassName("objlist");
    let equalNum = 0;
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].innerText == val) {
        equalNum++;
      }
    }
    if (equalNum != 0 || val == "") val = orignName;

    modelObj[savei].model_.name = val;
    this.parentNode.innerText = val;
    this.style.id = val;
    savename = val;
    doubleclickcheck = true;
  };
}
