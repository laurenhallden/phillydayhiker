// Satellite button: 
$('#satellite').click(function() {
  if($(mapDiv).hasClass('satellite')) {
    if($(mapDiv).hasClass('kayak-map')) {
      map.setStyle('mapbox://styles/laurenhallden/cjj75lusm22ys2ss85jxbh0tw');
    }
    else {
      map.setStyle('mapbox://styles/laurenhallden/civxwk4jt006g2klkep3qszns');
    }
    $('#satellite').removeClass('satellite');
    $(mapDiv).removeClass('satellite');
  }
  else {
    if($(mapDiv).hasClass('kayak-map')) {
      map.setStyle('mapbox://styles/laurenhallden/cjkffbdvo0qvs2rnk5clhtrq3');
    }
    else {
      map.setStyle('mapbox://styles/laurenhallden/cix4vwkdv001v2roaioxatdrf');
    }
    $('#satellite').addClass('satellite');
    $(mapDiv).addClass('satellite');

    // Add the geolocate point back in
    map.on('style.load', function () {
      map.addSource('single-point', {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": []
        }
      });
      map.addLayer({
        "id": "point",
        "source": "single-point",
        "type": "circle",
        "paint": {
          "circle-radius": 6,
          "circle-color": "#77d1ed"
        }
      });
    });
  }
});