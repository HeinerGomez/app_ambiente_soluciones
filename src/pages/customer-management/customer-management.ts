import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChecklistDetailPage } from '../checklist-detail/checklist-detail';
import { ApiHttpProvider } from '../../providers/api-http/api-http';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-customer-management',
  templateUrl: 'customer-management.html',
})
export class CustomerManagementPage {
  
  public checklist: any[];
  public checklistFullData: any[];
  private user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private apiHttp: ApiHttpProvider, private localStorage: NativeStorage) {
    // obtengo los datos del usuario
    if (this.navParams.get('user')) {
      this.user = this.navParams.get('user');
      this.generateRequest();
    } else {
      this.localStorage.getItem('user').then(_user => {
        this.user = _user;
        this.generateRequest();
      });
    }
    
  }

  ionViewCanEnter() {
    this.localStorage.getItem('user').then(_user => {
      this.user = _user;
      this.generateRequest();
    });
  }

  private generateRequest(): void {
    const params = {
      'token': this.user.token
    }
    this.apiHttp.get('/checklist', params).then( (response: any) => {
      this.checklist = JSON.parse(response.data);
      this.checklistFullData = JSON.parse(response.data);
    }).catch( error => {
      console.error(JSON.stringify(error));
    });
  }
  
  public selectChecklist(checklist): void {
    this.navCtrl.push(ChecklistDetailPage, {checklist}).then(()=> {
    }).catch(error => {
      console.error("Error: ", JSON.stringify(error));
    });
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
