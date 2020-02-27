const markers = []
const iconBase = './../images/cruz.png'


function templeMarks() {
    //Definimos inicio de donde apunta el mapa
    const centerMap = {
        lat: 40.438458,
        lng: -3.685211
    };

    //Indicamos que apunte donde habíamos definido 
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: centerMap
    });

    let center = {
        lat: undefined,
        lng: undefined
    };

    var legend = document.getElementById('legend');


    //Hacemos llamada a AJAX 
    function getTemples() {
        let searchTerm = document.getElementById("search-results")

        axios.get("/api")
            .then(response => {
                if (response.data.temples) {

                    if (searchTerm) {
                        searchTerm = searchTerm.getAttribute("data-search");
                        searchTerm = searchTerm.toLowerCase();
                        let templesArr = response.data.temples;
                        templesArr.forEach(temple => temple.name = temple.name.toLowerCase());
                        templesArr = templesArr.filter(temple => temple.name.includes(searchTerm));
                        placeTemples(templesArr);
                    } else {
                        placeTemples(response.data.temples);
                    }
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    //Representamos los marcadores
    function placeTemples(temples) {
        temples.forEach(function (temple) {
            let nameToLC = (temple.name).toUpperCase()
            let contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h6 id="firstHeading" class="firstHeading">' + nameToLC + '</h6>' +
                '<div id="bodyContent">' +
                '<p><b>Description: </b> ' + temple.description + ' </p>' +
                '<p>Visit this Temple: <a href="http://localhost:3000/temple/' + temple._id + '">' +
                'http://localhost:3000/temple/' + temple._id + '</a> ' +
                '</div>' +
                '</div>';
            let infowindow = new google.maps.InfoWindow({
                content: contentString
            });
            const center = {
                lat: temple.location.latitude,
                lng: temple.location.longitude
            };

            const pin = new google.maps.Marker({
                position: center,
                map: map,
                animation: google.maps.Animation.DROP,
                title: temple.name,
                icon: iconBase,
            });
            pin.addListener('click', function () {
                infowindow.open(map, pin);
            });
            markers.push(pin);
        });

    }
    getTemples();
}


//Si queremos dibujar rutas entre dos pines, debemos instanciar DirectionService y DirectionRendererobjetos.
const directionsService = new google.maps.DirectionsService;
const directionsDisplay = new google.maps.DirectionsRenderer;

//Function maps

function startMap() {
    let templeId = document.querySelector('#temple-info');
    if (templeId) {
        templeId = templeId.getAttribute('data-temple-id')
    } else {
        templeId = ""
    };
    axios.get(`/api/${templeId}`)
        .then(response => {
            let temple = response.data.temple;
            const templeLocation = {
                lat: temple.location.latitude,
                lng: temple.location.longitude,
            };
            // Initialize the map
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: templeLocation,
            });

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const user_location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    //Para unir dos puntos añadimos lo siguiente:
                    const directionRequest = {
                        origin: user_location,
                        destination: templeLocation,
                        travelMode: 'WALKING',
                    };

                    directionsService.route(
                        directionRequest,
                        function (response, status) {
                            if (status === 'OK') {
                                // everything is ok
                                directionsDisplay.setDirections(response);

                            } else {
                                // something went wrong
                                window.alert('Directions request failed due to ' + status);
                            }
                        }
                    );

                    directionsDisplay.setMap(map)
                    // Center map with user location
                    map.setCenter(user_location);

                }, function () {
                    //Si no geolocaliza, marca el templo
                    const center = {
                        lat: temple.location.latitude,
                        lng: temple.location.longitude
                    };
                    const map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 15,
                        center: center
                    });
                    const templeMaker = new google.maps.Marker({
                        position: templeLocation,
                        icon: iconBase,
                        map: map,
                        title: temple.name
                    })
                    console.log('Error in the geolocation service.');
                });
            } else {
                console.log('Browser does not support geolocation.');
            }
        });
}