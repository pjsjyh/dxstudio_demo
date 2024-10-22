import { parse } from "node-html-parser";
parse = require("node-html-parser");
//const PocketBase = require("pocketbase/cjs");
const pb = new PocketBase("http://192.168.0.55:8090");
console.log(pb);
// const record = await pb.collection('mapJson').getOne('RECORD_ID', {
//     expand: 'relField1,relField2.subRelField',
// });
// console.log(record)
// you can also fetch all records at once via getFullList
const records = await pb.collection("Model_info").getFullList({
  sort: "-created",
});
console.log(records);
