//object import창 끌 때 선택 clear
function closeimportcolor() {
  if (clickobjinfo.name != null) {
    document.getElementById(
      clickobjinfo.name
    ).nextSibling.style.backgroundColor = "var(--selectbox-text-background)";
    document.getElementById(clickobjinfo.name).nextSibling.style.color =
      "black";
  }
  let box = document.querySelectorAll(".new-obj-box-selectBox-model-name");
  box.forEach((element) => {
    element.style.backgroundColor = "var(--selectbox-text-background)";
    element.style.color = "black";
  });
  clickobjinfo = { name: null, type: null };
}
