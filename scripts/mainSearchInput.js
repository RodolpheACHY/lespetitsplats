import { displayRecipes } from "./cards.js";
import { initDropdownIngredient,
         initDropdownAppliances,
         initDropdownUstensiles
 } from "./dropdownInit.js";
import { displayFilteredRecipes } from "./mainSearchTag.js";
import {
  getSelectedIngredients,
  getSelectedAppliances,
  getSelectedUstensiles,
} from "./store.js";

/**
 * Gère la recherche de recettes en fonction de la saisie utilisateur.
 * 
 * Cette fonction utilise la saisie utilisateur pour filtrer les recettes
 * en combinaison avec les tags sélectionnés, puis met à jour l'affichage.
 * 
 * @param {Array} recipes - Tableau contenant toutes les recettes.
 * @param {string} query - La saisie de l'utilisateur dans la barre de recherche.
 */
export function handleSearch(recipes, query) {

  // Récupérer les ingrédients, appareils et ustensiles sélectionnés 
  const selectedIngredients = getSelectedIngredients();
  const selectedAppliances = getSelectedAppliances();
  const selectedUstensiles = getSelectedUstensiles();

  // Obtenir les recettes filtrées en tenant compte des tags et de la recherche
  const filteredRecipes = displayFilteredRecipes(query, selectedIngredients, selectedAppliances, selectedUstensiles);

  // Mise à jour de l'affichage des recettes
  displayRecipes(filteredRecipes);

  // Mise à jour des dropdowns avec les recettes filtrées
  initDropdownIngredient(filteredRecipes);
  initDropdownAppliances(filteredRecipes);
  initDropdownUstensiles(filteredRecipes);

  // Affichage du message si nécessaire
  displayNoResultsMessage(query, filteredRecipes, "no-results-message");
}

/**
 * Gère l'effacement du champ de recherche.
 * 
 * Cette fonction est associée à un bouton croix pour vider la barre de recherche.
 * Elle réinitialise la recherche tout en conservant les tags sélectionnés.
 * 
 * @param {string} searchId - L'ID de l'élément input à vider.
 * @param {string} clearIconId - L'ID de l'icône croix pour réinitialiser la recherche.
 * @param {Array} recipes - Tableau contenant toutes les recettes.
 */
export function clearInput(searchId, clearIconId, recipes) {
    const searchInput = document.getElementById(searchId);
    const clearIcon = document.getElementById(clearIconId);
    
    clearIcon.addEventListener("click", function () {
      searchInput.value = "";
      searchInput.focus();
      
      // Obtenir les recettes filtrées avec une recherche vide (conserve les tags)
      //const filteredRecipes = displayFilteredRecipes("");
      
      // Mise à jour de l'affichage
      //displayRecipes(filteredRecipes);
      document.dispatchEvent(new CustomEvent("filtersUpdated"));
      displayNoResultsMessage("", filteredRecipes, "no-results-message");
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