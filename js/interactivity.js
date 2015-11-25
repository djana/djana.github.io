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
            layers: 'ro_osm_landuse_pl,ro_osm_natural_pl,ro_osm_building_pl,ro_osm_waterway_ln,ro_osm_highway_ln,ro_osm_railway_ln,ro_osm_natural_pt',
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
                "Road & Rail networks": dob_infra,
                "Hydrography": dob_water,
                "Touristic PoI": dob_tourism
                    
                }
            },
            {
                groupName:"OSM4RO",
                expanded:false,
                layers:{
                "Base":ro_osm_base,
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
                   "Population Density 2012": pc_population
                }
            }
            ,
            {
                groupName: "Data.gov.ro",
                expanded:false,
                layers:{
                   "Livestock (heads/sqkm)": ro_gov_animals_counties
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