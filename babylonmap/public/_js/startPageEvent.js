let learnPageCount = 0;
let stateFilePage = null;
let applyContentsImg = null;
document.addEventListener("click", function (event) {
  let dotDiv = document.getElementsByClassName("list-contents-dot-func");
  for (let i = 0; i < dotDiv.length; i++) {
    if (
      !dotDiv[i]
        .querySelector(".list-contents-dot-func-icon")
        .contains(event.target)
    ) {
      const dotbox = dotDiv[i].querySelector(".list-contents-dot-func-div");
      dotbox.style.visibility = "hidden";
    }
  }
  // 이벤트가 발생한 요소(event.target)에서 클래스 확인
  let clickedElement = event.target;
  // closest() 메서드를 사용하여 부모 요소 중에서 해당 클래스를 가진 요소를 찾음
  let selectDiv = clickedElement.closest(".list-contents-dot-func-div");

  //삭제 확인창, 다른 곳 클릭시 꺼져야함.
  let deletePOP = document.getElementById("delete-confirm-pop");
  if (deletePOP.style.visibility == "visible") {
    if (
      !deletePOP.contains(event.target) &&
      !(selectDiv && selectDiv.classList.contains("list-contents-dot-func-div"))
    ) {
      deletePOP.style.visibility = "hidden";
    }
  }
});
function sortSelectReset() {
  let sortselectedValue = $("input[name='Recent-radio']:checked").val();

  if (sortselectedValue === "sort") {
    timeSort(false);
  } else if (sortselectedValue === "reverse") {
    timeSort(true);
  }
  // 선택된 라디오 버튼의 값을 가져옵니다.
  const selectedValue = document.querySelector(".RecentSorting:checked");

  const defaultRadio = document.querySelectorAll(".select-box__option");
  defaultRadio.forEach((backdefault) => {
    backdefault.parentElement.style.backgroundColor = "var(--option--color--)";
  });

  let labelid = 'label[for="' + selectedValue.id + '"]';

  const sortLabel = document.querySelector(labelid);
  sortLabel.parentElement.style.backgroundColor = "var(--selected-box-color-) ";
}

function FilesortSelectReset() {
  let sortselectedValue = $("input[name='All_seleted-radio']:checked").val();

  if (sortselectedValue === "sort") {
    timeSort(false);
  } else if (sortselectedValue === "reverse") {
    timeSort(true);
  }
  // 선택된 라디오 버튼의 값을 가져옵니다.
  const selectedValue = document.querySelector(".fileSorting:checked");

  const defaultRadio = document.querySelectorAll(".select-box__option");
  defaultRadio.forEach((backdefault) => {
    backdefault.parentElement.style.backgroundColor = "var(--option--color--)";
  });

  let labelid = 'label[for="' + selectedValue.id + '"]';

  const sortLabel = document.querySelector(labelid);
  sortLabel.parentElement.style.backgroundColor = "var(--selected-box-color-) ";
}
$(document).on("click", function (event) {
  const listBtnSearchingInput = document.querySelector(
    "#listBtn-searching-input"
  );
  const clickedElement = event.target;

  if (listBtnSearchingInput.parentNode.contains(clickedElement)) {
    if ($("#listBtn-searching-input").val() != "") {
      $("#listBtn-searching-cancel").css("visibility", "hidden");
      $("#listBtn-searching-input").css("border-width", "0 0 0.13rem 0");
      $("#listBtn-searching-input").css(
        "border-color",
        "var(--selected-box-color-)"
      );
    }
  }
});
function pxToRem(pxValue) {
  let remValue =
    pxValue / parseFloat(getComputedStyle(document.documentElement).fontSize) +
    9.5;
  return remValue.toFixed(2);
}
function tagArrowPosition(titleDiv) {
  let targetlabel = titleDiv.querySelector("label");
  let labelEndRect = targetlabel.getBoundingClientRect();
  let img = titleDiv.querySelector("img");
  img.style.left =
    pxToRem(labelEndRect.right - labelEndRect.left).toString() + "rem";

  let imgnameSibling = titleDiv;

  let tagDiv = null;

  while (imgnameSibling) {
    if (imgnameSibling.classList.contains("list-contents-tags")) {
      tagDiv = imgnameSibling;
    }
    imgnameSibling = imgnameSibling.nextElementSibling;
  }
  tagListDiv = tagDiv.querySelector(".list-contents-tagList");
  img.addEventListener("click", function () {
    if (titleDiv.parentElement.classList.contains("clicked")) {
      titleDiv.parentElement.classList.remove("clicked");
    } else {
      titleDiv.parentElement.classList.add("clicked");
    }
  });
}
function tagArrowPositions() {
  let labelRect = document.querySelectorAll(".contents-title");
  labelRect.forEach((label) => {
    let targetlabel = label.querySelector("label");
    let labelEndRect = targetlabel.getBoundingClientRect();
    let img = label.querySelector("img");
    img.style.left =
      pxToRem(labelEndRect.right - labelEndRect.left).toString() + "rem";

    let imgnameSibling = label;

    let tagDiv = null;

    while (imgnameSibling) {
      if (imgnameSibling.classList.contains("list-contents-tags")) {
        tagDiv = imgnameSibling;
      }
      imgnameSibling = imgnameSibling.nextElementSibling;
    }
    tagListDiv = tagDiv.querySelector(".list-contents-tagList");

    img.addEventListener("click", function () {
      if (label.parentElement.classList.contains("clicked")) {
        label.parentElement.classList.remove("clicked");
      } else {
        label.parentElement.classList.add("clicked");
      }
    });
  });
}

function latlngInputCheck(event) {
  console.log(event);
  if (event.keyCode == 13) {
    $("#adress-select-warning").css("display", "none");
    const lati = $("#new-project-pop-adress-input-lat");
    const long = $("#new-project-pop-adress-input-lng");

    //둘다 빈칸 확인. 빈칸이면 해당 칸 빨간줄
    if (lati.val() == "") {
      $("#adress-select-warning").css("display", "flex");
      lati.css("border-color", "var(--warining-color)");
    }
    if (long.val() == "") {
      $("#adress-select-warning").css("display", "flex");
      long.css("border-color", "var(--warining-color)");
    }
    //값이 범위 안에 있는지 둘다 확인 밖이면 빨간줄if (lati.val() == "") {
    if (!(lati.val() <= 90 && lati.val() >= -90)) {
      $("#adress-select-warning").css("display", "flex");
      lati.css("border-color", "var(--warining-color)");
    }
    if (!(long.val() <= 180 && long.val() >= -180)) {
      $("#adress-select-warning").css("display", "flex");
      long.css("border-color", "var(--warining-color)");
    }
    //값이 맞으면 해당 좌표로 맵이동
    if (
      long.val() <= 180 &&
      long.val() >= -180 &&
      lati.val() <= 90 &&
      lati.val() >= -90 &&
      long.val() != "" &&
      lati.val() != ""
    ) {
      map.setCenter([long.val(), lati.val()]);
      changeCoordinates([long.val(), lati.val()]);
    }
  }

  //     $("#adress-select-warning").css("display", "none")
  //     $("#new-project-pop-adress-input").css("borderColor", "var(--selected-box-color-)")

  // } else {
  //     $("#adress-select-warning").css("display", "flex")
  //     $("#new-project-pop-adress-input").css("borderColor", "var(--warining-color)")
}

