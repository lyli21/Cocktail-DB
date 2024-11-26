let formSearchBox = document.getElementById("searchBox");
let formIngredient = document.getElementById("ingredient");
let searchCockailName = document.getElementById("CockailName");
let formSearchBar = document.getElementById("searchBar");
let form = document.getElementById("btn btn-outline-primary"); // Créer 6 variable pour chacun des id || class, en tout 6
                                                            // Pour barre de recherche; les radio donc x2, mon boutton recherche; et  id bstrp + 2 class

function fetchData(API_Data){
    const API_BASE = "https://www.thecocktaildb.com/api/json/v1/1/";
searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  const searchType = searchByName.checked ? 'name' : 'ingredient';
  if (!query) return alert("Veuillez entrer un terme de recherche.");
  const endpoint =
    searchType === 'name'
      ? `${API_BASE}search.php?s=${query}`
      : `${API_BASE}filter.php?i=${query}`;
  fetch(endpoint)
    .then((response) => response.text())
    .then((data) => displayResults(data.drinks))
    .catch(console.error);
});
console.log(query);
console.log(searchType);

}

// function createName (_cocktail){

//     for (let )

// }
