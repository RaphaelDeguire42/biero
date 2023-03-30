/**
 * Fichier principal, il contient la logique de l'application.
 *
 * De manière générale, cette application permet d'afficher la liste des bières, le détail d'une bière et de laisser des commentaires
 * @todo (Bonus mais juste pour des points virtuels) Utiliser les partials (mustache) pour gérer les affichages (accueil et liste)
 * @todo (Bonus mais juste pour des points virtuels) Remplacer mustache.js par handlebar.js
 * @todo (Bonus mais juste pour des points virtuels) Utiliser page.js pour faire les tris (Donc l'url avec les queryString)
 * @todo (Bonus mais juste pour des points virtuels) Séparer le composant Biere en deux composants (Detail et Commentaire)
 *
 */

import ServiceBiere from './ServiceBiere.mjs';
import Affichage from './Affichage.mjs';
import page from "//unpkg.com/page/page.mjs";
import ListeComposant from './Composant/Liste/ListeComposant.mjs';
import AccueilComposant from './Composant/Accueil/AccueilComposant.mjs';
import BiereComposant from './Composant/Biere/BiereComposant.mjs';
import Composant from './Composant/Composant.mjs';


export default class App {
    constructor(){
        this.domParent = document.querySelector(".app");

        page("/", this.accueil.bind(this));
        page("/accueil", this.accueil.bind(this));
        page("/produit", this.produit.bind(this));
        page("/produit/:id", this.detailProduit.bind(this));

        page({hashbang : true});
    }

    accueil(){
        this.oAccueil = new AccueilComposant(this.domParent);
    }

    produit(){
        if(!this.oListe)
            this.oListe = new ListeComposant(this.domParent);
        else
            this.oListe.miseAJour();
    }

    detailProduit(ctx){
        const id_biere = ctx.params.id;
        this.oBiere = new BiereComposant(this.domParent, id_biere);
    }
}





