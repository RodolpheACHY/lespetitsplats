import { getRecipes } from "../models/index.js";

/* global photographerTemplate */
/* async function getRecipes() {
        const response = await fetch("./data/recipes.js")
        .then(datas => {
            console.log(datas)
        return ({
            datas})
        })  
    }
    async function displayData(datas) {
        const photographersSection = document.querySelector(".photographer_section");
        datas.photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    } */

async function init() {
  // Récupère les datas des photographes
  //const { datas } = await getPhotographers();
  //displayData(datas);
  const recipes = getRecipes();
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  const testEl = document.createElement("p");
  testEl.textContent = "test :-)";
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
                    ${testEl.outerHTML}
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
        let htmlIngredients = `
            <div class="main__container-ingredientMesure">
                            <h5>${ingredient.ingredient}</h5>
                            <h6>${ingredient.quantity} ${ingredient.unit}</h6>
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
}

init();
