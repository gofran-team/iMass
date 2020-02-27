function setDistances(pos) {
  const templeCards = document.querySelectorAll(".temple-card-info");
  for (temple of templeCards) {
    const distance = temple.querySelector(".distance");
    distance.innerHTML = '<i class="fas fa-location-arrow mr-1"></i>';
    distance.innerHTML += distanceToTemple(
      pos.coords.latitude,
      pos.coords.longitude,
      temple.getAttribute("data-temple-latitude"),
      temple.getAttribute("data-temple-longitude")
    );
    distance.innerHTML += " km";
  }
}

function distanceToTemple(lat1, lon1, lat2, lon2, unit = "K") {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344;
  }
  if (unit == "N") {
    dist = dist * 0.8684;
  }
  return Number(dist.toFixed(1));
}
