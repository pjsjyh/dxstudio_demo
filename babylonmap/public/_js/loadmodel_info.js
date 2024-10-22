async function loadmodel_info() {
  let returnvalue = await getinfo();
  return returnvalue;
}

async function getinfo() {
  return new Promise((resolve) => {
    getMapData("Model_info", "", function (model_data_) {
      objectlist2 = model_data_.items;
      console.log(objectlist2);
      resolve(model_data_.items);
    });
  });
}