function previewImage(event) {
  const input = event.target;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    if (file.size > 5242880) return;

    let eventTarget = event.currentTarget;
    console.log(eventTarget);
    let parentSibling = eventTarget.parentElement;
    let parentimgnameSibling = parentSibling.parentElement;
    let sibling = parentSibling;
    let imgnameSibling = parentimgnameSibling;

    let dragdropImg = null;
    let dragdropImgName = null;
    let dragdropByte = null;

    while (sibling) {
      if (sibling.classList.contains("dragdropChangedImg")) {
        dragdropImg = sibling;
        break;
      }
      sibling = sibling.previousElementSibling;
    }
    while (imgnameSibling) {
      if (imgnameSibling.classList.contains("dragdropImg")) {
        dragdropImgName = imgnameSibling;
      }
      if (imgnameSibling.classList.contains("dragdropByte")) {
        dragdropByte = imgnameSibling;
        break;
      }
      imgnameSibling = imgnameSibling.nextElementSibling;
    }
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        dragdropImg.querySelector("img").src = e.target.result;
        console.log(dragdropImg);
        dragdropImg.style.display = "flex";
      };

      reader.readAsDataURL(input.files[0]); // 파일을 읽어서 Data URL로 변환
      dragdropImgName.querySelector(".dragdropImgName").textContent =
        input.files[0].name;
      console.log(dragdropImgName);
      dragdropImgName.style.display = "flex";
      dragdropByte.style.display = "none";
      dragdropImgName.querySelector(".dragdropImgSize").textContent =
        formatBytes(file.size);
    }
  }
}
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
// print 함수 호출
async function runPrint(contentsImg, cloneDivs, mapcheck) {
  await print(contentsImg);

  if (mapcheck)
    contentsImg.src = contentsImg.getAttribute("data-src");
  else
    contentsImg.src = document.getElementById(
      "new-project-pop-inputDragNDrop-img"
    ).querySelector("img").src;

  //create 이미지 바꾸기


  createConentsNextScene(cloneDivs);
}
$(document).ready(function () {
  loadContentsList();
  sortSelectReset();

  checkedContentsEmpty();
  tagArrowPositions();
  $(".saveClickedEvent").click(function () {
    localStorage.setItem("startListData", startPageListSave());
  })
  const sortRadio = document.querySelectorAll(".RecentSorting");

  sortRadio.forEach((radioButton) => {
    radioButton.addEventListener("change", sortSelectReset);
  });
  const filesSortRadio = document.querySelectorAll(".fileSorting");

  filesSortRadio.forEach((radioButton) => {
    radioButton.addEventListener("change", FilesortSelectReset);
  });

  const mapStyleRadio = document.querySelectorAll(
    "#new-project-pop-map-Styleradio"
  );
  mapStyleRadio.forEach((radioButton) => {
    radioButton.addEventListener("change", function () {
      let stylemapSet = $("input[name='mapStyle']:checked").val();

      map.setLayoutProperty("google", "visibility", "none");
      map.setLayoutProperty("vworld", "visibility", "none");
      switch (stylemapSet) {
        case "3d":
          break;
        case "general":
          map.setLayoutProperty("vworld", "visibility", "visible");
          break;
        case "satellite":
          map.setLayoutProperty("google", "visibility", "visible");
          break;
      }
    });
  });

  const mapAdressRadio = document.querySelectorAll(".map-adress");
  mapAdressRadio.forEach((radioButton) => {
    radioButton.addEventListener("change", function () {
      let stylemapSet = $("input[name='map-adress-tab']:checked").val();

      switch (stylemapSet) {
        case "tab-adress":
          $("#adress-select-warning").css("display", "none");
          $("#adress-select-tab-GPS").css("display", "flex");
          $("#adress-select-tab-latlng").css("display", "none");
          break;
        case "tab-lnglat":
          $("#adress-select-warning").css("display", "none");
          $("#adress-select-tab-GPS").css("display", "none");
          $("#adress-select-tab-latlng").css("display", "flex");
          break;
      }
    });
  });
  $("#inputDragNDrop-filediv-cancel").click(function () {
    $("#new-project-pop-inputDragNDrop-img").css("display", "none");
    $("#inputDragNDrop-filediv").css("display", "none");
    $("#new-project-pop-img-bytes").css("display", "flex");
    document.querySelector("#new-project-pop-inputDragNDrop-img img").src =
      "img/startPageIcons/image 159.png";
  });
  $("#changeImg-inputDragNDrop-filediv-cancel").click(function () {
    $("#changeImg-pop-inputDragNDrop-img").css("display", "none");
    $("#changeImg-inputDragNDrop-filediv").css("display", "none");
    $("#changeImg-new-project-pop-img-bytes").css("display", "flex");
    document.querySelector("#changeImg-pop-inputDragNDrop-img img").src =
      "img/startPageIcons/image 159.png";
  });
  $("#changeImg-pop-close").click(function () {
    $("#changeImg-pop").css("display", "none");
    $("#changeImg-pop-inputDragNDrop-img").css("display", "none");
    $("#changeImg-inputDragNDrop-filediv").css("display", "none");
    $("#changeImg-new-project-pop-img-bytes").css("display", "flex");
    document.querySelector("#changeImg-pop-inputDragNDrop-img img").src =
      "img/startPageIcons/image 159.png";
  });
  $("#changeImg-pop-Apply").click(function (event) {
    let changedImg = document.querySelector(
      "#changeImg-pop-inputDragNDrop-img img"
    ).src;
    if (
      getComputedStyle(
        document.querySelector("#changeImg-pop-inputDragNDrop-img")
      ).display != "none"
    )
      applyContentsImg.src = changedImg;
    $("#changeImg-pop").css("display", "none");
    $("#changeImg-pop-inputDragNDrop-img").css("display", "none");
    $("#changeImg-inputDragNDrop-filediv").css("display", "none");
    $("#changeImg-new-project-pop-img-bytes").css("display", "flex");

    //우잉ㅇ,,ㅇㅇ,,ㅇ, evnet말고 넘겨야하는 div컨텐츠 event가 되어야하는데
    fixedsaveData(applyContentsImg)
  });

  $("#new-project-pop-close").click(function () {
    $("#new-project-pop").css("display", "none");
    $("#location-disable").css("display", "flex");
    $(".marker").css("display", "none");
    //default 세팅 맞추기 (이미지 삭제 등..)
    $("#new-project-pop-inputDragNDrop-img").css("display", "none");
    $("#inputDragNDrop-filediv").css("display", "none");
    $("#new-project-pop-img-bytes").css("display", "flex");
    document.querySelector("#new-project-pop-inputDragNDrop-img img").src =
      "img/startPageIcons/image 159.png";

    //맵 기본
    map.setLayoutProperty("google", "visibility", "none");
    map.setLayoutProperty("vworld", "visibility", "none");

    //주소 및 위경도 검색
    $("#new-project-pop-adress-input-lat").val("");
    $("#new-project-pop-adress-input-lng").val("");
    $("#3d").prop("checked", true);
    $("#tab-adress").prop("checked", true);

    $("#adress-select-warning").css("display", "none");
    $("#adress-select-tab-GPS").css("display", "flex");
    $("#adress-select-tab-latlng").css("display", "none");
    $("#new-project-pop-adress-input").css("border-color", "var(--defualt-)");
    $("#new-project-pop-adress-input-lat").css(
      "border-color",
      "var(--defualt-)"
    );
    $("#new-project-pop-adress-input-lng").css(
      "border-color",
      "var(--defualt-)"
    );
  });
  $("#new-project-pop-adress-input-lng").on("blur", function () {
    if ($(this).css("border-color") !== "var(--warining-color)")
      $(this).css("border-color", "var(--defualt-)");

    if (
      $("#new-project-pop-adress-input-lng").css("border-color") !==
      "var(--warining-color)"
    )
      $("#new-project-pop-adress-input-lng").css(
        "border-color",
        "var(--defualt-)"
      );
  });
  $("#new-project-pop-adress-input-lat").on("blur", function () {
    if ($(this).css("border-color") !== "var(--warining-color)")
      $(this).css("border-color", "var(--defualt-)");

    if (
      $("#new-project-pop-adress-input-lat").css("border-color") !==
      "var(--warining-color)"
    )
      $("#new-project-pop-adress-input-lat").css(
        "border-color",
        "var(--defualt-)"
      );
  });
  $("#new-project-pop-adress-input-lng").on("focus", function () {
    if (
      $("#new-project-pop-adress-input-lat").css("border-color") !==
      "var(--warining-color)"
    )
      $("#new-project-pop-adress-input-lat").css(
        "border-color",
        "var(--defualt-)"
      );
    $(this).css("border-color", "var(--selected-box-color-)");
    $(this).css("border-width", "0px 0px 0.13rem");
  });
  $("#new-project-pop-adress-input-lat").on("focus", function () {
    if (
      $("#new-project-pop-adress-input-lng").css("border-color") !==
      "var(--warining-color)"
    )
      $("#new-project-pop-adress-input-lng").css(
        "border-color",
        "var(--defualt-)"
      );

    $(this).css("border-color", "var(--selected-box-color-)");
    $(this).css("border-width", "0px 0px 0.13rem");
  });
  $(".adressInput").on("blur", function () {
    $(this).css("border-width", "0 0 0.13rem 0");
    if ($(this).val() != "")
      $("#new-project-pop-adress-input").css(
        "border-color",
        "var(--selected-box-color-)"
      );
    else
      $("#new-project-pop-adress-input").css("border-color", "var(--defualt-)");
  });
  $(".adressInput").on("focus", function () {
    $("#new-project-pop-adress-input").css(
      "border-color",
      "var(--selected-box-color-)"
    );
  });

  $("#contents-top-btn-newFile").click(function () {
    fileImportTab = document.getElementById("new-project-pop-inputDragNDrop");
    $("#new-project-pop").css("display", "flex");
    $("#new-project-pop-inputName").val("");
    $("#new-project-pop-adress-input").val("");

    $("#location-disable").css("display", "flex");

    map.setCenter([127.11024422, 37.340857451]);
  });
  $("#contents-bottom-listBtn-viewbox").click(function () {
    $("#contents-Lists").addClass("gird-list-view");
    $("#contents-Lists").removeClass("list-view-line");
  });
  $("#contents-bottom-listBtn-viewList").click(function () {
    $("#contents-Lists").addClass("list-view-line");
    $("#contents-Lists").removeClass("gird-list-view");
  });
  $(".category-state-radio").change(function () {
    let selectedValue = $("input[name='category-state']:checked").val();

    if (selectedValue === "recent") {
      $("#opt1").prop("checked", true);
      sortSelectReset();
      $("#Recent-panel").css("display", "flex"); // 보이기
      $("#yourFiles-panel").css("display", "none"); // 숨기기
      $("#sharedFiles-panel").css("display", "none"); // 숨기기
      $("#contents-list-empty-doc").text("You have no recent documents");
      $("#contents-list-empty-expl").text(
        "Once you start a task, they will show up here"
      );

      checkedContentsEmpty();
    } else if (selectedValue === "yourfiles") {
      $("#All_seleted1").prop("checked", true);
      FilesortSelectReset();
      $("#Recent-panel").css("display", "none");
      $("#yourFiles-panel").css("display", "flex");
      $("#sharedFiles-panel").css("display", "none");
      $("#contents-list-empty-doc").text("You have no recent projects");
      $("#contents-list-empty-expl").text(
        "Once you start a task, they will show up here"
      );

      checkedContentsEmpty();
    } else if (selectedValue === "sharedfiles") {
      $("#Recent-panel").css("display", "none");
      $("#yourFiles-panel").css("display", "none");
      $("#sharedFiles-panel").css("display", "flex");
      $("#opt5").prop("checked", true);
      $("#contents-list-empty-doc").text("You have no shared documents");
      $("#contents-list-empty-expl").text(
        "when someone shares documents with you, they will show up here"
      );
      nameSort();
      checkedContentsEmpty();
    }
  });
  $("#listBtn-searching-input").on("input", function () {
    searchinput_startPage();
  });

  $("#listBtn-searching-input").on("focus", function () {
    if ($(this).val() != "") {
      $("#listBtn-searching-cancel").css("visibility", "visible");
      $(this).css("border-width", "0 0 0.13rem 0");
      $(this).css("border-color", "var(--selected-box-color-)");
    }
  });

  // $("#listBtn-searching-input").on('blur', function () {  //cancle클릭이 안되므로 외의 것을 클릭 시로 변경할 것.
  //     $("#listBtn-searching-cancel").css('visibility', 'hidden');

  //     if ($("#listBtn-searching-input").val() != "") {
  //         $("#listBtn-searching-input").css('border-width', '0 0 0.13rem 0')
  //         $("#listBtn-searching-input").css('border-color', 'var(--selected-box-color-)')

  //     }
  // })
  $("#listBtn-searching-cancel").click(function () {
    console.log("x");
    $("#listBtn-searching-input").val("");
    $("#listBtn-searching-cancel").css("visibility", "hidden");
    $("#listBtn-searching-input").css("border-color", "var( --defualt-)");
    searchinput_startPage();
  });

  $(".fileSorting").change(function () {
    let selectedValue = $("input[name='All_seleted-radio']:checked").val();

    if (selectedValue === "sort") {
      timeSort(false);
    } else if (selectedValue === "reverse") {
      timeSort(true);
    }
    if (selectedValue === "nameSort") {
      nameSort(false);
    } else if (selectedValue === "nameReverse") {
      nameSort(true);
    }
  });
  $(".selectopt-sharedFiles").change(function () {
    let selectedValue = $("input[name='sharedFiles-radio']:checked").val();

    if (selectedValue === "sort") {
      nameSort(false);
    } else if (selectedValue === "reverse") {
      nameSort(true);
    }
  });
  $("#learn-img-exit").click(function () {
    goHome();
    $("#new-project-learn").css("display", "none");
  });
  $("#side-user-menu-learn").on('mousedown', function () {
    $("#side-user-files-Deleted").css("background-color", "var(--defualt-)");
    $("#side-user-menu-home").css("background-color", "var(--defualt-)");
    $("#side-user-menu-All").css("background-color", "var(--defualt-)");
    $(this).css("background-color", "var(--selected-box-color-)");

    $("#new-project-learn").css("display", "flex");
    learnPageCount = 0;
    $("#new-project-learn-img").css(
      "background-image",
      "url(./img/learn/learn" + (learnPageCount % 3) + ".png)"
    );
  });
  $("#learn-img-right").click(function () {
    $("#new-project-learn-img").css(
      "background-image",
      "url(./img/learn/learn" + (++learnPageCount % 3) + ".png)"
    );
  });
  $("#learn-img-left").click(function () {
    --learnPageCount;
    if (learnPageCount < 0) learnPageCount = 2;
    $("#new-project-learn-img").css(
      "background-image",
      "url(./img/learn/learn" + (learnPageCount % 3) + ".png)"
    );
  });
  $("#side-user-files-All").on('mousedown', function () {
    $("#listBtn-searching-input").val("");
    searchinput_startPage();
    $("#All_seleted1").prop("checked", true);
    FilesortSelectReset();
    $("#Recent-panel").css("display", "none");
    $("#yourFiles-panel").css("display", "flex");

    stateFilePage = "star";
    $("#list-view-index-lastdate").text("Last work date");

    favoritePageCheck = true;
    $("#favoriteTab").css("display", "flex");
    $("#favoriteTab").text("Favorites Projects");
    $("#homeTab").css("display", "none");

    checkedContentsEmpty();
    $(this).css("background-color", "var(--selected-box-color-)");
    $("#side-user-files-Deleted").css("background-color", "var(--defualt-)");
    $("#side-user-menu-learn").css("background-color", "var(--defualt-)");
    $("#side-user-menu-home").css("background-color", "var(--defualt-)");
    $("#contents-list-empty img").attr("src", "img/icons/big-star.png");
    $("#contents-list-empty-doc").text("Add your favorite projects");
    $("#contents-list-empty-expl").text(
      "If you click the favorites icon on a project, they will show up here"
    );

    //list확인해서 check된것만 확인해서..
    let starDeletecount = 0;
    let starcount = 0;
    let contentlist = document.querySelectorAll(".contents-List-content");
    contentlist.forEach((contentDiv) => {
      const checkbox = contentDiv.querySelector(".list-contents-img-checkbox");

      // checkbox의 변경 사항을 감지하여 처리합니다.
      checkbox.addEventListener("change", function () {
        if (favoritePageCheck) {
          // checkbox의 checked 상태에 따라 div 요소를 보이거나 숨깁니다.
          if (checkbox.checked) {
            starcount++;
            contentDiv.style.display = "flex"; // 보이도록 설정
            if (starcount != 0) {
              const ContentsList_element =
                document.getElementById("contents-Lists"); // 클래스 삭제
              ContentsList_element.classList.add("emptyActive");
            }
          } else {
            starcount--;
            contentDiv.style.display = "none"; // 숨기도록 설정
            if (starcount == 0) {
              const ContentsList_element =
                document.getElementById("contents-Lists"); // 클래스 삭제
              ContentsList_element.classList.add("emptyActive");
            }
          }
        }
        saveData();
      });

      // 페이지 로드 시 checkbox 상태를 확인하여 초기 설정을 합니다.
      if (checkbox.checked) {
        starcount++;
        contentDiv.style.display = "flex"; // 보이도록 설정
        if (contentDiv && contentDiv.classList.contains("delete-contents")) {
          starDeletecount++;
        }
      } else {
        contentDiv.style.display = "none"; // 숨기도록 설정
      }

      if (contentDiv.classList.contains("delete-contents")) {
        contentDiv.style.display = "none";
      }
    });

    if (starcount == 0) {
      const ContentsList_element = document.getElementById("contents-Lists"); // 클래스 삭제
      ContentsList_element.classList.add("emptyActive");
    } else if (starcount > 0) {
      // = starDelete()
      //console.log(starDeletecount + "==" + starcount)
      if (starDeletecount == starcount) {
        //console.log("eee")
        const ContentsList_element = document.getElementById("contents-Lists"); // 클래스 삭제
        ContentsList_element.classList.add("emptyActive");
      } else {
        //console.log("nnnn")
        const ContentsList_element = document.getElementById("contents-Lists"); // 클래스 삭제
        ContentsList_element.classList.remove("emptyActive");
      }
    }

    //Recent, Your files를 Favorites Projects로 변경, 정렬은 Recent로
  });
  $("#side-user-menu-home").on('mousedown', function () {
    goHome();
  });
  $("#side-user-files-Deleted").on('mousedown', function () {
    $("#listBtn-searching-input").val("");
    searchinput_startPage();
    $("#All_seleted1").prop("checked", true);
    FilesortSelectReset();
    $("#Recent-panel").css("display", "none");
    $("#yourFiles-panel").css("display", "flex");
    stateFilePage = "delete";
    $("#favoriteTab").css("display", "flex");
    $("#favoriteTab").text("Deleted files");
    $("#homeTab").css("display", "none");
    $(this).css("background-color", "var(--selected-box-color-)");
    $("#side-user-files-All").css("background-color", "var(--defualt-)");
    $("#side-user-menu-learn").css("background-color", "var(--defualt-)");
    $("#side-user-menu-home").css("background-color", "var(--defualt-)");
    $("#contents-list-empty img").attr("src", "img/icons/folder.png");
    $("#contents-list-empty-doc").text("You have no recent projects");
    $("#contents-list-empty-expl").text("No files were deleted");
    checkedContentsDeleted();
    $("#list-view-index-lastdate").text("Date deleted");
  });
  $("#new-project-pop-create").click(function () {
    let dotparentElements = document.getElementById("cloneContents");
    //console.log(dotparentElements)
    const cloneDivs = dotparentElements.cloneNode(true);
    document.getElementById("contents-List").appendChild(cloneDivs);
    cloneDivs.id = new Date().getTime();
    const creattime = cloneDivs.querySelector(".list-contents-creat");
    creattime.setAttribute("data-value", new Date().getTime());

    //이름 .001
    let contentname = cloneDivs.querySelector(".list-contents-title");
    let labelValue = "";
    if ($("#new-project-pop-inputName").val() == "") {
      labelValue = "project";
    } else {
      labelValue = $("#new-project-pop-inputName").val();
    }
    let inputLocation = $("#new-project-pop-adress-input").val();
    if (inputLocation == "") {
      if (
        $("#new-project-pop-adress-input-lng").val() == "" ||
        $("#new-project-pop-adress-input-lat").val() == ""
      )
        contentname.setAttribute("data-value", defualtLocation);
      else
        contentname.setAttribute(
          "data-value",
          $("#new-project-pop-adress-input-lng").val() +
          "," +
          $("#new-project-pop-adress-input-lat").val()
        );
    } else {
      contentname.setAttribute("data-value", inputLocation);
    }
    const match = labelValue.match(/(.*?)(\.\d+)?$/);
    const prefix = match[1];

    if (!prefixCount.hasOwnProperty(prefix)) {
      prefixCount[prefix] = 0;
    }

    prefixCount[prefix]++;

    let suffix = match[2] ? parseInt(match[2].substring(1)) : 0;
    if (prefixCount[prefix] > 1) {
      suffix = prefixCount[prefix] - 1;
    }

    suffix++;

    const newLabelValue = `${prefix}.${pad(suffix, 3)}`;
    contentname.innerText = newLabelValue;
    //tagArrowPosition(cloneDivs.querySelector('.contents-title'))

    //시간 최신으로..
    const time = cloneDivs.querySelector(".list-contents-time");
    time.setAttribute("data-value", -1);

    timeCompare();
    dotcloneEvent(cloneDivs);

    //create 시간 설정
    const createTime = cloneDivs.querySelector(".list-contents-creat");
    const currentDate = new Date();

    const year = currentDate.getFullYear(); // 연도를 가져옵니다.
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월을 가져오고 0을 붙여 두 자리로 만듭니다.
    const day = String(currentDate.getDate()).padStart(2, "0"); // 일을 가져오고 0을 붙여 두 자리로 만듭니다.

    const formattedDate = `${year}. ${month}. ${day}`;
    createTime.innerText = formattedDate;

    //현재 정렬 상태에 맞게 호출하기
    //recent 인지 yourfiles인지 체크
    //opt1인지 2,3,4인지 체크
    sorting();

    //home이면,,
    //favoriteTab display이가 none이면
    let favoriteTab = document.getElementById("favoriteTab");

    // getComputedStyle를 사용하여 실제로 적용된 CSS 값을 가져옵니다.
    let displayPropertyValue = window
      .getComputedStyle(favoriteTab)
      .getPropertyValue("display");

    $("#new-project-pop").css("display", "none");
    goHome();
    if (displayPropertyValue == "none") {
      cloneDivs.style.display = "flex";
      const ContentsList_element = document.getElementById("contents-Lists"); // 클래스 삭제
      ContentsList_element.classList.remove("emptyActive");
    }
    let ImgContent = cloneDivs.querySelector(".list-contents-img img");
    //이미지가 없으면.
    let uploadImg = document.getElementById(
      "new-project-pop-inputDragNDrop-img"
    );

    //mapstyle저장
    //list-contents-img
    cloneDivs
      .querySelector(".list-contents-img")
      .setAttribute("data-mapstyle", $("input[name='mapStyle']:checked").val());

    //주소 latlng저장및 컨텐츠 //contents-adrees-latlng 에 반영 lng lat 둘다 , 글에는 현재 상태에 대한 주소 넣고,
    if ($("#new-project-pop-adress-input-lng").val() == "") {
      cloneDivs
        .querySelector(".contents-adrees-latlng")
        .setAttribute("data-maplatlng", ""); //초기화 gps
    } else {
      let lnglatData =
        $("#new-project-pop-adress-input-lng").val() +
        "," +
        $("#new-project-pop-adress-input-lat").val();
      cloneDivs
        .querySelector(".contents-adrees-latlng")
        .setAttribute("data-maplatlng", lnglatData);
    }
    //탭 상태에 따라
    switch ($("input[name='map-adress-tab']:checked").val()) {
      case "tab-adress":
        cloneDivs.querySelector(".contents-adrees-latlng").textContent =
          contentname.getAttribute("data-value");
        break;
      case "tab-lnglat":
        cloneDivs.querySelector(".contents-adrees-latlng").textContent =
          cloneDivs
            .querySelector(".contents-adrees-latlng")
            .getAttribute("data-maplatlng");

        break;
    }

    tagArrowPosition(cloneDivs.querySelector(".contents-title"));

    if (getComputedStyle(uploadImg).display == "none") {
      runPrint(ImgContent, cloneDivs, true);
    } else {
      runPrint(ImgContent, cloneDivs, false);

      //window.location.href = "start.html";
    }

    //createConentsNextScene(cloneDivs);
  });
  let contentlists = document.querySelectorAll(".contents-List-content");
  contentlists.forEach((conDiv) => {
    const checkbox = conDiv.querySelector(".list-contents-img-checkbox");
    checkbox.addEventListener("change", function () {
      const checkboxicon = conDiv.querySelector(
        ".list-contents-img-checkIconbox"
      );
      if (checkbox.checked) {
        checkboxicon.style.backgroundColor = "var(--box-favoritebtn-icon-)";
      } else {
        checkboxicon.style.backgroundColor = "var(--defualt-)";
      }
      saveData();
    });
  });

  //취소 시 확인창 꺼지기,
  $("#delete-confirm-pop-btn-cancel").click(function () {
    let deletepop = document.getElementById("delete-confirm-pop");
    deletepop.style.visibility = "hidden";
  });
  //완전 삭제는 div삭제,
  $("#delete-confirm-pop-btn-delete").click(function () {
    if (deleteSetDiv == null) {
      console.log("삭제되는 객체가 비었습니다.");
      return;
    }
    deleteSetDiv.remove();
    let deletepop = document.getElementById("delete-confirm-pop");
    deletepop.style.visibility = "hidden";
    //deleteSetDiv.parentNode.removeChild(deleteSetDiv);
    saveData()
    checkedContentsDeleted();
  });
});
//삭제 시 자신의 객체를 넣어주기
let deleteSetDiv;
function goHome() {
  stateFilePage = "home";

  $("#listBtn-searching-input").val("");
  searchinput_startPage();

  $("#Recent").prop("checked", true);
  $("#opt1").prop("checked", true);
  sortSelectReset();
  $("#Recent-panel").css("display", "flex"); // 보이기
  $("#yourFiles-panel").css("display", "none"); // 숨기기

  favoritePageCheck = false;

  $("#favoriteTab").css("display", "none");
  $("#homeTab").css("display", "flex");
  $("#contents-list-empty img").attr("src", "img/icons/folder.png");
  $("#opt1").prop("checked", true);
  $("#contents-list-empty-doc").text("You have no recent documents");
  $("#contents-list-empty-expl").text(
    "Once you start a task, they will show up here"
  );

  checkedContentsEmpty();

  let contentlist = document.querySelectorAll(".contents-List-content");
  contentlist.forEach((contentDiv) => {
    contentDiv.style.display = "flex";
    if (contentDiv.classList.contains("delete-contents"))
      contentDiv.style.display = "none";
    const checkbox = contentDiv.querySelector(".list-contents-img-checkbox");
  });

  checkedContentsEmpty();
  let deletelements = document.getElementsByClassName("delete-contents");

  let dotList = document.querySelectorAll(".list-contents-dot-func");
  // 선택된 요소들의 개수 확인
  let deletecount = deletelements.length;
  //console.log(dotList.length)
  if (deletecount == dotList.length - 1) {
    const ContentsList_element = document.getElementById("contents-Lists"); // 클래스 삭제
    ContentsList_element.classList.add("emptyActive");
  }
  $("#side-user-menu-home").css(
    "background-color",
    "var(--selected-box-color-)"
  );
  $("#side-user-files-Deleted").css("background-color", "var(--defualt-)");
  $("#side-user-menu-learn").css("background-color", "var(--defualt-)");
  $("#side-user-files-All").css("background-color", "var(--defualt-)");
  $("#cloneContents").css("display", "none");
}

