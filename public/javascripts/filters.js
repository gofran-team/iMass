const searchResults = document.querySelector("#searchResults");
let allTemples = [];
if (searchResults) {
  allTemples = [...searchResults.querySelectorAll(".temple-card")];
}

// filter the temples by rate in the search results page
const filterTemples = rate => {
  const templesFiltered = allTemples.filter(temple => {
    const t = temple.querySelector(".rate");
    return Number(t.attributes["data-rate"].value) >= rate;
  });

  let filteredResults = "";
  templesFiltered.forEach(temple => {
    filteredResults += temple.outerHTML;
  });
  document.querySelector("#searchResults").innerHTML = filteredResults;
  openTempleOnClick();
};

// toggle class 'active' of the filter buttons
function toggleFilterButton() {
  const filterButtonsWrap = document.querySelector(".filters");
  if (filterButtonsWrap) {
    const filterButtons = filterButtonsWrap.querySelectorAll(
      ".filter-rate-block"
    );
    filterButtons.forEach(filter => {
      filter.addEventListener(
        "click",
        e => {
          filterButtons.forEach(f => f.classList.remove("active"));
          e.currentTarget.classList.add("active");
        },
        false
      );
    });
  }
}
