import { getRecipes } from "./models/index.js";

/**
 * Gère la recherche de recettes en fonction des tags sélectionnés et de la saisie utilisateur.
 *
 * Cette fonction filtre les recettes selon :
 *  - Les ingrédients sélectionnés
 *  - Les appareils sélectionnés
 *  - Les ustensiles sélectionnés
 *  - Une recherche textuelle saisie par l'utilisateur
 *  Elle retourne les recettes correspondantes.
 * 
 * @param {string} searchQuery - La saisie de l'utilisateur dans la barre de recherche principale
 * @param {Array} selectedIngredients - Liste des ingrédients sélectionnés
 * @param {Array} selectedAppliances - Liste des appareils sélectionnés
 * @param {Array} selectedUstensiles - Liste des ustensiles sélectionnés
 * @return {Array} - un tableau contenant les recettes filtrées
 */
export function displayFilteredRecipes(
  searchQuery = "",
  selectedIngredients = [],
  selectedAppliances = [],
  selectedUstensiles = []
) {

  // Liste pour stocker les recettes correspondantes
  const recipes = getRecipes();
  
  // On s'assure que searchQuery est bien une chaîne de caractères
  const trimmedQuery = (searchQuery || "").toString().trim().toLowerCase();

  // Liste pour stocker les recettes correspondantes
  const filteredRecipes = [];

  // Parcours de chaque recette pour vérifier si elle correspond aux critères
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
  
    // Vérification si la recette contient des ingrédients sélectionnés
    const hasMatchingIngredients =
      selectedIngredients.length === 0 ||
      selectedIngredients.every((selectedIngredient) =>
        recipe.ingredients.some(
          (recipeIngredient) =>
            recipeIngredient.ingredient.toLowerCase() ===
            selectedIngredient.toLowerCase()
        )
      );
  
    // Vérification si la recette contient des appareils sélectionnés
    const hasMatchingAppliance =
      selectedAppliances.length === 0 ||
      selectedAppliances.includes(recipe.appliance.toLowerCase());
  
    // Vérification si la recette contient des ustensiles sélectionnés
    const hasMatchingUstensils =
      selectedUstensiles.length === 0 ||
      selectedUstensiles.every((selectedUstensil) =>
        recipe.ustensils.some(
          (recipeUstensil) =>
            recipeUstensil.toLowerCase() === selectedUstensil.toLowerCase()
        )
      );
  
    // La recette doit correspondre à TOUS les critères
    if (
      hasMatchingIngredients &&
      hasMatchingAppliance &&
      hasMatchingUstensils &&
      matchesSearch(recipe, trimmedQuery)
    ) {
      filteredRecipes.push(recipe);  // Ajout de la recette si tous les critères sont respectés
    }
  }
 
  // Retourne les recettes filtrées
  return filteredRecipes;
}

/**
 * Vérifie si une recette correspond à une requête de recherche textuelle.
 * 
 *  La recherche est effectuée sur :
 *  - Le nom de la recette
 *  - La description de la recette
 *  - La liste des ingrédients
 *
 * @param {Object} recipe - L'objet représentant la recette à vérifier.
 * @param {string} trimmedQuery - La chaîne de recherche trimée à vérifier.
 * @returns {boolean} Renvoie vrai si la requête correspond à une partie du nom,
 *                    de la description ou des ingrédients de la recette, sinon faux.
 */
function matchesSearch(recipe, trimmedQuery) {
  if (trimmedQuery.length < 3) return true;
  
    // Vérification si le nom de la recette contient la recherche
    if (recipe.name.toLowerCase().includes(trimmedQuery)) {
      return true;
    }

    // Vérification si la description de la recette contient la recherche
    if (recipe.description.toLowerCase().includes(trimmedQuery)) {
      return true;
    }

    // Vérification si un des ingrédients de la recette contient la recherche
    for (let i = 0; i < recipe.ingredients.length; i++) {
      if (recipe.ingredients[i].ingredient.toLowerCase().includes(trimmedQuery)) {
        return true;
      }
    }

    // Aucune correspondance trouvée
    return false;
}
