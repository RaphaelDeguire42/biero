import Affichage from "../../Affichage.mjs";
import ServiceBiere from "../../ServiceBiere.mjs";
import Composant from "../Composant.mjs";

export default class ListeComposant extends Composant {

    /**
     *
     * @param {HTMLElement} destination Point d'insertion dans le DOM
     */
    constructor(destination) {
        super(destination, [], true);
        this.nomGabarit = "liste";
        let data = { "data": [ { "id_biere": "6", "description": "string", "nom": "string", "brasserie": "string", "image": "string", "date_ajout": "2017-03-15 09:02:16", "date_modif": "2023-03-10", "note_moyenne": "5.0000", "note_nombre": "2" }]};
        this.setData(data);

        ServiceBiere.getListeBieres((mesDonnees) => {
            console.log(mesDonnees);
            this.setData(mesDonnees);

        })

        Affichage.chargementGabarit("./js/Composant/Liste/liste.html", this.nomGabarit, () => {
                    this.afficher();
                });
    }

    ajouterListener(){
        this.destination.querySelectorAll('.btnTri').forEach((btnTri)=>{
            btnTri.addEventListener('click', function(e){
                let btn = e.target;
                let tri = btn.dataset.tri;
                let ordre = btn.dataset.ordre;
                this.data.data.sort((a,b)=>{
                    return a[tri].localeCompare(b[tri]);
                })
                if(ordre == 'DESC'){
                    this.data.data.reverse();
                }
                this.afficher();
            }.bind(this))
        })
    }

    sortList(){

    }



}
