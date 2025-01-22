import { getRecipes } from "./models/index.js";
import {
  getSelectedIngredients,
  getSelectedAppliances,
  getSelectedUstensiles,
} from "./store.js";

/**
 * Gère la recherche de recettes en fonction des tags sélectionnés et de la saisie utilisateur.
 *
 * Cette fonction filtre les recettes en fonction des tags sélectionnés dans le dropdown
 * et de la recherche principale, puis met à jour l'affichage.
 * @param {string} searchQuery - La saisie de l'utilisateur dans la barre de recherche principale
 * @return {Array} - un tableau contenant les recettes filtrées
 */
export function displayFilteredRecipes(
  searchQuery = "",
  selectedIngredients = [],
  selectedAppliances = [],
  selectedUstensiles = []
) {
  const t0 = performance.now();

  const recipes = getRecipes();
  /* const selectedIngredients = getSelectedIngredients();
    const selectedAppliances = getSelectedAppliances();
    const selectedUstensiles = getSelectedUstensiles(); */

  // On s'assure que searchQuery est bien une chaîne de caractères
  const trimmedQuery = (searchQuery || "").toString().trim().toLowerCase();

  const filteredRecipes = recipes.filter((recipe) => {
    // Si aucun filtre n'est actif et la recherche est vide ou < 3 caractères
    /* if (selectedIngredients.length === 0 && 
            selectedAppliances.length === 0 && 
            selectedUstensiles.length === 0 && 
            trimmedQuery.length < 3) {
            return true;
        } */

    // Vérification des ingrédients sélectionnés
    const hasMatchingIngredients =
      selectedIngredients.length === 0 ||
      selectedIngredients.every((selectedIngredient) =>
        recipe.ingredients.some(
          (recipeIngredient) =>
            recipeIngredient.ingredient.toLowerCase() ===
            selectedIngredient.toLowerCase()
        )
      );

    // Vérification des appareils sélectionnés
    const hasMatchingAppliance =
      selectedAppliances.length === 0 ||
      selectedAppliances.includes(recipe.appliance.toLowerCase());

    // Vérification des ustensiles sélectionnés
    const hasMatchingUstensils =
      selectedUstensiles.length === 0 ||
      selectedUstensiles.every((selectedUstensil) =>
        recipe.ustensils.some(
          (recipeUstensil) =>
            recipeUstensil.toLowerCase() === selectedUstensil.toLowerCase()
        )
      );

    // Vérification de la recherche principale (si plus de 3 caractères)
    const matchesSearch =
      trimmedQuery.length < 3 ||
      recipe.name.toLowerCase().includes(trimmedQuery) ||
      recipe.description.toLowerCase().includes(trimmedQuery) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(trimmedQuery)
      );

    // La recette doit correspondre à TOUS les critères
    return (
      hasMatchingIngredients &&
      hasMatchingAppliance &&
      hasMatchingUstensils &&
      matchesSearch
    );
  });

  const t1 = performance.now();
  console.log(`Call to displayFilteredRecipes took ${
    t1 - t0
  } milliseconds for ${searchQuery}
  ${selectedIngredients}
  ${selectedAppliances}
  ${selectedUstensiles}`);
  return filteredRecipes;
}
