import { getRecipes } from "./models/index.js";

/**
 * Gère la recherche de recettes en fonction des tags sélectionnés et de la saisie utilisateur.
 * 
 * Cette fonction filtre les recettes selon :
 * - Les ingrédients sélectionnés.
 * - Les appareils sélectionnés.
 * - Les ustensiles sélectionnés.
 * - Une recherche textuelle saisie par l'utilisateur.
 *
 * @param {string} searchQuery - La saisie de l'utilisateur dans la barre de recherche principale.
 * @param {Array} selectedIngredients - Liste des ingrédients sélectionnés.
 * @param {Array} selectedAppliances - Liste des appareils sélectionnés.
 * @param {Array} selectedUstensiles - Liste des ustensiles sélectionnés.
 * @returns {Array} - Un tableau contenant les recettes filtrées.
 */
export function displayFilteredRecipes(
  searchQuery = "",
  selectedIngredients = [],
  selectedAppliances = [],
  selectedUstensiles = []
) {

    // Récupération de la liste complète des recettes  
    const recipes = getRecipes();
   
    // Nettoie la saisie utilisateur : conversion en string, suppression des espaces et conversion en minuscules
    const trimmedQuery = (searchQuery || "").toString().trim().toLowerCase();

    // Filtrage des recettes selon les critères de recherche
    const filteredRecipes = recipes.filter((recipe) => {
      
    // Vérifie si tous les ingrédients sélectionnés sont présents dans la recette
    const hasMatchingIngredients =
      selectedIngredients.length === 0 ||
      selectedIngredients.every((selectedIngredient) =>
        recipe.ingredients.some(
          (recipeIngredient) =>
            recipeIngredient.ingredient.toLowerCase() ===
            selectedIngredient.toLowerCase()
                )
            );

    // Vérifie si les appareils sélectionnés sont ceux utilisés dans la recette
    const hasMatchingAppliance =
      selectedAppliances.length === 0 ||
            selectedAppliances.includes(recipe.appliance.toLowerCase());

    // Vérifie si tous les ustensiles sélectionnés sont présents dans la recette
    const hasMatchingUstensils =
      selectedUstensiles.length === 0 ||
      selectedUstensiles.every((selectedUstensil) =>
        recipe.ustensils.some(
          (recipeUstensil) =>
                    recipeUstensil.toLowerCase() === selectedUstensil.toLowerCase()
                )
            );

     // Vérifie si la recherche textuelle correspond au nom, à la description ou aux ingrédients
    const matchesSearch =
      trimmedQuery.length < 3 ||  // Recherche ignorée si moins de 3 caractères
            recipe.name.toLowerCase().includes(trimmedQuery) ||
            recipe.description.toLowerCase().includes(trimmedQuery) ||
      recipe.ingredients.some((ingredient) =>
                ingredient.ingredient.toLowerCase().includes(trimmedQuery)
        );

        // La recette doit correspondre à TOUS les critères pour être incluse
    return (
      hasMatchingIngredients &&
               hasMatchingAppliance && 
               hasMatchingUstensils && 
      matchesSearch
    );
    });

    // Retourne la liste des recettes filtrées
    return filteredRecipes;
}
