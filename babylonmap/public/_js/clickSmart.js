//카테고리 선택에 따른 div display 설정
function clickSmart(thistype) {
  for (let key in objectlist) {
    if (thistype == "All") {
      document.getElementById(
        objectlist[key].name
      ).parentElement.style.display = "block";
    } else if (objectlist[key].type == thistype) {
      document.getElementById(
        objectlist[key].name
      ).parentElement.style.display = "block";
    } else {
      document.getElementById(
        objectlist[key].name
      ).parentElement.style.display = "none";
    }
  }
  click_categoryBox = thistype;
}
