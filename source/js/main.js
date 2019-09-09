var destinationsPage = $(".destination-map").length;

// Slide the header sections open and closesd
$(".nav-item-slide").click(function() {
	$(this).children("i").toggleClass("fa-rotate-180 scoot");
	if (this.id === "destinations") {
		if ($(".about-pdh").hasClass("open")) {
			$("#about").children("i").toggleClass("fa-rotate-180 scoot");
			$(".about-pdh").slideToggle("slow", function() {
				$(".view-destinations").slideToggle("slow");
				$(".about-pdh").removeClass("open");
			});
		}
		else {
			$(".view-destinations").slideToggle("slow");
		}
		$(".view-destinations").toggleClass("open");
	} else if (this.id === "about") {
		if ($(".view-destinations").hasClass("open")) {
			$("#destinations").children("i").toggleClass("fa-rotate-180 scoot");
			$(".view-destinations").slideToggle("slow", function() {
				$(".about-pdh").slideToggle("slow");
				$(".view-destinations").removeClass("open");
			});
		}
		else {
			$(".about-pdh").slideToggle("slow");
		}
		$(".about-pdh").toggleClass("open");
	}
	else {
		return;
	}
	if (destinationsPage < 1) {
		setZoom();
	}
});


// Search box animations
$(".search").click(function() {
	$(".search-box").toggleClass("showMe");
	if ($(".search-box").hasClass("showMe")) {
		$(".search-box").show();
		$(".search-box").animate({ width: "275px" }, 300 );
	}

	else {
		$(".search-box").animate({ width: "0" }, 300, function() {
			$(".search-box").hide();
		});
	}
});


// Mobile dropdowns
$("#tip-mobile").click(function() {
	$(".dropdown.open").removeClass("open");
	$(".submit-tip").toggle();
});

$(".dropdown").click(function() {
	$(".submit-tip").hide();
});

$(".dropdown.open").removeClass("open");


// Dismiss info bar
$(".info-bar .close").click(function() {
	$(".info-bar").hide();
});


// Freeze the map when nav menus are open
function setZoom() {
	if ($(".about-pdh").hasClass("open") || $(".view-destinations").hasClass("open")) {
		map.scrollZoom.disable();
		$(".leaflet-container").addClass("scrollFrozen");
	}

	else {
		map.scrollZoom.enable();
		$(".leaflet-container").removeClass("scrollFrozen");
	}
}

$(".navbar-toggle").click(function() {
	if (!$(".navbar-collapse").hasClass("in")) {
		map.scrollZoom.disable();
		map.dragPan.disable();
		map.touchZoomRotate.disable();
		$(".leaflet-container").addClass("scrollFrozen");
	}
	else {
		map.scrollZoom.enable();
		map.dragPan.enable();
		map.touchZoomRotate.enable();
		$(".leaflet-container").removeClass("scrollFrozen");
	}
});


// Fade in gallery image sequentially
if (destinationsPage > 0) {
	$(window).scroll(function() {
		var galleryTop = $('.gallery-container').offset().top;
		var scrollDistance = $(window).scrollTop();
		var trigger = (galleryTop - scrollDistance);
		if (trigger < 500) {
			$(".image-container").each(function(i) {
		 		$(this).delay(i*200).animate({opacity:1},600);
			});
			$(window).unbind('scroll');
		}
	});
};


// Make a few tweaks to the cognito form elements for better UX
$( document ).ready(function() {
	setTimeout(placeholders, 5000);
});

function placeholders() {
	$('.c-upload-button').html("Upload pictures <input type='file' name='file' multiple='' tabindex='-1'>");
}


// ********************
//  The function for filtering destinations
// ********************

// Eachtime a filter checkbox is clicked...
$('.filter-input').click(function() {

	// ...we first make an array, to hold our checkbox selections
	var filterArr = [];

	// Go through all the checkboxes...
	$('.filter-input').each(function() {

		// ...and see which ones are selected
		if (this.checked) {
			var id = $(this).attr('id');
			if (id === 'has_easy_trails') {
				filterArr.push("has_easy_trails");
			}
			else if (id === 'has_difficult_trails') {
				filterArr.push("has_difficult_trails");
			}
			else if (id === 'more_amenities') {
				filterArr.push("more_amenities");
			}
			else if (id === 'more_natural') {
				filterArr.push("more_natural");
			}
			else if (id === 'dogs') {
				filterArr.push("dogs");
			}
			else if (id === 'boats') {
				filterArr.push("boats");
			}
			else if (id === 'transit') {
				filterArr.push("transit");
			}
		};
	});

	// Let's make sure this array isn't empty, for later.
	if (filterArr.length > 0) {
		var empty = false;
	}
	else {
		var empty = true;
	}

	// Now, let's see what properties each destinations has marked as 'true', so we can compare

	// For each destination...
	for( var i = 0; i < myDestinations.length; i++ ) {
		// ...make an object of the following properties that are marked 'true' in our CMS
		var destinationProps = {};
		if (myDestinations[i].has_easy_trails === "true") {
			destinationProps.has_easy_trails = true;
		}
		if (myDestinations[i].has_difficult_trails === "true") {
			destinationProps.has_difficult_trails = true;
		}
		if (myDestinations[i].more_amenities === "true") {
			destinationProps.more_amenities = true;
		}
		if (myDestinations[i].more_natural === "true") {
			destinationProps.more_natural = true;
		}
		if (myDestinations[i].dogs === "true") {
			destinationProps.dogs = true;
		}
		if (myDestinations[i].boats === "true") {
			destinationProps.boats = true;
		}
		if (myDestinations[i].transit) {
			destinationProps.transit = true;
		}

		// Grab the url of the current Destination, for later
		var slug = myDestinations[i].slug;

		// If there are things to filter by...
		if (empty === false) {

			// ...check to see if the current Destination 'True' Object has each item in the filter array
			var hasAllKeys = filterArr.every(function(item){
			  return destinationProps.hasOwnProperty(item);
			});
			if (hasAllKeys === false) {
				// If not, we hide the item! Using its url
				$(".navigation-list li>a[href*='" + slug + "']").parent().hide();
			}
			else {
				// Otherwise, we show it.
				$(".navigation-list li>a[href*='" + slug + "']").parent().show();
			}
		} else {
			// if there are no filters curerntly selected, show everything
			$(".navigation-list li>a[href*='" + slug + "']").parent().show();
		}
	};
});

