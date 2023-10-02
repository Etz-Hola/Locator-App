
const url = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCtr3FT0uDFpjx-VisBICLWclTjETC6UTc`
// Function to initialize the Google Map

function initialize() {
    // Latitude and Longitude coordinates for the map center
    var $latitude = 51.51891,
        $longitude = -0.11905;
  
    // URL of the marker icon image
    var $image = '<i class="fa-solid fa-location-dot"></i>';
  
    // Initial zoom level for the map
    var $mapZoom = 14;
  
    // Create a LatLng object with the specified coordinates
    var myLatlng = new google.maps.LatLng($latitude, $longitude);
  
    // Define map options, including zoom level and center
    var mapOptions = {
      zoom: $mapZoom,
      center: myLatlng
    };
  
    // Create a new Google Map instance, specifying the target HTML element and map options
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  
    // Store the marker icon URL in a variable
    var image = $image;
  
    // Create a marker on the map with specified properties
    var marker = new google.maps.Marker({
      position: myLatlng,
      icon: image,
      map: map,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      title: 'Mishcon De Reya'
    });

    console.log(marker);
  
    // Editable string with HTML markup for tooltip content
    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '<h3 id="firstHeading" class="mapHeading">Mishcon de Reya</h3>' +
        '</div>' +
        '<div id="mapContent">' +
        '<p>Summit House,<br />' +
        '12 Red Lion Square</p>' +
        '</div>' +
        '</div>';
  
    // Create an InfoWindow with the specified content
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
  
    // Open the InfoWindow (tooltip) on map load, anchored to the marker
    infowindow.open(map, marker);
  
    // Open the InfoWindow (tooltip) on click on the marker (currently commented out)
    // google.maps.event.addListener(marker, 'click', function() {
    //   infowindow.open(map, marker);
    // });
  }
  
  // Add a DOM event listener to call the 'initialize' function when the window is fully loaded
  google.maps.event.addDomListener(window, 'load', initialize);
  