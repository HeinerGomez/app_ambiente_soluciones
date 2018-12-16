import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { CustomerManagementPage } from '../customer-management/customer-management';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public nameIcon: string;
  public passwordLooks: boolean;
  public typeInput: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
    this.nameIcon = 'eye';
    this.passwordLooks = false;
    this.typeInput = 'password';
    this.menuCtrl.enable(false);
  }

  public switchPasswordLooks(): void {
    console.log('tap');
    if (this.passwordLooks) {
      this.nameIcon = 'eye';
      this.passwordLooks = false;
      this.typeInput = 'password';
    } else {
      this.nameIcon = 'eye-off';
      this.passwordLooks = true;
      this.typeInput = 'text';
    }
  }

  public login(): void {
    this.navCtrl.push(CustomerManagementPage);
  }

}
