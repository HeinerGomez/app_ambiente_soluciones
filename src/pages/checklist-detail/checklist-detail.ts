import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { ApiHttpProvider } from '../../providers/api-http/api-http';
import { ListItemPage } from '../list-item/list-item';
import { NativeStorage } from '@ionic-native/native-storage';
import { PopupCapturePhotoPage } from '../popup-capture-photo/popup-capture-photo';
import { PopupCaptureFirmPage } from '../popup-capture-firm/popup-capture-firm';
import { Geolocation } from '@ionic-native/geolocation';


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
  public latitude: any = 0;
  public longitude: any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: ApiHttpProvider,
              private alertCtrl: AlertController, private nativeStorage: NativeStorage,
              private modalCtrl: ModalController, private loadCtrl: LoadingController, 
              private geolocation: Geolocation) {
    this.nativeStorage.getItem('firm').then(firm => {
      this.firm = firm;
    }).catch(error => {
      this.firm = {
        'isCapture': false,
        'img': ''
      }
    });
    this.nativeStorage.getItem('photo').then(photo => {
      this.photo = photo;
    }).catch(error => {
      this.photo = {
        'isCapture': false,
        'img': ''
      };
    });
    this.checklist = this.navParams.get('checklist');
    this.nativeStorage.getItem('user').then( user => {
      this.user = user;
      // obtengo las categorias
      this.generateRequest();
    });
    // obtengo la posicion del dispositivo actual
    this.geolocation.getCurrentPosition().then( resp => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
    }).catch( error => {
      console.error('Error al capturar la geoposicion: ', JSON.stringify(error));
    });
  }

  ionViewCanEnter() {
    this.nativeStorage.getItem('firm').then(firm => {
      this.firm = firm;
    }).catch(error => {
      this.firm = {
        'isCapture': false,
        'img': ''
      }
    });
    this.nativeStorage.getItem('photo').then(photo => {
      this.photo = photo;
    }).catch(error => {
      this.photo = {
        'isCapture': false,
        'img': ''
      };
    });
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
    let loading = this.loadCtrl.create({
      content: 'Cargando ...'
    });
    loading.present();
    this.http.get(`/checklist/${this.checklist.cod_checkl}/categories`, params).then(response => {
      if (response.data) {
        const data = JSON.parse(response.data);
        this.categories = data;
        this.fullCategories = this.categories;
        this.getChecklistInLocalStorage();
      }
      loading.dismiss();
    });
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
    // verifico que la foto se halla tomado, si no envio vacio
    if (!this.photo.isCapture) {
      this.photo.img = '';
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
    let loading = this.loadCtrl.create({
      content: 'Cargando ...'
    });
    loading.present();
    // obtengo la checklist que se enviará a la api
    this.nativeStorage.getItem('checklist').then(checklist => {
      const params = {
        'checklist': checklist,
        'token': this.user.token,
        'firm': this.firm,
        'photo': this.photo,
        'latitude': this.latitude,
        'longitude': this.longitude
      };
      this.http.post('/checklistanswered', params).subscribe((response: any) => {
        console.log(JSON.stringify(response));
        loading.dismiss();
        this.alertCtrl.create({
          'title': ``,
          'message': 'Se ha enviado el formulario',
          'buttons': [
            {
              'text': 'OK',
              'handler': () => {
                this.nativeStorage.remove('checklist');
                this.nativeStorage.remove('photo');
                this.nativeStorage.remove('firm');
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
        loading.dismiss();
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
    }).catch(error => {
      console.log("ERROR :::", JSON.stringify(error));
    });
  }

  public capturePhoto(): void {
    let modalPhoto = this.modalCtrl.create(PopupCapturePhotoPage);
    modalPhoto.onDidDismiss( data => {
      this.nativeStorage.getItem('photo').then(photo => {
        this.photo = photo;
      }).catch(error => {
        this.photo = {
          'isCapture': false,
          'img': ''
        };
      });
    });
    modalPhoto.present();
  }

  public captureFirm(): void {
    let modalFirm = this.modalCtrl.create(PopupCaptureFirmPage);
    modalFirm.onDidDismiss( data => {
      this.nativeStorage.getItem('firm').then(firm => {
        this.firm = firm;
      }).catch(error => {
        this.firm = {
          'isCapture': false,
          'img': ''
        }
      });
    });
    modalFirm.present();
  }

}
