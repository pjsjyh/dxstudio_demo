//obj생성시나 값을 전달해서 하이라키 background변경해야할 떄
function changebackgroundcolorobject(clickid) {
  //console.log(clickid);
  let clickdiv = document.getElementById(clickid).firstElementChild;
  if (!isclickhierarchy) {
    clickdiv.style.backgroundColor = "var(--select-background-color)";
    isclickhierarchy = true;
    clickhierarchyinfo = clickid;
  } else {
    let nowclickhierarchy =
      document.getElementById(clickhierarchyinfo).firstElementChild;
    nowclickhierarchy.style.backgroundColor = "var(--transparent-default)";
    clickdiv.style.backgroundColor = "var(--select-background-color)";
    clickhierarchyinfo = clickid;
  }
}
function changebackgroundcolor() {
  //ui 하이라키 클릭시 색상변경
  if (!isclickhierarchy) {
    this.style.backgroundColor = "var(--select-background-color)";
    isclickhierarchy = true;
    clickhierarchyinfo = this.id;
  } else {
    let nowclickhierarchy = document.getElementById(clickhierarchyinfo);
    nowclickhierarchy.firstChild.style.backgroundColor =
      "var(--transparent-default)";
    if (this.className == "masterdiv icon-clicked") {
      this.firstElementChild.style.backgroundColor =
        "var(--select-background-color)";
    } else {
      this.style.backgroundColor = "var(--select-background-color)";
    }

    clickhierarchyinfo = this.id;
  }
}
