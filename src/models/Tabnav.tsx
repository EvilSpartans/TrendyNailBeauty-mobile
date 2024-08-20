import { Product } from "./Product";

export type Tabnav = {
  Accueil: undefined;
  Rechercher: undefined;
  Panier: undefined;
  Profil: undefined;
  Commande: undefined;
  Connexion: undefined;
  Inscription: undefined;
  Article: { product: Product };
};
