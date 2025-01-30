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
import { sanitizeInput } from "../utils.js";

/**
 * Fonction principale qui initialise l'application.
 * 
 * Cette fonction configure :
 * - Les événements de clic et d'entrée pour les menus déroulants.
 * - La gestion de la recherche (barre de recherche principale et menus déroulants).
 * - L'affichage initilal des recettes, des filtres, et des des tags.
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

  // Empèche les datas des recettes
  const form = document.getElementById("header__search-container__form");
  form.addEventListener('submit', handleSubmit);


  // Recherche via la barre principale
  const searchButton = document.getElementById("header__search-container__button");
  const searchInput = document.getElementById("header__search-container__input");
  
  // Recherche déclenchée à chaque saisie dans la barre principale
  searchInput.addEventListener("input", () => {
  const sanatyzedInputValue = sanitizeInput(searchInput.value);
    handleSearch(sanatyzedInputValue);
  });

  // Recherche déclenchée au clic sur le bouton de recherche
  searchButton.addEventListener("click", () => {
  const sanatyzedInputValue = sanitizeInput(searchInput.value);
    handleSearch(sanatyzedInputValue);
  });

  // Affichage initial des recettes
  displayRecipes(recipes);

  // Affichage initial des listes des dropdowns
  initDropdownIngredient(recipes);
  initDropdownAppliances(recipes);
  initDropdownUstensiles(recipes);
  
  // Affichage des tags sélectionnés
  displayTags();

  // Effacement des champs de saisie (barre principale et dropdowns)
  clearInput("header__search-container__input", "input-xmark-icon", recipes);
  clearInput("inputSearchIngredient", "iconXmarkInputIngredients", recipes);
  clearInput("inputSearchDevice", "iconXmarkInputDevices", recipes);
  clearInput("inputSearchUstensile", "iconXmarkInputUstensiles", recipes);

  // Recherche déclenchée lorsqu'un événement personnalisé "filtersUpdated" est émis
  document.addEventListener("filtersUpdated", () => handleSearch(searchInput.value));
}

// Initialise l'application une fois le DOM chargé
document.addEventListener("DOMContentLoaded", init);