import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiHttpProvider } from '../../providers/api-http/api-http';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-list-item',
  templateUrl: 'list-item.html',
})
export class ListItemPage {

  public category: any;
  public itemsList: any[];
  public fullItemsList: any[];
  public form: any;
  public isValidForm: boolean;
  private user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: ApiHttpProvider, public alertCtrl: AlertController,
              private nativeStorage: NativeStorage) {
    this.isValidForm = false;
    this.category = this.navParams.get('category');
    this.nativeStorage.getItem('user').then( user => {
      this.user = user;
      this.generateRequest();
    });
  }

  ionViewCanEnter(){
    this.nativeStorage.getItem('user').then( user => {
      this.user = user;
      this.generateRequest();
    });
  }

  private generateRequest(): void {
    const params = {
      'token': this.user.token
    };
    this.http.get(`/checklist/${this.category.cod_checkl}/categories/${this.category.cod_catego}/items`, params).then(response => {
      if (response.data) {
        const data = JSON.parse(response.data);
        this.itemsList = data;
        this.fullItemsList = data;
        this.defineForm();
      }
    }).catch(error => {
      console.error('Ha ocurrido un error: ', JSON.stringify(error));
    });
  }
  
  public defineForm(): void {
    this.form = {
      codeCategory: null,
      codeChecklist: null,
      items: []
    }
    // recorrido de los items 
    for (let item of this.fullItemsList) {
      this.form.codeCategory = item.cod_catego;
      this.form.codeChecklist = item.cod_checkl;
      this.form.items.push({
        codeItem: item.cod_itemxx,
        nameItem: item.nom_itemxx,
        haveBox: (item.ind_aplchk == "0" ? false : true),
        response: null,
        boxValue: null,
        isRequire: (item.ind_obliga == "0" ? false : true)
      });
    }
  }

  public save(): void {
    let isValidForm = true;
    // recorrido para determinar si hay alguna respuesta requerida y que no se halla llenado
    for (let item of this.form.items) {
      if (item.isRequire && item.response == null) {
        isValidForm = false;
      }
    }
    // si el formulario no es valido lanzo una notificacion 
    if (!isValidForm) {
      this.alertCtrl.create({
        'title': ``,
        'message': 'Hay respuestas sin contestar',
        'buttons': [
          {
            'text': 'Entendido'
          }
        ]
      }).present();
    } else {
      // variable que se guarda en el localstorage
      let checklistLocalStorage = {
        codeChecklist: this.form.codeChecklist,
        categories: [{
          codeCategory: this.form.codeCategory,
          items: [this.form.items]
        }]
      };
      this.nativeStorage.getItem('checklist').then( (checklistLS: any) => {
        // obtengo la data 
        if (checklistLS.codeChecklist == checklistLocalStorage.codeChecklist) {
          for (let category of checklistLS.categories) {
            if (checklistLocalStorage.categories[0].codeCategory != category.codeCategory) {
              checklistLocalStorage.categories.push(category);
            }
          }
        } else {
          this.nativeStorage.remove('checklist');
        }
        // guardo en el localstorage
        this.saveInLocalStorage(checklistLocalStorage);
      }).catch ( error => {
        // guardo en el localstorage 
        this.saveInLocalStorage(checklistLocalStorage);
      });
    }
  }

  private alertSuccess(): void {
    this.alertCtrl.create({
      'title': ``,
      'message': 'Se ha guardado las respuestas de esta categoria',
      'buttons': [
        {
          'text': 'OK',
          'handler': () => {
            this.navCtrl.pop();
          }
        }
      ]
    }).present();
  }

  private saveInLocalStorage(checklistLocalStorage): void {
    this.nativeStorage.setItem('checklist', checklistLocalStorage).then( () => {
      this.alertSuccess();
    }).catch( error => {
      console.error("Ha ocurrido un error al intentar guardar la checklist", JSON.stringify(error));
    });
  }

}
