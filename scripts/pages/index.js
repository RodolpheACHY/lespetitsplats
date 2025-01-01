import { getRecipes } from "../models/index.js";

let ingredientsList = []; // ce tableau va recevoir les ingredients cliqués pour filtrer les recettes 
let appliancesList = []; // ce tableau va recevoir les Appliances cliqués pour filtrer les recettes
let ustensilesList = [];
 
const selectedIngredients = ["ananas"];
const selectedAppliances = ["Blender"];
const selectedUstensiles = ["Bol"];


function displayRecipes(recipes) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  // const testEl = document.createElement("p");
  // testEl.textContent = "test :-)";
  recipes.forEach(function (recipe) {
    let html = `
            <div class="recipe-card">
                <aside>
                    <div class="pastil-yellow">
                        <span class="main__pasil-time">${recipe.time}mn</span>
                    </div>
                    <img src="./assets/images/${recipe.image}" alt="${recipe.name}">
                </aside>
                <article class="container-card-content">
                    <h3>${recipe.name}</h3>
                    <h4>Recette</h4>
                    <p>${recipe.description}</p>
            `;
    let htmlIngredient = "";
    if (
      recipe.ingredients &&
      Array.isArray(recipe.ingredients) &&
      recipe.ingredients.length > 0
    ) {
      htmlIngredient = `
                    <h4>Ingrédients</h4>
                    <div class="container-ingredients">
                    `;
      recipe.ingredients.forEach(function (ingredient) {
        const recipeIngredient = ingredient.ingredient || "";
        const recipeQuantity = ingredient.quantity || "";
        const recipeUnit = ingredient.unit || "";
        let htmlIngredients = `
            <div class="main__container-ingredientMesure">
                            <h5>${recipeIngredient}</h5>
                            <h6>${recipeQuantity} ${recipeUnit}</h6>
                        </div>
        `;
        htmlIngredient += htmlIngredients;
      });
      htmlIngredient += "</div>";
    }
    html += htmlIngredient;
    html += ` </article>
            </div>`;
    cardContainer.insertAdjacentHTML("beforeend", html);
  });
  console.log(recipes.length)
  countRecipes(recipes);
}

function countRecipes(recipes) {

// Sélectionner le h2 où le nombre sera affiché
const recipeCountH2 = document.getElementById("recipeCountH2");

// Afficher dynamiquement le nombre de recettes
recipeCountH2.textContent = `${recipes.length} recettes`;
}

function handleSearch(recipes) {
  const searchInput = document.getElementById(
    "header__search-container__input"
  );
  searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim().toLowerCase();
    if (query.length >= 3) {
      const filteredRecipes = recipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(query) ||
          recipe.description.toLowerCase().includes(query) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.ingredient.toLowerCase().includes(query)
          )
      );
      displayRecipes(filteredRecipes);
    } else {
      displayRecipes(recipes); // Affiche toutes les recettes si la saisie est inférieure à 3 caractères
    }
  });
}

// fonction qui affiche notre liste initiale d'ingrédients
function initDropdownIngredient(recipes) {
    // Créer un ensemble pour stocker tous les ingrédients
    const allIngredients = new Set();
    // Parcourir chaque recette pour récupérer tous les ingrédients
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        allIngredients.add(ingredient.ingredient.toLowerCase());
      });
    });
    ingredientsList = Array.from(allIngredients);
    displayFilteredIngredients(Array.from(allIngredients));
}

function handleSearchListIngredients(event) {
  event.preventDefault();

  const searchInputListIngredients = document.getElementById("inputSearchIngredient");
  const query = searchInputListIngredients.value.trim().toLowerCase();

  // Filtrer les ingrédients en fonction de la requête
    const filteredIngredients = ingredientsList.filter(
    (ingredient) => ingredient.includes(query) // Vérifie si l'ingrédient contient la requête
  );
  // On choisit notre élément qui va contenir la liste d'ingrédients filtrée
  const domIngredientsList = document.getElementById("dropdownMenuIngredients");
  // Vider les éléments dynamiques actuels avant d'ajouter de nouveaux
  Array.from(domIngredientsList.querySelectorAll("li.dynamic")).forEach((li) =>
    li.remove()
  );
  return displayFilteredIngredients(Array.from(filteredIngredients));
}

const displayFilteredIngredients = (ingredients) => {
  const ingredientsList = document.getElementById("dropdownMenuIngredients");
  Array.from(ingredientsList.querySelectorAll("li.dynamic")).forEach((li) =>
    li.remove()
  );

  selectedIngredients.forEach((ingredient) => {
    // affichage en jaune
  });
  ingredients.forEach((ingredient) => {
    if (!selectedIngredients.includes(ingredient)) {
      const capitalizedIngredient = capitalizeFirstLetter(ingredient);
      createListItem(capitalizedIngredient, ingredientsList);
    }
  });
};