function sorting() {
  const radioButtons = document.querySelectorAll(
    'input[name="category-state"]'
  );
  let checkedValue = null;

  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      checkedValue = radioButton.value;
      break;
    }
  }
  if (checkedValue == "recent") {
    const radioButtons = document.querySelectorAll(
      'input[name="Recent-radio"]'
    );
    let checkedValue = null;

    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        checkedValue = radioButton.value;
        break;
      }
    }
    if (checkedValue == "sort") {
      timeSort(false);
    } else if (checkedValue == "reverse") {
      timeSort(true);
    }
  } else if (checkedValue == "yourfiles") {
    const radioButtons = document.querySelectorAll(
      'input[name="All_seleted-radio"]'
    );
    let checkedValue = null;

    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        checkedValue = radioButton.value;
        break;
      }
    }

    if (checkedValue === "sort") {
      timeSort(false);
    } else if (checkedValue === "reverse") {
      timeSort(true);
    }
    if (checkedValue === "nameSort") {
      nameSort(false);
    } else if (checkedValue === "nameReverse") {
      nameSort(true);
    }
  }
}
setInterval(timeCompare, 1000);
function timeCompare() {
  let timeList = document.querySelectorAll(".list-contents-time");
  timeList.forEach((timeDiv) => {
    const timeparentElements = timeDiv.parentNode.parentNode;
    let time = new Date().getTime() - timeparentElements.id;
    // 초와 분 단위로 변환
    const elapsedSeconds = Math.floor(time / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const elapsedDays = Math.floor(elapsedHours / 24);
    const elapsedyears = Math.floor(elapsedDays / 365);

    if (elapsedyears == 0) {
      if (elapsedDays == 0) {
        if (elapsedHours == 0) {
          if (elapsedMinutes == 0) {
            if (elapsedSeconds == 0) {
              timeDiv.innerText = "now";
            } else {
              timeDiv.setAttribute("data-value", elapsedSeconds);
              timeDiv.innerText = elapsedSeconds + " seconds ago";
            }
          } else {
            timeDiv.setAttribute("data-value", elapsedSeconds);
            timeDiv.innerText = elapsedMinutes + " minutes ago";
          }
        } else {
          timeDiv.setAttribute("data-value", elapsedSeconds);
          timeDiv.innerText = elapsedHours + " hours ago";
        }
      } else {
        timeDiv.setAttribute("data-value", elapsedSeconds);
        timeDiv.innerText = elapsedDays + " days ago";
      }
    } else {
      timeDiv.setAttribute("data-value", elapsedSeconds);
      timeDiv.innerText = elapsedyears + " years ago";
    }
  });
}

let favoritePageCheck = false;
//learnPageCount
$(document).ready(function () { });

let namedItemElem;
let inputElem = null;
let namedElem;
let inputText;
function onDbclicknamed(e, namedContentId) {
  namedElem = e.querySelector(".list-contents-title");
  inputText = namedElem.innerText;
  namedItemElem = namedElem.parentNode;
  inputElem = document.createElement("input");
  inputElem.value = inputText;
  inputElem.classList.add("edit-input");
  inputElem.classList.add("dontNextScene");
  namedElem.innerText = "     ";

  inputElem.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      fixedName();
      fixedsaveData(namedElem)
    }
  });
  namedItemElem.appendChild(inputElem);
  // body에 클릭에 대한 이벤트 리스너 등록
  document.body.addEventListener("click", onClickBody);
  // todoItemElem 요소를 제외한 영역을 클릭 시, 수정모드 종료
}
let renameCount = 0;
const onClickBody = (e) => {
  if (e.target !== inputElem) {
    renameCount++;
    if (renameCount > 1) {
      fixedName();

      fixedsaveData(namedElem)
      renameCount = 0;
    }
  }
};
function fixedName() {
  // 그 아이디에 있는 텍스트 변경
  //input 삭제 (removeChild)
  let originName = inputText;

  let newName = "";
  newName = inputElem.value;

  //만약 이미 있는 이름이면
  let namedList = document.querySelectorAll(".list-contents-title");
  namedList.forEach((nameLabel) => {
    if (nameLabel.innerText == inputElem.value) {
      //비교해서 있으면 A에 저장
      newName = originName;
    }
  });
  namedElem.innerText = newName;

  //원상복귀
  namedItemElem.removeChild(inputElem);
  document.body.removeEventListener("click", onClickBody); // 이벤트리스너 제거
}

