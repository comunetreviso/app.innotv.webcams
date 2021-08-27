# Webcams
L’app consente la visualizzazione su mappa delle webcam presenti sul territorio comunale permettendo all’utente di visualizzare le immagini provenienti dalle stesse cliccandoci sopra. 
Le webcam hanno un frame rate di 5 minuti, per agevolare la fruizione delle immagini è previsto un refresh automatico della pagina stabilito da back office che va dai 5 ai 20 secondi. 
L’inserimento della webcam avviene da back office attraverso l’inserimento dell’URL di riferimento e delle coordinate esatte per il posizionamento del marker nella mappa.

## Istruzioni per l'installazione

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

### Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
If you want it to be available from your machine ip address you should use `npm start:open` 

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
You can create also the component in a subfolder starting from the app folder like this
```
ng generate component ui/frontoffice/component-name
```
This will generate the structure if not present and the folder component-name with all the files inside.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
