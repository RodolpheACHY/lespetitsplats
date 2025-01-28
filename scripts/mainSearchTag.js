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

/**
 * Vérifie si une recette correspond à une requête de recherche.
 *
 * @param {Object} recipe - L'objet recette à vérifier.
 * @param {string} trimmedQuery - La requête de recherche trimée à vérifier.
 * @returns {boolean} Renvoie vrai si la requête correspond à une partie du nom,
 *                    de la description ou des ingrédients de la recette, sinon faux.
 */
function matchesSearch(recipe, trimmedQuery) {
  if (trimmedQuery.length < 3) return true;
  
    // Vérification du nom de la recette
    if (recipe.name.toLowerCase().includes(trimmedQuery)) {
      return true;
    }

    // Vérification de la description de la recette
    if (recipe.description.toLowerCase().includes(trimmedQuery)) {
      return true;
    }

    // Vérification des ingrédients de la recette
    for (let i = 0; i < recipe.ingredients.length; i++) {
      if (recipe.ingredients[i].ingredient.toLowerCase().includes(trimmedQuery)) {
        return true;
      }
    }

    return false;
}
