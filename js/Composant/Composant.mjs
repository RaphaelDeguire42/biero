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
        //Méthodes pour apiCall()
        this.getListeBieres = `biere`;

        if(bAffichage){
            this.afficher();
        }
    }

    /**
     * Reset les methodes pour apiCall avec le bon id
     */
    setMethods(){
        this.getUneBiere = `biere/${this.id_biere}`;
        this.getNoteUneBiere = `biere/${this.id_biere}/note`;
        this.getCommentairesUneBiere = `biere/${this.id_biere}/commentaire`;
    }

    setData(data){
        this.data = data;
        this.afficher();
        this.ajouterListener();
    }

    getData(){
        return this.data;
    }

    afficher(){
        let chaineHTML = "";
        if(this.nomGabarit){
            chaineHTML = Affichage.genererHTML(this.nomGabarit, this.data);
        }

        // Aller chercher le gabarit
        // Mettre les données dans le gabarit
        // Insérer dans le DOM

        this.domParent.innerHTML = chaineHTML;
    }
}