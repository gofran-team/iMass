// fix URL problem with Facebook login callback
if (window.location.hash && window.location.hash == "#_=_") {
  window.location.hash = "";
}

window.onload = () => {
  // show alerts
  let alerts = document.querySelectorAll(".alert");
  alerts.forEach(e => {
    e.classList.toggle("showAlert");
    setTimeout(() => {
      e.classList.toggle("showAlert");
    }, 2000);
  });

  // show temple average rate with hosts icons
  const hosts = document.querySelector("#hosts");
  hosts.style.width = hosts.getAttribute("data-rate") * 20 + "%";
};
