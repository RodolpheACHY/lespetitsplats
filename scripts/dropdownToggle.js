
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