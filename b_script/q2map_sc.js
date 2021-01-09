var map = L.map('map', {
    zoomControl: false,
    center:  [51.505, -0.09],
    zoom: 10
    //maxBounds: [[51.19874012418122,-0.7185806464088201],[51.811256074749096,0.5324449330498048]]
    //zoomControl:true, maxZoom:28, minZoom:10,
    
});
// .fitBounds([[51.19874012418122,-0.7185806464088201],[51.811256074749096,0.5324449330498048]]);
//var hash = new L.Hash(map);
map.attributionControl.setPrefix('<a href="https://github.com/tomchadwin/qgis2web" target="_blank">qgis2web</a> &middot; <a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> &middot; <a href="https://qgis.org">QGIS</a>');
var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});

//Zoom and Home control
var zoomHome = L.Control.zoomHome({
    position: 'topleft',
    maxZoom:28, 
    minZoom:10,
    homeCoordinates: [51.505, -0.09]
});
zoomHome.addTo(map)

//OSM Geocoder
var osmGeocoder = new L.Control.Geocoder({
    collapsed: true,
    position: 'topleft',
    text: 'Search',
    title: 'Testing'
}).addTo(map);
document.getElementsByClassName('leaflet-control-geocoder-icon')[0]
.className += ' fa fa-search';
document.getElementsByClassName('leaflet-control-geocoder-icon')[0]
.title += 'Search for a place';



var bounds_group = new L.featureGroup([]);
/*
function setBounds() {
    map.setMaxBounds(map.getBounds());
}
*/

//Basemaps
//Google Satellite 
map.createPane('pane_GoogleSatellite_0');
map.getPane('pane_GoogleSatellite_0').style.zIndex = 400;
var layer_GoogleSatellite_0 = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    pane: 'pane_GoogleSatellite_0',
    opacity: 1.0,
    attribution: '',
    minZoom: 10,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 19
});
layer_GoogleSatellite_0;
//map.addLayer(layer_GoogleSatellite_0);

//CartoDb Positron 
map.createPane('pane_CartoDbPositron_1');
map.getPane('pane_CartoDbPositron_1').style.zIndex = 401;
var layer_CartoDbPositron_1 = L.tileLayer('http://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    pane: 'pane_CartoDbPositron_1',
    opacity: 1.0,
    attribution: '',
    minZoom: 10,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 20
});
layer_CartoDbPositron_1;
//map.addLayer(layer_CartoDbPositron_1);

//Imagery layers as bounds_group
//AirPM2.5
map.createPane('pane_Air_PM25_wgs_al1_2');
map.getPane('pane_Air_PM25_wgs_al1_2').style.zIndex = 402;
var img_Air_PM25_wgs_al1_2 = 'data/Air_PM25_wgs_al1_2.png';
var img_bounds_Air_PM25_wgs_al1_2 = [[51.25557314013935,-0.5446577664794325],[51.72117661557814,0.36497629021999517]];
var layer_Air_PM25_wgs_al1_2 = new L.imageOverlay(img_Air_PM25_wgs_al1_2,
                                      img_bounds_Air_PM25_wgs_al1_2,
                                      {pane: 'pane_Air_PM25_wgs_al1_2'});
bounds_group.addLayer(layer_Air_PM25_wgs_al1_2);
//map.addLayer(layer_Air_PM25_wgs_al1_2);

//Air PM 10
map.createPane('pane_Air_PM10d_wgs_al_3');
map.getPane('pane_Air_PM10d_wgs_al_3').style.zIndex = 403;
var img_Air_PM10d_wgs_al_3 = 'data/Air_PM10d_wgs_al_3.png';
var img_bounds_Air_PM10d_wgs_al_3 = [[51.27776951654121,-0.5247498671053026],[51.700866260127405,0.34845846242718403]];
var layer_Air_PM10d_wgs_al_3 = new L.imageOverlay(img_Air_PM10d_wgs_al_3,
                                      img_bounds_Air_PM10d_wgs_al_3,
                                      {pane: 'pane_Air_PM10d_wgs_al_3'});
