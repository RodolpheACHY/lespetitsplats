import { displayRecipes } from "./cards.js";

export function handleSearch(recipes, query) {
  const trimmedQuery = query.trim().toLowerCase();
  if (trimmedQuery.length >= 3) {
    const filteredRecipes = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(trimmedQuery) ||
        recipe.description.toLowerCase().includes(trimmedQuery) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(trimmedQuery)
        )
    );
    displayRecipes(filteredRecipes);
    // Vérifier et afficher le message
    displayNoResultsMessage(query, filteredRecipes, "no-results-message");
  } else {
    displayRecipes(recipes); // Affiche toutes les recettes si la saisie est inférieure à 3 caractères
    displayNoResultsMessage(query, recipes, "no-results-message");
  }
}

export function clearInput(searchId, clearIconId, recipes) {
    const searchInput = document.getElementById(searchId);
    const clearIcon = document.getElementById(clearIconId);
    clearIcon.addEventListener("click", function () {
      console.log("click");
      console.log(clearIcon);
      searchInput.value = ""; // Vider l'input
      searchInput.focus();
      displayRecipes(recipes);
      displayNoResultsMessage("", recipes, "no-results-message");
    });
  }
  
  export function displayNoResultsMessage(inputValue, recipes, containerId) {
    const noResultsMessage = document.getElementById(containerId);
    if (inputValue && recipes.length === 0) {
      noResultsMessage.textContent = `Aucune recette ne contient '${inputValue}'. Vous pouvez chercher «tarte aux pommes », « poisson », etc`;
      noResultsMessage.classList.remove("hide");
      noResultsMessage.classList.add("show");
    } else {
      noResultsMessage.classList.remove("show");
      noResultsMessage.classList.add("hide");
    }
  }
  