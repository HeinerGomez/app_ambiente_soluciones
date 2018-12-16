import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiHttpProvider } from '../../providers/api-http/api-http';

@IonicPage()
@Component({
  selector: 'page-list-item',
  templateUrl: 'list-item.html',
})
export class ListItemPage {

  public category: any;
  public itemsList: any[];
  public fullItemsList: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private http: ApiHttpProvider, public alertCtrl: AlertController) {
    this.category = this.navParams.get('category');
    this.http.get(`/checklist/${this.category.cod_checkl}/categories/${this.category.cod_catego}/items`).then( response => {
      if (response.data) {
        const data = JSON.parse(response.data);
        // this.transformListItems(data);
        this.itemsList = data;
        this.fullItemsList = data;
      }
    }).catch( error => {
      console.error('Ha ocurrido un error: ', JSON.stringify(error));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListItemPage');
  }
  
  public save(): void {
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

  private transformListItems(data): void {
    // this.itemsList = data;
    // this.fullItemsList = data;
    for (let item of data) {
      
    }
  }

}
