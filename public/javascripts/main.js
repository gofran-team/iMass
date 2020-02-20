window.onload = () => {
  showAlerts();
  onloadTemple();
};

// fix URL problem with Facebook login callback
if (window.location.hash && window.location.hash == "#_=_") {
  window.location.hash = "";
}

function showAlerts() {
  // show alerts
  let alerts = document.querySelectorAll(".alert");
  alerts.forEach(e => {
    e.classList.toggle("showAlert");
    setTimeout(() => {
      e.classList.toggle("showAlert");
    }, 2000);
  });
}
