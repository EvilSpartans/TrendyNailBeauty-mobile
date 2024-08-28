import { Product } from "./Product";

export type Tabnav = {
  Accueil: undefined;
  Rechercher: undefined;
  Panier: undefined;
  Profil: undefined;
  Contact: undefined;
  Commande: undefined;
  Connexion: undefined;
  Inscription: undefined;
  userInfo: undefined;
  userAddress: undefined;
  userOrders: undefined;
  updatePassword: undefined;
  ResetPassword: undefined;
  AllProducts: { [key: string]: any };
  Article: { product: Product };
};
