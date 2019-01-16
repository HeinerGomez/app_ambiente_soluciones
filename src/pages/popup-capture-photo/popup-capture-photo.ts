import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-popup-capture-photo',
  templateUrl: 'popup-capture-photo.html',
})
export class PopupCapturePhotoPage {
  
  public photoImage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private viewCtrl: ViewController, private camara: Camera,
              private localStorage: NativeStorage, private alertCtrl: AlertController) {
  
    this.localStorage.getItem('photo').then(photo => {
      this.photoImage = photo.img;
    }).catch( error => {
      this.photoImage = '';
    });

  }

  public closeModal(): void {
    this.viewCtrl.dismiss();
  }

  public openCamera(): void {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camara.DestinationType.DATA_URL,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE,
      saveToPhotoAlbum: false
    }
    this.camara.getPicture(options).then((imageData) => {
      this.photoImage = 'data:image/png;base64,'+imageData;
    });
  }

  public savePhoto(): void {
    this.localStorage.remove('photo');
    const photo = {
      'isCapture': true,
      'img': this.photoImage
    };
    this.localStorage.setItem('photo', photo).then(() => {
      this.alertCtrl.create({
        'title': ``,
        'message': 'La foto se ha guardado con exito',
        'buttons': [
          {
            'text': 'Entendido',
            'handler': () => {
              this.viewCtrl.dismiss();
            }
          }
        ]
      }).present();
    }).catch(error => {
      console.error("Error al guardar la img: ", JSON.stringify(error));
    });
  }
  

}
