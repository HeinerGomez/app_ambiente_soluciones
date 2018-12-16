import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChecklistDetailPage } from '../checklist-detail/checklist-detail';
import { ApiHttpProvider } from '../../providers/api-http/api-http';

@IonicPage()
@Component({
  selector: 'page-customer-management',
  templateUrl: 'customer-management.html',
})
export class CustomerManagementPage {
  
  public checklist: any[];
  public checklistFullData: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private apiHttp: ApiHttpProvider) {
    
    this.apiHttp.get('/checklist').then( (response: any) => {
      this.checklist = JSON.parse(response.data);
      this.checklistFullData = JSON.parse(response.data);
    }).catch( error => {
      console.error(JSON.stringify(error));
    });
  }
  
  public selectChecklist(checklist): void {
    this.navCtrl.push(ChecklistDetailPage, {checklist})
  }

  public handleInputSearch(inputSearch): void {
    const searchTerm = inputSearch.value.trim();
    if (searchTerm != "") {
      this.checklist = this.checklistFullData.filter( item => ( item.nom_checkl.toLowerCase().includes(searchTerm.toLowerCase()) ));
    } else {
      this.checklist = this.checklistFullData;
    }
  }

}
