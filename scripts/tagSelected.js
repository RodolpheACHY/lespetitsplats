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
 * Affiche les tags sélectionnés (ingrédients, appareils et ustensiles)
 * dans le conteneur des tags.
 *
 * Cette fonction :
 * - Récupère les éléments sélectionnés via les fonctions du store.
 * - Vide le conteneur des tags pour éviter les doublons.
 * - Ajoute chaque tag sous forme visuelle dans le DOM avec une option pour les supprimer.
 */
export function displayTags() {
  // Récupération du conteneur HTML pour les tags
  const tagsContainer = document.getElementById("tags-container");

  // Réinitialise le conteneur des tags pour éviter les doublons
  tagsContainer.innerHTML = "";

  // concaténation des tags sélectionnés en un seul tableau avec leur type associé
  const tags = [
    ...getSelectedIngredients().map((selectedIngredient) => ({
      name: selectedIngredient,
      type: "ingredient",
    })),
    ...getSelectedAppliances().map((selectedAppliance) => ({
      name: selectedAppliance,
      type: "appliance",
    })),
    ...getSelectedUstensiles().map((selectedUstensil) => ({
      name: selectedUstensil,
      type: "ustensil",
    })),
  ];

  // Ajout de chaque tag dans le conteneur
  tags.forEach((tag) => {
    addTag(tag);
  });
}

/**
 * Ajoute un tag individuel au conteneur des tags avec une option de suppression.
 *
 * Cette fonction :
 * - Crée un élément visuel pour représenter un tag (nom + icône de suppression).
 * - Ajoute un gestionnaire d'événement sur l'icône de suppression permettant
 *   à l'utilisateur de retirer le tag sélectionné et de mettre à jour l'affichage.
 *
 * @param {object} tagObject - L'objet représentant le tag à afficher.
 * @param {string} tagObject.name - Le nom du tag (ex. "tomate").
 * @param {string} tagObject.type - Le type du tag ("ingredient", "appliance" ou "ustensil").
 */
export function addTag(tagObject) {
  // Capitalisation du texte du tag pour une meilleure lisibilité
  const capitalizedText = capitalizeFirstLetter(tagObject.name);

  // Création du conteneur HTML pour le tag
  const tagsContainer = document.getElementById("tags-container");
  const tag = document.createElement("span");
  const removeIcon = document.createElement("span");

  // Définition du texte et des classes CSS pour le tag
  tag.textContent = capitalizedText;
  tag.classList.add("main__tag");

  // Ajout d'une icône "✖" pour supprimer le tag
  removeIcon.textContent = "✖";
  removeIcon.classList.add("main__remove-tag");
  removeIcon.dataset.type = tagObject.type;
  removeIcon.style.cursor = "pointer";

  // Gestion de l'événement "clic" sur l'icône de suppression
  removeIcon.addEventListener("click", (event) => {
    const target = event.target;
    const type = target.dataset.type;

    // Extraction et nettoyage du nom de l'élément cliqué
    let item = target.closest(".main__tag").textContent;
    item = item.replace("✖", "").trim().toLowerCase();

    // Mise à jour du store : suppression de l'élément sélectionné
    removeSelectedItem(item, type);

    // Mise à jour de l'affichage des listes filtrées et des tags
    displayFilteredIngredients();
    displayFilteredAppliances();
    displayFilteredUstensiles();
    displayTags(); // Réaffichage des tags
  });

  // Ajout de l'icône de suppression au tag
  tag.appendChild(removeIcon);

  // Ajout du tag complet dans le conteneur principal
  tagsContainer.appendChild(tag);
}