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
        getRecipes();
    }
    
    init(); 
