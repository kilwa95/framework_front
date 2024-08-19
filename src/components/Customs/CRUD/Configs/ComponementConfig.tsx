import { IButtons, IComponementConfig, IMsg, IURL } from '../Functions/base';
import { userFields } from './fields/users';

// Instantiate objects based on the types
const urlConfig: IURL = {
  list: 'auth/user/',
  add: 'auth/user/',
  put: 'auth/user/',
  get: 'auth/user/',
  delete: 'auth/user/',
};

const msgConfig: IMsg = {
  add: 'Utilisateur ajouté avec succès',
  update: 'Utilisateur modifié avec succès',
};

const buttonsConfig: IButtons = {
  list: 'Liste des utilisateurs',
  update: 'Modifier un utilisateur',
  add: 'Ajouter un utilisateur',
  details: "Détails d'un utilisateur",
};

export const ComponementConfig: IComponementConfig = {
  user: {
    model: 'User',
    flag: 'user',
    title: 'Liste des utilisateur',
    url: urlConfig,
    fields: userFields,
    msg: msgConfig,
    buttons: buttonsConfig,
  },
};
