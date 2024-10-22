function toGPS(babylonPos) {
  let coord = new maplibregl.MercatorCoordinate(
    babylonPos[0] * worldScale + worldOriginMercator.x,
    -babylonPos[1] * worldScale + worldOriginMercator.y,
    0
  );
  //console.log(coord.toLngLat());
  return coord.toLngLat();
}

// {
//   "name": "Aciist0",
//   "transform": {
//     "position": {
//       "x": 127.04672,
//       "y": 0,
//       "z": 37.73835699999998
//     },
//     "rotation": {
//       "x": 0,
//       "y": 0,
//       "z": 0
//     },
//     "scale": {
//       "x": 1,
//       "y": 1,
//       "z": 1
//     }
//   },
//   "explane": ""
// }
