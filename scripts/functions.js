import {
  setIngredientList,
  getIngredientList,
  getSelectedIngredients,
  setApplianceList,
  getApplianceList,
  getSelectedAppliances,
  setUstensilesList,
  getUstensilesList,
  getSelectedUstensiles,
  addSelectedItem,
} from "./store.js";

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function displayRecipes(recipes) {
  /*
  if (!Array.isArray(recipes)) {
    console.error("Invalid recipes data:", recipes);
    return;
  } */
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
  console.log(recipes.length);
  countRecipes(recipes);
}

export function countRecipes(recipes) {
  // Sélectionner le h2 où le nombre sera affiché
  const recipeCountH2 = document.getElementById("recipeCountH2");

  // Afficher dynamiquement le nombre de recettes
  recipeCountH2.textContent = `${recipes.length} recettes`;
}

export function handleSearch(recipes, query) {
  const trimmedQuery = query.trim().toLowerCase();
  if (trimmedQuery.length >= 3) {
    const filteredRecipes = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(trimmedQuery) ||
        recipe.description.toLowerCase().includes(trimmedQuery) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(trimmedQuery)
        )
    );
    displayRecipes(filteredRecipes);
    // Vérifier et afficher le message
    displayNoResultsMessage(query, filteredRecipes, "no-results-message");
  } else {
    displayRecipes(recipes); // Affiche toutes les recettes si la saisie est inférieure à 3 caractères
    displayNoResultsMessage(query, recipes, "no-results-message");
  }
}

// fonction qui affiche notre liste initiale d'ingrédients
export function initDropdownIngredient(recipes) {
  // Créer un ensemble pour stocker tous les ingrédients
  const allIngredients = new Set();
  // Parcourir chaque recette pour récupérer tous les ingrédients
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      allIngredients.add(ingredient.ingredient.toLowerCase());
    });
  });
  setIngredientList(Array.from(allIngredients).sort());
  displayFilteredIngredients(getIngredientList());
}

