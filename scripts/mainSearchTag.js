import { getRecipes } from "./models/index.js";

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
  
  // On s'assure que searchQuery est bien une chaîne de caractères
  const trimmedQuery = (searchQuery || "").toString().trim().toLowerCase();

  const filteredRecipes = recipes.filter((recipe) => {

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

    // La recette doit correspondre à TOUS les critères
    return (
      hasMatchingIngredients &&
      hasMatchingAppliance &&
      hasMatchingUstensils &&
      matchesSearch(recipe, trimmedQuery)
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

function matchesSearch(recipe, trimmedQuery) {
    if (trimmedQuery.length < 3) {
      return true;
    }
  
    // Vérification du nom de la recette
    for (let i = 0; i <= recipe.name.length - trimmedQuery.length; i++) {
      let match = true;
      for (let j = 0; j < trimmedQuery.length; j++) {
        if (recipe.name.toLowerCase()[i + j] !== trimmedQuery[j]) {
          match = false;
          break;
        }
      }
      if (match) return true;
    }
  
    // Vérification de la description de la recette
    for (let i = 0; i <= recipe.description.length - trimmedQuery.length; i++) {
      let match = true;
      for (let j = 0; j < trimmedQuery.length; j++) {
        if (recipe.description.toLowerCase()[i + j] !== trimmedQuery[j]) {
          match = false;
          break;
        }
      }
      if (match) return true;
    }
  
    // Vérification des ingrédients
    for (let i = 0; i < recipe.ingredients.length; i++) {
      let ingredient = recipe.ingredients[i].ingredient.toLowerCase();
      for (let k = 0; k <= ingredient.length - trimmedQuery.length; k++) {
        let match = true;
        for (let j = 0; j < trimmedQuery.length; j++) {
          if (ingredient[k + j] !== trimmedQuery[j]) {
            match = false;
            break;
          }
        }
        if (match) return true;
      }
    }
  
    return false;
}