class Utils {
  // calculate the average of the numbers in an array
  static calcAverage(array) {
    return parseFloat(
      array.reduce((acc, cur) => acc + Number(cur), 0) / array.length
    ).toFixed(1);
  }

  // set default temple image if it doesn't exist
  static setDefaultImage(temples) {
    temples.forEach(temple => {
      if (!temple.image) temple.image = "https://via.placeholder.com/350x200";
      return temples;
    });
  }
}

module.exports = Utils;
