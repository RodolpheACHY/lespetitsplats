import { getRecipes } from "../models/index.js";
import {
  toggleIngredientsList,
  toggleAppliancesList,
  toggleUstensilesList,
  toggleRotate,
  handleSearchListIngredients,
  handleSearchListAppliances,
  handleSearchListUstensiles,
  displayRecipes,
  initDropdownIngredient,
  initDropdownAppliances,
  initDropdownUstensiles,
  handleSearch,
  clearInput,
  handleSubmit,
  displayTags
} from "../functions.js";

function init() {
  // affichage des listes au clic
  const dropdownBtnIngredients = document.getElementById(
    "dropdownBtnIngredients"
  );
  dropdownBtnIngredients.addEventListener("click", toggleIngredientsList);
  const dropdownBtnDevices = document.getElementById("dropdownBtnDevices");
  dropdownBtnDevices.addEventListener("click", toggleAppliancesList);
  const dropdownBtnUstensiles = document.getElementById(
    "dropdownBtnUstensiles"
  );
  dropdownBtnUstensiles.addEventListener("click", toggleUstensilesList);

  // rotation du chevron dans le bouton de liste
  const buttons = document.querySelectorAll(".main__dropbtn");
  buttons.forEach((button) => {
    button.addEventListener("click", toggleRotate);
  });
  
  // gère le filtre des ingrédients affichés dans le dropdown
  const inputSearchIngredient = document.getElementById(
    "inputSearchIngredient"
  );
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


  //submit des recherche via l'input et via le bouton 
  const searchButton = document.getElementById("header__search-container__button");
  const searchInput = document.getElementById("header__search-container__input");
  
  searchInput.addEventListener("input", () => handleSearch(recipes, searchInput.value));
  searchButton.addEventListener("click", () => handleSearch(recipes, searchInput.value));

  // affiche les recettes
  displayRecipes(recipes);

  // affichage initial des listes
  initDropdownIngredient(recipes);
  initDropdownAppliances(recipes);
  initDropdownUstensiles(recipes);
  
  //affichage des tags
  displayTags();

  handleSearchListIngredients();

  // clear inputs
  clearInput("header__search-container__input", "input-xmark-icon", recipes);
  clearInput("inputSearchIngredient", "iconXmarkInputIngredients", recipes);
  clearInput("inputSearchDevice", "iconXmarkInputDevices", recipes);
  clearInput("inputSearchUstensile", "iconXmarkInputUstensiles", recipes);
}

//init();
document.addEventListener("DOMContentLoaded", init);
