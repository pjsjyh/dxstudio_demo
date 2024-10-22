function makememo(uiposition, key, keyname, wordlen) {
  let memolen = $(".new-memo-div").length;
  // if (memolen != 0 && key == null) memosave();
  let memolist = $("#model-view-right-memo-list-append");
  let gettemp = $("#new-memo-template");

  let clonememoTemplate = gettemp.contents().clone();
  if (typeof uiposition === "string") {
    uiposition = JSON.parse(uiposition);
  }

  clonememoTemplate.attr(
    "data-position",
    JSON.stringify({ x: uiposition.x, y: uiposition.y, z: uiposition.z })
  );
  $(clonememoTemplate)
    .find("#new-memo-control-btn-calender")
    .text(getCurrentDate());

  if (key == null) {
    clonememoTemplate.attr("data-len", 0);
    console.log("???");
    clonememoTemplate.attr("id", "memolist" + memolistnum);
    memolist.append(clonememoTemplate);

    clickmemolist = document
      .getElementById("memolist" + memolistnum)
      .querySelector("textarea");
    nowclickmemo = memolistnum;
  } else {
    if (typeof wordlen === "string") {
      wordlen = JSON.parse(wordlen);
    }
    console.log(wordlen);

    clonememoTemplate.attr("data-len", wordlen);
    clonememoTemplate.attr("id", key);
    memolist.append(clonememoTemplate);
    clickmemolist = document.getElementById(key).querySelector("textarea");
    clickmemolist.innerText = keyname;
    nowclickmemo = parseInt(key.match(/\d+/)[0]);
    if (wordlen > 45) {
      $(document.getElementById("memolist" + nowclickmemo))
        .find("#new-memo-open")
        .css("display", "block");
    }
    var sphere = BABYLON.MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 2 },
      viewScene
    );
    if (typeof uiposition === "string") {
      console;
      uiposition = JSON.parse(uiposition);
    }
    sphere._absolutePosition._x = uiposition.x;
    sphere._absolutePosition._y = uiposition.y;
    sphere._absolutePosition._z = uiposition.z;
    sphere._position._x = uiposition.x;
    sphere._position._y = uiposition.y;
    sphere._position._z = uiposition.z;
    sphere.position = new BABYLON.Vector3(
      uiposition.x,
      uiposition.y,
      uiposition.z
    );
    var material = new BABYLON.StandardMaterial("material", viewScene);
    material.alpha = 0;
    sphere.material = material;
    //console.log(uiposition);
    makememoinputgui(sphere, nowclickmemo, keyname);
    makememogui(sphere, nowclickmemo);
    //viewScene.getEngine().resize();
  }
  // console.log(getCurrentDate());
  // $(clonememoTemplate).find("#new-memo-control-btn-calender").innerText =
  //   getCurrentDate();
  $(clonememoTemplate)
    .find("#new-memo-morebtn")
    .click(function () {
      $(clonememoTemplate).find("#new-memo-control").css("display", "block");
    });
  $(clonememoTemplate)
    .find("#new-memo-open-btn")
    .on("change", function () {
      if (this.checked) {
        clonememoTemplate
          .find("#new-memo-realwrite")
          .css(
            "height",
            document
              .getElementById("memolist" + nowclickmemo)
              .querySelector("textarea").scrollHeight + "px"
          );
        clonememoTemplate.find("#new-memo-write").css("height", "fit-content");
      } else {
        clonememoTemplate.find("#new-memo-realwrite").css("height", "100%");
        clonememoTemplate.find("#new-memo-write").css("height", "2.5rem");
      }

      // $("#new-memo-write-div").css("display", "block");
      // let parentthis = $(this).parent().parent().attr("id");
      // clickmemolist = document
      //   .getElementById(parentthis)
      //   .querySelector("#new-memo-realwrite");
      // nowclickmemo = parseInt(parentthis.match(/\d+/)[0]);

      // $("#new-memo-write-area").val(clickmemolist.value);
      // $("#new-memo-control").css("display", "none");
    });
  $(clonememoTemplate)
    .find("#new-memo-delete")
    .click(function () {
      $("#model-view-right-memo-delete").css("display", "flex");
      let clickthis = this;
      $("#delete-box-delete").click(function () {
        let parentthis = $(clickthis)
          .parent() // 현재 요소의 부모 요소 선택
          .parent()
          .attr("id"); // 부모 요소의 부모 요소 선택
        $("#" + parentthis).remove();
        nowclickmemo = parseInt(parentthis.match(/\d+/)[0]);

        //localStorage.removeItem(parentthis);
        memoremove();

        let { back, input, icon } = findmemo(advancedTexture5, nowclickmemo);

        if (input && input.parent) {
          input.parent.removeControl(input);
        }
        if (back && back.parent) {
          back.parent.removeControl(back);
        }
        if (icon && icon.parent) {
          icon.parent.removeControl(icon);
        }

        let memolen = $(".new-memo-div").length;
        if (memolen == 0) {
          $("#model-view-right-memo-list-info").css("display", "flex");
          $("#model-view-right-memo-list-background").css("display", "block");
          $("#model-view-right-memo-list").css("justify-content", "center");
          $("#model-view-right-memo-list").css("flex-direction", "row");
        }
        $("#model-view-right-memo-delete").css("display", "none");
      });
      $("#delete-box-cancel").click(function () {
        $("#model-view-right-memo-delete").css("display", "none");
      });
    });
  $(clonememoTemplate).click(function () {
    let elements = document.querySelectorAll(".new-memo-div");
    elements.forEach((element) => {
      element.style.background = "rgba(0, 0, 0, 0.20)"; // 배경색 변경
    });
    this.style.background = "rgba(0, 240, 255, 0.15)";

    let children = advancedTexture5.rootContainer.children.slice();
    let thisclick = parseInt(this.id.match(/\d+/)[0]);
    children.forEach((child) => {
      if (child.name == "memolist_background" + recentclick)
        child._children[0].source = input_demo;
      if (child.name == "memolist_background" + thisclick) {
        child.isVisible = true;
        child._children[0].source = inputclick_demo;
      }
    });
    recentclick = thisclick;
  });
  // $(clonememoTemplate)
  //   .find("#new-memo-realwrite")
  //   .blur(() => {
  //     memosave();
  //     $("[id='new-memo-control']").css("display", "none");
  //   });
}

