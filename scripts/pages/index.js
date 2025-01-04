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
  //displayIngredients,
  displayAppliances,
  displayUstensiles,
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

  // affiche les recettes
  displayRecipes(recipes);
  //countRecipes(recipes);

  // affichage des listes
  initDropdownIngredient(recipes);
  initDropdownAppliances(recipes);
  initDropdownUstensiles(recipes);
  //displayIngredients(recipes);
  displayAppliances(recipes);
  displayUstensiles(recipes);

  handleSearch(recipes);

  //handleSearchIngredients();
  handleSearchListIngredients();
  //clearInput();
  //clearInputDropdown();

  // clear inputs
  clearInput("header__search-container__input", "input-xmark-icon");
  clearInput("inputSearchIngredient", "iconXmarkInputIngredients");
  clearInput("inputSearchDevice", "iconXmarkInputDevices");
  clearInput("inputSearchUstensile", "iconXmarkInputUstensiles");
}

//init();
document.addEventListener("DOMContentLoaded", init);
