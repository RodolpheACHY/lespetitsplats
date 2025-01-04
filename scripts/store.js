let ingredientsList = []; // ce tableau va contenir tous les ingrédients de la lsite
let appliancesList = []; // ce tableau va recevoir les Appliances cliqués pour filtrer les recettes
let ustensilesList = [];

const selectedIngredients = [""]; // ce tableau contient tous les ingrédients sélectionnés pour la recherhe 
const selectedAppliances = ["Blender"];
const selectedUstensiles = ["Bol"];

export function setIngredientList(list) {
  console.log('ingredients list', list);
  ingredientsList = list;
}
export function getIngredientList() {
  return ingredientsList;
}
export function setSelectedIngredients(list) {
  selectedIngredients = list;
}
export function getSelectedIngredients() {
  //console.log("getSelectedIngredients", selectedIngredients);
  return selectedIngredients;
}
export function getApplianceList() {
  return appliancesList;
}
export function setApplianceList(list) {
  appliancesList = list;
}
export function getUstensilesList() {
  return ustensilesList;
}
export function setUstensilesList(list) {
  ustensilesList = list;
}

export function setSelectedAppliances(list) {
  selectedAppliances = list;
}
export function getSelectedAppliances() {
  return selectedAppliances;
}

export function setSelectedUstensiles(list) {
  selectedUstensiles = list;
}
export function getSelectedUstensiles() {
  return selectedUstensiles;
}
