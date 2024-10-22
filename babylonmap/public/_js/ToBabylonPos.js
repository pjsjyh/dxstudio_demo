function ToBabylonPos(mercatPos) {  //2
  return new BABYLON.Vector3(
    (mercatPos.x - worldOriginMercator.x) / worldScale,
    0,
    -(mercatPos.y - worldOriginMercator.y) / worldScale
  );
}

function GetMercatorPos(_GPS) { //1
  let getModelOrigin = [_GPS[0], _GPS[1]];
  let modelAltitude = 0;
  let MercatorPosition = maplibregl.MercatorCoordinate.fromLngLat(
    getModelOrigin,
    modelAltitude
  );
  return MercatorPosition;
}
