// create map
let map = L.map("map", {
    center: [38.89082117646586, -121.23871184941792],
    zoom: 8
});

let basemap= L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attirbution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
basemap.addTo(map);

//Retrieve data
let link = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
d3.json(link).then(function(data){

    function markerColor(depth) {
        if (depth > 90) {
            return "#800000"
        } else if (depth >70) {
            return "#C62828"
        } else if (depth > 50) {
            return "#FF7F50"
        } else if (depth > 30) {
            return "#FFCBA4"
        } else if (depth > 10){
            return "#FFE5B4"
        } else {
            return "#FFFFCC"
        }
    };

    function markerRadius(magnitude) {
        if (magnitude == 0){
            return 1;
        }
        return 4 * magnitude
    }

    function styleInfo(feature) {
        return {
            fillOpacity: 0.9,
            color: markerColor(feature.geometry.coordinates[2]),
            radius:markerRadius(feature.properties.mag)
        }
    }
    
    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                "Magnitude: " + feature.properties.mag +
                "<br>Depth: " + feature.geometry.coordinates[2] +
                "<br>Location: " + feature.properties.place
            );
        }
    }).addTo(map)
})

//create legend
//var legend = L.control ({position: 'bottomright'});
//legend.onAdd = function (map) {
//    var div = L.DomUtil.create('div', 'info legend'),
//    grades = [-10, 10, 30, 50, 70, 90],
//    colors = ['#FFFFCC', '#FFE5B4', '#FFCBA4', '#FF7F50', '#C62828', '#800000'];
//
//    for (var i=0; i < grades.length; i++) {
//        div.innerHTML +=
//       '<i style="background: ' + colors[i] +'"></i> ' +
//        grades[i] + (grades[i+1] + '<br> ' : '+');
//    }
//    return div;
//}
//legend.addTo(map);