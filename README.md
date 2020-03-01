# iMass

https://imass-app.herokuapp.com/

![Home Img](images/readme.png?raw=true)

# iMass: el TripAdvisor de los templos católicos de Madrid.

iMass es una aplicación con la que puedes encontrar, valorar, consultar y/o marcar como favoritos cualquier templo católico de la ciudad de Madrid, ya sea desde tu dispositivo móvil, como en tu tablet u ordenador de sobremesa.

## Home:

### Registrarse y/o Iniciar Sesión

En la parte superior derecha, encontrarás los botones donde podrás registrarte y/o iniciar sesión, pudiendo hacerlo con Usuario y Contraseña o con Login social de Facebook. Una vez registrado, podrás guardar tus templos favoritos, los cuales podrás consultar cada vez que inicies sesión. Tambiém podrás dejar tus comentarios y valorarlos teniendo en cuenta tres factores: Párroco, Limpieza e Instalaciones.

### Buscador:

En este espacio podrás buscar tanto por un templo especifico, como por cualquier palabra. El buscador te devolverá todas las iglésias, basílicas, etc. que coincidan con el texto introducido. A medida que vas escribiendo, aparecerá un desplegable con dichas coincidencias.
También podrás hacer una busqueda geoespacial, devolviendo todos los templos que se encuentren en un rádio de un kilometro de tu posición.

### Más valorados:

Podrás ver los 6 mejor valorados entre los 387 templos de la ciudad y a qué distancia se encuentran de tu ubicación.

## Ficha del templo:

Puedes consultar cada uno de los templos, ver su ficha completa, todos sus comentarios, valoraciones individuales y média de todas ellas, así como la ruta para llegar andando desde donde te encuentres.
En el caso de estár logueado, también podrás guardarlo como favorito

## Templos encontrados:

Tanto en la busqueda geoespacial como por coincidencia de texto, podrás ver en el mapa todos los templos encontrados por estos criterioos, así como tú ubicación, pudiendo clicar en cada uno de ellos dentro del mapa, para ver su nombre y poder ir desde ahí a la ficha de cada uno de ellos.
En esta página, tambiém podrás filtrarlos por valoración, desde una o más hostias, hasta todos los encontrados.

## Extras:

- Contraseña encriptada con Bycript
- Evaluador de contraseñas, sólo permitiendo introducir las que contengan al menos una letra mayúscula, una minúscula, un numero y un mínimo de 8 dígitos.
- Controlador de errores personaizado. En caso de algún error o requisito no cumplido, aparecerá en la parte inferior derecha nuestro amigo Flanders para avisarnos.
- Icónos de marcadores de google maps personalizados y animados.
- Ajuste del zoom de los mapas, dependiendo de los resultados obtenidos en cada búsqueda.
- Página de error 404 personalizada.

## Proyecto realizado por:

Gonzalo Hernandez y Francisco Molleda.

## Proyecto realizado con:

Node.js.
Espress.
Mongoose.
Ajax.
Axios.
Handlebars.
Passport.
Sass.
Bootstrap.
GoogleMapsApi.
Api de Templos e iglesias católicas del ayuntamiento de Madrid.

## Proceso:

El primer reto al que nos enfrentamos fue encontar un tema sobre el que realizar este proyecto.
Lo siguiente que hicimos, fue realizar los esquemas de los modelos, con los datos que ibamos a necesitar y como conectarían entre las diferentes colecciones. Diseñamos el diagrama de flujo para tener presente de forma gráfica los diferentes procesos:

![Diagrama flujo img](images/diagramadeflujo.png?raw=true)

El siguiente paso, fue desarrollar la lógica (rutas, seeds, vistas, modelos, middlewares, etc.).

Desarrollo e implementación de mapas a través de googlemapsApi.

Finalmente, la maquetación y diseño responsive.

## Dificultades:

### Francisco Molleda:

Entender y utilizar el metodo Populate de Mongoose.

![Populate code](images/populatecode.png?raw=true)

Implementar y conocer el funcionamiento de googlemapsApi, especialmente en conseguir que el mapa se adaptase al número de marcadores que devolvía la consulta.

### Gonzalo Henandez:

# Licence

Por favor, consulte `LICENSE.md`

# Contributing

Si quiere contribuir con este proyecto, estaríamos encantados `CONTRIBUTING.md`
