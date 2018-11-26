import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-checklist-detail',
  templateUrl: 'checklist-detail.html',
})
export class ChecklistDetailPage {
  
  public checklist: any[];
  public iconTypeCheck: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.checklist = this.navParams.get('checklist');
    this.iconTypeCheck = true;
  }

  public handleChangeCheck(): void {    
    this.iconTypeCheck = !this.iconTypeCheck;
  }

}
