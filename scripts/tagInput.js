import {
    getSelectedIngredients,
    getSelectedAppliances,
    getSelectedUstensiles,
    getIngredientList,
    getApplianceList,
    getUstensilesList,
} from "./store.js";

import {
    capitalizeFirstLetter
} from "./utils.js";

import {
    createListItem,
    createModifiedListItem
} from "./listUtils.js"


/**
 * Affiche les ingrédients filtrés ou tous les ingrédients.
 * 
 * Cette fonction met à jour dynamiquement le menu déroulant des ingrédients. 
 * Elle affiche d'abord les ingrédients sélectionnés, puis les ingrédients 
 * non sélectionnés.
 * 
 * @param {Array|null} filteredIngredients - Liste d'ingrédients filtrés (facultatif).
 */
export function displayFilteredIngredients(filteredIngredients = null) {
  const ingredientsToDisplay = getIngredientsToDisplay(filteredIngredients);
  const ingredientsList = document.getElementById("dropdownMenuIngredients");
  ingredientsList.innerHTML = "";
  displaySelectedIngredients(ingredientsList);
  displayUnselectedIngredients(ingredientsList, ingredientsToDisplay);
}

/**
 * Affiche les appareils filtrés ou tous les appareils.
 * 
 * Cette fonction met à jour dynamiquement le menu déroulant des appareils.
 * Elle affiche d'abord les appareils sélectionnés, puis les appareils 
 * non sélectionnés.
 * 
 * @param {Array|null} filteredAppliances - Liste d'appareils filtrés (facultatif).
 */
export function displayFilteredAppliances(filteredAppliances = null) {
   const appliancesToDisplay = getAppliancesToDisplay(filteredAppliances);
   const appliancesList = document.getElementById("dropdownMenuDevices");
   appliancesList.innerHTML = "";
   displaySelectedAppliances(appliancesList);
   displayUnselectedAppliances(appliancesList, appliancesToDisplay);
   //const appliances = getApplianceList();
 }
 
/**
 * Affiche les ustensiles filtrés ou tous les ustensiles.
 * 
 * Cette fonction met à jour dynamiquement le menu déroulant des ustensiles.
 * Elle affiche d'abord les ustensiles sélectionnés, puis les ustensiles 
 * non sélectionnés.
 * 
 * @param {Array|null} filteredUstensiles - Liste d'ustensiles filtrés (facultatif).
 */
export function displayFilteredUstensiles(filteredUstensiles = null) {
   const ustensilesToDisplay = getUstensilesToDisplay(filteredUstensiles);
   const ustensilesList = document.getElementById("dropdownMenuUstensiles");
   ustensilesList.innerHTML = "";
   displaySelectedUstensiles(ustensilesList);
   displayUnselectedUstensiles(ustensilesList, ustensilesToDisplay);
}

/**
 * Récupère les ingrédients à afficher (filtrés ou tous).
 * 
 * @param {Array|null} filteredIngredients - Liste d'ingrédients filtrés.
 * @returns {Array} - Les ingrédients à afficher.
 */
export function getIngredientsToDisplay(filteredIngredients) {
  const allIngredients = getIngredientList();
  return filteredIngredients || allIngredients;
}

/**
 * Récupère les appareils à afficher (filtrés ou tous).
 * 
 * @param {Array|null} filteredAppliances - Liste d'appareils filtrés.
 * @returns {Array} - Les appareils à afficher.
 */
export function getAppliancesToDisplay(filteredAppliances) {
    const allAppliances = getApplianceList();
    return filteredAppliances || allAppliances;
}

/**
 * Récupère les ustensiles à afficher (filtrés ou tous).
 * 
 * @param {Array|null} filteredUstensiles - Liste d'ustensiles filtrés.
 * @returns {Array} - Les ustensiles à afficher.
 */
export function getUstensilesToDisplay(filteredUstensiles) {
  const allUstensiles = getUstensilesList();
  return filteredUstensiles || allUstensiles;
}

