import { recipes } from "../../data/recipes.js"; 

export function getRecipes() {
    console.log(recipes);

    /*
document.addEventListener('DOMContentLoaded', () => {
    // Chemin vers le fichier JS local 
    const getRecipes = './data/recipes.js'; 
    // Charger les données JS 
    fetch(getRecipes) 
        .then(response => { 
            if (response.ok) { 
                return response.text(); 
            } else { 
                throw new Error('Erreur lors du chargement du fichier JS.'); 
            } 
        }) 
        .then(scriptContent  => { 
            // Evaluer le texte JS pour obtenir les données 
            eval(scriptContent); 
            console.log(getRecipes)
            // 'data' devrait maintenant être disponible 
            /* const dropdown = document.getElementById('dropdown'); 
            data.options.forEach(option => { 
                const optionElement = document.createElement('option'); 
                optionElement.value = option.value; 
                optionElement.textContent = option.text; 
                dropdown.appendChild(optionElement); 
            }); */
   /*    }) 
        .catch(error => console.error('Erreur:', error));
    }) */
}
