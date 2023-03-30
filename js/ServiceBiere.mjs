/**
 * Module de gestion des données et des requêtes des bieres
 *
 * @module ServiceBiere
 */
export default class ServiceBiere {
   /**
    * URL de base du service Web utilisé pour les appels de l'API.
    * @static
    * @memberof Biere
    */
   static api_url = "http://127.0.0.1:8000/webservice/php/";

   /**
    *
    * @param {string} path Lien de la requete a faire a l'api
    * @param {*} fctRappel
    */
   static apiCall(method, fctRappel) {
      fetch(this.api_url + method)
         .then((data) => data.json())
         .then((data) => {
            fctRappel(data);
         });
   }

   /**
    * Récupérer la liste des 5 meilleures bières
    *
    * @static
    * @returns void
    * @memberof Biere
    */
   static getListeDesMeilleuresBieres(fctRappel) {
      this.apiCall("biere", (bieres) => {
         const top5Bieres = bieres.data
            .sort((a, b) => parseFloat(b.note_moyenne) - parseFloat(a.note_moyenne))
            .slice(0, 5);
         const meilleurBieres = { data: top5Bieres };
         fctRappel(meilleurBieres);
      });
   }

   /**
    * Ajoute un commentaire pour un bière avec son id
    *
    * @static
    * @param {integer} id
    * @returns void
    * @memberof Biere
    */
   static ajouterCommentaires(id, commentaire, fctRappel) {
      const entetes = new Headers();
      entetes.append("Authorization", "Basic " + btoa("biero:biero"));

      const options = {
         method: "PUT",
         mode: "cors",
         body: JSON.stringify(commentaire),
         headers: entetes,
      };
      fetch(this.api_url + `biere/${id}/commentaire`, options);
   }
}
