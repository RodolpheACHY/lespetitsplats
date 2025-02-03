// Tableau contenant tous les ingédients disponibles
let ingredientsList = [];

// Tableau contenant tous les appareils disponibles
let appliancesList = [];

// Tableau contenant tous les ustensiles disponibles
let ustensilesList = [];

// tableaux contenant les éléments sélectionnés pour la recherhe
const selectedIngredients = [];
const selectedAppliances = [];
const selectedUstensiles = [];

/**
 * Met à jour la liste générale des ingrédients.
 *
 * @param {Array} list - Tableau contenant les nouveaux ingrédients disponibles
 */
export function setIngredientList(list) {
  ingredientsList = list;
}

/**
 * Récupère la liste générale des ingrédients.
 *
 * @returns {Array} - La liste des ingrédients actuellement disponibles.
 */
export function getIngredientList() {
  return ingredientsList;
}

/**
 * Met à jour la liste des ingrédients sélectionnés pour la recherche.
 *
 * @param {Array} list - Tableau contenant les nouveaux ingrédients sélectionnés.
 */
export function setSelectedIngredients(list) {
  selectedIngredients = list;
}

/**
 * Récupère la liste des ingrédients sélectionnés.
 *
 * @returns {Array} - La liste des ingrédients actuellement sélectionnés.
 */
export function getSelectedIngredients() {
  //console.log("getSelectedIngredients", selectedIngredients);
  return selectedIngredients;
}

/**
 * Récupère la liste générale des appareils.
 *
 * @returns {Array} - La liste des appareils actuellement disponibles.
 */
export function getApplianceList() {
  return appliancesList;
}

/**
 * Met à jour la liste générale des appareils disponibles
 *
 * @param {Array} list - La liste actuelle des appareils disponibles.
 */
export function setApplianceList(list) {
  appliancesList = list;
}

/**
 * Met à jour la liste des appareils sélectionnés pour la recherche.
 *
 * @param {Array} list - Tableau contenant les appareils sélectionnés.
 */
export function setSelectedAppliances(list) {
  selectedAppliances = list;
}

/**
 * Récupère la liste des appareils sélectionnés.
 *
 * @returns {Array} - La liste des appareils actuellement sélectionnés.
 */
export function getSelectedAppliances() {
  return selectedAppliances;
}

/**
 * Récupère la liste générale des ustensiles.
 *
 * @returns {Array} - La liste des ustensiles actuellement disponibles.
 */
export function getUstensilesList() {
  return ustensilesList;
}

/**
 * Met à jour la liste des ustensiles sélectionnés pour la recherche.
 *
 * @param {Array} list - Tableau contenant les ustensiles sélectionnés.
 */
export function setUstensilesList(list) {
  ustensilesList = list;
}

/**
 * Met à jour la liste des ustensiles sélectionnés pour la recherche.
 *
 * @param {Array} list - Tableau contenant les ustensiles sélectionnés.
 */
export function setSelectedUstensiles(list) {
  selectedUstensiles = list;
}

/**
 * Récupère la liste des ustensiles sélectionnés.
 *
 * @returns {Array} - La liste des ustensiles actuellement sélectionnés.
 */
export function getSelectedUstensiles() {
  return selectedUstensiles;
}

/**
 * Ajoute un élément sélectionné (ingrédient, appareil ou ustensile)
 * à la liste correspondante et déclenche l'événement "filtersUpdated".
 *
 * @param {string} item - L'élément à ajouter.
 * @param {string} type - Le type de l'élément (ex. "ingredient", "appliance", "ustensil").
 */
export function addSelectedItem(item, type) {
  switch (type) {
    case "ingredient":
      selectedIngredients.push(item);
      break;
    case "appliance":
      selectedAppliances.push(item);
      break;
    case "ustensil":
      selectedUstensiles.push(item);
      break;
    default:
      console.error("error unknown type", item, type);
      break;
  }
  // Déclenche un événement personnalisé pour mettre à jour les filtres
  document.dispatchEvent(new CustomEvent("filtersUpdated"));
}

/**
 * supprime un élément sélectionné (ingrédient, appareil ou ustensile)
 * à la liste correspondante.
 *
 * @param {string} item - L'élément à supprimer.
 * @param {string} type - Le type de l'élément (ex. "ingredient", "appliance", "ustensil").
 */
export function removeSelectedItem(item, type) {
  const removeItemFromArray = (item, array) => {
    const i = array.findIndex((arrayItem) => arrayItem === item);
    if (i > -1) {
      array.splice(i, 1);
    }
  };
  switch (type) {
    case "ingredient":
      removeItemFromArray(item, selectedIngredients);
      break;
    case "appliance":
      removeItemFromArray(item, selectedAppliances);
      break;
    case "ustensil":
      removeItemFromArray(item, selectedUstensiles);
      break;
    default:
      console.error("error unknown type", item, type);
      break;
  }
  // Déclenche un événement personnalisé pour mettre à jour les filtres
  document.dispatchEvent(new CustomEvent("filtersUpdated"));
}
