var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });

//colorscale
  function colorScale(colorVal) { 
    if (colorVal >= 5) { return "#bd0026" } else
    if (colorVal >= 4) { return "#f03b20" } else
    if (colorVal >= 3) { return "#fd8d3c" } else
    if (colorVal>= 2) { return "#feb24c" } else
    if (colorVal >= 1) { return "#fed976" } else
    if (colorVal >= 0) { return "#ffffb2" };
  };
  
// marker size 
function markerSize(magValue) {
    return magValue * 3;
};




  // Adding a tile layer (the background map image) to our map:
  // We use the addTo() method to add objects to our map.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then((response)=>{
    console.log(response);
    L.geoJSON(response,{
        //pointToLayer:(feature,latLng)=>L.circleMarker(latLng),
        pointToLayer:(feature,latLng)=>{
            return L.circleMarker((feature,latLng),{
                fillOpacity: 0.75,
                color: "black",
                weight: 1,
                fillColor: colorScale(feature.properties.mag),
                radius: markerSize(feature.properties.mag)
            });
        },
        onEachFeature:(feature,layer)=>{
            layer.bindPopup( "<h4 style='text-align:center;'>" + feature.properties.place +
            "</h4> <hr> <h5 style='text-align:center;'>" + feature.properties.mag + 
            "</h5><hr> <h5 style='text-align:center;'>" + feature.geometry.coordinates+ "</h5>"
            )

        }
    }).addTo(myMap)
  });
  var legend = L.control({ position: 'bottomright' })
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = [0, 1, 2, 3, 4 , 5]
    var labels = []
  
    for (let i = 0; i < limits.length; i++) {
      div.innerHTML +=
      '<i style="background:' + colorScale(limits[i] + 1) + '"></i> ' +
      limits[i] + (limits[i + 1] ? '&ndash;' + limits[i + 1] + '<br>' : '+');
      }
  
  return div;
  };
  legend.addTo(myMap);
