function createobject(name, _customname) {
  const objectKeys = Object.keys(objectlist);
  const length = objectKeys.length;
  for (let i = 1; i <= length; i++) {
    if (name === objectlist[i].name) {
      createobj(objectlist[i].name, i.toString(), _customname);
      break;
    }
  }
}