function memosave(getid) {
  let thisdata = getid == null ? nowclickmemo : getid;

  //저장할 데이터 객체
  // const data = {
  //   memonum: "memolist" + memolistnum,
  //   text: $("#new-memo-write-area").val(),
  // };
  // localStorage.setItem(
  //   $(".modelinfo-view-title-bottom-name").attr("id"),
  //   JSON.stringify(data)
  // );

  // 로컬 스토리지에서 기존 데이터 가져오기
  var existingDataString = localStorage.getItem(
    $(".modelinfo-view-title-bottom-name").attr("id")
  );
  //console.log(existingDataString);

  var existingData = existingDataString ? JSON.parse(existingDataString) : {};
  let position = document.getElementById("memolist" + thisdata).dataset
    .position;
  let wordlen = document.getElementById("memolist" + thisdata).dataset.len;
  // 새로운 데이터 생성
  console.log(wordlen);
  const memolistKey = "memolist" + thisdata;
  const data = {
    name: document
      .getElementById("memolist" + thisdata)
      .querySelector("textarea").value,
    uiposition: position,
    wordlen: wordlen,
  };
  //clickmemolist =
  // 기존 데이터 객체에 새 데이터 추가
  existingData[memolistKey] = data;

  // 수정된 전체 데이터를 로컬 스토리지에 저장
  localStorage.setItem(
    $(".modelinfo-view-title-bottom-name").attr("id"),
    JSON.stringify(existingData)
  );

  $("#new-memo-write-area").val("");
}
function memoopenbtn(thisdata) {
  console.log(document.readyState);
  let contents = document
    .getElementById("memolist" + thisdata)
    .querySelector("textarea");
  // textarea 내용을 줄 바꿈 문자(\n)로 분할하여 줄 수 계산
  console.log(contents);
  const numberOfLines = contents.scrollHeight;
  console.log(contents.scrollHeight);
  if (numberOfLines > 45) {
    $(document.getElementById("memolist" + thisdata))
      .find("#new-memo-open")
      .css("display", "block");
  }
  console.log(document.getElementById("memolist" + thisdata));
  document
    .getElementById("memolist" + thisdata)
    .setAttribute("data-len", numberOfLines);
}
function memoremove() {
  // 로컬 스토리지에서 기존 데이터 가져오기
  var existingDataString = localStorage.getItem(
    $(".modelinfo-view-title-bottom-name").attr("id")
  );
  var existingData = existingDataString ? JSON.parse(existingDataString) : {};

  // 'memolist1' 객체 삭제
  if (existingData.hasOwnProperty("memolist" + nowclickmemo)) {
    delete existingData["memolist" + nowclickmemo];
  }

  // 수정된 전체 데이터를 로컬 스토리지에 다시 저장
  localStorage.setItem(
    $(".modelinfo-view-title-bottom-name").attr("id"),
    JSON.stringify(existingData)
  );
}
function callobjmemo() {
  issetting = true;
  var existingDataString = localStorage.getItem(
    $(".modelinfo-view-title-bottom-name").attr("id")
  );
  if (existingDataString != null && existingDataString != "{}") {
    setmemo();
    $("#model-view-right-memo-list-info").css("display", "none");
    let existingDataStringdata = JSON.parse(existingDataString);
    let lastkey = "";
    for (const key in existingDataStringdata) {
      // 각 memolist의 이름을 출력
      makememo(
        existingDataStringdata[key].uiposition,
        key,
        existingDataStringdata[key].name,
        existingDataStringdata[key].wordlen
      );
      lastkey = key;
    }
    memolistnum = parseInt(lastkey.match(/\d+/)[0]) + 1;
    //memoopenbtn(memolistnum - 1);
  }

  issetting = false;
  $("#model-view-right-memo").css("display", "none");
  memoclickon = false;
  guimemoon(false);
}