function checkedDeleteContentsCount() {
  let deletelements = document.getElementsByClassName("delete-contents");

  // 선택된 요소들의 개수 확인
  let deletecount = deletelements.length;
  if (deletecount == 0) {
    const ContentsList_element = document.getElementById("contents-Lists"); // 클래스 삭제
    ContentsList_element.classList.add("emptyActive");
  }
}
const prefixCount = {};
function pad(number, length) {
  return String(number).padStart(length, "0");
}
function getNumberFromLabel(labelValue) {
  const matches = labelValue.match(/\.\d{3}$/); // 끝에서 .001, .002, .003 등을 찾습니다.
  return matches ? parseInt(matches[0].substring(1)) : 0;
}
function dotcloneEvent(cloneDiv) {
  let dotDiv = cloneDiv.querySelector(".list-contents-dot-func");
  let dotDIvCount = dotDiv.length;
  const dotparentElements = dotDiv.parentNode;
  const dotbox = dotDiv.querySelector(".list-contents-dot-func-div");

  // checkbox의 변경 사항을 감지하여 처리합니다.
  dotDiv.addEventListener("click", function () {
    dotbox.style.visibility = "visible";
  });
  //삭제 클릭시
  const deletebox = dotDiv.querySelector(".list-contents-dot-func-div-delete");
  deletebox.addEventListener("click", function () {
    dotparentElements.classList.add("delete-contents");
    dotparentElements.style.display = "none";
    //삭제 되면 해당 화면에선 안보이고,(즐찾에서도) /deleted창에가면 보이게
    let deletelements = document.getElementsByClassName("delete-contents");

    // 선택된 요소들의 개수 확인
    dotDIvCount = document.querySelectorAll(".list-contents-dot-func").length;
    let deletecount = deletelements.length;
    if (deletecount == dotDIvCount - 1) {
      const ContentsList_element = document.getElementById("contents-Lists"); // 클래스 삭제
      ContentsList_element.classList.add("emptyActive");
    }

    const deletetime = dotparentElements.querySelector(".list-contents-delete");
    //console.log(deletetime)
    deletetime.setAttribute("data-value", new Date().getTime());

    const currentDate = new Date(
      parseInt(deletetime.getAttribute("data-value"))
    );

    const year = currentDate.getFullYear(); // 연도를 가져옵니다.
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월을 가져오고 0을 붙여 두 자리로 만듭니다.
    const day = String(currentDate.getDate()).padStart(2, "0"); // 일을 가져오고 0을 붙여 두 자리로 만듭니다.

    const formattedDate = `${year}. ${month}. ${day}`;
    deletetime.innerText = formattedDate;
    dotparentElements.id = new Date().getTime();
  });
  //복제 클릭시
  const duplicationbox = dotDiv.querySelector(
    ".list-contents-dot-func-div-duplication"
  );
  duplicationbox.addEventListener("click", function () {
    let cloneDivs = dotparentElements.cloneNode(true);
    dotparentElements.parentNode.appendChild(cloneDivs);
    cloneDivs.id = new Date().getTime();

    //이름 .001
    let contentname = cloneDivs.querySelector(".list-contents-title");
    let labelValue = contentname.innerText;
    const match = labelValue.match(/(.*?)(\.\d+)?$/);
    const prefix = match[1];

    if (!prefixCount.hasOwnProperty(prefix)) {
      prefixCount[prefix] = 0;
    }

    prefixCount[prefix]++;

    let suffix = match[2] ? parseInt(match[2].substring(1)) : 0;
    if (prefixCount[prefix] > 1) {
      suffix = prefixCount[prefix] - 1;
    }

    suffix++;

    const newLabelValue = `${prefix}.${pad(suffix, 3)}`;
    contentname.innerText = newLabelValue;
    //tagArrowPosition(cloneDivs.querySelector('.contents-title'))

    //시간 최신으로..
    const time = cloneDivs.querySelector(".list-contents-time");
    time.setAttribute("data-value", -1);
    dotcloneEvent(cloneDivs);

    timeCompare();
    //현재 정렬 상태에 맞게 호출하기
    //recent 인지 yourfiles인지 체크
    //opt1인지 2,3,4인지 체크
    sorting();
    saveData();
  });
  //완전 삭제 버튼
  const deletionbox = dotDiv.querySelector(
    ".list-contents-dot-func-div-deletion"
  );

  deletionbox.addEventListener("click", function () {
    let deletepop = document.getElementById("delete-confirm-pop");
    deletepop.style.visibility = "visible";
    deleteSetDiv = dotparentElements;
  });

  //되돌리기 버튼
  const restorebox = dotDiv.querySelector(
    ".list-contents-dot-func-div-restore"
  );

  restorebox.addEventListener("click", function () {
    dotparentElements.classList.remove("delete-contents");
    dotparentElements.style.display = "none";
    checkedContentsDeleted();

    dotparentElements.id = new Date().getTime();

    saveData()
  });

  // 더블 클릭 (이름수정)
  // const namefixed = dotparentElements.querySelector('.list-contents-title');
  // namefixed.addEventListener('dblclick', (event) => onDbclicknamed(event, dotparentElements.id))
  // rename 버튼
  const renamebox = dotDiv.querySelector(".list-contents-dot-func-div-rename");
  renamebox.addEventListener("click", (event) =>
    onDbclicknamed(dotparentElements, dotparentElements.id)
  );

  dotparentElements.addEventListener("click", (event) => clickedContent(event.target));

  //change to map image
  const TomapImg = dotDiv.querySelector(
    ".list-contents-dot-func-div-changemapimage"
  );
  TomapImg.addEventListener("click", function () {
    dotparentElements.querySelector(".list-contents-img img").src =
      dotparentElements
        .querySelector(".list-contents-img img")
        .getAttribute("data-src");
  });

  //change project image
  const ToNewImg = dotDiv.querySelector(
    ".list-contents-dot-func-div-changeprojectimage"
  );
  ToNewImg.addEventListener("click", function () {
    $("#changeImg-pop").css("display", "flex");
    applyContentsImg = dotparentElements.querySelector(
      ".list-contents-img img"
    );
  });

  //tag
  const contentsTaglist = dotparentElements.querySelector(
    ".list-contents-tagList"
  );
  const contentsTagsmore = dotparentElements.querySelector(".tagList-more");
  const contentsTagsArrow = dotparentElements.querySelector(".tagList-arrow");
  contentsTagsmore.addEventListener("click", function () {
    $(this).css("display", "none");
    contentsTaglist.style.flexWrap = "wrap";
    contentsTagsArrow.style.display = "flex";
  });
  contentsTagsArrow.addEventListener("click", function () {
    $(this).css("display", "none");
    contentsTaglist.style.flexWrap = "nowrap";
    contentsTagsmore.style.display = "flex";
  });
}
function starDelete() {
  // 특정 클래스를 가진 요소들을 선택
  let starDeleteelements = document.getElementsByClassName("delete-contents");

  let hiddenElementsCount = 0;

  // 각 요소를 순회하며 display 속성이 "none"인지 확인
  for (var i = 0; i < starDeleteelements.length; i++) {
    let computedStyle = window.getComputedStyle(starDeleteelements[i]);

    if (computedStyle.getPropertyValue("display") === "none") {
      hiddenElementsCount++;
    }
  }
  return hiddenElementsCount;
}

