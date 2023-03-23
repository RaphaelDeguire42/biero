import Affichage from "../Affichage.mjs";

export default class Composant {
    
    /**
     * 
     * @param {HTMLElement} domParent 
     * @param {object} data 
     * @param {boolean} bAffichage - Affichage automatique ou pas (default : false)
     */
    constructor(domParent, data, bAffichage){
        this.domParent = domParent;
        this.data = data;
        
        if(bAffichage){
            this.afficher();
        }
    }

    setData(data){
        this.data = data;
    }

    getData(){
        return this.data;
    }

    afficher(){
        // Aller chercher le gabarit
        // Mettre les données dans le gabarit
        // Insérer dans le DOM
        this.domParent.innerHTML = `<p> ${JSON.stringify(this.data)} </p>`;
    }
    
}