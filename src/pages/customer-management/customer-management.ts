import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CHECKLIST } from '../../api/checklist';

@IonicPage()
@Component({
  selector: 'page-customer-management',
  templateUrl: 'customer-management.html',
})
export class CustomerManagementPage {
  
  public checklist: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.checklist = CHECKLIST;
  }
  
  public selectChecklist(checklist): void {
    console.log("checklist: ", checklist);
  }

  public handleInputSearch(inputSearch): void {
    const searchTerm = inputSearch.value.trim();
    if (searchTerm != "") {
      this.checklist = CHECKLIST.filter( item => ( item.name.toLowerCase().includes(searchTerm.toLowerCase()) ));
    } else {
      this.checklist = CHECKLIST;
    }
  }

}