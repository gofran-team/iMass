window.onload = () => {
  showAlerts();
  onloadTemple();
  AOS.init();
  listeners();
};

// fix URL problem with Facebook login callback
if (window.location.hash && window.location.hash == "#_=_") {
  window.location.hash = "";
}

function showAlerts() {
  let alerts = document.querySelectorAll(".message");
  alerts.forEach(e => {
    e.classList.toggle("showAlert");
    setTimeout(() => {
      e.classList.toggle("showAlert");
    }, 3000);
  });
}

function listeners() {
  const templeCards = document.querySelectorAll(".temple-card .card");
  templeCards.forEach(card =>
    card.addEventListener("click", e => {
      window.location = card.getAttribute("data-url");
    })
  );
}
