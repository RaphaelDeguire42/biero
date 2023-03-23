import Affichage from "../../Affichage.mjs";
import ServiceBiere from "../../ServiceBiere.mjs";
import Composant from "../Composant.mjs";

export default class ListeComposant extends Composant{
    
    /**
     * 
     * @param {HTMLElement} domParent Point d'insertion dans le DOM
     */
    constructor(domParent){
        super(domParent, [], true);
        ServiceBiere.getListeBieres((mesDonnees)=>{
            console.log(mesDonnees);
            this.setData(mesDonnees);
            
        })
           
        Affichage.chargementGabarit("./js/Composant/Liste/liste.html");
        
    }


   
}
