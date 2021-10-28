const map = (function () {
    let map;
    var geoJSON;
    var gettingData = false;



    function initialize() {
        map = new google.maps.Map(document.getElementById('map-canvas'),{
            zoom: 12,
            center: {lat:50,lng:-56},
            zoomControl: false
        });
    }


    var infowindow = new google.maps.InfoWindow();
    // For each result that comes back, convert the data to geoJSON
    var jsonToGeoJson = function (weatherItem) {
        var feature = {
            type: "Feature",
            properties: {
                city: weatherItem.name,
                weather: weatherItem.weather[0].main,
                temperature: weatherItem.main.temp,
                min: weatherItem.main.temp_min,
                max: weatherItem.main.temp_max,
                humidity: weatherItem.main.humidity,
                pressure: weatherItem.main.pressure,
                windSpeed: weatherItem.wind.speed,
                windDegrees: weatherItem.wind.deg,
                windGust: weatherItem.wind.gust,
                icon: "http://openweathermap.org/img/w/"
                    + weatherItem.weather[0].icon + ".png",
                coordinates: [weatherItem.coord.Lon, weatherItem.coord.Lat]
            },
            geometry: {
                type: "Point",
                coordinates: [weatherItem.coord.Lon, weatherItem.coord.Lat]
            }
        };
        // Set the custom marker icon
        map.data.setStyle(function (feature) {
            return {
                icon: {
                    url: feature.getProperty('icon'),
                    anchor: new google.maps.Point(25, 25)
                }
            };
        });
        // returns object
        return feature;
    };
    // Add the markers to the map
    var drawIcons = function (weather) {
        map.data.addGeoJson(geoJSON);
        // Set the flag to finished
        gettingData = false;
    };
    // Clear data layer and geoJSON
    var resetData = function () {
        geoJSON = {
            type: "FeatureCollection",
            features: []
        };
        map.data.forEach(function (feature) {
            map.data.remove(feature);
        });
    };

    function codeAddress(addr, map) {
        geocoder.geocode({ 'address': addr }, function (results, status) {
            if (status == 'OK') {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }


    function addmarket(info) {
        let markers = [];
        let bounds = new google.maps.LatLngBounds();
        let position = new google.maps.LatLng(info.lat, info.lon);
        markers.push(
            new google.maps.Marker({
                position: position,
                map: map,
                animation: google.maps.Animation.DROP
            })
        );
        bounds.extend(position);
        map.fitBounds(bounds);
        map.setCenter(position);
        map.setZoom(5);
    }

    return {
        initialize: initialize,
        addmarket: addmarket
    }


})();

