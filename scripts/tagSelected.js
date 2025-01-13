import {
  getSelectedIngredients,
  getSelectedAppliances,
  getSelectedUstensiles,
  removeSelectedItem,
} from "./store.js";
import {
  displayFilteredIngredients,
  displayFilteredAppliances,
  displayFilteredUstensiles,
} from "./tagInput.js";

import { capitalizeFirstLetter } from "./utils.js";

/**
 * Affiche les tags sélectionnés (ingrédients, appareils, ustensiles) dans le conteneur des tags.
 *
 * Cette fonction :
 * - Récupère tous les éléments actuellement sélectionnés (ingrédients, appareils, ustensiles).
 * - Vide le conteneur des tags pour éviter les doublons.
 * - Ajoute chaque tag (sélectionné) dans le conteneur des tags.
 */
export function displayTags() {
  const tagsContainer = document.getElementById("tags-container");
  tagsContainer.innerHTML = "";
  const tags = [
    ...getSelectedIngredients().map((selectedIngredient) => {
      return { name: selectedIngredient, type: "ingredient" };
    }),
    ...getSelectedAppliances().map((selectedAppliance) => {
      return { name: selectedAppliance, type: "appliance" };
    }),
    ...getSelectedUstensiles().map((selectedUstensil) => {
      return { name: selectedUstensil, type: "ustensil" };
    }),
  ];
  tags.forEach((tag) => {
    addTag(tag);
  });
}

/**
 * Ajoute un tag individuel au conteneur des tags avec une option de suppression.
 *
 * Cette fonction :
 * - Crée un élément visuel pour représenter un tag (nom + icône de suppression).
 * - Ajoute un gestionnaire d'événement sur l'icône de suppression pour permettre
 *   à l'utilisateur de supprimer le tag.
 *
 * @param tagObject {object} {name, type} - Le texte du tag à afficher (ex. un ingrédient, un appareil ou un ustensile).
 */
export function addTag(tagObject) {
  const capitalizedText = capitalizeFirstLetter(tagObject.name);
  const tagsContainer = document.getElementById("tags-container");
  const tag = document.createElement("span");
  const removeIcon = document.createElement("span");
  tag.textContent = capitalizedText;
  tag.classList.add("main__tag");
  removeIcon.textContent = "✖";
  removeIcon.classList.add("main__remove-tag");
  removeIcon.dataset.type = tagObject.type;
  removeIcon.style.cursor = "pointer";
  removeIcon.addEventListener("click", (event) => {
    const target = event.target;
    const type = target.dataset.type;
    let item = target.closest(".main__tag").textContent;
    item = item.replace("✖", "");
    item = item.toLowerCase();

    // modifier le store
    removeSelectedItem(item, type);
    // rerender 3 dropdown et display tag
    displayFilteredIngredients();
    displayFilteredAppliances();
    displayFilteredUstensiles();
    displayTags();
  });
  tag.appendChild(removeIcon);
  tagsContainer.appendChild(tag);
}
