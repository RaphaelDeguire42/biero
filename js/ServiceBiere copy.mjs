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
   static apiCall(method, fctRappel){
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
         this.apiCall('biere', (bieres) => {
            const listBieres = bieres.data;
            const top5Bieres = listBieres
               .sort((a, b) => parseFloat(b.note_moyenne) - parseFloat(a.note_moyenne)).slice(0, 5);
            let aMeilleurBieres = [];

            top5Bieres.forEach((biere) => {
               aMeilleurBieres.push(biere);
            });

            fctRappel({data: aMeilleurBieres});
         });
      }

   /**
    * Récupérer l'ensemble des biere sur le service Web
    *
    * @static
    * @returns void
    * @memberof Biere
    */ 
   static getListeBieres(path, fctRappel) {
      fetch(this.api_url + path)
         .then((data) => data.json())
         .then((data) => {
            fctRappel(data);
         });
   }

    /**
    * Récupérer une bière avec son id
    *
    * @static
    * @param {integer} id
    * @returns void
    * @memberof Biere
    */
   static getUneBiere(id, fctRappel) {
      fetch(this.api_url + `biere/${id}`)
         .then((data) => data.json())
         .then((data) => {
            fctRappel(data);
         });
   }

    /**
    * Récupérer les notes d'une bière avec son id
    *
    * @static
    * @param {integer} id
    * @returns void
    * @memberof Biere
    */
   static getNoteUneBiere(id, fctRappel) {
      fetch(this.api_url + `biere/${id}/note`)
         .then((data) => data.json())
         .then((data) => {
            fctRappel(data);
         });
   }

    /**
    * Récupérer les commentaires d'une bière avec son id
    *
    * @static
    * @param {integer} id
    * @returns void
    * @memberof Biere
    */
   static getCommentairesUneBiere(id, fctRappel) {
      fetch(this.api_url + `biere/${id}/commentaire`)
         .then((data) => data.json())
         .then((data) => {
            fctRappel(data);
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
