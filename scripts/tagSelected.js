import {
  getSelectedIngredients,
  getSelectedAppliances,
  getSelectedUstensiles
} from "./store.js"

import {
  capitalizeFirstLetter
} from "./utils.js"

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