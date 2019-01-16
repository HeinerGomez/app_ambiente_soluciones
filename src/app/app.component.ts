import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { CustomerManagementPage } from '../pages/customer-management/customer-management';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  
  public user: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
              private menuCtrl: MenuController, private localSotrage: NativeStorage) {
    platform.ready().then(() => {
      this.getDataUser();
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ionViewDidEnter() {
   this.getDataUser();
  }

  ionViewCanEnter() {
   this.getDataUser();
  }

  public getDataUser(): void {
    this.localSotrage.getItem('user').then( _user => {
      this.user = _user;
    }).catch( error => {
      console.error("ERRROR: ", JSON.stringify(error));
      this.user = {
        'foto': 'assets/imgs/person.png',
        'nombre': 'Desconocido',
        'token': null
      }
    });
  }

  public openPage(): void {
    this.rootPage = CustomerManagementPage;
    this.menuCtrl.close();
  }
  
  public logout(): void {
    this.menuCtrl.close();
    this.menuCtrl.enable(false);
    this.rootPage = LoginPage;
    this.localSotrage.clear();
  }

}

