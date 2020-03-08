Live demo: https://imass-app.herokuapp.com/

![Home Img](https://user-images.githubusercontent.com/54455748/76162907-1c5fd600-6142-11ea-8834-f39ed7779757.png)

# iMass. El TripAdvisor de los templos religiosos

iMass es una aplicación para encontrar, valorar, consultar y guardar como favorito cualquier templo católico de la ciudad de Madrid.

## Home

### Registrarse e iniciar sesión

En la parte superior derecha encontrarás los botones para registrarte o iniciar sesión, pudiendo hacerlo con usuario y contraseña, o con una cuenta de Facebook. Una vez registrado, podrás guardar tus templos favoritos y hacer tus reseñas, valorando tres aspectos: las instalaciones, la limpieza y al párroco.

### Buscador

En este espacio podrás buscar por el nombre de la iglesia. El buscador te sugerirá todas las iglésias, basílicas, etc., que coincidan con el texto introducido a modo de autocompletado. También podrás hacer una búsqueda geoespacial, encontrando todos los templos que se encuentren en un radio de un kilómetro de tu posición.

### Los más valorados

En la parte inferior encontrarás los 6 templos mejor valorados y a qué distancia se encuentran de tu ubicación.

## Ficha del templo

Puedes consultar los datos de cada uno de los templos: la ficha completa, los comentarios realizados por los feligreses, las valoraciones individuales y la media de todas ellas, así como la ruta para llegar andando desde tu posición. En el caso de haber iniciado sesión, también podrás guardarlo como favorito o dejar tu propia opinión y valoración.

## Templos encontrados

Tanto en la búsqueda geoespacial como por nombre, podrás ver en el mapa todos los templos encontrados por estos criterios, así como tú ubicación, pudiendo pulsar en cada uno de ellos dentro del mapa, donde se muestra el nombre y el enlace a su ficha. En esta página, tambiém podrás filtrarlos por su valoración media.

## Extras

- Rutas privadas protegidas. Solo en caso de haber iniciado sesión tendrás acceso a ciertas funcionalides.
- Contraseña encriptada con Bycript.
- Evaluador de contraseñas, solo permitiendo introducir las que contengan al menos una letra mayúscula, una minúscula, un número y un mínimo de 8 dígitos.
- Controlador de errores personalizado. En caso de algún error o requisito no cumplido, aparecerá en la parte inferior un mensaje flash para avisarnos.
- Iconos de marcadores de Google Maps personalizados y animados.
- Ajuste del zoom de los mapas, dependiendo de los resultados obtenidos en cada búsqueda.
- Página de error 404 personalizada.

## Proyecto realizado por

Gonzalo Hernández y Francisco Molleda.

## Proyecto realizado con

Node.js.
Express.
Mongoose.
AJAX.
Axios.
Handlebars.
Passport.
Sass.
Bootstrap.
Google Custom Search JSON API.
Google Maps API.
API de templos e iglesias católicas del ayuntamiento de Madrid.

## Proceso

El primer reto al que nos enfrentamos fue encontar un tema sobre el que realizar este proyecto. Después, realizamos los esquemas de los modelos, con los datos que íbamos a necesitar y las relaciones entre las diferentes colecciones. Diseñamos un diagrama de flujo para tener presente de forma gráfica los diferentes procesos.

![Diagrama flujo img](https://user-images.githubusercontent.com/54455748/76162926-41ecdf80-6142-11ea-8f90-5e7f9692db25.png)

El siguiente paso, fue desarrollar la lógica (rutas, seeds, vistas, modelos, middlewares, etc.).

Desarrollo e implementación de mapas a través de Google Maps API.

Finalmente, la maquetación y diseño responsive.

## Dificultades

Entender y utilizar el método <b>populate</b> y el constructor <b>aggregate</b> de Mongoose.

```javascript
Temple.findById(req.params.id)
  .then(async temple => {
    const reviews = await Review.find({
      temple
    })
      .populate("user")
      .sort({
        createdAt: -1
      });
```

```javascript
Review.aggregate([
  {
    $group: {
      _id: "$temple",
      average: {
        $avg: "$rates.average"
      },
      reviews: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      average: -1
    }
  },
  {
    $limit: 6
  },
  {
    $project: {
      _id: 0,
      temple: "$_id",
      average: {
        $round: ["$average", 1]
      },
      reviews: 1
    }
  }
]).exec(function(err, bestReviews) {
  Temple.populate(
    bestReviews,
    {
      path: "temple"
    },
    function(error, bestTemples) {
      const temples = bestTemples.map(t => ({
        id: t.temple._id,
        name: t.temple.name,
        image: t.temple.image,
        location: t.temple.location,
        average: t.average,
        reviews: t.reviews
      }));
      Utils.setDefaultImage(temples);
      return res.render("index", {
        temples,
        menuHome: true
      });
    }
  );
});
```

Implementar y conocer el funcionamiento de Google Maps API; especialmente conseguir que el mapa se adaptase al número de marcadores que devolvía la consulta. Así como implementar los datos devueltos por la base de datos en los diferentes mapas.

# Licence

Por favor, consulte `LICENSE.md`

# Contributing

Si quieres contribuir con este proyecto, estaríamos encantados `CONTRIBUTING.md`
