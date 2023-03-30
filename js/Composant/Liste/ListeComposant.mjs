import Affichage from "../../Affichage.mjs";
import ServiceBiere from "../../ServiceBiere.mjs";
import Utilities from "../../Utilities.mjs";
import Composant from "../Composant.mjs";

export default class ListeComposant extends Composant {

    /**
     *
     * @param {HTMLElement} domParent Point d'insertion dans le DOM
     */
    constructor(domParent) {
        super(domParent, [], true);
        this.nomGabarit = "Liste";
        this.lienGabarit = `./js/Composant/${this.nomGabarit}/${this.nomGabarit.toLowerCase()}.html`

        Affichage.chargementGabarit(this.lienGabarit, this.nomGabarit, () => {
            console.log("prêt à afficher")
            this.gabaritPret = true;
            this.afficher();
        });
        this.miseAJour();
    }

    miseAJour() {
        ServiceBiere.apiCall(this.getListeBieres, (mesDonnees) => {
            mesDonnees.data.forEach(biere => {
                biere.note_moyenneRounded = Utilities.roundNoteToHalf(biere.note_moyenne);
            });
            this.setData(mesDonnees);

        })


    }

    ajouterListener(){
        this.domParent.querySelectorAll(".btnTri").forEach((btnTri)=>{
            btnTri.addEventListener('click', (evt)=>{
                let btn = evt.target;
                let tri = btn.dataset.tri;
                let ordre = btn.dataset.ordre;
                this.data.data.sort((a,b)=>{
                    if (tri === 'note_moyenne') {
                        return parseFloat(a[tri]) - parseFloat(b[tri]);
                    } else {
                        return a[tri].localeCompare(b[tri]);
                    }
                });
                if(ordre == 'DESC') {
                    this.data.data.reverse();
                }
                this.setData(this.data);
            })
        })
    }


}
