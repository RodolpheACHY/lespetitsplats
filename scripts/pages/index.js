import { getRecipes } from "../models/index.js";

let ingredientsList = [];
const selectedIngredients = ["ananas"];

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

function handleSearchListIngredients(event) {
  event.preventDefault();

  const searchInputListIngredients = document.getElementById(
    "inputSearchIngredient"
  );

  const query = searchInputListIngredients.value.trim().toLowerCase();

  // Filtrer les ingrédients en fonction de la requête
  const filteredIngredients = Array.from(ingredientsList).filter(
    (ingredient) => ingredient.includes(query) // Vérifie si l'ingrédient contient la requête
  );
  // Afficher les ingrédients filtrés ou tous les ingrédients si moins de 3 caractères
  const domIngredientsList = document.getElementById("dropdownMenuIngredients");
  // Vider les éléments dynamiques actuels avant d'ajouter de nouveaux
  Array.from(domIngredientsList.querySelectorAll("li.dynamic")).forEach((li) =>
    li.remove()
  );
  return displayFilteredIngredients(Array.from(filteredIngredients)); // Affiche toutes les recettes si la saisie est inférieure à 3 caractères
}

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
  displayFilteredIngredients(Array.from(allIngredients)); // Affiche toutes les recettes si la saisie est inférieure à 3 caractères
}

const handleSearchIngredients = () => {
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
};

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
      createListItem(ingredient, ingredientsList);
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
      const li = document.createElement("li");
      li.classList.add("dynamic");
      li.textContent = appliance;
      appliancesList.appendChild(li);
    });
}

function toggleAppliancesList() {
  const dropdownMenu = document.getElementById("dropdownMenuDevices");
  const dropdownBtnDevices = document.getElementById("dropdownBtnDevices");
  dropdownMenu.classList.toggle("show");
  dropdownBtnDevices.classList.toggle("show");
}

const handleSearchAppliances = () => {
  const query = inputS.value.toLowerCase();
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
};

const displayFilteredAppliances = (ingredients) => {
  const ingredientsList = document.getElementById("dropdownMenuIngredients");
  Array.from(ingredientsList.querySelectorAll("li.dynamic")).forEach((li) =>
    li.remove()
  );

  ingredients.sort().forEach((ingredient) => {
    createListItem(ingredient, ingredientsList);
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
  // handleSearchIngredients();
  clearInput();
}

//init();
document.addEventListener("DOMContentLoaded", init);
