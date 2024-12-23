import { getRecipes } from "../models/index.js";

let ingredientsList = []; // ce tableau va recevoir les ingredients cliqués pour filtrer les recettes 
let appliancesList = [];   // ce tableau va recevoir les Appliances cliqués pour filtrer les recettes 
const selectedIngredients = ["ananas"];
const selectedAppliances = ["Blender"];

function displayRecipes(recipes) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  const testEl = document.createElement("p");
  testEl.textContent = "test :-)";
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
                    ${testEl.outerHTML}
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
  //const filteredIngredients = Array.from(ingredientsList).filter(        ingredientsList = Array.from(allIngredients); dc pkoi faire Array.from(ingredientsList)
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



/* const handleSearchIngredients = () => {
  const query = inputSearchIngredient.value.toLowerCase();
  const filteredIngredients = new Set();

  const recipes = getRecipes();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (ingredient.ingredient.toLowerCase().includes(query)) {
        filteredIngredients.add(capitalizeFirstLetter(ingredient.ingredient));
      }
    });
  });

  displayFilteredIngredients(Array.from(filteredIngredients));
}; */

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

function clearInput() {
  const searchInput = document.getElementById(
    "header__search-container__input"
  );
  const clearIcon = document.getElementById("input-xmark-icon"); // Ajout de l'événement de clic à l'icône
  clearIcon.addEventListener("click", function () {
    console.log("click");
    console.log(clearIcon);
    searchInput.value = " "; // Vider l'input
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

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

function createListItem(text, parentElement) {
  const li = document.createElement("li");
  li.classList.add("dynamic");
  li.textContent = text;
  parentElement.appendChild(li);
}

function toggleIngredientsList(recipes) {
  const dropdownMenu = document.getElementById("dropdownMenuIngredients");
  const dropdownBtnIngredients = document.getElementById(
    "dropdownBtnIngredients"
  );
  dropdownMenu.classList.toggle("show");
  dropdownBtnIngredients.classList.toggle("show");
}

// fonction qui affiche notre liste initiale d'ingrédients
function initDropdownAppliances(recipes) {
    // Créer un ensemble pour stocker tous les ingrédients
    const allAppliances = new Set();
    // Parcourir chaque recette pour récupérer tous les ingrédients
    recipes.forEach((recipe) => {
      recipe.appliance.forEach((appliance) => {
        allAppliances.add(appliance.toLowerCase());
      });
    });
    appliancesList = Array.from(allAppliances);
    displayFilteredAppliances(Array.from(allAppliances));
}


function handleSearchListAppliances(event) {
    event.preventDefault();
  
    const searchInputListAppliances = document.getElementById("inputSearchDevice");
    const query = searchInputListAppliances.value.trim().toLowerCase();
  
    // Filtrer les appareils en fonction de la requête
       //const filteredAppliances= Array.from(appliancesList).filter(        //appliancesList = Array.from(allAppliances); dc pkoi faire Array.from(ingredientsList)
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
    //appliance.sort().forEach((appliance) => {
    //  createListItem(appliance, appliancesList);
    //});
};

function displayAppliances(recipes) {
    const appliancesList = document.getElementById("dropdownMenuDevices");
    //const domAppliancesList = document.getElementById("dropdownMenuDevices");
    // Vider les éléments dynamiques actuels avant d'ajouter de nouveaux
    Array.from(appliancesList.querySelectorAll("li.dynamic")).forEach((li) =>
    //Array.from(domAppliancesList.querySelectorAll("li.dynamic")).forEach((li) =>  
      li.remove()
    );
  
    const allAppliances = new Set();
    // Ajouter chaque ingrédient à la liste sous les éléments statiques
    recipes.forEach((recipe) => {
      allAppliances.add(capitalizeFirstLetter(recipe.appliance));
    });
  
   // Initialiser appliancesList ici  ajout moi
    //appliancesList = Array.from(allAppliances);
    //appliancesList = Array.from(allAppliances);
    Array.from(allAppliances)
      .sort()
      .forEach((appliance) => {
        createListItem(appliance, appliancesList)
        /*const li = document.createElement("li");
        li.classList.add("dynamic");
        li.textContent = appliance;
        //appliancesList.appendChild(li);*/
      });
  }

  
function toggleAppliancesList() {
  const dropdownMenu = document.getElementById("dropdownMenuDevices");
  const dropdownBtnDevices = document.getElementById("dropdownBtnDevices");
  dropdownMenu.classList.toggle("show");
  dropdownBtnDevices.classList.toggle("show");
}







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
      const li = document.createElement("li");
      li.classList.add("dynamic");
      li.textContent = ustensil;
      ustensilesList.appendChild(li);
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

  // Récupère les datas des recettes
  const recipes = getRecipes();

  // affiche les recettes
  displayRecipes(recipes);

  // affichage des listes
  displayIngredients(recipes);
  displayAppliances(recipes);
  displayUstensiles(recipes);

  handleSearch(recipes);
  initDropdownIngredient(recipes);
  initDropdownAppliances(recipes);
  // handleSearchIngredients();
  clearInput();
}

//init();
document.addEventListener("DOMContentLoaded", init);
