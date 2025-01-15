import { capitalizeFirstLetter } from "./utils.js";
import { 
    addSelectedItem,
    removeSelectedItem
} from "./store.js";
import {
    displayFilteredIngredients,
    displayFilteredAppliances,
    displayFilteredUstensiles
} from "./tagInput.js";
import { displayTags } from "./tagSelected.js";
import { toggleDropdown } from "./dropdownToggle.js";

/**
 * Crée une copie modifiée d'un élément de liste.
 * 
 * Cette fonction prend un élément de liste généré par `createListItem`,
 * le clone et applique les mêmes classes CSS. Elle est utile si tu veux 
 * réutiliser un élément dans un autre contexte ou conteneur sans le recréer
 * entièrement.
 *
 * @param {string} text - Le texte à afficher dans l'élément de liste.
 * @param {string} type - Le type d'élément (ex. "ingredient", "appliance", "ustensil").
 * @param {boolean} isSelected - Indique si l'élément est déjà sélectionné.
 * @returns {HTMLElement} Une copie modifiée de l'élément de liste.
 */
export function createModifiedListItem(text, type, isSelected) {
    const li = createListItem(text, type, isSelected);
    const newLi = li.cloneNode(true);
    newLi.className = li.className;
    const removeIcon = document.createElement("span");
    removeIcon.textContent = "✖";
    removeIcon.classList.add("main__remove-li");
    removeIcon.addEventListener("click", (event) => removeSelectedItemAndRefresh(event));
    newLi.appendChild(removeIcon);
    return newLi;
}

function removeSelectedItemAndRefresh() {
    //const target = event.target;
    //const text = target.closest("li.selected").textContent.replace("✖", "");
    //const type = target.closest("li").dataset.type;
    const item = text.toLowerCase();
  
    // modifier le store
    removeSelectedItem(item, type);

    // rerender 3 dropdown et display tag
    displayFilteredIngredients();
    displayFilteredAppliances();
    displayFilteredUstensiles();
    displayTags();
}
   

  
 /**
 * Crée un élément de liste dynamique avec des fonctionnalités interactives.
 * 
 * Cette fonction génère un élément `<li>` qui affiche les éléments de la liste 
 * avec une 1ère lettre en majuscule, et contient un comportement interactif au clic. 
 * L'élément est marqué comme "sélectionné" si nécessaire et appelle plusieurs 
 * fonctions pour mettre à jour les listes, les tags sélectionnés, et le dropdown
 *
 * @param {string} text - Le texte à afficher dans l'élément de liste.
 * @param {string} type - Le type d'élément (ex. "ingredient", "appliance", "ustensil").
 * @param {boolean} isSelected - Indique si l'élément est déjà sélectionné.
 * @returns {HTMLElement} L'élément de liste `<li>` prêt à être ajouté au DOM.
 */
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
  
  