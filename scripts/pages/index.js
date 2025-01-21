import { getRecipes } from "../models/index.js";
import { handleSubmit } from "../utils.js";
import {
  initDropdownIngredient,
  initDropdownAppliances,
  initDropdownUstensiles,
} from "../dropdownInit.js";
import {
  toggleIngredientsList,
  toggleAppliancesList,
  toggleUstensilesList,
  toggleRotate
} from "../dropdownToggle.js";
import {
  handleSearchListIngredients,
  handleSearchListAppliances,
  handleSearchListUstensiles,
} from "../dropdownSearchInput.js";
import { 
  handleSearch,
  clearInput,
 } from "../mainSearchInput.js";
import { displayRecipes } from "../cards.js";
import { displayTags } from "../tagSelected.js";
import { displayFilteredRecipes } from "../mainSearchTag.js";


/**
 * Fonction principale qui initialise toute l'application.
 * 
 * Cette fonction configure :
 * - Les événements de clic et d'entrée pour les menus déroulants.
 * - La gestion de la recherche (barre de recherche principale et menus).
 * - L'affichage des recettes et des tags.
 */
function init() {
  // Gère l'affichage des listes au clic sur les boutons dropdown
  const dropdownBtnIngredients = document.getElementById("dropdownBtnIngredients");
  dropdownBtnIngredients.addEventListener("click", toggleIngredientsList);
  const dropdownBtnDevices = document.getElementById("dropdownBtnDevices");
  dropdownBtnDevices.addEventListener("click", toggleAppliancesList);
  const dropdownBtnUstensiles = document.getElementById("dropdownBtnUstensiles");
  dropdownBtnUstensiles.addEventListener("click", toggleUstensilesList);

  // Gère la rotation des icônes de chevrons dans les boutons dropdown
  const buttons = document.querySelectorAll(".main__dropbtn");
  buttons.forEach((button) => {button.addEventListener("click", toggleRotate);});
  
  // gère le filtre des ingrédients affichés dans le dropdown
  const inputSearchIngredient = document.getElementById("inputSearchIngredient");
  inputSearchIngredient.addEventListener("input", handleSearchListIngredients);

  // gère le filtre des appareils affichés dans le dropdown
  const inputSearchDevice = document.getElementById("inputSearchDevice");
  inputSearchDevice.addEventListener("input", handleSearchListAppliances);

  // gère le filtre des ustensiles affichés dans le dropdown
  const inputSearchUstensile = document.getElementById("inputSearchUstensile");
  inputSearchUstensile.addEventListener("input", handleSearchListUstensiles);

  // Récupère les datas des recettes
  const recipes = getRecipes();

  //empèche les datas des recettes
  const form = document.getElementById("header__search-container__form");
  form.addEventListener('submit', handleSubmit);


  // Recherche via la barre principale
  const searchButton = document.getElementById("header__search-container__button");
  const searchInput = document.getElementById("header__search-container__input");
  
  // Recherche déclenchée à chaque saisie dans la barre principale
  searchInput.addEventListener("input", () => handleSearch(recipes, searchInput.value));

  // Recherche déclenchée au clic sur le bouton de recherche
  searchButton.addEventListener("click", () => handleSearch(recipes, searchInput.value));

  // affiche les recettes initiales
  displayRecipes(recipes);

  // affichage initial des listes des dropdowns
  initDropdownIngredient(recipes);
  initDropdownAppliances(recipes);
  initDropdownUstensiles(recipes);
  
  //affichage des tags sélectionnés
  displayTags();

  // handleSearchListIngredients();

  // clear inputs
  clearInput("header__search-container__input", "input-xmark-icon", recipes);
  clearInput("inputSearchIngredient", "iconXmarkInputIngredients", recipes);
  clearInput("inputSearchDevice", "iconXmarkInputDevices", recipes);
  clearInput("inputSearchUstensile", "iconXmarkInputUstensiles", recipes);

  const logo = document.getElementById("header__logo");
  //logo.addEventListener("click", displayFilteredRecipes);
  logo.addEventListener("click", handleSearch);
}

//init();
document.addEventListener("DOMContentLoaded", init);
