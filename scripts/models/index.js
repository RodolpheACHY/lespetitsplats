import { recipes } from "../../data/recipes.js"; 

/**
 * Récupère toutes les recettes à partir des données importées.
 * 
 * Cette fonction :
 * - Importe les recettes à partir du fichier `recipes.js`.
 * - Affiche ces recettes dans la console pour vérification.
 * - Retourne les recettes sous forme de tableau.
 * 
 * @returns {Array} - Tableau contenant toutes les recettes.
 * 
 * @example
 * // Exemple d'utilisation
 * const allRecipes = getRecipes();
 * console.log(allRecipes); // Affiche toutes les recettes disponibles
 */

export function getRecipes() {
    console.log(recipes);
    return recipes;
}