export function handleSearchListIngredients(event) {
  //event.preventDefault();

  const searchInputListIngredients = document.getElementById(
    "inputSearchIngredient"
  );
  const query = searchInputListIngredients.value.trim().toLowerCase();

  // Filtrer les ingrédients en fonction de la requête
  const filteredIngredients = getIngredientList().filter(
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

export function handleSubmit(e) {
  e.preventDefault();
}


export function displayFilteredIngredients() {
  const ingredients = getIngredientList();
  const ingredientsList = document.getElementById("dropdownMenuIngredients");

  ingredientsList.innerHTML = "";
  getSelectedIngredients().forEach((ingredient) => {
    console.log("selectedIngredient", ingredient, ingredientsList);
    // affichage en jaune
    const li = createListItem(ingredient, "ingredient", true);
    ingredientsList.appendChild(li);
  });
  ingredients.forEach((ingredient) => {
    if (
      !getSelectedIngredients()
        .map((i) => i.toLowerCase())
        .includes(ingredient.toLowerCase())
    ) {
      const li = createListItem(ingredient, "ingredient");
      ingredientsList.appendChild(li);
    }
  });
}

export function toggleIngredientsList(recipes) {
  const dropdownMenu = document.getElementById("dropdownMenuIngredients");
  const containerInputDropdownIngredients = document.getElementById(
    "containerInputDropdownIngredients"
  );
  const dropdownBtnIngredients = document.getElementById(
    "dropdownBtnIngredients"
  );
  dropdownMenu.classList.toggle("show");
  dropdownBtnIngredients.classList.toggle("show");
  containerInputDropdownIngredients.classList.toggle("show");
}

export function createListItem(text, type, isSelected) {
  const capitalizedText = capitalizeFirstLetter(text);
  const li = document.createElement("li");
  li.dataset.type = type;
  if (isSelected) {
    li.classList.add("selected");
  }
  li.classList.add("dynamic");
  li.textContent = capitalizedText;
  li.addEventListener("click", (e) => {
    e.preventDefault();
    const target = e.target;
    const type = target.dataset.type;
    addSelectedItem(target.textContent.toLowerCase(), type);
    displayFilteredIngredients();
    displayFilteredAppliances();
    displayFilteredUstensiles();
    displayTags();
    toggleDropdown(li);
    /*
      mettre à jour les recettes
    */
  });
  //console.log("li", li, parentElement);
  //parentElement.appendChild(li);
  return li;
}

export function displayTags() {
  const tagsContainer = document.getElementById("tags-container");
  tagsContainer.innerHTML = "";
  const tags = [
    ...getSelectedIngredients(),
    ...getSelectedAppliances(),
    ...getSelectedUstensiles(),
  ];
  tags.forEach((tag) => {
    addTag(tag);
  });
}

export function addTag(text) {
  const capitalizedText = capitalizeFirstLetter(text);
  const tagsContainer = document.getElementById("tags-container");
  const tag = document.createElement("span");
  const removeIcon = document.createElement("span");
  tag.textContent = capitalizedText;
  tag.classList.add("main__tag");
  removeIcon.textContent = "✖";
  removeIcon.classList.add("main__remove-tag");
  removeIcon.style.cursor = "pointer";
  removeIcon.addEventListener("click", () => {
    tag.remove();
  });
  tag.appendChild(removeIcon);
  tagsContainer.appendChild(tag);
}

export function toggleDropdown(element) {
  const parentUl = element.closest("ul");
  if (parentUl) {
    parentUl.classList.toggle("show");

    const dropdownContainer = parentUl.closest(".main__dropdown");
    if (dropdownContainer) {
      const associatedBtn = dropdownContainer.querySelector("button");
      if (associatedBtn) {
        associatedBtn.classList.toggle("show");
        toggleRotate({ currentTarget: associatedBtn });
      }
      const containerInputDropdown = dropdownContainer.querySelector(
        ".main__containerInputDropdown"
      );
      if (containerInputDropdown) {
        containerInputDropdown.classList.toggle("show");
      }
    }
  }
}

export function clearInput(searchId, clearIconId, recipes) {
  const searchInput = document.getElementById(searchId);
  const clearIcon = document.getElementById(clearIconId);
  clearIcon.addEventListener("click", function () {
    console.log("click");
    console.log(clearIcon);
    searchInput.value = ""; // Vider l'input
    searchInput.focus();
    displayRecipes(recipes);
    displayNoResultsMessage("", recipes, "no-results-message");
  });
}

// fonction qui affiche notre liste initiale des appareils
export function initDropdownAppliances(recipes) {
  // Créer un ensemble pour stocker tous les appareils
  const allAppliances = new Set();
  // Parcourir chaque recette pour récupérer tous les appareils
  recipes.forEach((recipe) => {
      allAppliances.add(recipe.appliance.toLowerCase());
  });  
  setApplianceList(Array.from(allAppliances).sort());
  //displayFilteredAppliances(Array.from(allAppliances));
  displayFilteredAppliances(getApplianceList());
}

export function handleSearchListAppliances(event) {
  event.preventDefault();

  const searchInputListAppliances =
    document.getElementById("inputSearchDevice");
  const query = searchInputListAppliances.value.trim().toLowerCase();

  // Filtrer les appareils en fonction de la requête
  const filteredAppliances = getApplianceList.filter(
    (appliance) => appliance.includes(query) // Vérifie si l'ingrédient contient la requête
  );
  // On choisit notre élément qui va contenir la liste des appareils filtrée
  const domAppliancesList = document.getElementById("dropdownMenuDevices");
  // Vider les éléments dynamiques actuels avant d'ajouter de nouveaux
  Array.from(domAppliancesList.querySelectorAll("li.dynamic")).forEach((li) =>
    li.remove()
  );
  return displayFilteredAppliances(Array.from(filteredAppliances));
}

export function displayFilteredAppliances() {
  const appliances = getApplianceList();
  const appliancesList = document.getElementById("dropdownMenuDevices");
  /* Array.from(appliancesList.querySelectorAll("li.dynamic")).forEach((li) =>
    li.remove()
  ); */
  appliancesList.innerHTML = "";
  getSelectedAppliances().forEach((appliance) => {
    console.log("selectedDevice", appliance, appliancesList);
    // affichage en jaune
    const li = createListItem(appliance, "appliance", true);
    appliancesList.appendChild(li);
  });
  appliances.forEach((appliance) => {
    if (!getSelectedAppliances()
      .map((i) => i.toLowerCase())
      .includes(appliance.toLowerCase())
    ) {
        const li = createListItem(appliance, "appliance");
        appliancesList.appendChild(li);
    }
  });
}

/*
export function displayAppliances(recipes) {
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
      createListItem(appliance, "appliance");
    });
} */

export function toggleAppliancesList() {
  const dropdownMenu = document.getElementById("dropdownMenuDevices");
  const containerInputDropdownDevices = document.getElementById(
    "containerInputDropdownDevices"
  );
  const dropdownBtnDevices = document.getElementById("dropdownBtnDevices");
  dropdownMenu.classList.toggle("show");
  dropdownBtnDevices.classList.toggle("show");
  containerInputDropdownDevices.classList.toggle("show");
}

// fonction qui affiche notre liste initiale d'ingrédients
export function initDropdownUstensiles(recipes) {
  // Créer un ensemble pour stocker tous les ingrédients
  const allUstensiles = new Set();
  // Parcourir chaque recette pour récupérer tous les ingrédients
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      allUstensiles.add(ustensil.toLowerCase());
    });
  });
  setUstensilesList(Array.from(allUstensiles).sort());
  //displayFilteredUstensiles(Array.from(allUstensiles));
  displayFilteredUstensiles(getUstensilesList());
}

