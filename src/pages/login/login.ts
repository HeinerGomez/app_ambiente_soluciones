import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public nameIcon: string;
  public passwordLooks: boolean;
  public typeInput: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.nameIcon = 'eye';
    this.passwordLooks = false;
    this.typeInput = 'password';
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

}
