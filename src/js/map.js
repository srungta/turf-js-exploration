var map = null;
var space_geoJSON = null;

function renderMap() {
    if (space_geoJSON) {
        //Generate map object
        map = L.map("map", {
            minZoom: 1,
            maxZoom: 6,
            crs: L.CRS.Simple,
            center: [0, 0],
            zoom: 1,
            zoomSnap: 0.7,
            zoomDelta: 0.7,
            wheelPxPerZoomLevel: 120,
            wheelDebounceTime: 40,
            preferCanvas: true,
            attributionControl: false,
            zoomControl: false,
            maxBoundsViscosity: 1.0,
            fadeAnimation: true,
            zoomAnimation: true,
            renderer: L.canvas({
                padding: 1.5
            })
        });
        //Add zoom controls
        L.control.zoom({
            position: "bottomright"
        }).addTo(map);
        //Color all rooms gray by default
        var defaultRoomStyle = {
            "color": "#636363",
            "weight": 1,
            "opacity": 0,
            "fillOpacity": 0.5
        };
        //Add GeoJSON
        L.geoJson(space_geoJSON, {
            style: defaultRoomStyle,
            coordsToLatLng: function (newcoords) {
                var x = newcoords[0];
                var y = newcoords[1];
                if (newcoords[0] < 0) {
                    x = -newcoords[0];
                }
                if (newcoords[1] < 0) {
                    y = -newcoords[1];
                }
                return (map.unproject([x, y], map.getMaxZoom() - 1));
            },
            onEachFeature: function (feature, layer) {
            },
        }).addTo(map);
    } else {
        console.log("Space Geo Json is not available.");
    }
}

function clearMap() {
    map.remove();
    map = null;
}

//Bind click event to button
$("#button").click(function () {
    //Remove existing map
    clearMap();
    //Re-render map
    renderMap();
    //Color polygons with random color
    var hex = Math.floor(Math.random() * 900000) + 100000;
    for (var index in map._layers) {
        if (map._layers.hasOwnProperty(index) && map._layers[index]) {
            var layer = map._layers[index];
            if (layer.feature && layer.feature.properties.spaceid) {
                map._layers[index].setStyle({
                    fillColor: "#" + hex
                });
            }
        }
    }
});