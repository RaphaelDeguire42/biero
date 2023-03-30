import Affichage from "../../Affichage.mjs";
import ServiceBiere from "../../ServiceBiere.mjs";
import Utilities from "../../Utilities.mjs";
import Composant from "../Composant.mjs";

export default class AccueilComposant extends Composant{

    constructor(domParent) {
        super(domParent, [], true);
        this.nomGabarit = "Accueil";
        this.lienGabarit = `./js/Composant/${this.nomGabarit}/${this.nomGabarit.toLowerCase()}.html`

        Affichage.chargementGabarit(this.lienGabarit, this.nomGabarit, () => {
            this.gabaritPret = true;
            this.afficher();
        });
        this.miseAJour();
    }

    miseAJour() {
        ServiceBiere.getListeDesMeilleuresBieres((mesDonnees) => {
            mesDonnees.data.forEach(biere => {
                let stars = Utilities.makeStars(biere.note_moyenne);
                biere.stars = stars;
            });
            this.setData(mesDonnees);
        })
    }

    ajouterListener(){
        const cartesBiere = this.domParent.querySelectorAll('.card');
        for (let i = 0; i < cartesBiere.length; i++) {
            let id_biere = cartesBiere[i].dataset.id;
            cartesBiere[i].addEventListener('click', function(){
                window.location.href = `/#!/produit/${id_biere}`;
                location.reload();
            })
        }
    }

}
