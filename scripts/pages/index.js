import { getRecipes } from "../models/index.js";

function displayRecipes(recipes){
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  const testEl = document.createElement("p");
  testEl.textContent = "test :-)";
  recipes.forEach(function (recipe) {
    let html = `
            <div class="recipe-card">
                <aside>
                    <div class="pastil-yellow">
                        <span class="main__pasil-time">${recipe.time}mn</span>
                    </div>
                    <img src="./assets/images/${recipe.image}" alt="${recipe.name}">
                </aside>
                <article class="container-card-content">
                    <h3>${recipe.name}</h3>
                    <h4>Recette</h4>
                    <p>${recipe.description}</p>
                    ${testEl.outerHTML}
            `;
    let htmlIngredient = "";
    if (
      recipe.ingredients &&
      Array.isArray(recipe.ingredients) &&
      recipe.ingredients.length > 0
    ) {
      
      htmlIngredient = `
                    <h4>Ingrédients</h4>
                    <div class="container-ingredients">
                    `;
      recipe.ingredients.forEach(function (ingredient) {
        let htmlIngredients = `
            <div class="main__container-ingredientMesure">
                            <h5>${ingredient.ingredient}</h5>
                            <h6>${ingredient.quantity} ${ingredient.unit}</h6>
                        </div>
        `;
        htmlIngredient += htmlIngredients;
      });
      htmlIngredient += "</div>";
    }
    html += htmlIngredient;
    html += ` </article>
            </div>`;
    cardContainer.insertAdjacentHTML("beforeend", html);
  });
}



function handleSearch(recipes) { 
    const searchInput = document.getElementById("header__search-container__input"); 
    searchInput.addEventListener("input", function () { 
        const query = searchInput.value.trim().toLowerCase(); 
        if (query.length >= 3) { 
            const filteredRecipes = recipes.filter(recipe => 
                recipe.name.toLowerCase().includes(query) || 
                recipe.description.toLowerCase().includes(query) || 
                recipe.ingredients.some(ingredient => 
                    ingredient.ingredient.toLowerCase().includes(query) 
                ) 
            ); 
            displayRecipes(filteredRecipes); 
        } else { 
            displayRecipes(recipes); // Affiche toutes les recettes si la saisie est inférieure à 3 caractères 
        } 
    }); 
}

function clearInput() {
    const searchInput = document.getElementById('header__search-container__input'); 
    const clearIcon = document.getElementById('input-xmark-icon'); // Ajout de l'événement de clic à l'icône 
        clearIcon.addEventListener('click', function() { 
            console.log("click");
            console.log(clearIcon);
            searchInput.value = ' '; // Vider l'input 
        });
}
clearInput();

/*
 function displayIngredients(recipe) { 
    const ingredientsList = document.getElementById('dropdownMenuIngredients'); // Vider la liste actuelle 
    //ingredientsList.innerHTML = ""; // Ajouter les ingrédients à la liste 
    // Vider les éléments dynamiques actuels avant d'ajouter de nouveaux 
    Array.from(ingredientsList.querySelectorAll('li.dynamic')).forEach(li => li.remove());
    console.log(recipe)
    // Ajouter chaque ingrédient à la liste sous les éléments statiques
    recipe.ingredients.forEach(ingredient => { 
        const li = document.createElement('li'); 
        li.classList.add('dynamic');
        li.textContent = ingredient; 
        ingredientsList.appendChild(li); 
    }); 
    
    // Afficher le conteneur des ingrédients 
    ingredientsList.style.display = 'block'; 
} */

// Ajouter un événement de clic au bouton 
//document.getElementById('dropdownBtnIngredients').addEventListener('click', displayIngredients());


async function init() {
   // displayIngredients()
  // Récupère les datas des recettes
  const recipes = getRecipes();
  // affiche les recettes
  displayRecipes(recipes);
  handleSearch(recipes);
  clearInput();
}

//init();
document.addEventListener('DOMContentLoaded', init);
