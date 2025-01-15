import {
    setIngredientList,
    getIngredientList,
    setApplianceList,
    getApplianceList,
    setUstensilesList,
    getUstensilesList,
} from "./store.js";

import {
  displayFilteredIngredients,
  displayFilteredAppliances,
  displayFilteredUstensiles
} from "./tagInput.js";

/**
 * Initialise la liste des ingrédients pour le dropdown.
 * 
 * Cette fonction analyse les recettes fournies, extrait tous les ingrédients, 
 * les trie par ordre alphabétique et les stocke dans une liste globale. 
 * Ensuite, elle appelle la fonction `displayFilteredIngredients` pour afficher 
 * la liste dans le DOM.
 * 
 * @param {Array} recipes - Tableau contenant toutes les recettes à analyser.
 */
export function initDropdownIngredient(recipes) {
  // Créer un ensemble pour stocker tous les ingrédients
  const allIngredients = new Set();
  // Parcourir chaque recette pour récupérer tous les ingrédients
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      allIngredients.add(ingredient.ingredient.toLowerCase());
    });
  });
  //setIngredientList(Array.from(allIngredients).sort());
  setIngredientList(Array.from(allIngredients).sort((a, b) => {
    // Pour forcer le tri en français, vous pouvez spécifier 'fr'
    return a.localeCompare(b, 'fr');
  }));
  displayFilteredIngredients(getIngredientList());
}

/**
 * Initialise la liste des appareils pour le dropdown.
 * 
 * Cette fonction extrait tous les appareils uniques des recettes, les trie 
 * par ordre alphabétique et les stocke dans une liste globale. Ensuite, elle 
 * appelle `displayFilteredAppliances` pour les afficher dans le DOM.
 * 
 * @param {Array} recipes - Tableau contenant toutes les recettes à analyser.
 */
export function initDropdownAppliances(recipes) {
  // Créer un ensemble pour stocker tous les appareils
  const allAppliances = new Set();
  // Parcourir chaque recette pour récupérer tous les appareils
  recipes.forEach((recipe) => {
      allAppliances.add(recipe.appliance.toLowerCase());
  });  
  //setApplianceList(Array.from(allAppliances).sort());
  setApplianceList(Array.from(allAppliances).sort((a, b) => {
    // Pour forcer le tri en français, vous pouvez spécifier 'fr'
    return a.localeCompare(b, 'fr');
  }));
  //displayFilteredAppliances(Array.from(allAppliances));
  displayFilteredAppliances(getApplianceList());
}

/**
 * Initialise la liste des ustensiles pour le dropdown.
 * 
 * Cette fonction extrait tous les ustensiles uniques des recettes, les trie 
 * par ordre alphabétique et les stocke dans une liste globale. Ensuite, elle 
 * appelle `displayFilteredUstensiles` pour les afficher dans le DOM.
 * 
 * @param {Array} recipes - Tableau contenant toutes les recettes à analyser.
 */
export function initDropdownUstensiles(recipes) {
  // Créer un ensemble pour stocker tous les ingrédients
  const allUstensiles = new Set();
  // Parcourir chaque recette pour récupérer tous les ingrédients
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      allUstensiles.add(ustensil.toLowerCase());
    });
  });
  //setUstensilesList(Array.from(allUstensiles).sort());
  setUstensilesList(Array.from(allUstensiles).sort((a, b) => {
    return a.localeCompare(b, 'fr');
  }));
  //displayFilteredUstensiles(Array.from(allUstensiles));
  displayFilteredUstensiles(getUstensilesList());
}
