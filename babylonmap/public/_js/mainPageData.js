// newPage.html에서 LocalStorage에서 데이터를 가져옴
let data = JSON.parse(localStorage.getItem("startdata"));

console.log(data);

function loadData_business() {
  //모델링 생성 (로드)
  noserverJsontoModelData();
}
// 데이터를 사용하거나 처리
let MapColor = true;
$(document).ready(function () {
  if (data.name.includes("영업용")) {
    loadData_business();
  }

  map.setLayoutProperty("google", "visibility", "none");
  map.setLayoutProperty("vworld", "visibility", "none");

  $("#main-veiw-side-mapbtn-mapStyle-3d").click(function () {
    $("#main-veiw-side-mapbtn-mapStyle-general").css(
      "border",
      "1px solid #B6B6B6"
    );
    $("#main-veiw-side-mapbtn-mapStyle-general label").css("color", "#171717");
    $("#main-veiw-side-mapbtn-mapStyle-satellite").css(
      "border",
      "1px solid #B6B6B6"
    );
    $("#main-veiw-side-mapbtn-mapStyle-satellite label").css(
      "color",
      "#171717"
    );

    if (
      map.getLayoutProperty("google", "visibility") == "none" &&
      map.getLayoutProperty("vworld", "visibility") == "none"
    ) {
      //지도색 바꾸기
      MapColor = !MapColor;
      const style = MapColor ? lightJson : darkJson;
      map.setStyle(style);

      if (MapColor) {
        map.setPaintProperty("TN_BULD_3D", "fill-extrusion-color", [
          "match",
          ["get", "id"],
          clickedBuildingIdList, //클릭 된 빌딩 id배열
          otherBULD_color.clickedBD, // 클릭된 빌딩의 색상
          // 다른 빌딩의 색상은 그대로 유지
          [
            "match",
            ["get", "bprp_se"],
            "BDU010",
            otherBULD_color.BDU010,
            "BDU013",
            otherBULD_color.BDU013,
            "BDU016",
            otherBULD_color.BDU016,
            "BDU027",
            otherBULD_color.BDU027,
            "BDU007",
            otherBULD_color.BDU007,
            "BDU009",
            otherBULD_color.BDU009,
            "BDU014",
            otherBULD_color.BDU014,
            "BDU002",
            otherBULD_color.BDU002,
            "BDU001",
            otherBULD_color.BDU001,
            otherBULD_color.default, // 기본 색상
          ],
        ]);
      } else {
        map.setPaintProperty("TN_BULD_3D", "fill-extrusion-color", [
          "match",
          ["get", "id"],
          clickedBuildingIdList, //클릭 된 빌딩 id배열
          otherBULD_color.clickedBD, // 클릭된 빌딩의 색상
          // 다른 빌딩의 색상은 그대로 유지
          [
            "match",
            ["get", "bprp_se"],
            "BDU016",
            "rgb(36,51,82)",
            "BDU007",
            "rgb(254, 60, 120)",
            "BDU014",
            "rgb(78,241, 212)",
            "BDU002",
            "rgb(36,51,82)",
            "BDU001",
            "rgb(51, 92, 255)",
            "rgb(13,18,34)",
          ],
        ]);
      }
    } else {
      map.setLayoutProperty("google", "visibility", "none");
      map.setLayoutProperty("vworld", "visibility", "none");
    }
    $(this).css("border", "1.5px solid #3988E5");
    $("#main-veiw-side-mapbtn-mapStyle-3d label").css("color", "#3988E5");
  });
  $("#main-veiw-side-mapbtn-mapStyle-general").click(function () {
    map.setLayoutProperty("google", "visibility", "none");
    $("#main-veiw-side-mapbtn-mapStyle-3d").css("border", "1px solid #B6B6B6");
    $("#main-veiw-side-mapbtn-mapStyle-3d label").css("color", "#171717");
    $("#main-veiw-side-mapbtn-mapStyle-satellite").css(
      "border",
      "1px solid #B6B6B6"
    );
    $("#main-veiw-side-mapbtn-mapStyle-satellite label").css(
      "color",
      "#171717"
    );

    $(this).css("border", "1.5px solid #3988E5");
    $("#main-veiw-side-mapbtn-mapStyle-general label").css("color", "#3988E5");
    map.setLayoutProperty("vworld", "visibility", "visible");
  });
  $("#main-veiw-side-mapbtn-mapStyle-satellite").click(function () {
    map.setLayoutProperty("vworld", "visibility", "none");
    $("#main-veiw-side-mapbtn-mapStyle-general").css(
      "border",
      "1px solid #B6B6B6"
    );
    $("#main-veiw-side-mapbtn-mapStyle-general label").css("color", "#171717");
    $("#main-veiw-side-mapbtn-mapStyle-3d").css("border", "1px solid #B6B6B6");
    $("#main-veiw-side-mapbtn-mapStyle-3d label").css("color", "#171717");

    $(this).css("border", "1.5px solid #3988E5");
    $("#main-veiw-side-mapbtn-mapStyle-satellite label").css(
      "color",
      "#3988E5"
    );
    map.setLayoutProperty("google", "visibility", "visible");
  });

  if (data != null) {
    $("#top-bar-name").text(data.name);
    geoGetGPS(data.location, function (e, error) {
      if (error == "error") {
        //console.log(data.location.lng)
        map.setCenter([data.location.lng, data.location.lat]);
        center = [data.location.lng, data.location.lat];
        // Calculate mercator coordinates and scale
        console.log(center);
        worldOriginMercator = maplibregl.MercatorCoordinate.fromLngLat(
          center,
          worldAltitude
        );
        worldScale = worldOriginMercator.meterInMercatorCoordinateUnits();

        // Calculate world matrix
        worldMatrix = BABYLON.Matrix.Compose(
          new BABYLON.Vector3(worldScale, worldScale, worldScale), //000000031589
          BABYLON.Quaternion.FromEulerAngles(
            worldRotate[0],
            worldRotate[1],
            worldRotate[2]
          ),
          new BABYLON.Vector3(
            worldOriginMercator.x,
            worldOriginMercator.y,
            worldOriginMercator.z
          )
        );
        map.flyTo({
          center: [data.location.lng, data.location.lat],
          zoom: 18,
          speed: 0.6, // 속도 조절
          curve: 1.5, // 곡선 조절
          easing: function (t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOut 효과
          },
        });
      }
      if (error == null) {
        map.setCenter([e[0], e[1]]);
        center = [e[0], e[1]];
        // Calculate mercator coordinates and scale
        worldOriginMercator = maplibregl.MercatorCoordinate.fromLngLat(
          center,
          worldAltitude
        );
        worldScale = worldOriginMercator.meterInMercatorCoordinateUnits();

        // Calculate world matrix
        worldMatrix = BABYLON.Matrix.Compose(
          new BABYLON.Vector3(worldScale, worldScale, worldScale), //000000031589
          BABYLON.Quaternion.FromEulerAngles(
            worldRotate[0],
            worldRotate[1],
            worldRotate[2]
          ),
          new BABYLON.Vector3(
            worldOriginMercator.x,
            worldOriginMercator.y,
            worldOriginMercator.z
          )
        );
        map.flyTo({
          center: [e[0], e[1]],
          zoom: 18,
          speed: 0.6, // 속도 조절
          curve: 1.5, // 곡선 조절
          easing: function (t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOut 효과
          },
        });
      }
    });

    //맵스타일 변경
    switch (data.mapStyle) {
      case "3d":
        $("#main-veiw-side-mapbtn-mapStyle-3d").css(
          "border",
          "1.5px solid #3988E5"
        );
        $("#main-veiw-side-mapbtn-mapStyle-3d label").css("color", "#3988E5");
        break;
      case "general":
        $("#main-veiw-side-mapbtn-mapStyle-general").css(
          "border",
          "1.5px solid #3988E5"
        );
        $("#main-veiw-side-mapbtn-mapStyle-general label").css(
          "color",
          "#3988E5"
        );
        map.setLayoutProperty("vworld", "visibility", "visible");
        break;
      case "satellite":
        $("#main-veiw-side-mapbtn-mapStyle-satellite").css(
          "border",
          "1.5px solid #3988E5"
        );
        $("#main-veiw-side-mapbtn-mapStyle-satellite label").css(
          "color",
          "#3988E5"
        );
        map.setLayoutProperty("google", "visibility", "visible");
        break;
    }
    //태그 checked
    tagList = data.tag;
    let documentTag = document.querySelectorAll(
      ".categoryBtn-categoryList-categoryDiv input"
    );

    let tagTemplate = document.getElementById("tagLayoutTemplate");
    data.tag.forEach((tags) => {
      documentTag.forEach((inputTag) => {
        if (tags == inputTag.value) {
          inputTag.checked = true;

          let cloneTagTemplate = tagTemplate.content.cloneNode(true);
          cloneTagTemplate.querySelector("label").textContent = inputTag.value;
          document
            .querySelector("#categoryBtn-tagLists")
            .appendChild(cloneTagTemplate);
          //tagLayoutTemplate//categoryBtn-tagLists-tag
        }
      });
    });
  }
});
let tagList = [];
function handleChange(event, import_check = false) {
  let Tagcheckbox = document.querySelector('input[value="' + event + '"]');
  let tagLabelLists = document.querySelectorAll(".categoryBtn-tagLists-tag");
  if (tagList.includes(event)) {
    if (!import_check) {
      //tagList에서 event 값제거
      for (let i = 0; i < tagList.length; i++) {
        if (tagList[i] === event) {
          tagList.splice(i, 1);
          i--;
          //console.log(tagLabelLists);
          //라벨 삭제
          tagLabelLists.forEach((labeltag) => {
            if (labeltag.querySelector("label").textContent == event)
              labeltag.remove();
          });

          Tagcheckbox.checked = false;
        }
      }
    }
  } else {
    tagList.push(event);
    //라벨 생성

    let tagTemplate = document.getElementById("tagLayoutTemplate");
    let cloneTagTemplate = tagTemplate.content.cloneNode(true);
    cloneTagTemplate.querySelector("label").textContent = event;
    document
      .querySelector("#categoryBtn-tagLists")
      .appendChild(cloneTagTemplate);

    Tagcheckbox.checked = true;
  }

  localStorage.setItem("startdata", maintoJson());
}

function ToStart() {
  window.location.href = "index.html";
}

function maintoJson() {
  mapDataJson = {
    id: "1211" + new Date().getTime(),
    name: $("#top-bar-name").text(),
    location: map.getCenter(),
    tag: tagList,
  };
  return JSON.stringify(mapDataJson);
}

function tagDel(event) {
  // 이벤트가 발생한 요소에 접근
  let clickedElement = event.target;

  // 클릭된 요소의 부모 요소에 접근
  let parentDiv = clickedElement.closest(".categoryBtn-tagLists-tag");

  // 부모 요소에서 label 요소를 찾아서 textContent 가져오기
  let labelElement = parentDiv.querySelector("label");
  let labelText = labelElement.textContent;

  // parentDiv.remove();
  let documentTag = document.querySelectorAll(
    ".categoryBtn-categoryList-categoryDiv input"
  );

  documentTag.forEach((inputTag) => {
    if (labelText == inputTag.value) {
      inputTag.checked = false;
      handleChange(labelText);
    }
  });
}
