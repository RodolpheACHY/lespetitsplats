import { capitalizeFirstLetter } from "./utils.js";
import { addSelectedItem } from "./store.js";
import {
    displayFilteredIngredients,
    displayFilteredAppliances,
    displayFilteredUstensiles
} from "./tagInput.js";
import { displayTags } from "./tagSelected.js";
import { toggleDropdown } from "./dropdownToggle.js";


export function createModifiedListItem(text, type, isSelected) {
    const li = createListItem(text, type, isSelected);
    const newLi = li.cloneNode(true);
    newLi.className = li.className;
    return newLi;
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
  
      // appelle les fonctions nécessaires
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
  
  