export function handleSearchListUstensiles(event) {
  event.preventDefault();

  const searchInputListUstensiles = document.getElementById(
    "inputSearchUstensile"
  );
  const query = searchInputListUstensiles.value.trim().toLowerCase();

  // Filtrer les ingrédients en fonction de la requête
  const filteredUstensiles = getUstensilesList.filter(
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

export function displayFilteredUstensiles() {
  const ustensiles = getUstensilesList();
  const ustensilesList = document.getElementById("dropdownMenuUstensiles");
  /* Array.from(ustensilesList.querySelectorAll("li.dynamic")).forEach((li) =>
    li.remove()
  ); */
  ustensilesList.innerHTML = "";
  getSelectedUstensiles().forEach((ustensil) => {
    console.log("selectedUstensile", ustensil, ustensilesList);
    // affichage en jaune
    const li = createListItem(ustensil, "ustensil", true);
    ustensilesList.appendChild(li);
  });
  ustensiles.forEach((ustensile) => {
    if (!getSelectedUstensiles()
      .map((i) => i.toLowerCase())
      .includes(ustensile.toLowerCase())
  ) {
      const li = createListItem(ustensile, "ustensil");
      ustensilesList.appendChild(li);
    }
  });
}

/*
export function displayUstensiles(recipes) {
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
      createListItem(ustensil, ustensilesList);
    });
}  */

export function toggleUstensilesList() {
  const dropdownMenu = document.getElementById("dropdownMenuUstensiles");
  const containerInputDropdownUstensiles = document.getElementById(
    "containerInputDropdownUstensiles"
  );
  const dropdownBtnUstensiles = document.getElementById(
    "dropdownBtnUstensiles"
  );
  dropdownMenu.classList.toggle("show");
  dropdownBtnUstensiles.classList.toggle("show");
  containerInputDropdownUstensiles.classList.toggle("show");
}

// Fonction pour pivoter l'icône chevron associée au bouton cliqué
export function toggleRotate(event) {
  const icon = event.currentTarget.querySelector(".main__dropdownIcon");
  icon.classList.toggle("rotate");
}

export function displayNoResultsMessage(inputValue, recipes, containerId) {
  const noResultsMessage = document.getElementById(containerId);
  if (inputValue && recipes.length === 0) {
    noResultsMessage.textContent = `Aucune recette ne contient '${inputValue}'. Vous pouvez chercher «tarte aux pommes », « poisson », etc`;
    noResultsMessage.classList.remove("hide");
    noResultsMessage.classList.add("show");
  } else {
    noResultsMessage.classList.remove("show");
    noResultsMessage.classList.add("hide");
  }
}
