import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-popover-item-checklist',
  templateUrl: 'popover-item-checklist.html',
})
export class PopoverItemChecklistPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
             public viewCtrl: ViewController) {
  }

  public saveItem() {
    this.viewCtrl.dismiss();
    console.log('guardando');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverItemChecklistPage');
  }

}
