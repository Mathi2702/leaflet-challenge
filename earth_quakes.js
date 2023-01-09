var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4
  });

//colorscale
  function colorScale(d) { 
    if (d >= 5) { return "#bd0026" } else
    if (d >= 4) { return "#f03b20" } else
    if (d >= 3) { return "#fd8d3c" } else
    if (d >= 2) { return "#feb24c" } else
    if (d >= 1) { return "#fed976" } else
    if (d >= 0) { return "#ffffb2" };
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
            return L.circleMarker(latLng),{
                fillOpacity: 0.75,
                color: "black",
                weight: 1,
                fillColor: colorScale(feature.properties.mag),
                radius: markerSize(feature.properties.mag)
            }
        },
        onEachFeature:(feature,layer)=>{
            layer.bindPopup(feature.properties.place)

        }
    }).addTo(myMap)
  }

  )
  