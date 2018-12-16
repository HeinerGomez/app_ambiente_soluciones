import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, PopoverOptions, AlertController } from 'ionic-angular';
import { PopoverItemChecklistPage } from '../popover-item-checklist/popover-item-checklist';
import { ApiHttpProvider } from '../../providers/api-http/api-http';
import { ListItemPage } from '../list-item/list-item';

@IonicPage()
@Component({
  selector: 'page-checklist-detail',
  templateUrl: 'checklist-detail.html',
})
export class ChecklistDetailPage {
  
  public checklist: any;
  public categories: any[];
  public fullCategories: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private popoverCtrl: PopoverController, private http: ApiHttpProvider, 
              private alertCtrl: AlertController) {
    this.checklist = this.navParams.get('checklist');
    // obtengo las categorias
    this.http.get(`/checklist/${this.checklist.cod_checkl}/categories`).then( response => {
      if (response.data) {
        const data = JSON.parse(response.data);
        this.categories = data;
        this.fullCategories = this.categories;
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

  public selectedCategoty(category:any): void {
    this.navCtrl.push(ListItemPage, {category});
  } 

  public handleInputSearch(inputSearch): void {
    const searchTerm = inputSearch.value.trim();
    if (searchTerm != "") {
      this.categories = this.fullCategories.filter( item => ( item.nom_catego.toLowerCase().includes(searchTerm.toLowerCase()) ));
    } else {
      this.categories = this.fullCategories;
    }
  }

  public send(): void {
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
  }

  public saveToDraft(): void {
    this.alertCtrl.create({
      'title': ``,
      'message': 'El formulario se ha guardado en borrador',
      'buttons': [
        {
          'text': 'Entendido',
          'handler': () => {
            this.navCtrl.pop();
          }
        }
      ]
    }).present();
  }

}
