# Getting Started with CRUD Componement

This Componement handle a CRUD system.

## Features

### CRUD System 

CRUD is the acronym for CREATE, READ, UPDATE and DELETE. These terms describe the four essential operations for creating and managing persistent data elements.
It's an automatic generation of CRUD based on configuration file defining the models and their relationships.

### Dynamic Modals & Form generation

This application contains can handle view's generation based on the definition of model fields.

## Remains to be done

The work still in progress:

### Backend calls

- To persiste Data : redux is already configured but still need to define the methods to perform the create / update / delete actions

### Add more field form

- Add radio buttons field
- Add Multi Select choices field

### Add PDF Export functionnality

- Add PDF Export functionnality on the Details View

### Testing

- Test in progress : Certain issues are identified, and they are currently being resolved.
- Optimize loading time
- Optimize component generation

## File structure:

* Classes : 
  * contain class definition, like the builder class to handle User Permissions
* Configs : 
  * ComponementConfig.tsx : 
    * Model definition & configurations
  * fields : 
    * Model fields definition
* Functions : useful functions
* Modals : 
  *  CAddEdit.tsx :
    * UI Form generated based on the model configurations
    * Can handle both Edit and Add actions
  * CList.tsx : 
    * Listing items based on the model configurations
  * CRender.tsx : 
    * Render form fields based on the model configurations
  * CView.tsx : 
    * Handle View item details, bynamiclay generated using the model configuration
    * Export to PDF feature to be add 



