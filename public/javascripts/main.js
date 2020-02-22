window.onload = () => {
  showAlerts();
  onloadTemple();
  AOS.init();
};

// fix URL problem with Facebook login callback
if (window.location.hash && window.location.hash == "#_=_") {
  window.location.hash = "";
}

function showAlerts() {
  // show alerts
  let alerts = document.querySelectorAll(".message");
  alerts.forEach(e => {
    e.classList.toggle("showAlert");
    setTimeout(() => {
      e.classList.toggle("showAlert");
    }, 3000);
  });
}
