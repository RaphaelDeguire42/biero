import Affichage from "../../Affichage.mjs";
import ServiceBiere from "../../ServiceBiere.mjs";
import Composant from "../Composant.mjs";

export default class ListeComposant extends Composant {

    /**
     * 
     * @param {HTMLElement} domParent Point d'insertion dans le DOM
     */
    constructor(domParent) {
        super(domParent, [], true);
        this.nomGabarit = "liste";
        let data = { "data": [ { "id_biere": "6", "description": "string", "nom": "string", "brasserie": "string", "image": "string", "date_ajout": "2017-03-15 09:02:16", "date_modif": "2023-03-10", "note_moyenne": "5.0000", "note_nombre": "2" }]};
        this.setData(data);
                ServiceBiere.getListeBieres((mesDonnees) => {
                    console.log(mesDonnees);
                    setTimeout(()=>{
                        console.log("test");
                        this.setData(mesDonnees);
                    }, 3000)
                })
        
       
           
        Affichage.chargementGabarit("./js/Composant/Liste/liste.html", this.nomGabarit, () => {
                    console.log("prêt à afficher")
                    this.afficher();
                });
            }


   
}
