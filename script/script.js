
const Ingredient = document.getElementById("ingredient"); 
const CockailName = document.getElementById("CockailName"); 
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modalImage');
const modalIngredients = document.getElementById('modalIngredients');
const modalInstructions = document.getElementById('modalInstructions');
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close-modal');
const cocktail_List = document.getElementById("cocktailList");   
const searchBox = document.getElementById("searchBox"); 
const API_BASE = "https://www.thecocktaildb.com/api/json/v1/1/";

// Fermeture de la modal quand on clique sur le bouton de fermeture
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

//  Fermeture de la modal quand on clique en dehors
window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

searchBox.addEventListener('submit', (event) => {
    event.preventDefault(); // Empeche le rechargement de la page 
    const query = searchControl.value.trim(); // récupere le texte de recherche
    console.log(query);

    //type de recherche (par nom ou par ingrédient)
    const searchType = CockailName.checked ? 'CocktailName' : 'ingredient'; 
     // Vérification que la recherche n'est pas vide
    if (!query) return alert("Veuillez entrer un terme de recherche."); 

    const endpoint =
        searchType === 'CocktailName'
            ? `${API_BASE}search.php?s=${query}`
            : `${API_BASE}filter.php?i=${query}`;
    console.log(endpoint);
    
       // Efface les résultats précédents
    cocktail_List.innerHTML = '';

    // Requête à l'API
    fetch(endpoint)
        .then((response) => response.json())
        .then((data) => cocktailCreate(data.drinks))
        .catch(console.error); 
});

function cocktailCreate(_cocktails) {

    // Vérifie qu'un type de recherche est sélectionné
    if (!Ingredient.checked && !CockailName.checked) {
        alert("Please select a search option: Ingredients or Cocktail Name.");
        return;
    }

    // Si aucun résultat affiche No resluts....
    if (!_cocktails || _cocktails.length === 0) {
        cocktail_List.innerHTML = '<p> No results, try again.</p>';
        return;
    }


    // Créer une card pour chaque cocktail
    _cocktails.forEach(cocktail => {
        let cocktailElement = document.createElement('div'); 
        cocktailElement.classList.add('card'); 
        cocktailElement.innerHTML = `
            <h3 class="card-title">${cocktail.strDrink}</h3> 
            <img src="${cocktail.strDrinkThumb}" class="card-img" alt="${cocktail.strDrink}">
            <div class="card-body">
                <button class="button-1" onclick="getDetails(${cocktail.idDrink})">See details</button>
            </div>
        `;
        cocktail_List.appendChild(cocktailElement);
    });
}

function getDetails(id) {
  // requete pour obtenir détail entier
    fetch(`${API_BASE}lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => displayDetails(data.drinks[0]))
        .catch(console.error);
}

function displayDetails(cocktail) {
  // Affiche titre et information
    modalTitle.innerHTML = `<h4>${cocktail.strDrink}</h4>
        <div class="container-fluid"> 
            <div class="row">
                <div class="col-md-4">
                    <p><strong>Category :</strong>  ${cocktail.strCategory}</p>
                </div>
                <div class="col-md-4">
                    <p><strong>Glass To Use :</strong> ${cocktail.strGlass}</p>
                </div>
                <div class="col-md-4">
                    <p><strong>Type :</strong> ${cocktail.strAlcoholic}</p>
                </div>
            </div>
        </div>`;
    
        // Affiche image du cocktail
    modalImage.src = cocktail.strDrinkThumb;
    // Remet à zero la liste des ingrédients
    modalIngredients.innerHTML = "";


     // Parcourt et affiche tous les ingrédients
    Object.keys(cocktail)
        .filter((key) => key.startsWith('strIngredient') && cocktail[key])
        .forEach((key, index) => {
            const ingredient = cocktail[key]; 
            const measureKey = `strMeasure${index + 1}`;
            const measure = cocktail[measureKey] || "Not specified quantity";
            modalIngredients.innerHTML += `<li>${ingredient} - ${measure}</li>`;
        });

        // Affiche les instructions
    modalInstructions.textContent = cocktail.strInstructions;
    
    // et enfin Affiche la modal
    modal.style.display = 'block';
}