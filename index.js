let mapSettings = {
    crs: L.CRS.Simple,
    minZoom: -2,
    maxZoom: 3,
    zoomDelta: 0.5,
    zoomSnap: 0,
}

let map = L.map('map', mapSettings);
let bounds = [[0, 0], [1000, 1000]];
let image = L.imageOverlay('resources/wzmap.jpg', bounds).addTo(map);

map.fitBounds(bounds);

// If mobile set custom view
// map.setView([500, 500], -1.4); //set view to center around the surface layer

let popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);

fetch('./resources/spawns.json')
    .then((response) => response.json())
    .then((spawns) => {
        for (let spawn of spawns) {
            L.marker(L.latLng(spawn.coords)).addTo(map);
        }
    });
