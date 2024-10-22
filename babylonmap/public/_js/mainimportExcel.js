$(document).ready(function () {
  $("#main-new-obj-box-icon-more").click(function () {
    $("#new-obj-box-import-excel").css("display", "flex");
  });
  $("#new-obj-box-import-excel").click(function () {
    $(this).css("display", "none");
    $("#main-new-obj-box-upload").css("display", "flex");
    $("#main-new-obj-box-upload").css("z-index", "2");
  });
  $("#main-new-obj-box-upload-before").click(function () {
    $("#new-obj-box-import-excel").css("display", "none");
    $("#main-new-obj-box-upload").css("display", "none");
  });
});

function dragdropfile(file, handlerDiv) {
  let sibling = handlerDiv.nextElementSibling;

  let dragdropImg = null;

  while (sibling) {
    if (sibling.classList.contains("dragdropImg")) {
      dragdropImg = sibling;
      break;
    }
    sibling = sibling.nextElementSibling;
  }
  let dragdropChangedImg = handlerDiv.querySelector(".dragdropChangedImg");
  addFile(file, dragdropImg, dragdropChangedImg);
}
function readExcelFile(file) {
  const reader = new FileReader();
  reader.onload = (event) => {
    console.log("start");
    const data = event.target.result;
    const workbook = XLSX.read(data, { type: "binary" });
    // 엑셀 파일의 첫 번째 시트를 읽습니다.
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    // 시트의 데이터를 JSON으로 변환합니다.
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    let dataString = "";
    jsonData.forEach((row) => {
      const rowValues = Object.entries(row).map(([key, value]) => {
        return `${key}: ${value}`;
      });
      dataString += rowValues.join("\t") + "\n";
    });
    $("#main-new-obj-box-upload-preview-area").val(dataString);
  };
  reader.readAsBinaryString(file);
}
function addFile(file, dragdropImg, dragdropChangedImg) {
  // const isImage = file.type.match("image.*"),
  //     objectURL = URL.createObjectURL(file);
  const objectURL = URL.createObjectURL(file);
  const isExcel = file;
  // 엑셀 파일 체크 (예시로 확장자 .xls로만 체크)
  if (isExcel.name.endsWith(".xls") || isExcel.name.endsWith(".xlsx")) {
    readExcelFile(isExcel);
  } else {
    alert("Please drop a valid Excel file.");
  }

  //console.log(imgEle);
  //   isImage &&
  //     Object.assign(imgEle, {
  //       src: objectURL,
  //       alt: file.name,
  //     });

  // 이미지의 자체 비율로 설정
  //dragdropChangedImg.style.display = "flex";
  //dragdropImg.style.display = "flex";
  //아래 경고 사라져야하고,
}
const gallery = document.getElementById("new-project-pop-inputDragNDrop-img");

let fileImportTab;

// use to check if a file is being dragged
const hasFiles = ({ dataTransfer: { types = [] } }) =>
  types.indexOf("Files") > -1;

let counter = 0;
// reset counter and append file to gallery when file is dropped
function dropHandler(ev) {
  ev.preventDefault();
  for (const file of ev.dataTransfer.files) {
    dragdropfile(file, ev.currentTarget);
    ev.currentTarget.classList.remove("is-dragover");
    counter = 0;
  }
}

// only react to actual files being dragged
function dragEnterHandler(e) {
  //console.log(e.currentTarget);
  e.preventDefault();
  if (!hasFiles(e)) {
    return;
  }
  ++counter && e.currentTarget.classList.add("is-dragover");
}

function dragLeaveHandler(e) {
  1 > --counter && e.currentTarget.classList.remove("is-dragover");
}

function dragOverHandler(e) {
  if (hasFiles(e)) {
    e.preventDefault();
  }
}
