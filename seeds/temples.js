const { withDbConnection, dropIfExists } = require("../lib/withDbConnection");
const Temple = require("../models/temple");
const axios = require("axios");

const getTemples = async () => {
  let temples;

  // get information from the temples API
  try {
    const response = await axios({
      method: "get",
      url:
        "https://datos.madrid.es/egob/catalogo/209426-0-templos-catolicas.json"
    });
    temples = response.data["@graph"];
    temples = temples.filter(e => e.location);
    temples = temples.map(temple => ({
      name: temple.title,
      address: {
        locality: temple.address.locality,
        postalCode: temple.address["postal-code"],
        streetAddress: temple.address["street-address"]
      },
      location: {
        latitude: temple.location.latitude,
        longitude: temple.location.longitude
      },
      description: temple.organization["organization-desc"]
    }));
  } catch (error) {
    console.log(error);
  }

  // create the temples in the data base
  try {
    await withDbConnection(async () => {
      await dropIfExists(Temple);
      const newTemples = await Temple.create(temples);
      console.log(`${newTemples.length} temples created`);
    });
  } catch (error) {
    console.log(error);
  }
};

getTemples();
