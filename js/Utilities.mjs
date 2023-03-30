export default class Utilities {
   /**
    * Prend une note arrondie et génère le code HTML pour le nombre d'étoile de la note
    * @param {Float} note
    * @returns String
    */
   static makeStars(note) {
      note = this.roundNoteToHalf(note);
      let starsString = "";
      const emptyStar = "<img src='./img/Empty_Star.svg' alt='empty star'>";
      const fullStar = "<img src='./img/Full_Star.svg' alt='empty star'>";
      const halfStar = "<img src='./img/Half_Star.svg' alt='empty star'>";
      for (let i = 0; i < 10; i++) {
         if (parseInt(note) > i) {
            starsString += `<span>${fullStar}</span>`;
         } else {
            if (note % 1 == 0.5) {
               starsString += `<span>${halfStar}</span>`;
               note -= 0.5;
            } else {
               starsString += `<span>${emptyStar}</span>`;
            }
         }
      }
      return starsString;
   }

   /**
    * Arrondi une note décimal au plus proche entier ou demi (.0 ou .5)
    * @param {Float} note
    * @returns note arrondie
    */
   static roundNoteToHalf(note) {
      const integerPart = Math.floor(note);
      const decimalPart = note % 1;
      let roundedDecimalPart;

      if (decimalPart >= 0.75) {
         roundedDecimalPart = 1;
      } else if (decimalPart >= 0.25) {
         roundedDecimalPart = 0.5;
      } else {
         roundedDecimalPart = 0;
      }

      return integerPart + roundedDecimalPart;
   }

   /**
    * Vérifie si le courriel est sous le format 'a@a'
    * @param {String} courriel
    * @returns bool, true if email is valid
    */
   static isCourrielValide(courriel) {
      const emailRegex = /^[^\s@]+@[^\s@]+$/;
      return emailRegex.test(courriel);
   }
}
