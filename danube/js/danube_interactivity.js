 function init(){
       // Define the map view and authors original center with 834px width  [46, 25.1]
        var map = L.map('map', {
            center:[44.5, 25], zoom: 7, minZoom: 4, maxZoom: 15, zoomControl: false
        });
        map.attributionControl.setPrefix('N. Panchaud');

        
        // Set up layers, add the default to the map
        var osm_BW = L.tileLayer('http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        }).addTo(map);
        
        var osm_plain = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors <a href="http://creativecommons.org/licenses(by-sa/2.0/">CC BY-SA</a>'
        });
        
        // Add WMS Layers from GEOIDEA
        
        var dob_wms ="http://geocarto.ethz.ch/cgi-bin/dob_vector/qgis_mapserv.fcgi?";
        var ro_osm_wms = "http://geocarto.ethz.ch/cgi-bin/osm/qgis_mapserv.fcgi?map=ro_osm_20150601.qgs";
        var raster = "http://geocarto.ethz.ch/cgi-bin/ro_raster_data/qgis_mapserv.fcgi?";
        
        
        var ro_relief = L.tileLayer.wms(raster,
        {
            layers:"ro_glsdem_relief_shaded",
            format: 'image/png',
            transparent: true,
            version: '1.3.0',
            attribution: '&amp; USGS(2008) for the <a href="http://landcover.org/data/glsdem/">GDSLDEM</a> relief'
        }).setOpacity(0.6);
        
        var dob_infra = L.tileLayer.wms(dob_wms,
        {
            layers: 'dob_roads,dob_roads_ukraine,dob_railways',
            format: 'image/png',
            transparent: true,
            version: '1.3.0',
            attribution: '&amp; Faculty of Geography, University of Bucharest'
          }).setOpacity(0.7);
          
        var dob_water = L.tileLayer.wms(dob_wms,
        {
            layers: 'dob_lakes,dob_lakes_ukraine,dob_river_perm,dob_river_temp,dob_canal_dbs,dob_water',
            format: 'image/png',
            transparent: true,
            version: '1.3.0',
            attribution: '&amp; Faculty of Geography, University of Bucharest'
          }).setOpacity(0.7);
          
          var dob_tourism = L.tileLayer.wms(dob_wms,
        {
            layers: 'dob_reserves,dob_parks,dob_panorama,dob_poi_tourism,dob_lighthouse',
            format: 'image/png',
            transparent: true,
            version: '1.3.0',
            attribution: '&amp; Faculty of Geography, University of Bucharest'
          }).setOpacity(0.7);
           
       /* ADDITIONAL DATA LAYERS (geojson)*/
       
        // NATIONAL ARCHEOLOGICAL REGISTER (data.gov.ro)
        // 5km buffer along the Danube
        
        // Define the style of the pointa
        function styleArch(feature){
            return {
            fillColor: '#2ca25f',
            color: '#e5f5f9',
            weight: 0.5,
            opacity: 1,
            fillOpacity: 0.8,
            radius: 7
            };
        }
        
        // function for the popup window
        function popUpArch(feature,layer){
            layer.bindPopup('<b>' + feature.properties.nume + '</b></br>('+ feature.properties.localitate +', ' + feature.properties.județul + ')</br>' + feature.properties.perioada);
            layer.on('onclick', function(e){
        this.openPopup();
         });
        }
         // define the layer
        /*var nat_arch_reg_2013 = L.geoJson(nat_arch_reg_data,{
            onEachFeature:popUpArch,
            style:styleArch,
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng)}}).addTo(map);
                */
        //loading the geojson using a js file for the power plant - CLUSTER
        // icon for the single markers
    var cityIcon = L.icon({
        iconUrl: 'icon/flash.png',
        iconSize:    [20, 20],
        iconAnchor:  [0, 0]
        });

    var markers_archeo = new L.MarkerClusterGroup({
        showCoverageOnHover: false,
        maxClusterRadius:25
        });
    markers_archeo.addLayer(L.geoJson(nat_arch_reg_data,{
        onEachFeature: popUpArch,
        style:styleArch,
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng)}
     }));
    map.addLayer(markers_archeo);
                
                
                
                
                
                
                
        // NATIONAL MUSEUM REGISTER (data.gov.ro)
        // 5km buffer along the Danube
        
        // Define the style of the points
        function styleMus(feature){
            return {
            fillColor: '#1f78b4',
            color: '#a6cee3',
            weight: 0.5,
            opacity: 1,
            fillOpacity: 0.8,
            radius: 7
            };
        }
        
        // function for the popup window
        function popUpMus(feature,layer){
            layer.bindPopup('<b>' + feature.properties.denumirea + '</b></br>('+ feature.properties.localitate +', ' + feature.properties.județul + ')</br></br>'+ feature.properties.descrierea);
            layer.on('onclick', function(e){
        this.openPopup();
         });
        }
         // define the layer
        var museums = L.geoJson(museum_data,{
            onEachFeature:popUpMus,
            style:styleMus,
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng)}}).addTo(map);
                
                

        
        /*LEGEND*/
        // Define the legend element of the choropleth layer
        var legend = L.control({position: 'bottomright'});
        legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
         div.innerHTML += '<h4>Points of Interest</h4><p><small>within 5km of the Danube</small></p>';
         div.innerHTML += '<div class=circle  id="archeo"></div><p>National Archeological Site</p>';
         div.innerHTML += '<div class=circle id="museum"></div><p>Museum</p>';
         div.innerHTML += '<small> from the Institutul Național al Patrimoniului, licensed under <a href="http://data.gov.ro/base/images/logoinst/OGL-ROU-1.0.pdf" target="_blank">OGL-ROU-1.0</a></small>'; 
        return div;
        };
        legend.addTo(map);
        
        
        
       /* LAYER STACK*/ 
        // and set up the switch for the layer
        var baseMaps =[
            {
                groupName:"Base Maps",
                expanded: false,
                layers:{
                    "Black & White":osm_BW,
                    "Classic OSM": osm_plain,
                    "Relief": ro_relief
                }
            }
            
        ];
        var overlayMaps = [
            {
                groupName: "Dobrogea",
                expanded:false,
                layers:{
                "Hydrography": dob_water,
                "Road & Rail networks": dob_infra,
                "Touristic PoI": dob_tourism
                    
                }
            },
            {
                groupName: "Data.gov.ro",
                expanded:true,
                layers:{
                   "Museums – Along the Danube" : museums,
                   "National Archeological Registry - Along the Danube": markers_archeo //nat_arch_reg_2013,
                   
                }
            }
        ]; 
        
        
        var options ={
            container_width: "250px",
            container_maxHeight : "550px", 
            group_maxHeight     : "80px",
            exclusive           : false,
            position: "topleft",
            collapsed: false
        };
        
        // Add the zoom and layer countrol as well as a scale
        L.Control.styledLayerControl(baseMaps, overlayMaps, options).addTo(map);
        L.control.scale().addTo(map);
        L.control.zoom({
            position: 'topright'
        }).addTo(map);
}