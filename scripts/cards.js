


/**
 * Affiche une liste de recettes dans le conteneur principal.
 * 
 * @param {Array} recipes - Un tableau contenant les données des recettes à afficher.
 */
export function displayRecipes(recipes) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

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
        const recipeIngredient = ingredient.ingredient || "";
        const recipeQuantity = ingredient.quantity || "";
        const recipeUnit = ingredient.unit || "";
        let htmlIngredients = `
            <div class="main__container-ingredientMesure">
                            <h5>${recipeIngredient}</h5>
                            <h6>${recipeQuantity} ${recipeUnit}</h6>
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
  console.log(recipes.length);
  countRecipes(recipes);
}


/**
 * Met à jour le nombre total de recettes affichées.
 * 
 * Cette fonction prend en paramètre une liste de recettes et met à jour dynamiquement
 * le contenu d'un élément `<h2>` (avec l'ID "recipeCountH2") pour afficher le nombre 
 * total de recettes actuellement visibles.
 * 
 * @param {Array} recipes - Un tableau contenant les données des recettes à compter.
 */
export function countRecipes(recipes) {
  // Sélectionner le h2 où le nombre sera affiché
  const recipeCountH2 = document.getElementById("recipeCountH2");

  // Afficher dynamiquement le nombre de recettes
  recipeCountH2.textContent = `${recipes.length} recettes`;
}