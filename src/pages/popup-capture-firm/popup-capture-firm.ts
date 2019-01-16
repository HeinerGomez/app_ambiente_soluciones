import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Content, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-popup-capture-firm',
  templateUrl: 'popup-capture-firm.html',
})
export class PopupCaptureFirmPage {

  public firmPhoto: any;
  @ViewChild('imageCanvas') canvas: any;
  @ViewChild(Content) content: Content;
  @ViewChild('fixedContainer') fixedContainer: any;
  public canvasElement: any;
  public saveX: number;
  public saveY: number;
  public selectedColor = '#212121';

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private viewCtrl: ViewController, private localStorage: NativeStorage, 
              private alertCtrl: AlertController, private plt: Platform) {
  
    this.localStorage.getItem('firm').then(firm => {
      this.firmPhoto = firm.img;
    }).catch( error => {
      this.firmPhoto = '';
    });

  }

  ionViewDidLoad() {
    this.canvasElement = this.canvas.nativeElement;
    this.canvasElement.width = this.plt.width() + '';
    this.canvasElement.height = 300;
  }

  public closeModal(): void {
    this.viewCtrl.dismiss();
  }

  public saveFirm(): void {
    let dataUrl = this.canvasElement.toDataURL();
    this.firmPhoto = dataUrl;
    this.localStorage.remove('firm');
    const firm = {
      'isCapture': true,
      'img': this.firmPhoto
    };
    this.localStorage.setItem('firm', firm).then(() => {
      this.alertCtrl.create({
        'title': ``,
        'message': 'La firma se ha guardado con exito',
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
      console.error("Error al guardar la firma: ", JSON.stringify(error));
    });
  }

  public startDrawing(ev): void {
    let canvasPosition = this.canvasElement.getBoundingClientRect();
    this.saveX = ev.touches[0].pageX - canvasPosition.x;
    this.saveY = ev.touches[0].pageY - canvasPosition.y;
  }

  public moved(ev): void {
    let canvasPosition = this.canvasElement.getBoundingClientRect();
    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.touches[0].pageX - canvasPosition.x;
    let currentY = ev.touches[0].pageY - canvasPosition.y;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.selectedColor;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.stroke();
    this.saveX = currentX;
    this.saveY = currentY;
  }

  public clearDraw():void {
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas
  }


}
