function nameSort_main(reverseCheck) {
  //이름기준 정렬

  let listtop_main = $("#new-obj-box-list");
  let contents_main = $(".new-obj-box-selectBox");

  let contentsArray_main = contents_main
    .toArray()
    .map(function (content_main, index) {
      return {
        element: content_main,
        title: $(content_main).find(".new-obj-box-selectBox-model-name").text(),
        originalIndex: index, // 원래의 인덱스 저장
      };
    });

  contentsArray_main.sort(function (a, b) {
    if (a.title !== b.title) {
      return a.title.localeCompare(b.title);
    }
  });
  if (reverseCheck) {
    contentsArray_main.sort(function (a, b) {
      return b.title.localeCompare(a.title); // 이름을 기준으로 역순 정렬
    });
  }

  let parent_main = $("#new-obj-box-list");
  parent_main.empty();
  parent_main.append(listtop_main);
  contentsArray_main.forEach(function (content_main) {
    parent_main.append(content_main.element);
  });
}
