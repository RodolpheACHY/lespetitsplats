import {
    getSelectedIngredients,
    getSelectedAppliances,
    getSelectedUstensiles,
    getIngredientList,
    getApplianceList,
    getUstensilesList,
} from "./store.js";

import {
    capitalizeFirstLetter
} from "./utils.js";

import {
    createListItem,
    createModifiedListItem
} from "./listUtils.js"



export function displayFilteredIngredients(filteredIngredients = null) {
  const ingredientsToDisplay = getIngredientsToDisplay(filteredIngredients);
  const ingredientsList = document.getElementById("dropdownMenuIngredients");
  ingredientsList.innerHTML = "";
  displaySelectedIngredients(ingredientsList);
  displayUnselectedIngredients(ingredientsList, ingredientsToDisplay);
}
 
export function displayFilteredAppliances(filteredAppliances = null) {
   const appliancesToDisplay = getAppliancesToDisplay(filteredAppliances);
   const appliancesList = document.getElementById("dropdownMenuDevices");
   appliancesList.innerHTML = "";
   displaySelectedAppliances(appliancesList);
   displayUnselectedAppliances(appliancesList, appliancesToDisplay);
   //const appliances = getApplianceList();
 }
 
export function displayFilteredUstensiles(filteredUstensiles = null) {
   const ustensilesToDisplay = getUstensilesToDisplay(filteredUstensiles);
   const ustensilesList = document.getElementById("dropdownMenuUstensiles");
   ustensilesList.innerHTML = "";
   displaySelectedUstensiles(ustensilesList);
   displayUnselectedUstensiles(ustensilesList, ustensilesToDisplay);
}

export function getIngredientsToDisplay(filteredIngredients) {
  const allIngredients = getIngredientList();
  return filteredIngredients || allIngredients;
}

export function getAppliancesToDisplay(filteredAppliances) {
    const allAppliances = getApplianceList();
    return filteredAppliances || allAppliances;
}

export function getUstensilesToDisplay(filteredUstensiles) {
  const allUstensiles = getUstensilesList();
  return filteredUstensiles || allUstensiles;
}

export function displaySelectedIngredients(ingredientsList) {
  getSelectedIngredients().forEach((ingredient) => {
    const capitalizedIngredient = capitalizeFirstLetter(ingredient);
    const li = createModifiedListItem(capitalizedIngredient, "ingredient", true);
    ingredientsList.appendChild(li);
  });
}

export function displayUnselectedIngredients(ingredientsList, ingredientsToDisplay) {
  const selectedIngredients = getSelectedIngredients().map(i => i.toLowerCase());
  ingredientsToDisplay.forEach((ingredient) => {
    if (!selectedIngredients.includes(ingredient.toLowerCase())) {
      const capitalizedIngredient = capitalizeFirstLetter(ingredient);
      const li = createListItem(capitalizedIngredient, "ingredient", false);
      ingredientsList.appendChild(li);
    }
  });
}

export function displaySelectedAppliances(appliancesList) {
    getSelectedAppliances().forEach((appliance) => {
      const capitalizedAppliance = capitalizeFirstLetter(appliance);
      const li = createModifiedListItem(capitalizedAppliance, "appliance", true);
      appliancesList.appendChild(li);
    });
  }

export function displayUnselectedAppliances(appliancesList, appliancesToDisplay) {
    const selectedAppliances = getSelectedAppliances().map(i => i.toLowerCase());
    appliancesToDisplay.forEach((appliance) => {
      if(!selectedAppliances.includes(appliance.toLowerCase())) {
        const capitalizedAppliance = capitalizeFirstLetter(appliance);
        const li = createListItem(capitalizedAppliance, "appliance", false);
        appliancesList.appendChild(li);
      }
    });
}  

export function displaySelectedUstensiles(ustensilesList) {
    getSelectedUstensiles().forEach((ustensile) => {
      const capitalizedUstensile = capitalizeFirstLetter(ustensile);
      const li = createModifiedListItem(capitalizedUstensile, "ustensile", true);
      ustensilesList.appendChild(li);
    });
}
  
export function displayUnselectedUstensiles(ustensilesList, ustensilesToDisplay) {
    const selectedUstensiles = getSelectedUstensiles().map(i => i.toLowerCase());
    ustensilesToDisplay.forEach((ustensile) => {
      if (!selectedUstensiles.includes(ustensile.toLowerCase())) {
        const capitalizedUstensile = capitalizeFirstLetter(ustensile);
        const li = createListItem(capitalizedUstensile, "ustensile", false);
        ustensilesList.appendChild(li);
      }
    });
}