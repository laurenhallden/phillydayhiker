$('#full-screen').click(function() {
  toggleFullScreen();
});

function toggleFullScreen() {
  // if the window isn't already fullscreen...do that
  if ($(mapDiv).hasClass('made-full')) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    $(mapDiv).removeClass('made-full');
    makeSmaller();
  } else {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
    $(mapDiv).addClass('made-full');
    makeBigger();
  }
}

function makeBigger() {
  mapDiv.style.zIndex = '7';
  mapCanvas.style.height = '100vh';
  mapDiv.style.height = '100vh';
  $(mapDiv).addClass('fullscreen-map');
  map.resize();
  // and enable zooms
  map.scrollZoom.enable();
  // and change the fullscreen button
  $('#full-screen').addClass('full');
}

function makeSmaller() {
  // Make the map smaller
  $(mapDiv).removeClass('fullscreen-map');
  mapDiv.style.zIndex = '0';
  if($('.map').hasClass('destination-map')) {
    mapDiv.style.height = '60vh';
    map.scrollZoom.disable();
  }
  else {
    mapDiv.style.height = 'calc(100vh - 80px)';
  }
  map.resize();
  // and change the fullscreen button back
  $('#full-screen').removeClass('full');
}

// add a listener in, in case user hits escape instead of
// using the button with toggle functionality

var changeHandler = function(){                        

if (!document.fullscreenElement &&
    !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    makeSmaller();
  }
  else {
    makeBigger();
  }
}

document.addEventListener("fullscreenchange", changeHandler, false);      
document.addEventListener("webkitfullscreenchange", changeHandler, false);
document.addEventListener("mozfullscreenchange", changeHandler, false);
document.addEventListener("msfullscreenchange", changeHandler, false);