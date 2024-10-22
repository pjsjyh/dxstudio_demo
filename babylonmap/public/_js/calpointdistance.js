function addcalpointdistancelayer() {
  this.map.on("load", () => {
    map.addSource("geojson", {
      type: "geojson",
      data: geojson,
    });

    // Add styles to the map
    this.map.addLayer({
      id: "measure-points",
      type: "circle",
      source: "geojson",
      paint: {
        "circle-radius": 5,
        "circle-color": "#000",
      },
      filter: ["in", "$type", "Point"],
    });
    this.map.addLayer({
      id: "measure-lines",
      type: "line",
      source: "geojson",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#000",
        "line-width": 2.5,
      },
      filter: ["in", "$type", "LineString"],
    });
  });
}
