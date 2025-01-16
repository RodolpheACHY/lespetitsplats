import { displayRecipes } from "./cards.js";
import { initDropdownIngredient,
         initDropdownAppliances,
         initDropdownUstensiles
 } from "./dropdownInit.js";

/**
 * Gère la recherche de recettes en fonction de la saisie utilisateur.
 * 
 * Cette fonction filtre les recettes en fonction d'une requête utilisateur 
 * (nom, description ou ingrédients) et met à jour l'affichage. Si la requête 
 * ne retourne aucune recette, elle affiche un message d'erreur personnalisé.
 * 
 * @param {Array} recipes - Tableau contenant toutes les recettes.
 * @param {string} query - La saisie de l'utilisateur dans la barre de recherche.
 */
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
    initDropdownIngredient(filteredRecipes);
    initDropdownAppliances(filteredRecipes);
    initDropdownUstensiles(filteredRecipes);
    // Vérifier et afficher le message
    displayNoResultsMessage(query, filteredRecipes, "no-results-message");
  } else {
    displayRecipes(recipes); // Affiche toutes les recettes si la saisie est inférieure à 3 caractères
    displayNoResultsMessage(query, recipes, "no-results-message");
  }
}


/**
 * Gère l'effacement du champ de recherche.
 * 
 * Cette fonction est associée à un bouton croix pour vider la barre de recherche.
 * Lorsqu'elle est déclenchée, elle remet à zéro le champ de saisie, recharge 
 * la liste complète des recettes et masque le message d'erreur.
 * 
 * @param {string} searchId - L'ID de l'élément input à vider.
 * @param {string} clearIconId - L'ID de l'icône croix pour réinitialiser la recherche.
 * @param {Array} recipes - Tableau contenant toutes les recettes.
 */
export function clearInput(searchId, clearIconId, recipes) {
    const searchInput = document.getElementById(searchId);
    const clearIcon = document.getElementById(clearIconId);
    clearIcon.addEventListener("click", function () {
      console.log("click");
      console.log(clearIcon);
      searchInput.value = "";
      searchInput.focus();
      displayRecipes(recipes);
      displayNoResultsMessage("", recipes, "no-results-message");
    });
  }
  

/**
 * Affiche ou masque un message d'erreur si aucune recette ne correspond à la recherche.
 * 
 * Cette fonction vérifie si la recherche utilisateur ne retourne aucune recette. 
 * Si tel est le cas, elle affiche un message d'erreur contenant la saisie de l'utilisateur. 
 * Sinon, elle masque le message d'erreur.
 * 
 * @param {string} inputValue - La requête utilisateur (contenu de la barre de recherche).
 * @param {Array} recipes - Les recettes correspondant à la requête.
 * @param {string} containerId - L'ID de l'élément HTML où afficher le message d'erreur.
 */
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
  