import Affichage from "../../Affichage.mjs";
import ServiceBiere from "../../ServiceBiere.mjs";
import Composant from "../Composant.mjs";
import Utilities from "../../Utilities.mjs";

export default class BiereComposant extends Composant {

    /**
     *
     * @param {HTMLElement} domParent Point d'insertion dans le DOM
     */
    constructor(domParent, id_biere) {
        super(domParent, [], true);
        this.id_biere = id_biere;
        this.nomGabarit = "Biere";
        this.lienGabarit = `./js/Composant/${this.nomGabarit}/${this.nomGabarit.toLowerCase()}.html`

        Affichage.chargementGabarit(this.lienGabarit, this.nomGabarit, () => {
            this.gabaritPret = true;
            this.afficher();
        });
        this.miseAJour();

    }

    miseAJour() {
        this.setMethods();
        //Obtient les infos de la bière
        ServiceBiere.apiCall(this.getUneBiere, (biereInfos) => {
            //Obtient les infos de notes
            ServiceBiere.apiCall(this.getNoteUneBiere, (note) =>{
                let stars = Utilities.makeStars(note.data.note);
                note.data.stars = stars;
                biereInfos.data.note = note.data;
                //Obtient les commentaires de la biere
                ServiceBiere.apiCall(this.getCommentairesUneBiere, (commentaires) =>{
                    biereInfos.data.commentaires = commentaires.data;
                    this.setData(biereInfos);
                })
            })
        })
    }

    ajouterListener(){
        const btnSend = document.querySelector('.envoyerCommentaire');
        btnSend.addEventListener('click', function(e){
            const form = e.target.parentNode;
            const courriel = form.usager_courriel.value
            const commentaire = form.commentaire.value;

            if(Utilities.isCourrielValide(courriel) && commentaire != ""){
                const body = {
                    courriel: courriel,
                    commentaire: commentaire
                }
                ServiceBiere.ajouterCommentaires(this.id_biere, body);
                location.reload();
            } else {
                const errorString = `<span class='error'>courriel invalide (format : a@a)<span>`;
                document.querySelector('.input--courriel').insertAdjacentHTML('beforeend', errorString);
            }
        }.bind(this))

    }
}
