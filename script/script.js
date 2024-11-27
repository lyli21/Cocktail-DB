
let searchBox = document.getElementById("searchBox"); 
/* Varariable qui englobe les 2 radios */
let Ingredient = document.getElementById("ingredient"); 
/* Variable pour le radio ingredient */
let CockailName = document.getElementById("CockailName"); 
/* Variable Pour le radio le nom de cocktail */
let searchBar = document.getElementById("searchBar");  
/*Variable qui englobe ma barre de recherche et mon boutton recherche */
let searchControl = document.getElementById("searchControl");   
/*Variable pour ma barre de recherche */
let buttonSearch = document.getElementById("buttonSearch");  
/*Variable pour le boutton rechercher */
let cocktail_List = document.getElementById("cocktailList");   
/*  Variable pour afficher les cocktails */
const API_BASE = "https://www.thecocktaildb.com/api/json/v1/1/";
/* URL de l'API */


// Ajout d'un écouteur d'événement au formulaire de recherche
searchBox.addEventListener('submit', (event) => {
  event.preventDefault(); // Empeche le comportement defaut du formulaire
  const query = searchControl.value.trim(); // Récupère et nettoie la valeur 
  console.log(query);

  const searchType = CockailName.checked ? 'CocktailName' : 'ingredient'; // Détermine la recherche par nom ou ingredients
  if (!query) return alert("Veuillez entrer un terme de recherche."); // Affiche une alerte si la barre de recherche est vide
  const endpoint =
    searchType === 'CocktailName'
      ? `${API_BASE}search.php?s=${query}`
      : `${API_BASE}filter.php?i=${query}`;
  console.log(endpoint);
  fetch(endpoint)
    .then((response) => response.json()) // convertit la réponse en JSON
    .then((data) => cocktailCreate(data.drinks))// appelle la fonction cocktailCreate avec les données des cocktails
    .catch(console.error); // affiche les erreurs dans la console
 
  console.log(query);
  console.log(searchType);
});



// Fonction pour créer et afficher les cocktails
function cocktailCreate(_cocktails) {
  // Vérifie si une option est sélectionnée
  if (!Ingredient.checked && !CockailName.checked) {
    alert("Please select a search option: Ingredients or Cocktail Name.");
    return;
}

  if (!_cocktails || _cocktails.length === 0) {
      cocktail_List.innerHTML = 'No Results Matching Your Search';
      return;
  }

  _cocktails.forEach(cocktail => {
    console.log(cocktail);
      let cocktailElement = document.createElement('div'); /* creation du div pour introduire une card*/
      cocktailElement.classList.add('card'); /* creation des cards*/
      cocktailElement.innerHTML = 
      
      ` <h3>${cocktail.strDrink}</h3> 
          <img src="${cocktail.strDrinkThumb}" >
          <p>${cocktail.strInstructions || 'Pas d\'instructions disponibles'}</p>`;

      cocktail_List.appendChild(cocktailElement); // ajoute l'élément cocktail à la liste

  });
}



function cocktailShow(_cocktails){

  cocktail_List.innerHTML = '';

  for ( let i = 0; i <_cocktails.length; i++){
    let couktal = document.createElement("article");
    couktal.setAttribute("class" , "card");

    if (_cocktails[i].strDrinkThumb == undefined || _cocktails[i].strDrinkThumb == null){
      _cocktails[i].strDrinkThumb = null
    }

      couktal.innerHTML = '<img src "' + couktal[i].strDrinkThumb + '" />'  ;







      cocktail_List.appendChild(_cocktails);
  }
}
