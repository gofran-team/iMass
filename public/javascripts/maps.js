function templeMarks() {
    //Definimos inicio de donde apunta el mapa
    const centerMap = {
        lat: 40.438458,
        lng: -3.685211
    };


    const markers = []
    //Indicamos que apunte donde habíamos definido 
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: centerMap
    });

    let center = {
        lat: undefined,
        lng: undefined
    };

    //Hacemos llamada a AJAX 
    function getTemples() {
        //const templeId = document.querySelector('input[name="templeID"]').value
        // pedir una sola iglesia
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
                } else {
                    placeTemples([response.data.temple]);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    //Representamos los marcadores
    function placeTemples(temples) {
        temples.forEach(function (temple) {
            const center = {
                lat: temple.location.latitude,
                lng: temple.location.longitude
            };
            const pin = new google.maps.Marker({
                position: center,
                map: map,
                title: temple.name
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
    if (templeId) templeId = templeId.getAttribute('data-temple-id');
    axios.get(`/api/${templeId}`)
        // pedir todas las iglesias
        // axios.get("/api")
        .then(response => {
            let temple = response.data.temple;
            const templeLocation = {
                lat: temple.location.latitude,
                lng: temple.location.longitude
            };
            // Initialize the map
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: templeLocation
            });

            // Add a marker for Casa Fran
            const templeMaker = new google.maps.Marker({
                position: templeLocation,
                map: map,
                title: "Temple"
            });


            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const user_location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    //Para unir dos puntos añadimos lo siguiente:
                    const directionRequest = {
                        origin: user_location,
                        destination: templeLocation,
                        travelMode: 'WALKING'
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

                    directionsDisplay.setMap(map);

                    // Center map with user location
                    map.setCenter(user_location);

                    // Add a marker for your user location
                    const MyPositionMarker = new google.maps.Marker({
                        position: {
                            lat: user_location.lat,
                            lng: user_location.lng
                        },
                        map: map,
                        title: "You are here."
                    });

                }, function () {
                    console.log('Error in the geolocation service.');
                });
            } else {
                console.log('Browser does not support geolocation.');
            }
        })

}