function displayIngredients(recipes) {
  const ingredientsList = document.getElementById("dropdownMenuIngredients");
  // Vider les éléments dynamiques actuels avant d'ajouter de nouveaux
  Array.from(ingredientsList.querySelectorAll("li.dynamic")).forEach((li) =>
    li.remove()
  );

  const allIngredients = new Set();
  // Ajouter chaque ingrédient à la liste sous les éléments statiques
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      allIngredients.add(capitalizeFirstLetter(ingredient.ingredient));
    });
  });

  Array.from(allIngredients)
    .sort()
    .forEach((ingredient) => {
      createListItem(ingredient, ingredientsList);
    });
}

function toggleIngredientsList(recipes) {
    const dropdownMenu = document.getElementById("dropdownMenuIngredients");
    const dropdownBtnIngredients = document.getElementById(
      "dropdownBtnIngredients"
    );
    dropdownMenu.classList.toggle("show");
    dropdownBtnIngredients.classList.toggle("show");
  }

function createListItem(text, parentElement) {
  const li = document.createElement("li");
  li.classList.add("dynamic");
  li.textContent = text;
  li.addEventListener("click", () => {
    addTag(text);
    toggleDropdown(li);
    li.remove();
  })
  parentElement.appendChild(li);
}

function addTag(text) {
  const tagsContainer = document.getElementById("tags-container");
  const tag = document.createElement("span");
  tag.textContent = text;
  tag.classList.add("main__tag");
  tagsContainer.appendChild(tag);
}

function toggleDropdown(element) {
  const parentUl = element.closest('ul');
  if (parentUl) {
    parentUl.classList.toggle("show");

    const dropdownContainer = parentUl.closest('.main__dropdown');
    if (dropdownContainer) {
      const associatedBtn = dropdownContainer.querySelector('button');
      if (associatedBtn) {
        associatedBtn.classList.toggle("show");
        toggleRotate ({ currentTarget: associatedBtn });
      }
    }
  }
}

function clearInput(searchId, clearIconId) {
    const searchInput = document.getElementById(searchId);
    const clearIcon = document.getElementById(clearIconId);
    clearIcon.addEventListener("click", function () {
      console.log("click");
      console.log(clearIcon);
      searchInput.value = ""; // Vider l'input
      searchInput.focus();
    });
}
  
/*
function clearInputDropdown() {
    const searchInputDropdown = document.querySelector(".main__dropdownSearchInput");
    const dropdownXmarkIcon = document.querySelector(".main__dropdown-xmark-icon");
    dropdownXmarkIcon.addEventListener("click", function () {
        console.log("click");
        console.log(dropdownXmarkIcon);
        searchInputDropdown.value = ""; // Vider l'input
        //searchInputDropdown.focus();
    });
} */

    /*
function clearInputDropdown() {
    const SearchInputDropdown = document.querySelector(".main__dropdownSearchInput");
    const AllDropdownXmarkIcon = document.querySelectorAll(".main__dropdown-xmark-icon");
    AllDropdownXmarkIcon.forEach((button) => {
        button.addEventListener("click", () => {
            console.log("click");
            console.log(button);
            SearchInputDropdown.value = ""; // Vider l'input
            SearchInputDropdown.focus();
        });    
    });
} */

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

// fonction qui affiche notre liste initiale des appareils
function initDropdownAppliances(recipes) {
    // Créer un ensemble pour stocker tous les ingrédients
    const allAppliances = new Set();
    // Parcourir chaque recette pour récupérer tous les ingrédients
    recipes.forEach((recipe) => {
        allAppliances.add(recipe.appliance.toLowerCase());
    });
    appliancesList = Array.from(allAppliances);
    displayFilteredAppliances(Array.from(allAppliances));
}

function handleSearchListAppliances(event) {
    event.preventDefault();
  
    const searchInputListAppliances = document.getElementById("inputSearchDevice");
    const query = searchInputListAppliances.value.trim().toLowerCase();
  
    // Filtrer les appareils en fonction de la requête
      const filteredAppliances = appliancesList.filter(
      (appliance) => appliance.includes(query) // Vérifie si l'ingrédient contient la requête
    );
    // On choisit notre élément qui va contenir la liste d'ingrédients filtrée
    const domAppliancesList = document.getElementById("dropdownMenuDevices");
    // Vider les éléments dynamiques actuels avant d'ajouter de nouveaux
    Array.from(domAppliancesList.querySelectorAll("li.dynamic")).forEach((li) =>
      li.remove()
    );
    return displayFilteredAppliances(Array.from(filteredAppliances));
}

const displayFilteredAppliances = (appliance) => {
    const appliancesList = document.getElementById("dropdownMenuDevices");
    Array.from(appliancesList.querySelectorAll("li.dynamic")).forEach((li) =>
      li.remove()
    );
  
    selectedAppliances.forEach((appliance) => {
        // affichage en jaune
      });
      appliance.forEach((appliance) => {
        if (!selectedAppliances.includes(appliance)) {
          const capitalizedAppliance = capitalizeFirstLetter(appliance);
          createListItem(capitalizedAppliance, appliancesList);
        }
      });
};

