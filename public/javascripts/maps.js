const markers = [];
const iconBase = "/images/cruz.png";
const iconParishioner = "/images/jesus.png";
//Si queremos dibujar rutas entre dos pines, debemos instanciar DirectionService y DirectionRendererobjetos
const directionsService = new google.maps.DirectionsService();
const directionsDisplay = new google.maps.DirectionsRenderer();
//Declaramos bounds para posteriormente meter las coordenadas de los templos y haga zoom necesario para ajustar pantalla
const bounds = new google.maps.LatLngBounds();

function templeMarks() {
  //Definimos inicio de donde apunta el mapa
  const centerMap = {
    lat: 40.438458,
    lng: -3.685211
  };

  //Indicamos que apunte donde habíamos definido
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: centerMap
  });

  let center = {
    lat: undefined,
    lng: undefined
  };

  // get all the temples coordinates of its card
  function getTemples() {
    const templesCards = [...document.querySelectorAll(".temple-card-info")];
    const templesData = templesCards.map(t => ({
      name: t.attributes["data-temple-name"].value,
      url: t.attributes["data-url"].value,
      location: {
        latitude: Number(t.attributes["data-temple-latitude"].value),
        longitude: Number(t.attributes["data-temple-longitude"].value)
      }
    }));
    placeTemples(templesData);
  }

  //Representamos los marcadores
  function placeTemples(temples) {
    temples.forEach(function(temple) {
      //Pop Up de cada marcador para ver información de cada templo
      let nameToLC = temple.name.toUpperCase();
      let contentString = `<div id="content">
            <div id="siteNotice">
            </div>
            <h6 id="firstHeading" class="firstHeading text-left">${nameToLC}</h6>
            <div id="bodyContent">
                <a href="${temple.url}">Ir al templo</a>
            </div>
        </div>`;
      let infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      const center = {
        lat: temple.location.latitude,
        lng: temple.location.longitude
      };

      //declaramos variable para meter coordenadas de cada templo que se va a marcar en el mapa, para después pasarselo como parametro y ajuste el mapa
      let loc = new google.maps.LatLng(center.lat, center.lng);

      const pin = new google.maps.Marker({
        position: center,
        map: map,
        animation: google.maps.Animation.DROP,
        title: temple.name,
        icon: iconBase
      });
      pin.addListener("click", function() {
        infowindow.open(map, pin);
      });
      markers.push(pin);
      //pasamos el parametro loc, que anteriormente ha almacenado las coordenadas
      bounds.extend(loc);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const user_location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        let loc = new google.maps.LatLng(user_location.lat, user_location.lng);
        bounds.extend(loc);

        const user = new google.maps.Marker({
          position: user_location,
          map: map,
          animation: google.maps.Animation.BOUNCE,
          title: "Estás aquí",
          icon: iconParishioner
        });
        //Si hay geolocalizacion, centrar por usuario
        map.setCenter(user_location);
      });
    }

    //Auto center
    map.panToBounds(bounds);
    //Auto Zoom
    map.fitBounds(bounds);
  }
  getTemples();
}

//Function maps
function startMap() {
  let templeId = document.querySelector("#temple-info");
  if (templeId) {
    templeId = templeId.getAttribute("data-temple-id");
  } else {
    templeId = "";
  }

  axios
    .get(`/api/${templeId}`)
    .then(response => {
      let temple = response.data.temple;
      const templeLocation = {
        lat: temple.location.latitude,
        lng: temple.location.longitude
      };

      // Initialize the map
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: templeLocation
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            const user_location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            //Para unir dos puntos añadimos lo siguiente:
            const directionRequest = {
              origin: user_location,
              destination: templeLocation,
              travelMode: "WALKING"
            };

            directionsService.route(directionRequest, function(
              response,
              status
            ) {
              if (status === "OK") {
                // everything is ok
                directionsDisplay.setDirections(response);
              } else {
                // something went wrong
                window.alert("Directions request failed due to " + status);
              }
            });

            directionsDisplay.setMap(map);
            // Center map with user location
            map.setCenter(user_location);
          },
          function() {
            //Si no geolocaliza, marca el templo
            const center = {
              lat: temple.location.latitude,
              lng: temple.location.longitude
            };
            const map = new google.maps.Map(document.getElementById("map"), {
              zoom: 15,
              center: center
            });
            const templeMaker = new google.maps.Marker({
              position: templeLocation,
              icon: iconBase,
              map: map,
              title: temple.name
            });
            console.log("Error in the geolocation service.");
          }
        );
      } else {
        console.log("Browser does not support geolocation.");
      }
    })
    .catch(error => console.log(error));
}
