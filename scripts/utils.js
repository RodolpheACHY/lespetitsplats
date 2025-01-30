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

/**
* Nettoie une chaîne de texte saisie par l'utilisateur afin d'empêcher
* l'injection de caractères non autorisés (protection contre certaines attaques XSS).
*
* Cette fonction :
* - Supprime les caractères spéciaux potentiellement dangereux pour le DOM.
* - Conserve uniquement les lettres, chiffres, espaces, accents et certains symboles autorisés.
* - Affiche une alerte dans la console si des caractères non autorisés sont détectés.
*
* @param {string} input - La chaîne de texte saisie par l'utilisateur.
* @returns {string} - La chaîne nettoyée, sans caractères interdits.
*
* @example
* sanitizeInput("Bonjour<script>alert('XSS');</script>");
* // Retourne : "Bonjour"
*/
export function sanitizeInput(input) {
 // Expression régulière pour autoriser uniquement :
 // Lettres (a-z, A-Z), chiffres (0-9), espaces, accents, apostrophes, tirets, points et virgules
 const regex = /[^a-zA-ZÀ-ÿ0-9 .,'\-]/g;

 // Si des caractères non autorisés sont trouvés, affiche une alerte dans la console
 if (regex.test(input)) {
   console.error("Tentative d'injection de caractère interdit détectée.");
 }

 // Retourne la chaîne nettoyée sans les caractères interdits
 return input.replace(regex, '');
}