/**
 * Affiche les ingrédients sélectionnés dans le dropdown
 * 
 * @param {HTMLElement} ingredientsList - Conteneur du menu déroulant des ingrédients.
 */
export function displaySelectedIngredients(ingredientsList) {
  getSelectedIngredients().forEach((ingredient) => {
    const capitalizedIngredient = capitalizeFirstLetter(ingredient);
    const li = createModifiedListItem(capitalizedIngredient, "ingredient", true);
    ingredientsList.appendChild(li);
  });
}

/**
 * Affiche les ingrédients non sélectionnés dans le dropdown
 * 
 * @param {HTMLElement} ingredientsList - Conteneur du menu déroulant des ingrédients.
 * @param {Array} ingredientsToDisplay - Liste des ingrédients à afficher.
 */
export function displayUnselectedIngredients(ingredientsList, ingredientsToDisplay) {
  const selectedIngredients = getSelectedIngredients().map(i => i.toLowerCase());
  ingredientsToDisplay.forEach((ingredient) => {
    if (!selectedIngredients.includes(ingredient.toLowerCase())) {
      const capitalizedIngredient = capitalizeFirstLetter(ingredient);
      const li = createListItem(capitalizedIngredient, "ingredient", false);
      ingredientsList.appendChild(li);
    }
  });
}

/**
 * Affiche les appareils sélectionnés dans le dropdown.
 * 
 * @param {HTMLElement} appliancesList - Conteneur du menu déroulant des appareils.
 */
export function displaySelectedAppliances(appliancesList) {
    getSelectedAppliances().forEach((appliance) => {
      const capitalizedAppliance = capitalizeFirstLetter(appliance);
      const li = createModifiedListItem(capitalizedAppliance, "appliance", true);
      appliancesList.appendChild(li);
    });
  }

/**
 * Affiche les appareils non sélectionnés dans le dropdown.
 * 
 * @param {HTMLElement} appliancesList - Conteneur du menu déroulant des appareils.
 * @param {Array} appliancesToDisplay - Liste des appareils à afficher.
 */
export function displayUnselectedAppliances(appliancesList, appliancesToDisplay) {
    const selectedAppliances = getSelectedAppliances().map(i => i.toLowerCase());
    appliancesToDisplay.forEach((appliance) => {
      if(!selectedAppliances.includes(appliance.toLowerCase())) {
        const capitalizedAppliance = capitalizeFirstLetter(appliance);
        const li = createListItem(capitalizedAppliance, "appliance", false);
        appliancesList.appendChild(li);
      }
    });
}  

/**
 * Affiche les ustensiles sélectionnés dans le dropdown
 * 
 * @param {HTMLElement} ustensilesList - Conteneur du menu déroulant des ustensiles.
 */
export function displaySelectedUstensiles(ustensilesList) {
    getSelectedUstensiles().forEach((ustensil) => {
      const capitalizedUstensile = capitalizeFirstLetter(ustensil);
      const li = createModifiedListItem(capitalizedUstensile, "ustensil", true);
      ustensilesList.appendChild(li);
    });
}

/**
 * Affiche les ustensiles non sélectionnés dans le dropdown
 * 
 * @param {HTMLElement} ustensilesList - Conteneur du menu déroulant des ustensiles.
 * @param {Array} ustensilesToDisplay - Liste des ustensiles à afficher.
 */
export function displayUnselectedUstensiles(ustensilesList, ustensilesToDisplay) {
    const selectedUstensiles = getSelectedUstensiles().map(i => i.toLowerCase());
    ustensilesToDisplay.forEach((ustensil) => {
      if (!selectedUstensiles.includes(ustensil.toLowerCase())) {
        const capitalizedUstensile = capitalizeFirstLetter(ustensil);
        const li = createListItem(capitalizedUstensile, "ustensil", false);
        ustensilesList.appendChild(li);
      }
    });
}