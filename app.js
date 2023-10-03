const searchBtn = document.getElementById("search-btn");
let input = document.getElementById("inputWord");
const APIKey = `9ZCMwttKHzJ74DQOD30pF32gC7fLLmspWroXFyayETo`;

//To make ENTER button function with input field
input.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    searchBtn.click();
  }
});

// To initialize first map load 
function addMarkersToMap(map) {
  map.setCenter({ lat: 7.4749, lng: 3.91371 });
  map.setZoom(10);
}


  /**
  * Boilerplate map initialization code starts below:
  */
//Step 1: initialize communication with the platform
let platform = new H.service.Platform({
  apikey: APIKey,
});

let defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map 
let map = new H.Map(
  document.getElementById("map"),
  defaultLayers.vector.normal.map,
  {
    center: { lat: 7.4749, lng: 3.91371 },
    zoom: 7,
    pixelRatio: window.devicePixelRatio || 1,
  }
);

// add a resize listener to make sure that the map occupies the whole container
window.addEventListener("resize", () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// // Create the default UI components
let ui = H.ui.UI.createDefault(map, defaultLayers);
// Now use the map as required...
window.onload = function () {
  addMarkersToMap(map);
};


//
//
//SEARCH BTN TRIGGER ACTION
searchBtn.addEventListener("click", () => {
  let map1 = document.getElementById("map");
  let inputWord = document.getElementById("inputWord").value.trim();

  fetch(
    `https://geocode.search.hereapi.com/v1/geocode?q=${inputWord}&limit=4&apiKey=${APIKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // console.log(data.items[0]);
      // console.log(data.items[0].position);
      let longitude = parseFloat(data.items[0].position.lng);
      let latitude = parseFloat(data.items[0].position.lat);

      function addMarkersToMap(map) {
        let marker = new H.map.Marker({
          lat: `${latitude}`,
          lng: `${longitude}`,
        });
        map.addObject(marker);
      }

      //Step 1: initialize communication with the platform
      let platform = new H.service.Platform({
        apikey: APIKey,
      });

      let defaultLayers = platform.createDefaultLayers();
      map1.innerHTML = ``;
      //Step 2: initialize a map 
      let map = new H.Map(
        document.getElementById("map"),
        defaultLayers.vector.normal.map,
        {
          center: { lat: `${latitude}`, lng: `${longitude}` },
          zoom: 9,
          pixelRatio: window.devicePixelRatio || 1,
        }
      );

      // add a resize listener to make sure that the map occupies the whole container
      window.addEventListener("resize", () => map.getViewPort().resize());

      //Step 3: make the map interactive
      // MapEvents enables the event system
      // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
      let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // // Create the default UI components
      let ui = H.ui.UI.createDefault(map, defaultLayers);

      // Now use the map as required...
      addMarkersToMap(map);
    });
});
