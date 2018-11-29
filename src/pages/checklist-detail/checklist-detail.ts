import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, PopoverOptions } from 'ionic-angular';
import { PopoverItemChecklistPage } from '../popover-item-checklist/popover-item-checklist';

@IonicPage()
@Component({
  selector: 'page-checklist-detail',
  templateUrl: 'checklist-detail.html',
})
export class ChecklistDetailPage {
  
  public checklist: any[];
  public categories: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private popoverCtrl: PopoverController) {
    this.checklist = this.navParams.get('checklist');
    this.categories = this.checklist['categories'];
    console.log(this.categories);
  }

  public openPopover(): void {
    const popoverOptions: PopoverOptions = {
      'enableBackdropDismiss': true
    }
    let popover = this.popoverCtrl.create(PopoverItemChecklistPage);
    popover.present();
  }

  public nextCategory(): void {
    this.navCtrl.push(ChecklistDetailPage);
  }

}
