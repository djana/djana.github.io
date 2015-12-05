 function init(){
       // Define the map view and authors original center with 834px width  [46, 25.1]
        var map = L.map('map', {
            center:[46, 24.2], zoom: 7, minZoom: 4, maxZoom: 17, zoomControl: false
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
        var pc_wms = "http://geocarto.ethz.ch/cgi-bin/ro_politicalcolours/qgis_mapserv.fcgi?";
        var dob_wms ="http://geocarto.ethz.ch/cgi-bin/dob_vector/qgis_mapserv.fcgi?";
        var ro_osm_wms = "http://geocarto.ethz.ch/cgi-bin/osm/qgis_mapserv.fcgi?map=ro_osm_20150601.qgs";
        var raster = "http://geocarto.ethz.ch/cgi-bin/ro_raster_data/qgis_mapserv.fcgi?";
        var gov_animal ="http://geocarto.ethz.ch/cgi-bin/gov_animals/qgis_mapserv.fcgi?";
        
        var ro_relief = L.tileLayer.wms(raster,
        {
            layers:"ro_glsdem_relief_shaded",
            format: 'image/png',
            transparent: true,
            version: '1.3.0',
            attribution: '&amp; USGS(2008) for the <a href="http://landcover.org/data/glsdem/">GDSLDEM</a> relief'
        }).setOpacity(0.6);
        
        var pc_population = L.tileLayer.wms(pc_wms,
        {
            layers: 'ro_statistici',
            format: 'image/png',
            transparent: true,
            version: '1.3.0',
            attribution: '&amp; <a href="http://despresate.strainu.ro/">despresate</a>'
        }).setOpacity(0.6);
        
        var pc_primari_2012 = L.tileLayer.wms(pc_wms,
        {
            layers: 'ro_uat_primari_2012',
            format: 'image/png',
            transparent: true,
            version: '1.3.0',
            attribution: '&amp; politicalcolours'
        }).setOpacity(0.5);
        
        var pc_judete_presedinti_2012 = L.tileLayer.wms(pc_wms,
        {
            layers: 'ro_judet_presedinti_cj_2012',
            format: 'image/png',
            transparent: true,
            version: '1.3.0',
            attribution: '&amp; politicalcolours'
        }).setOpacity(0.5);
        
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
        
        var ro_osm_base = L.tileLayer.wms(ro_osm_wms,
        {
            layers: 'ro_osm_landuse_pl,ro_osm_natural_pl,ro_osm_waterway_ln,ro_osm_waterway_pl,ro_osm_natural_pt',
            format: 'image/png',
            transparent:true,
            version:'1.1.1',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors <a href="http://creativecommons.org/licenses(by-sa/2.0/">CC BY-SA</a>'
        }).setOpacity(0.8);
        
        var ro_osm_network = L.tileLayer.wms(ro_osm_wms,
        {
            layers: 'ro_osm_highway_ln,ro_osm_railway_ln',
            format: 'image/png',
            transparent:true,
            version:'1.1.1',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors <a href="http://creativecommons.org/licenses(by-sa/2.0/">CC BY-SA</a>'
        }).setOpacity(0.8);
            
        var ro_osm_amenity = L.tileLayer.wms(ro_osm_wms,
        {
            layers: 'ro_osm_amenity_pt',
            format: 'image/png',
            transparent:true,
            version:'1.1.1',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors <a href="http://creativecommons.org/licenses(by-sa/2.0/">CC BY-SA</a>'
        })<!--.setOpacity(0.8)-->;
            
        var ro_osm_extra = L.tileLayer.wms(ro_osm_wms,
        {
            layers: 'ro_osm_historic_pt,ro_osm_highway_pt,ro_osm_railway_pt',
            format: 'image/png',
            transparent:true,
            version:'1.1.1',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors <a href="http://creativecommons.org/licenses(by-sa/2.0/">CC BY-SA</a>'
        })<!--.setOpacity(0.8)-->;
        
        var ro_gov_animals_counties = L.tileLayer.wms(gov_animal,
        {
            layers:'ro_gov_animals_counties',
            format: 'image/png',
            transparent:true,
            version:'1.1.1',
            attribution: '&copy; <a href="http://data.gov.ro/dataset/numar-bovine-ovine-caprine-porci-pe-localitati-si-gospodarii"> data.gov.ro</a> licensed OGL-ROU-1.0'
            
        }).setOpacity(0.8);
        
       /* ADDITIONAL DATA LAYERS (geojson)*/
       
       // POP DENSITY GRID
        // Define the different classes and the appropriate colors
        function getColor(percentage){
            if (percentage <=1){return "#feebe2"}
            else if (percentage >1 && percentage <=51){return "#fcc5c0"}
            else if (percentage >51 && percentage <=101){return "#fa9fb5"}
            else if (percentage >101 && percentage <=151){return "#f768a1"}
            else if (percentage >151 && percentage <=201){return "#dd3497"}
            else if (percentage >201 && percentage <=1001){return "#ae017e"}
            else if (percentage >1001){return "#7a0177"}
            else {return '#ffffff'}
        }
        // Define the style of the grid
        function styleGrid(feature){
            return {
            fillColor: getColor(feature.properties.TOT_P),
            color: '#ffffff',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
            };
        }
        // function for the popup window
        function popUpGrid(feature,layer){
            layer.bindPopup('Inhabitants per km2:</br><b>' + feature.properties.TOT_P) +'</b>';
            layer.on('onclick', function(e){
        this.openPopup();
         });
        }
        // define the layer
        var pop_density_grid = L.geoJson(pop_density_data,{onEachFeature:popUpGrid,style:styleGrid});
        
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
            radius: 6
            };
        }
        
        // function for the popup window
        function popUpArch(feature,layer){
            layer.bindPopup('<b>' + feature.properties.nume + '</b></br>('+ feature.properties.localitate +', ' + feature.properties.județul + ')');
            layer.on('onclick', function(e){
        this.openPopup();
         });
        }
         // define the layer
        var nat_arch_reg_2013 = L.geoJson(nat_arch_reg_data,{
            onEachFeature:popUpArch,
            style:styleArch,
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng)}});
                
        // NATIONAL MUSEUM REGISTER (data.gov.ro)
        // 5km buffer along the Danube
        
        // Define the style of the pointa
        function styleMus(feature){
            return {
            fillColor: '#1f78b4',
            color: '#a6cee3',
            weight: 0.5,
            opacity: 1,
            fillOpacity: 0.8,
            radius: 6
            };
        }
        
        // function for the popup window
        function popUpMus(feature,layer){
            layer.bindPopup('<b>' + feature.properties.denumirea + '</b></br>('+ feature.properties.localitate +', ' + feature.properties.județul + ')');
            layer.on('onclick', function(e){
        this.openPopup();
         });
        }
         // define the layer
        var museums = L.geoJson(museum_data,{
            onEachFeature:popUpMus,
            style:styleMus,
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng)}});

        
        
        
        
       /* LAYER STACK*/ 
        // and set up the switch for the layer
        var baseMaps =[
            {
                groupName:"Base Maps",
                expanded: true,
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
                groupName:"OSM4RO",
                expanded:false,
                layers:{
                "Base":ro_osm_base,
                "Road & Rail Networks":ro_osm_network,
                "Amenity":ro_osm_amenity,
                "Extra":ro_osm_extra
                    
                }
            },
            {
                groupName:"Political Colours",
                expanded: false,
                layers:{
                "Municipality Mayor 2012":pc_primari_2012,
                "County Council President 2012":pc_judete_presedinti_2012
                    
                }
            },
            {
                groupName: "Statistics",
                expanded:false,
                layers:{
                   "Population Density 2012": pc_population,
                   "Population Density 2014 (grid)": pop_density_grid
                }
            }
            ,
            {
                groupName: "Data.gov.ro",
                expanded:false,
                layers:{
                   "Livestock (heads/sqkm)": ro_gov_animals_counties,
                   "National Archeological Registry - Along the Danube": nat_arch_reg_2013,
                   "Museums – Along the Danube" : museums
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