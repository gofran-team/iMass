class Utils {
  static calcAverage(array) {
    return parseFloat(
      array.reduce((acc, cur) => acc + Number(cur), 0) / array.length
    ).toFixed(1);
  }
}

module.exports = Utils;
