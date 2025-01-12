// Tableau contenant tous les ingédients
let ingredientsList = []; 

// Tableau contenant tous les appareils 
let appliancesList = []; 

// Tableau contenant tous les ustensiles
let ustensilesList = [];

// tableaux contenant les éléments sélectionnés pour la recherhe
const selectedIngredients = []; 
const selectedAppliances = [];
const selectedUstensiles = [];


/**
 * Met à jour la liste générale des ingrédients.
 * 
 * @param {Array} list - Tableau contenant tous les ingrédients.
 */
export function setIngredientList(list) {
  console.log("ingredients list", list);
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
 * @param {Array} list - Tableau contenant les ingrédients sélectionnés.
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
 * Met à jour la liste générale des appareils.
 * 
 * @param {Array} list - Tableau contenant tous les appareils.
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
 * à la liste correspondante.
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
}
