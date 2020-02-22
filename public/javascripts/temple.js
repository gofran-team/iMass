function onloadTemple() {
  // show review rates with hosts icons
  const rates = document.querySelectorAll(".rate");
  rates.forEach(
    rate => (rate.style.width = rate.getAttribute("data-rate") * 20 + "%")
  );

  updateBtnFavorite();
}

function updateBtnFavorite() {
  // manage favorite button depending on the value in de data base
  const btnFavorite = document.querySelector("#btn-favorite");
  if (btnFavorite) {
    const btnFavoriteIcon = document.querySelector("#btn-favorite > i");
    const btnFavoriteText = document.querySelector("#btn-favorite > span");
    if (btnFavorite.classList.contains("saved-favorite")) {
      btnFavoriteIcon.classList.replace("far", "fas");
      btnFavoriteText.innerHTML = "Quitar";
    } else {
      btnFavoriteIcon.classList.replace("fas", "far");
      btnFavoriteText.innerHTML = "Guardar";
    }
  }
}

function markFavorite() {
  const btnFavorite = document.querySelector("#btn-favorite");
  const templeId = btnFavorite.getAttribute("data-temple-id");

  axios
    .post(`/temple/${templeId}/mark-favorite`)
    .then(function(response) {
      btnFavorite.classList.toggle("saved-favorite");
      updateBtnFavorite();
    })
    .catch(function(error) {
      console.log(error);
    });
}
