/**
 * Module de gestion de l'affichage
 *
 * @Module Affichage
 * @requires Mustache.js {https://unpkg.com/mustache@latest}
 */
export default class Affichage {
    /*oGabarits = {
        cle : {
            gabarit : "",
            rendu : ""
        }
    }*/
    static chargementGabarit(url_gabarit, nom, fctRappel){
        console.log("chargement")
        fetch(url_gabarit)
            .then(gabarit=>gabarit.text())
            .then(gabarit=>console.log(gabarit))
            
    }

    genererHTML() {

    }



}