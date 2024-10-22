function searchinput() {
  let word, list, xbtn;
  word = document.getElementById("obj-box-Objlist-searching").value;
  list = document.getElementsByClassName("new-obj-box-selectBox");
  xbtn = document.getElementById("obj-box-Objlist-searching-clear");
  let count = document.getElementById("new-obj-box-label_num");
  if ($("#main-new-obj-box-search").css("display") != "none") {
    if (word != "") {
      $("#main-new-obj-box-objlist").css("display", "block");
    } else {
      $("#main-new-obj-box-objlist").css("display", "none");
    }
  }

  if (
    click_categoryBox != changecolor_categoryBox &&
    changecolor_categoryBox != ""
  ) {
    let clickbnt = document.getElementById(
      "obj-box-category-col-btn-" + changecolor_categoryBox
    );
    clickbnt.style.backgroundColor = "var(--btn-color)";
    changecolor_categoryBox = click_categoryBox;
  }
  let clickbnt2 = document.getElementById(
    "obj-box-category-col-btn-" + click_categoryBox
  );
  clickbnt2.style.backgroundColor = "var(--select-background-color)";

  changecolor_categoryBox = click_categoryBox;

  let obj_list = document.getElementsByClassName("new-obj-box-selectBox-model");
  let num = 0;
  let objlistnum = 1;
  for (let i = 0; i < list.length; i++) {
    while (objectlist[objlistnum].type == "sensor") {
      objlistnum += 1;
    }
    if (
      word == "" &&
      (objectlist[objlistnum].type == click_categoryBox ||
        click_categoryBox == "all")
    ) {
      list[i].style.display = "block";
      num += 1;
    } else if (obj_list[i].id.toUpperCase().includes(word.toUpperCase())) {
      if (
        click_categoryBox == "all" ||
        objectlist[objlistnum].type == click_categoryBox
      ) {
        list[i].style.display = "block";
        num += 1;
      } else {
        list[i].style.display = "none";
      }
    } else {
      list[i].style.display = "none";
    }
    objlistnum += 1;
  }
  count.innerText = num.toString();
  rexbtn(xbtn, word);
}
function searchinputlayer() {
  cursoron = true;
  let word = document.getElementById(
    "editor-side-view-layer-searching-input"
  ).value;
  let list = document.getElementsByClassName("masterdiv icon-clicked");
  let xbtn = document.getElementById(
    "editor-side-view-layer-searching-input-clear"
  );

  for (let i = 0; i < list.length; i++) {
    if (list[i].id.toUpperCase().includes(word.toUpperCase())) {
      list[i].firstChild.style.display = "flex";
    } else {
      list[i].firstChild.style.display = "none";
    }
  }
  rexbtn(xbtn, word);
}
function rexbtn(xbtn, word) {
  if (word == "") {
    xbtn.style.display = "none";
  } else {
    xbtn.style.display = "block";
  }
}
function clearinput(clearid) {
  let input = document.getElementById(clearid);
  input.value = "";
  if (clearid == "obj-box-Objlist-searching") {
    searchinput();
  } else if (clearid == "editor-side-view-layer-searching-input") {
    searchinputlayer();
  }
}
