function viewpagefunc() {
  document.addEventListener("fullscreenchange", function () {
    if (document.fullscreenElement) {
      // 전체 화면 모드로 전환될 때 실행하는 코드
      viewScene.getEngine().resize();
    } else {
      // 전체 화면 모드에서 나갈 때 실행하는 코드
      viewScene.getEngine().resize();
    }
  });
  $(".model-view-checkbox-click").mouseover(function () {
    let siblings = $(this).next("div");
    siblings.css("display", "flex");
  });
  $(".model-view-checkbox-click").mouseleave(function () {
    if ($(this).is(":checked")) {
      let siblings = $(this).next("div");
      siblings.css("display", "flex");
    } else {
      let siblings = $(this).next("div");
      siblings.css("display", "none");
    }
  });

  $(".model-view-checkbox").change(function () {
    if ($(this).is(":checked")) {
      let siblings = $(this).next("div");
      siblings.css("display", "flex");
    } else {
      let siblings = $(this).next("div");
      siblings.css("display", "none");
    }
  });

  $("#reset-checkbox").mousedown(function () {
    let myDiv = $(this).next("div");
    myDiv.css("display", "flex");
  });
  $("#reset-checkbox").mouseup(function () {
    let myDiv = $(this).next("div");
    myDiv.css("display", "none");
  });
  $("#internal-device-checkbox").change(function () {
    if ($(this).is(":checked")) {
      $(this).css(
        "background-color",
        "var(--internalDevice-iconColor-clicked)"
      );
      advancedTexture.rootContainer.children.forEach(function (control) {
        if (control.name == "target") {
          control.isVisible = true;
        }
      });
    } else {
      $(this).css("background-color", "var(--internalDevice-iconColor)");
      advancedTexture.rootContainer.children.forEach(function (control) {
        control.isVisible = false;
      });
    }
  });

  $(".model-view-info-slider-box[type='radio']").on("change", function () {
    let selectedValue = this.id;
    $("#basic-info").css("display", "none");
    $("#data").css("display", "none");
    $("#graph").css("display", "none");
    if (selectedValue === "model-slider-basic") {
      $("#basic-info").css("display", "block");
    } else if (selectedValue === "model-slider-data") {
      $("#data").css("display", "block");
    } else if (selectedValue === "model-slider-graph") {
      $("#graph").css("display", "block");
    }
  });
  $("#videoplay-checkbox").on("change", function () {
    let myDiv = $(this).next("div");
    if (this.checked) {
    } else {
      myDiv.text("Play");
    }
  });
  $("#memo-checkbox").on("change", function () {
    if (this.checked) {
      $("#model-view-right-memo").css("display", "block");
      memoclickon = false;
      guimemoon(true);
      let children = advancedTexture5.rootContainer.children.slice();

      children.forEach((child) => {
        if (child.name.includes("guiIcon")) {
          child.isVisible = false;
        }
      });
    } else {
      $("#model-view-right-memo").css("display", "none");
      memoclickon = false;
      guimemoon(false);
    }
    let children = advancedTexture5.rootContainer.children.slice();

    children.forEach((child) => {
      if (child.name.includes("memolist_background")) {
        child.isVisible = false;
      }
    });
  });
  $(".model-view-right-memo-plus").click(function () {
    setmemo();
    $("#model-view-right-memo-list-info").css("display", "none");
    memoclickon = true;
    let children = advancedTexture5.rootContainer.children.slice();

    children.forEach((child) => {
      if (child.name == "guiIcon") {
        child.isVisible = true;
      }
    });
    //makememo();
  });
  $("#new-memo-write-canclebtn").click(function () {
    memosave();
    $("#new-memo-write-div").css("display", "none");
  });
  $("#new-memo-write-area").on("input", function () {
    let word = this.value;
    clickmemolist.innerText = word;
  });

  $("#videodata-checkbox").on("click", function () {
    $("#model-view-group-right").toggleClass("visible");
    viewScene.getEngine().resize();
  });

  $("#videodata-checkbox").on("change", function () {
    thischeck = this.checked;
    if (this.checked) {
      $(".view-model").css("width", "60rem");
      $(".view-model").css("height", "39.9375rem");
      $(".view-model").css("top", "16.69rem");
      $(".view-model").css("left", "12.25rem");

      $(".icon-group-left").css("animation", "ICONmoveright 2s forwards");
      $("#modelinfo-view-background-img").css(
        "animation",
        "moveright 2s forwards"
      );

      $("#model-view-group-right").addClass("visible");
      if (this.id == "videodata-checkbox") {
        //$("#model-view-right-memo").css("display", "none");
      } else if (this.id == "lock-checkbox") {
        $(".model-view-info").css("display", "none");
      }
    } else {
      $(".view-model").css("width", "100%");
      $(".view-model").css("height", "100%");
      $(".view-model").css("top", "0rem");
      $(".view-model").css("left", "0rem");

      $(".icon-group-left").css("animation", "ICONmoveOrigin 2s forwards");
      $("#modelinfo-view-background-img").css(
        "animation",
        "moveOrigin 2s forwards"
      );

      $("#model-view-group-right").removeClass("visible");

      $("#modelinfo-view-background-img").on("animationend", function () {
        if (!thischeck) {
          $(".model-view-info").css("display", "block");

          viewScene.getEngine().resize();
          // $("#model-view-right-memo").css("display", "flex");
        }
      });
    }
    viewScene.getEngine().resize();

    cameraSet_viewer();
    // viewScene.getEngine().runRenderLoop(function () {

    //   viewScene.render();
    // });
  });

  document.addEventListener("DOMContentLoaded", function () {
    // 현재 날짜를 가져와서 HTML에 출력
    document.querySelector(".model-view-option-calender").textContent =
      getCurrentDate();
  });

  // $(".model-view-option-expansion").click(function () {
  //   $(".verticalline").css("display", "block");
  //   $("#modelinfo-view-secondpage").css("display", "block");
  //   $("#modelinfo-view-firstpage").css("display", "none");
  //   $("#modelinfo-view-background-img").css(
  //     "animation",
  //     "moveImage 2s forwards"
  //   );
  //   $("#modelinfo-view-background-topimg").css("display", "block");
  //   document.querySelector("#model-view-option-calender2").textContent =
  //     getCurrentDate();
  //   document.querySelector("#model-view-option-calender3").textContent =
  //     getCurrentDate();
  // });
  $(".model-view-option-expansion2").click(function () {
    $("#modelinfo-view-secondpage").css("display", "none");
    $("#modelinfo-view-firstpage").css("display", "block");
    $(".verticalline").css("display", "none");
    $("#modelinfo-view-background-img").css(
      "animation",
      "moveImageback 2s forwards"
    );
    $("#modelinfo-view-background-topimg").css("display", "none");
  });
  $("");
}
function setmemo() {
  $("#model-view-right-memo-list").css("justify-content", "normal");
  $("#model-view-right-memo-list").css("flex-direction", "column");
  // $("#model-view-right-memo-list-info").css("display", "none");
  $("#model-view-right-memo-list-info").css("display", "flex");
}
function getCurrentDate() {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
  let day = currentDate.getDate();

  // 날짜를 "YYYY년 MM월 DD일" 형식으로 반환
  return year + ". " + month + ". " + day;
}