function timeSort(reverseCheck) {
  //최신순 정렬,
  let listtop = $("#list-view-index");
  let contents = $(".contents-List-content");

  let contentsArray = contents.toArray().map(function (content, index) {
    if (content.id == "cloneContents")
      return {
        element: content,
        time: 0, //시간 라벨에 .list-contents-time 에 value값을 가져옴
        title: "0",
        originalIndex: index, // 원래의 인덱스 저장
      };
    return {
      element: content,
      time: parseInt(content.id), //시간 라벨에 .list-contents-time 에 value값을 가져옴
      title: $(content).find(".list-contents-title").text(),
      originalIndex: index, // 원래의 인덱스 저장
    };
  });
  contentsArray.sort(function (a, b) {
    if (a.time !== b.time) {
      return a.time - b.time; // 시간을 기준으로 정렬
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  if (reverseCheck) {
    //시간 역순
    contentsArray = contentsArray.reverse();
  }

  let parent = $("#contents-List");
  parent.empty();
  parent.append(listtop);
  contentsArray.forEach(function (content) {
    if (content.id != "cloneContents") parent.append(content.element);
  });
}

function nameSort(reverseCheck) {
  //이름기준 정렬

  let listtop = $("#list-view-index");
  let contents = $(".contents-List-content");

  let contentsArray = contents.toArray().map(function (content, index) {
    return {
      element: content,
      time: parseInt($(content).find(".list-contents-time").attr("value")),
      title: $(content).find(".list-contents-title").text(),
      originalIndex: index, // 원래의 인덱스 저장
    };
  });

  contentsArray.sort(function (a, b) {
    if (a.title !== b.title) {
      return a.title.localeCompare(b.title);
    } else {
      return a.time - b.time;
    }
  });
  if (reverseCheck) {
    contentsArray.sort(function (a, b) {
      return b.title.localeCompare(a.title); // 이름을 기준으로 역순 정렬
    });
  }

  let parent = $("#contents-List");
  parent.empty();
  parent.append(listtop);
  contentsArray.forEach(function (content) {
    parent.append(content.element);
  });
}

function searchinput_startPage() {
  //리스트 뷰 검색 함수
  cursoron = true;
  let word = document.getElementById("listBtn-searching-input").value;
  let list = $(".list-view-content");
  let xbtn = document.getElementById("listBtn-searching-cancel");
  for (let i = 0; i < list.length; i++) {
    if (list[i].innerText.toUpperCase().includes(word.toUpperCase())) {
      if (list[i].closest(".contents-List-content").id != "cloneContents")
        list[i].closest(".contents-List-content").style.display = "flex";
    } else {
      list[i].closest(".contents-List-content").style.display = "none";
      // //tagTye 에서  글씨 비교 후에 있으면 보여주기.
      let tagList = $(".tagTye");
      for (let j = 0; j < tagList.length; j++) {
        if (tagList[j].innerText.toUpperCase().includes(word.toUpperCase())) {
          if (
            tagList[j].closest(".contents-List-content").id != "cloneContents"
          )
            tagList[j].closest(".contents-List-content").style.display = "flex";
        }
      }
    }
  }

  let ContentList = document.querySelectorAll(".contents-List-content");
  let deletedContents = findDeletContent();
  if (stateFilePage == "home") {
    deletedContents.forEach((deletedcontent) => {
      deletedcontent.style.display = "none";
    });
  }
  if (stateFilePage == "delete") {
    ContentList.forEach((content) => {
      content.style.display = "none";
    });
  }
  if (word == "") {
    //검색하면 보이는게 현재 페이지에 따라 달라져야함.
    //삭제된 페이지..만 구별하면 될거같으니.
    //해당 클래스 갖고있는 content div넘기기
    if (stateFilePage == "home") {
      //다보이고 삭제된것만 none
      ContentList.forEach((content) => {
        content.style.display = "flex";
      });
      deletedContents.forEach((deletedcontent) => {
        deletedcontent.style.display = "none";
      });
    }
    if (stateFilePage == "delete") {
      ContentList.forEach((content) => {
        content.style.display = "none";
      });
      deletedContents.forEach((deletedcontent) => {
        deletedcontent.style.display = "flex";
      });
    }
    //cloneContents none으로
    ContentList.forEach((content) => {
      if (content.id == "cloneContents") content.style.display = "none";
    });
  }
  searchInput_reset(xbtn, word);
}
function findDeletContent() {
  //삭제된 콘텐츠 리스트 파악
  let contentDeleted = [];

  let namedContentList = document.querySelectorAll(".contents-List-content");
  namedContentList.forEach((content) => {
    if (content.classList.contains("delete-contents")) {
      contentDeleted.push(content);
    }
  });
  return contentDeleted;
}
function searchInput_reset(xbtn, word) {
  if (word == "") {
    xbtn.style.visibility = "hidden";
    document.getElementById("listBtn-searching-input").style.borderColor =
      "var(--defualt-)";
  } else {
    xbtn.style.visibility = "visible";
    document.getElementById("listBtn-searching-input").style.borderColor =
      "var(--selected-box-color-)";
  }
}

function checkedContentsEmpty() {
  let parentDiv = document.querySelector("#contents-List");

  // 선택한 요소의 자식 div의 개수를 세어 출력합니다.
  let childDivCount = parentDiv.querySelectorAll(
    ".contents-List-content"
  ).length;
  if (childDivCount == 1) {
    const ContentsList_element = document.getElementById("contents-Lists"); // 클래스 삭제
    ContentsList_element.classList.add("emptyActive");
  } else if (childDivCount > 1) {
    const ContentsList_element = document.getElementById("contents-Lists"); // 클래스 삭제
    ContentsList_element.classList.remove("emptyActive");
  }
}
function checkedContentsDeleted() {
  let childDivDeletedCount = 0;
  // 선택한 요소의 자식 div의 개수를 세어 출력합니다.
  let contentlist = document.querySelectorAll(".contents-List-content");
  contentlist.forEach((contentDiv) => {
    contentDiv.style.display = "none";
  });
  let childDiv = document.querySelectorAll(".delete-contents");
  childDiv.forEach((deletedDiv) => {
    deletedDiv.style.display = "flex";
    childDivDeletedCount++;
  });
  if (childDivDeletedCount == 0) {
    const ContentsList_element = document.getElementById("contents-Lists"); // 클래스 삭제
    ContentsList_element.classList.add("emptyActive");
  } else if (childDivDeletedCount > 0) {
    const ContentsList_element = document.getElementById("contents-Lists"); // 클래스 삭제
    ContentsList_element.classList.remove("emptyActive");
  }
}
let mapDataJson;
let jsonName;
let jsonlocation;
let mapName;
let tagsListTomainData = [];
let mapStyleSetting;
//콘텐츠를 클릭하면 데이터를 저장,
function clickedContent(e) {
  //클릭한곳이 점 세개랑 스타, input, 점 세개.. 박스들 등이 아니면, 이동
  if (!e.classList.contains("dontNextScene")) {
    const clickedContents = e.closest(".contents-List-content");
    jsonName = clickedContents.querySelector(".list-contents-title");
    console.log(jsonName)
    console.log(jsonName.innerText)
    jsonlocation = jsonName.getAttribute("data-value");
    mapName = ""; //map json정보들,, 시설물 위치 등등
    jsonName = jsonName.innerText;

    //태그 저장및 넘겨주기
    let tagLists = clickedContents.querySelectorAll(".tagTye label");
    tagLists.forEach((tag) => {
      tagsListTomainData.push(tag.textContent);
    });
    mapStyleSetting = clickedContents
      .querySelector(".list-contents-img")
      .getAttribute("data-mapstyle");
    //console.log(mapStyleSetting);
    //console.log(tomainJson())
    localStorage.setItem("startdata", tomainJson());
    localStorage.setItem("startListData", startPageListSave());
    //console.log(JSON.parse(localStorage.getItem("startdata")));

    window.location.href = "start.html";
  }
}

function fixedsaveData(e) {

  const clickedContents = e.closest(".contents-List-content");
  jsonName = clickedContents.querySelector(".list-contents-title");
  jsonlocation = jsonName.getAttribute("data-value");
  mapName = ""; //map json정보들,, 시설물 위치 등등
  jsonName = jsonName.innerText;

  //태그 저장및 넘겨주기
  let tagLists = clickedContents.querySelectorAll(".tagTye label");
  tagLists.forEach((tag) => {
    tagsListTomainData.push(tag.textContent);
  });
  mapStyleSetting = clickedContents
    .querySelector(".list-contents-img")
    .getAttribute("data-mapstyle");
  //console.log(mapStyleSetting);
  //console.log(tomainJson())
  localStorage.setItem("startdata", tomainJson());
  localStorage.setItem("startListData", startPageListSave());
  //console.log(JSON.parse(localStorage.getItem("startdata")));

}


function saveData() {
  localStorage.setItem("startListData", startPageListSave());
}

function createConentsNextScene(e) {
  const clickedContents = e;
  console.log(clickedContents)
  jsonName = clickedContents.querySelector(".list-contents-title");

  jsonlocation = jsonName.getAttribute("data-value");
  mapName = ""; //map json정보들,, 시설물 위치 등등
  jsonName = jsonName.innerText;

  //태그 저장및 넘겨주기
  let tagLists = clickedContents.querySelectorAll(".tagTye label");
  tagLists.forEach((tag) => {
    tagsListTomainData.push(tag.textContent);
  });
  mapStyleSetting = clickedContents
    .querySelector(".list-contents-img")
    .getAttribute("data-mapstyle");
  console.log(mapStyleSetting);
  //console.log(tomainJson())
  localStorage.setItem("startdata", tomainJson());
  localStorage.setItem("startListData", startPageListSave());
  console.log(JSON.parse(localStorage.getItem("startdata")));

  window.location.href = "start.html";
}
//json으로 내용 저장 및 변경
//로딩 시작
//json전달
//main에서 내용을 바탕으로 초기 세팅
//다 되면 로딩 꺼짐
function tomainJson() {
  mapDataJson = {
    id: "1211" + new Date().getTime(),
    name: jsonName,
    location: jsonlocation,
    mapSetName: mapName,
    tag: tagsListTomainData,
    mapStyle: mapStyleSetting,
  };
  return JSON.stringify(mapDataJson);
}

let defualtLocation = "서울특별시 송파구 올림픽로 82";

function geoGetAddressImportVer(e) {
  if (e.keyCode == 13) {
    q = $("#new-project-pop-adress-input").val();
    try {
      $("#location-disable").css("display", "none");

      geoGetGPS(q, function (e, error) {
        console.log(error);
        if (error == null) {
          map.setCenter([e[0], e[1]]);
          console.log(e);
          changeCoordinates([e[0], e[1]]);
          $("#adress-select-warning").css("display", "none");
          $("#new-project-pop-adress-input").css(
            "borderColor",
            "var(--selected-box-color-)"
          );

          $("#new-project-pop-adress-input-lng").val(e[0]);
          $("#new-project-pop-adress-input-lat").val(e[1]);
        } else {
          $("#adress-select-warning").css("display", "flex");
          $("#new-project-pop-adress-input").css(
            "borderColor",
            "var(--warining-color)"
          );

          console.log(e);
          geoGetGPS(defualtLocation, function (e, error) {
            console.log(error);
            map.setCenter([e[0], e[1]]);
            changeCoordinates([e[0], e[1]]);
            $("#new-project-pop-adress-input").val(defualtLocation);

            $("#new-project-pop-adress-input-lng").val(e[0]);
            $("#new-project-pop-adress-input-lat").val(e[1]);
            //디폴트 설정 된 장소로 하든.. 현재 위치를 하든..
          });
        }
      });
      jsonlocation = q;
    } catch (error) {
      console.log(error);
      geoGetGPS(defualtLocation, function (e, error) {
        if (error == null) {
          map.setCenter([e[0], e[1]]);
          changeCoordinates([e[0], e[1]]);
        }
        //console.log([e[0], e[1]])
      });
      jsonlocation = defualtLocation;
    }
  }
}
//현재 데이터 json으로 저장하기
//main에 전달해야하는 정보
/*
    {
        id
        name : map이름
        location : 맵 중심 좌표
        
        //옵션
        mapJson : 맵이 갖고 있는 시설 데이터 정보들..

        //추가 할점. 태그

        
        tag: 태그 ,
        mapStyle: 지도스타일,
    }
*/

/*
    contentJson{
        id :
        idtime : contents-List-content의 id
        name : list-contents-title의 innerText
        location :  list-contents-title의 data-value
        lnglat : 위경도 contents-adrees-latlng 의 data-value
        favortie : list-contents-img-checkbox 가 true인지
        delete : contents-List-content클래스 중 delete-contents클래스를 갖고 있는 지
        deleteTime : 삭제 했다면 그 삭제한 시간, list-contents-delete의 data-value
        createTime : list-contents-creat의 innerText
        img : list-contents-img안에 있는 img의 src
        mapimgdata :list-contents-img안에 있는 img의 data-src
        mapstyle : 아직 설정 X
        tag : 태그
        mapJson : 맵 구조에 따라 달라질 예정
    }
*/

/*
    startPageList{
        Contents : [
            contentJson{}
            contentJson{}
            contentJson{}
        ]
    }
*/
function toContentJson() {
  let contentslist = [];
  //contents-List 안에 있는것중 .contents-List-content인데 id가 cloneContents가 아니어야함
  //반복문 사용.
  //내용 넣고 위 배열에 푸시
  let contents = document.querySelectorAll(".contents-List-content");
  contents.forEach((content) => {
    if (content.id == "cloneContents") return;
    const tagLabel = content.querySelectorAll(".tagTye");
    let tagLabelList = [];
    tagLabel.forEach((tagContent) => {
      tagLabelList.push(tagContent.querySelector("label").textContent);
    });
    let contentJson = {
      id: new Date().getTime(),
      idtime: content.id,
      name: content.querySelector(".list-contents-title").textContent,
      location: content
        .querySelector(".list-contents-title")
        .getAttribute("data-value"),
      lnglat: content
        .querySelector(".contents-adrees-latlng")
        .getAttribute("data-maplatlng"),
      favorite: content.querySelector(".list-contents-img-checkbox").checked, // true인지
      delete: content.classList.contains("delete-contents"),
      deleteTime: content
        .querySelector(".list-contents-delete")
        .getAttribute("data-value"),
      createTime: content
        .querySelector(".list-contents-creat")
        .getAttribute("data-value"),
      img: content
        .querySelector(".list-contents-img")
        .querySelector("img")
        .getAttribute("src"),
      mapimgdata: content
        .querySelector(".list-contents-img")
        .querySelector("img")
        .getAttribute("data-src"), //맵이미지 설정
      mapstyle: content
        .querySelector(".list-contents-img")
        .getAttribute("data-mapstyle"),
      tag: tagLabelList,
      mapJson: "", //맵 구조에 따라 달라질 예정
    };
    //console.log(tagLabelList)
    contentslist.push(contentJson);
  });

  return contentslist;
}
function startPageListSave() {
  let contentsJson = toContentJson();
  let startPageList = {
    id: new Date().getTime(),
    contents_list: contentsJson,
  };
  return JSON.stringify(startPageList);
}

let startListData = JSON.parse(localStorage.getItem("startListData"));
let startdata = JSON.parse(localStorage.getItem("startdata"));
//console.log(localStorage.getItem("startListData"));
//console.log(startdata);
//이제 이거 읽어와서 배치하면 됨..

function loadContentsList() {
  if (startListData == null) {
    let businessData_startArr = []
    businessData_startArr.push(businessData_start)
    startListData = {
      id: new Date().getTime(),
      contents_list: businessData_startArr,
    };
    //console.log(startListData)
  }
  else {
    // console.log(startListData)
  }
  let dotparentElements = document.getElementById("cloneContents");
  if (startListData != null) {
    startListData.contents_list.forEach((content) => {
      let loadcloneDivs = dotparentElements.cloneNode(true);
      document.getElementById("contents-List").appendChild(loadcloneDivs);
      loadcloneDivs.id = content.idtime;
      const creattime = loadcloneDivs.querySelector(".list-contents-creat");
      creattime.setAttribute("data-value", content.createTime);

      //이름 .001
      let contentname = loadcloneDivs.querySelector(".list-contents-title");
      let labelValue = (contentname.innerText = content.name);

      const match = labelValue.match(/(.*?)(\.\d+)?$/);
      const prefix = match[1];

      if (!prefixCount.hasOwnProperty(prefix)) {
        prefixCount[prefix] = 0;
      }

      prefixCount[prefix]++;

      let suffix = match[2] ? parseInt(match[2].substring(1)) : 0;
      if (prefixCount[prefix] > 1) {
        suffix = prefixCount[prefix] - 1;
      }

      suffix++;

      const newLabelValue = `${prefix}.${pad(suffix, 3)}`;
      contentname.innerText = newLabelValue;
      contentname.innerText = content.name;
      // tagArrowPosition(loadcloneDivs.querySelector('.contents-title'))

      //시간 최신으로..
      const time = loadcloneDivs.querySelector(".list-contents-time");
      time.setAttribute("data-value", content.idtime);

      sorting();

      timeCompare();
      dotcloneEvent(loadcloneDivs);

      //create 시간 설정
      const createTime = loadcloneDivs.querySelector(".list-contents-creat");
      const currentDate = new Date(parseInt(content.createTime));
      const year = currentDate.getFullYear(); // 연도를 가져옵니다.
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월을 가져오고 0을 붙여 두 자리로 만듭니다.
      const day = String(currentDate.getDate()).padStart(2, "0"); // 일을 가져오고 0을 붙여 두 자리로 만듭니다.

      const formattedDate = `${year}. ${month}. ${day}`;
      createTime.innerText = formattedDate;

      //home이면,,
      //favoriteTab display이가 none이면
      let favoriteTab = document.getElementById("favoriteTab");

      // getComputedStyle를 사용하여 실제로 적용된 CSS 값을 가져옵니다.
      let displayPropertyValue = window
        .getComputedStyle(favoriteTab)
        .getPropertyValue("display");

      $("#new-project-pop").css("display", "none");
      goHome();
      if (displayPropertyValue == "none") {
        loadcloneDivs.style.display = "flex";
        const ContentsList_element = document.getElementById("contents-Lists"); // 클래스 삭제
        ContentsList_element.classList.remove("emptyActive");
      }

      //맵스타일 반영
      loadcloneDivs
        .querySelector(".list-contents-img")
        .setAttribute("data-mapstyle", content.mapstyle);

      //주소반영
      loadcloneDivs.querySelector(".contents-adrees-latlng").textContent =
        content.location;

      loadcloneDivs
        .querySelector(".list-contents-title")
        .setAttribute("data-value", content.location);
      loadcloneDivs
        .querySelector(".list-contents-img")
        .querySelector("img")
        .setAttribute("src", content.img);
      loadcloneDivs
        .querySelector(".list-contents-img")
        .querySelector("img")
        .setAttribute("data-src", content.mapimgdata);
      loadcloneDivs.querySelector(".list-contents-img-checkbox").checked =
        content.favorite;
      if (content.delete) loadcloneDivs.classList.add("delete-contents");
      if (content.name.includes("구미 스마트 그린산단 (영업용)"))
        loadcloneDivs.classList.remove("delete-contents");
      //여기서 저장한 태그 반영하고
      if (startdata != null)
        if (content.name == startdata.name) {
          content.tag = startdata.tag;
        }
      //태그 생성해주기
      //템플릿 추가 및 글자 안에 있는 값으로 바꿔주기
      let tagTemplate = document.getElementById("tagTemplate");
      if (content.tag != null)
        content.tag.forEach((tagContent) => {
          //console.log(tagContent)
          let cloneTagTemplate = tagTemplate.content.cloneNode(true);
          cloneTagTemplate.querySelector(".dontNextScene label").textContent =
            tagContent;

          loadcloneDivs
            .querySelector(".list-contents-tagList")
            .appendChild(cloneTagTemplate);
        });
      if (content.tag.length > 3) {
        loadcloneDivs.querySelector(".tagList-more").style.display = "flex";
      }
    });
  }
}
function dragdropfile(file, handlerDiv) {
  let sibling = handlerDiv.nextElementSibling;

  let dragdropImg = null;
  let dragdropByte = null;

  while (sibling) {
    if (sibling.classList.contains("dragdropImg")) {
      dragdropImg = sibling;
    }
    if (sibling.classList.contains("dragdropByte")) {
      dragdropByte = sibling;
      break;
    }
    sibling = sibling.nextElementSibling;
  }
  let dragdropChangedImg = handlerDiv.querySelector(".dragdropChangedImg");
  addFile(file, dragdropImg, dragdropChangedImg, dragdropByte);
}

function addFile(file, dragdropImg, dragdropChangedImg, dragdropByte) {
  const isImage = file.type.match("image.*"),
    objectURL = URL.createObjectURL(file);

  dragdropImg.querySelector(".dragdropImgName").innerText = file.name;
  dragdropImg.querySelector(".dragdropImgSize").innerText =
    file.size > 1024
      ? file.size > 1048576
        ? Math.round(file.size / 1048576) + "MB"
        : Math.round(file.size / 1024) + "KB"
      : file.size + "b";
  if (file.size > 5242880) return;
  const imgEle = dragdropChangedImg.querySelector("img");
  console.log(imgEle);
  isImage &&
    Object.assign(imgEle, {
      src: objectURL,
      alt: file.name,
    });

  // 이미지의 자체 비율로 설정
  dragdropChangedImg.style.display = "flex";
  dragdropImg.style.display = "flex";
  dragdropByte.style.display = "none";
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

/**
 
function dotEvent() {
    let dotList = document.querySelectorAll(".list-contents-dot-func");
    let dotListCount = dotList.length;
    dotList.forEach((dotDiv) => {
        const dotparentElements = dotDiv.parentNode;
        const dotbox = dotDiv.querySelector('.list-contents-dot-func-div');

        // checkbox의 변경 사항을 감지하여 처리합니다.
        dotDiv.addEventListener('click', function () {
            dotbox.style.visibility = "visible"
        });
        //삭제 클릭시
        const deletebox = dotDiv.querySelector('.list-contents-dot-func-div-delete');
        deletebox.addEventListener('click', function () {
            dotparentElements.classList.add('delete-contents');
            dotparentElements.style.display = 'none'
            //삭제 되면 해당 화면에선 안보이고,(즐찾에서도) /deleted창에가면 보이게
            let deletelements = document.getElementsByClassName('delete-contents');

            // 선택된 요소들의 개수 확인
            let deletecount = deletelements.length;

            dotListCount = document.querySelectorAll(".list-contents-dot-func").length;

            if (deletecount == dotListCount - 1) {
                const ContentsList_element = document.getElementById('contents-Lists'); // 클래스 삭제
                ContentsList_element.classList.add('emptyActive');

            }

            const deletetime = dotDiv.querySelector('.list-contents-delete');
            deletetime.setAttribute('data-value', new Date().getTime())

            const currentDate = new Date(parseInt(deletetime.attr('data-value')));

            const year = currentDate.getFullYear(); // 연도를 가져옵니다.
            const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월을 가져오고 0을 붙여 두 자리로 만듭니다.
            const day = String(currentDate.getDate()).padStart(2, '0'); // 일을 가져오고 0을 붙여 두 자리로 만듭니다.

            const formattedDate = `${year}-${month}-${day}`;
            deletetime.text(formattedDate);

        })
        //복제 클릭시
        const duplicationbox = dotDiv.querySelector('.list-contents-dot-func-div-duplication');
        duplicationbox.addEventListener('click', function () {
            const cloneDiv = dotparentElements.cloneNode(true);
            dotparentElements.parentNode.appendChild(cloneDiv)
            cloneDiv.id = new Date().getTime()
            //이름 .001
            let contentname = cloneDiv.querySelector('.list-contents-title');
            let labelValue = contentname.innerText;
            const match = labelValue.match(/(.*?)(\.\d+)?$/);
            const prefix = match[1];

            if (!prefixCount.hasOwnProperty(prefix)) {
                prefixCount[prefix] = 0;
            }

            prefixCount[prefix]++;

            let suffix = match[2] ? parseInt(match[2].substring(1)) : 0;
            if (prefixCount[prefix] > 1) {
                suffix = prefixCount[prefix] - 1;
            }

            suffix++;

            const newLabelValue = `${prefix}.${pad(suffix, 3)}`;
            contentname.innerText = newLabelValue;

            //시간 최신으로..
            const time = cloneDiv.querySelector('.list-contents-time');
            time.setAttribute('data-value', -1)
            dotcloneEvent(cloneDiv);
            timeCompare();

            //현재 정렬 상태에 맞게 호출하기
            //recent 인지 yourfiles인지 체크
            //opt1인지 2,3,4인지 체크
            sorting()

        })
        //완전 삭제 버튼
        const deletionbox = dotDiv.querySelector('.list-contents-dot-func-div-deletion');

        deletionbox.addEventListener('click', function () {

            let deletepop = document.getElementById("delete-confirm-pop");
            deletepop.style.visibility = 'visible';
            deleteSetDiv = dotparentElements;

        })

        //되돌리기 버튼
        const restorebox = dotDiv.querySelector('.list-contents-dot-func-div-restore');

        restorebox.addEventListener('click', function () {
            dotparentElements.classList.remove("delete-contents");
            dotparentElements.style.display = 'none';
            checkedContentsDeleted();
        })

        // 더블 클릭 (이름수정)
        const namefixed = dotparentElements.querySelector('.list-contents-title');
        namefixed.addEventListener('dblclick', (event) => onDbclicknamed(event, dotparentElements.id))

        dotparentElements.addEventListener('click', (event) => clickedContent(event))
    })
}
 */
