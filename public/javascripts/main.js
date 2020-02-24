window.onload = () => {
  showAlerts();
  onloadTemple();
  AOS.init();
  listeners();
  setAutocomplete();
  startMap();
  templeMarks();
  hideLoading();

  document.querySelector(".spinner-border").classList.toggle("hidden");
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

async function setAutocomplete() {
  try {
    const response = await axios.post(`/temple/get-names`);
    const templeNames = response.data.map(temple => ({
      label: temple.name,
      value: temple.name
    }));

    const input = document.getElementById("search");

    autocomplete({
      input: input,
      emptyMsg: "No hay resultados",
      fetch: function(text, update) {
        text = text.toLowerCase();
        const suggestions = templeNames.filter(n =>
          n.label.toLowerCase().includes(text)
        );
        update(suggestions);
      },
      onSelect: function(item) {
        input.value = item.label;
      }
    });
  } catch (error) {
    console.log(error);
  }
}
