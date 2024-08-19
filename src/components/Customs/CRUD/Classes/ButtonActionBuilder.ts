import {
  ADD_PERMISSION,
  DELETE_PERMISSION,
  EDIT_PERMISSION,
  VIEW_PERMISSION,
} from '../Configs/consts';

/* eslint-disable no-unused-vars */
class ButtonActionBuilder {
  private buttonActions: string[];
  private userRole: string;
  private componentType: string;

  constructor(userRole: string, componentType: string) {
    this.buttonActions = [];
    this.userRole = userRole;
    this.componentType = componentType;
  }

  addButtonAction(label: string): ButtonActionBuilder {
    this.buttonActions.push(label);

    return this; // Return the builder for method chaining
  }

  build(): string[] {
    switch (this.userRole) {
      case 'admin':
        this.addButtonAction(ADD_PERMISSION);
        this.addButtonAction(EDIT_PERMISSION);
        this.addButtonAction(VIEW_PERMISSION);
        this.addButtonAction(DELETE_PERMISSION);
        break;

      case 'DataManager':
        this.addButtonAction(ADD_PERMISSION);
        this.addButtonAction(EDIT_PERMISSION);
        this.addButtonAction(VIEW_PERMISSION);
        break;

      case 'Visitor':
        this.addButtonAction(VIEW_PERMISSION);
        break;
    }

    return this.buttonActions;
  }
}

export default ButtonActionBuilder;
