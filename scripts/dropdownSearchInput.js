import {
    getIngredientList,
    getApplianceList,
    getUstensilesList,
} from "./store.js";

import {
  displayFilteredIngredients,
  displayFilteredAppliances,
  displayFilteredUstensiles
} from "./tagInput.js";



/**
 * Gère la recherche dans la liste des ingrédients.
 *
 * Cette fonction est déclenchée lorsqu'un utilisateur saisit une requête dans 
 * la barre de recherche des ingrédients. Elle filtre la liste des ingrédients 
 * en fonction de la requête saisie, met à jour la liste affichée dans le menu 
 * déroulant, et supprime les anciens éléments dynamiques.
 *
 * @param {Event} event - L'événement déclenché lors de la saisie dans l'input.
 */
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


/**
 * Gère la recherche dans la liste des appareils.
 *
 * Cette fonction filtre dynamiquement les appareils affichés dans le menu déroulant 
 * en fonction de la saisie de l'utilisateur. Elle met à jour l'affichage en 
 * supprimant les anciens éléments dynamiques et en ajoutant les nouveaux éléments filtrés.
 *
 * @param {Event} event - L'événement déclenché lors de la saisie dans l'input.
 */
export function handleSearchListAppliances(event) {
    event.preventDefault();
  
    const searchInputListAppliances =
      document.getElementById("inputSearchDevice");
    const query = searchInputListAppliances.value.trim().toLowerCase();
  
    // Filtrer les appareils en fonction de la requête
    const filteredAppliances = getApplianceList().filter(
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

/**
 * Gère la recherche dans la liste des ustensiles.
 *
 * Cette fonction filtre dynamiquement les ustensiles affichés dans le menu déroulant 
 * en fonction de la saisie de l'utilisateur. Elle met à jour l'affichage en supprimant 
 * les anciens éléments dynamiques et en affichant les nouveaux éléments filtrés.
 *
 * @param {Event} event - L'événement déclenché lors de la saisie dans l'input.
 */
  export function handleSearchListUstensiles(event) {
    event.preventDefault();
  
    const searchInputListUstensiles = document.getElementById(
      "inputSearchUstensile"
    );
    const query = searchInputListUstensiles.value.trim().toLowerCase();
  
    // Filtrer les ingrédients en fonction de la requête
    const filteredUstensiles = getUstensilesList().filter(
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
  
  