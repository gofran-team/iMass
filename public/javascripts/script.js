window.onload = () => {
  let alerts = document.querySelectorAll(".alert");
  alerts.forEach(e => {
    e.classList.toggle("showAlert");
    setTimeout(() => {
      e.classList.toggle("showAlert");
    }, 2000);
  });
};

if (window.location.hash && window.location.hash == "#_=_") {
  window.location.hash = "";
}
