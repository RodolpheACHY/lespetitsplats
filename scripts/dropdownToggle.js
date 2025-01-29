/**
 * Gère l'ouverture et la fermeture d'un dropdown associé à un élément spécifique.
 *
 * Cette fonction bascule les classes "show" sur plusieurs éléments pour afficher/masquer 
 * le menu déroulant et ses parties associées (bouton, icône, et container).
 * Elle fonctionne de manière générique en acceptant un élément passé en paramètre.
 *
 * @param {HTMLElement} element - L'élément qui déclenche l'ouverture/fermeture du menu.
 */
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


/**
 * Ouvre ou ferme dropdown des ingrédients.
 *
 * Cette fonction cible directement les éléments liés au menu des ingrédients (menu, bouton, 
 * et container) et bascule leurs classes "show" pour afficher ou masquer l'ensemble.
 */
export function toggleIngredientsList() {
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


/**
 * Ouvre ou ferme le dropdown appareils.
 *
 * Cette fonction cible les éléments liés au menu des appareils et bascule 
 * leurs classes "show" pour afficher ou masquer l'ensemble.
 */
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

/**
 * Ouvre ou ferme le menu déroulant des ustensiles.
 *
 * Cette fonction cible les éléments liés au menu des ustensiles et bascule 
 * leurs classes "show" pour afficher ou masquer l'ensemble.
 */
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
  
/**
 * Fait pivoter l'icône chevron associée à un bouton de menu.
 *
 * Cette fonction est utilisée pour ajouter une classe "rotate" à l'icône chevron 
 * située dans le dropdown.
 *
 * @param {Event} event - L'événement contenant la cible actuelle (le bouton cliqué).
 */
export function toggleRotate(event) {
  const icon = event.currentTarget.querySelector(".main__dropdownIcon");
  icon.classList.toggle("rotate");
}