bounds_group.addLayer(layer_Air_PM10d_wgs_al_3);
//map.addLayer(layer_Air_PM10d_wgs_al_3);

// Air NO2
map.createPane('pane_Air_NO2_wgs_al1_4');
map.getPane('pane_Air_NO2_wgs_al1_4').style.zIndex = 404;
var img_Air_NO2_wgs_al1_4 = 'data/Air_NO2_wgs_al1_4.png';
var img_bounds_Air_NO2_wgs_al1_4 = [[51.25558200623105,-0.5446233487344916],[51.721085404505004,0.3648312309558732]];
var layer_Air_NO2_wgs_al1_4 = new L.imageOverlay(img_Air_NO2_wgs_al1_4,
                                      img_bounds_Air_NO2_wgs_al1_4,
                                      {pane: 'pane_Air_NO2_wgs_al1_4'});
bounds_group.addLayer(layer_Air_NO2_wgs_al1_4);
//map.addLayer(layer_Air_NO2_wgs_al1_4);

// Flood
map.createPane('pane_Flood_wgs_al1_5');
map.getPane('pane_Flood_wgs_al1_5').style.zIndex = 405;
var img_Flood_wgs_al1_5 = 'data/Flood_wgs_al1_5.png';
var img_bounds_Flood_wgs_al1_5 = [[51.25501888134042,-0.5446321582815484],[51.72136857917683,0.3791468113497283]];
var layer_Flood_wgs_al1_5 = new L.imageOverlay(img_Flood_wgs_al1_5,
                                      img_bounds_Flood_wgs_al1_5,
                                      {pane: 'pane_Flood_wgs_al1_5'});
bounds_group.addLayer(layer_Flood_wgs_al1_5);
//map.addLayer(layer_Flood_wgs_al1_5);

//Noise
map.createPane('pane_Noise_wgs_clip_6');
map.getPane('pane_Noise_wgs_clip_6').style.zIndex = 407;
var img_Noise_wgs_clip_6 = 'data/Noise_wgs_clip_6.png';
var img_bounds_Noise_wgs_clip_6 = [[51.25491710190564,-0.544919259209632],[51.72137781576689,0.3792527121742789]];
var layer_Noise_wgs_clip_6 = new L.imageOverlay(img_Noise_wgs_clip_6,
                                      img_bounds_Noise_wgs_clip_6,
                                      {pane: 'pane_Noise_wgs_clip_6'});
bounds_group.addLayer(layer_Noise_wgs_clip_6);
//map.addLayer(layer_Noise_wgs_clip_6);

//Heat
map.createPane('pane_Heat_wgs_al_7');
map.getPane('pane_Heat_wgs_al_7').style.zIndex = 406;
var img_Heat_wgs_al_7 = 'data/Heat_wgs_al_7.png';
var img_bounds_Heat_wgs_al_7 = [[51.25501092822816,-0.5446577664794325],[51.72139921358159,0.3791696717090836]];
var layer_Heat_wgs_al_7 = new L.imageOverlay(img_Heat_wgs_al_7,
                                      img_bounds_Heat_wgs_al_7,
                                      {pane: 'pane_Heat_wgs_al_7'});
bounds_group.addLayer(layer_Heat_wgs_al_7);
//map.addLayer(layer_Heat_wgs_al_7);

var baseLayers = {
    "Basemap Grey": layer_CartoDbPositron_1,
    "Basemap Satellite": layer_GoogleSatellite_0
};

var overLayers = {
    "Air - PM2.5": layer_Air_PM25_wgs_al1_2,
    "Air - PM10": layer_Air_PM10d_wgs_al_3,
    "Air - NO2": layer_Air_NO2_wgs_al1_4,
    "Flood": layer_Flood_wgs_al1_5,
    "Heat": layer_Heat_wgs_al_7,
    "Noise": layer_Noise_wgs_clip_6
};

//just adding layer controler on map 
//var allLayers = L.control.layers(, overLayers).addTo(map);
var allLayers = L.control.layers(baseLayers, overLayers, {collapsed:false}).addTo(map);
layer_CartoDbPositron_1.addTo(map)
bounds_group.addTo(map)
