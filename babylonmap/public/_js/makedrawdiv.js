function makedrawdiv(area, getid, kind) {
  let areaDiv = document.createElement("div");
  areaDiv.className = "areaDiv";

  let textdiv = document.createElement("div");
  textdiv.className = "textdiv";

  let Totaltext = document.createElement("div");
  Totaltext.className = "Totaltext";
  Totaltext.innerText = "Total area";
  let areatext = document.createElement("div");
  areatext.className = "areatext";
  areatext.innerText = area;

  let mtext = document.createElement("div");
  mtext.className = "mtext";
  if (kind == "area") {
    mtext.innerText = "㎡"; //㎡
  } else {
    mtext.innerText = "m"; //㎡
  }

  let cleardiv = document.createElement("div");
  cleardiv.className = "cleardiv";

  let clearbtn = document.createElement("input");
  clearbtn.type = "button";
  clearbtn.className = "clearbtn";
  clearbtn.id = getid;

  textdiv.append(Totaltext);
  textdiv.append(areatext);
  textdiv.append(mtext);
  textdiv.append(clearbtn);
  areaDiv.append(textdiv);
  //areaDiv.append(cleardiv);

  return areaDiv;
}

function makelendiv(leng) {
  let arelenDiv = document.createElement("div");
  arelenDiv.className = "arelenDiv";
  arelenDiv.style.display = "flex";
  arelenDiv.style.width = "fit-content";
  arelenDiv.style.alignItems = "center";
  arelenDiv.style.padding = "0.25rem 0.44rem";
  arelenDiv.style.backgroundColor = "white";
  arelenDiv.style.borderRadius = "0.1875rem";

  let textlendiv = document.createElement("div");
  textlendiv.className = "textlendiv";
  textlendiv.style.display = "flex";

  let arealentext = document.createElement("div");
  arealentext.className = "arealentext";
  arealentext.innerText = leng;

  let mtext = document.createElement("div");
  mtext.className = "mtext";
  mtext.innerText = "m";

  textlendiv.append(arealentext);
  textlendiv.append(mtext);
  arelenDiv.append(textlendiv);

  return arelenDiv;
}
