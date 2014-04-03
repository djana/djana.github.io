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
        var pc_wms = "http://geoidea.ethz.ch/cgi-bin/geoidea/nadia/qgis_mapserv.cgi?map=politicalcolours_DB.qgs";
        var dob_wms ="http://geoidea.ethz.ch/cgi-bin/geoidea/nadia/qgis_mapserv.cgi?map=dobrogea_DB4.qgs";
        var ro_osm_wms = "http://geoidea.ethz.ch/cgi-bin/qgis_mapserv.cgi?map=ro_osm_nov20_DB.qgs";
        
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
            layers: 'ro_landuse_pl,ro_natural_pl,ro_building_pl,ro_waterway_ln,ro_highway_ln,ro_railway_ln,ro_natural_pt',
            format: 'image/png',
            transparent:true,
            version:'1.3.0',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors <a href="http://creativecommons.org/licenses(by-sa/2.0/">CC BY-SA</a>'
        })<!--.setOpacity(0.8)-->;
            
        var ro_osm_amenity = L.tileLayer.wms(ro_osm_wms,
        {
            layers: 'ro_amenity_pt',
            format: 'image/png',
            transparent:true,
            version:'1.3.0',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors <a href="http://creativecommons.org/licenses(by-sa/2.0/">CC BY-SA</a>'
        })<!--.setOpacity(0.8)-->;
            
        var ro_osm_extra = L.tileLayer.wms(ro_osm_wms,
        {
            layers: 'ro_historic_pt,ro_highway_pt,ro_railway_pt',
            format: 'image/png',
            transparent:true,
            version:'1.3.0',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors <a href="http://creativecommons.org/licenses(by-sa/2.0/">CC BY-SA</a>'
        })<!--.setOpacity(0.8)-->;
        
        // and set up the switch for the layer
        var baseMaps = {
            "Black and White": osm_BW,
            "OpenStreetMap": osm_plain
            };
        var overlayMaps = {
            "ROSM": ro_osm_base,
            "ROSM amenity": ro_osm_amenity,
            "ROSM extra": ro_osm_extra,
            "Population Density 2012": pc_population,
            "Municipality Mayor 2012": pc_primari_2012,
            "County Council President 2012": pc_judete_presedinti_2012,
            "Dobrogea: Lakes and Rivers": dob_water,
            "Dobrogea: Transport Infrastructure": dob_infra,
            "Dobrogea: Touristic Information": dob_tourism
        };
        
        
        // Add the zoom and layer countrol as well as a scale
        L.control.layers(baseMaps, overlayMaps, {position:'topleft', collapsed: false}).addTo(map);
        L.control.scale().addTo(map);
        L.control.zoom({
            position: 'topright'
        }).addTo(map);
}