function displayAppliances(recipes) {
    const appliancesList = document.getElementById("dropdownMenuDevices");
    // Vider les éléments dynamiques actuels avant d'ajouter de nouveaux
    Array.from(appliancesList.querySelectorAll("li.dynamic")).forEach((li) => 
      li.remove()
    );
  
    const allAppliances = new Set();
    // Ajouter chaque ingrédient à la liste sous les éléments statiques
    recipes.forEach((recipe) => {
      allAppliances.add(capitalizeFirstLetter(recipe.appliance));
    });
    Array.from(allAppliances)
      .sort()
      .forEach((appliance) => {
        createListItem(appliance, appliancesList)
      });
  }

function toggleAppliancesList() {
  const dropdownMenu = document.getElementById("dropdownMenuDevices");
  const dropdownBtnDevices = document.getElementById("dropdownBtnDevices");
  dropdownMenu.classList.toggle("show");
  dropdownBtnDevices.classList.toggle("show");
}

// fonction qui affiche notre liste initiale d'ingrédients
function initDropdownUstensiles(recipes) {
    // Créer un ensemble pour stocker tous les ingrédients
    const allUstensiles = new Set();
    // Parcourir chaque recette pour récupérer tous les ingrédients
    recipes.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        allUstensiles.add(ustensil.toLowerCase());
      });
    });
    ustensilesList = Array.from(allUstensiles);
    displayFilteredUstensiles(Array.from(allUstensiles));
}

function handleSearchListUstensiles(event) {
  event.preventDefault();

  const searchInputListUstensiles = document.getElementById("inputSearchUstensile");
  const query = searchInputListUstensiles.value.trim().toLowerCase();

  // Filtrer les ingrédients en fonction de la requête
    const filteredUstensiles = ustensilesList.filter(
    (ustensil) => ustensil.includes(query) // Vérifie si l'ingrédient contient la requête
  );
  // On choisit notre élément qui va contenir la liste d'ingrédients filtrée
  const domUstensilesList = document.getElementById("dropdownMenuUstensiles");
  // Vider les éléments dynamiques actuels avant d'ajouter de nouveaux
  Array.from(domUstensilesList.querySelectorAll("li.dynamic")).forEach((li) =>
    li.remove()
  );
  return displayFilteredUstensiles(Array.from(filteredUstensiles));
}

const displayFilteredUstensiles = (ustensiles) => {
  const ustensilesList = document.getElementById("dropdownMenuUstensiles");
  Array.from(ustensilesList.querySelectorAll("li.dynamic")).forEach((li) =>
    li.remove()
  );

  selectedUstensiles.forEach((ustensil) => {
    // affichage en jaune
  });
  ustensiles.forEach((ustensile) => {
    if (!selectedIngredients.includes(ustensile)) {
      const capitalizedUstensile = capitalizeFirstLetter(ustensile);
      createListItem(capitalizedUstensile, ustensilesList);
    }
  });
};

function displayUstensiles(recipes) {
  const ustensilesList = document.getElementById("dropdownMenuUstensiles");
  // Vider les éléments dynamiques actuels avant d'ajouter de nouveaux
  Array.from(ustensilesList.querySelectorAll("li.dynamic")).forEach((li) =>
    li.remove()
  );

  const allUstensiles = new Set();
  // Ajouter chaque ingrédient à la liste sous les éléments statiques
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      allUstensiles.add(capitalizeFirstLetter(ustensil));
    });
});

  Array.from(allUstensiles)
    .sort()
    .forEach((ustensil) => {
      createListItem(ustensil, ustensilesList)
    });
}

function toggleUstensilesList() {
  const dropdownMenu = document.getElementById("dropdownMenuUstensiles");
  const dropdownBtnUstensiles = document.getElementById(
    "dropdownBtnUstensiles"
  );
  dropdownMenu.classList.toggle("show");
  dropdownBtnUstensiles.classList.toggle("show");
}

// Fonction pour pivoter l'icône chevron associée au bouton cliqué
function toggleRotate(event) {
  const icon = event.currentTarget.querySelector(".main__dropdownIcon");
  icon.classList.toggle("rotate");
}

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
  const inputSearchDevice = document.getElementById(
    "inputSearchDevice"
  );
  inputSearchDevice.addEventListener("input", handleSearchListAppliances);

  // gère le filtre des ustensiles affichés dans le dropdown
  const inputSearchUstensile = document.getElementById(
    "inputSearchUstensile"
  );
  inputSearchUstensile.addEventListener("input", handleSearchListUstensiles);

  // Récupère les datas des recettes
  const recipes = getRecipes();

  // affiche les recettes
  displayRecipes(recipes);
  countRecipes();

  // affichage des listes
  initDropdownIngredient(recipes);
  initDropdownAppliances(recipes);
  initDropdownUstensiles(recipes)
  displayIngredients(recipes);
  displayAppliances(recipes);
  displayUstensiles(recipes);

  handleSearch(recipes);
  
  // handleSearchIngredients();
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
