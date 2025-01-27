/**
 * Capitalise la première lettre d'une chaîne de caractères.
 * 
 * Cette fonction prend une chaîne en entrée, met la première lettre 
 * en majuscule et le reste de la chaîne en minuscules. Elle est utile 
 * pour normaliser les données affichées (par exemple, les noms d'ingrédients 
 * ou de tags).
 * 
 * @param {string} string - La chaîne de caractères à transformer.
 * @returns {string} - La chaîne avec la première lettre en majuscule.
 * 
 * @example
 * capitalizeFirstLetter("pomme"); // Retourne "Pomme"
 * capitalizeFirstLetter("POMME"); // Retourne "Pomme"
 */

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/**
 * Empêche le comportement par défaut d'un événement soumis.
 * 
 * Cette fonction est principalement utilisée pour empêcher le rechargement 
 * de la page lors de la soumission d'un formulaire ou d'un événement déclenché 
 * par un bouton `<form>` ou `<input type="submit">`.
 * 
 * @param {Event} e - L'événement déclenché par la soumission du formulaire.
 * 
 * @example
 * // Exemple d'utilisation dans un gestionnaire d'événements
 * const form = document.querySelector("form");
 * form.addEventListener("submit", handleSubmit);
 */

export function handleSubmit(e) {
  e.preventDefault();
}

// Fonction pour récupérer et nettoyer la valeur
export function sanitizeInput(input) {
  // Regex pour empêcher les attaques XSS 
  // const regex = /^[^&<>"=]+$/;
  // const regex = /[^a-zA-Z0-9 .,'\-]/g;
  const regex = /[^a-zA-ZÀ-ÿ0-9 .,'\-]/g;
  if (regex.test(input)) {
    console.error("Tentative d'injection de caractère interdit détectée.");
    //return ""; // Ou une autre valeur par défaut
  }
  return input.replace(regex, '');
}