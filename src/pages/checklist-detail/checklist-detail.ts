import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, PopoverOptions, AlertController } from 'ionic-angular';
import { PopoverItemChecklistPage } from '../popover-item-checklist/popover-item-checklist';
import { ApiHttpProvider } from '../../providers/api-http/api-http';
import { ListItemPage } from '../list-item/list-item';
import { NativeStorage } from '@ionic-native/native-storage';


@IonicPage()
@Component({
  selector: 'page-checklist-detail',
  templateUrl: 'checklist-detail.html',
})
export class ChecklistDetailPage {

  public checklist: any;
  public categories: any[];
  public fullCategories: any[];
  public checklistInLS: any;
  public user: any;
  public photo: any;
  public firm: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private popoverCtrl: PopoverController, private http: ApiHttpProvider,
              private alertCtrl: AlertController, private nativeStorage: NativeStorage) {
    this.photo = {
      'isCapture': false,
      'img': ''
    };
    this.firm = {
      'isCapture': false,
      'img': ''
    }
    this.checklist = this.navParams.get('checklist');
    this.nativeStorage.getItem('user').then( user => {
      this.user = user;
      // obtengo las categorias
      this.generateRequest();
    });
  }

  ionViewCanEnter() {
    this.nativeStorage.getItem('user').then( user => {
      this.user = user;
      // obtengo las categorias
      this.generateRequest();
    });
  }

  private generateRequest(): void {
    const params = {
      'token': this.user.token
    };
    this.http.get(`/checklist/${this.checklist.cod_checkl}/categories`, params).then(response => {
      if (response.data) {
        const data = JSON.parse(response.data);
        this.categories = data;
        this.fullCategories = this.categories;
        this.getChecklistInLocalStorage();
      }
    });
  }

  public openPopover(): void {
    const popoverOptions: PopoverOptions = {
      'enableBackdropDismiss': true
    }
    let popover = this.popoverCtrl.create(PopoverItemChecklistPage);
    popover.present();
  }

  public selectedCategoty(category: any): void {
    this.navCtrl.push(ListItemPage, { category });
  }

  public handleInputSearch(inputSearch): void {
    const searchTerm = inputSearch.value.trim();
    if (searchTerm != "") {
      this.categories = this.fullCategories.filter(item => (item.nom_catego.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      this.categories = this.fullCategories;
    }
  }

  public send(): void {
    // el formulario será valido hasta que se demuestre lo contrario
    let isValidForm = true;
    // verifico que todas las categorias hallan sido diligenciadas
    for (let category of this.categories) {
      if (!category.hasOwnProperty('isAnswered')) {
        isValidForm = false;
      }
    }
    // verifico que la firma se halla dilegenciado
    if (!this.firm.isCapture) {
      isValidForm = false;
    }
    // verifico que la foto se halla tomado
    if (!this.photo.isCapture) {
      isValidForm = false;
    }

    if (isValidForm) {
      this.sendForm();
    } else {
      this.alertCtrl.create({
        'title': ``,
        'message': 'Aun faltan secciones por completar',
        'buttons': [
          {
            'text': 'Entendido'
          }
        ]
      }).present();
    }
  }

  private sendForm(): void {
    
    // obtengo la checklist que se enviará a la api
    this.nativeStorage.getItem('checklist').then(checklist => {
      const params = {
        'checklist': checklist,
        'token': this.user.token
      };
      this.http.post('/checklistanswered', params).subscribe((response: any) => {
        console.log('Respuesta: ', JSON.stringify(response.data));
        this.alertCtrl.create({
          'title': ``,
          'message': 'Se ha enviado el formulario',
          'buttons': [
            {
              'text': 'OK',
              'handler': () => {
                this.navCtrl.pop();
              }
            }
          ]
        }).present();
      }, error => {
        console.error("El Error: ", JSON.stringify(error));
        this.alertCtrl.create({
          'message': 'No se pudo insertar la checklist',
          'buttons': [
            {
              'text': 'Entendido',
              'handler': () => {
                this.navCtrl.pop();
              }
            }
          ]
        }).present();
      });
    }).catch(error => {
      console.error("El Error: ", JSON.stringify(error));
    });
  }

  public saveToDraft(): void {
    this.alertCtrl.create({
      'title': ``,
      'message': 'próximamente tendras esta funcionalidad disponible',
      'buttons': [
        {
          'text': 'Entendido'
        }
      ]
    }).present();
  }

  private getChecklistInLocalStorage(): void {
    this.nativeStorage.getItem('checklist').then((checklistLocalStorage: any) => {
      for (let category of this.fullCategories) {
        for (let categoryLS of checklistLocalStorage.categories) {
          if (category.cod_catego == categoryLS.codeCategory) {
            category['isAnswered'] = true;
          }
        }
      }
    });
  }

  public capturePhoto(): void {
    
  }

  public captureFirm(): void {

  }

}
