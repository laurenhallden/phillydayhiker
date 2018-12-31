// Show the progress bar on page load
NProgress.start();    

// Set random interval
var interval = setInterval(function() { NProgress.inc(); }, 1000); 

// Trigger finish when page fully loaded
jQuery(window).load(function () {
    clearInterval(interval);
    NProgress.done();
});

// Show the progress bar on geolocate
function locatingProgress() {
	NProgress.start();
}

// Trigger finish when located
function stopProgress() {
	NProgress.done();
	clearInterval(interval);
}