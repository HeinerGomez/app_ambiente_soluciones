import { Component } from '@angular/core';
import { Platform, MenuController, LoadingController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { CustomerManagementPage } from '../pages/customer-management/customer-management';
import { NativeStorage } from '@ionic-native/native-storage';
import { Network } from '@ionic-native/network';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  
  public user: any;
  public estaAutenticado = false;
  public sinInternet = false;

  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
              private menuCtrl: MenuController, private localSotrage: NativeStorage,
              private loadCtrl: LoadingController, private event: Events, 
              private network: Network) {
    this.platform.ready().then(() => {
      this.network.onDisconnect().subscribe(() => {
        this.sinInternet = true;
      });
      this.network.onConnect().subscribe(() => {
        this.sinInternet = false;
      });
      this.getDataUser();
      statusBar.backgroundColorByHexString('#036F9D');
      statusBar.styleLightContent();
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
    this.user = {
      'foto': 'assets/imgs/person.png',
      'nombre': 'Desconocido',
      'token': null
    }    
    this.localSotrage.getItem('user').then( _user => {
      this.user = _user;
      console.log("El usuario: ", JSON.stringify(this.user));
      this.estaAutenticado = true;
      this.rootPage = CustomerManagementPage;
    }).catch( error => {
      console.error("ERRROR: ", JSON.stringify(error));
      this.user = {
        'foto': 'assets/imgs/person.png',
        'nombre': 'Desconocido',
        'token': null
      };
      this.estaAutenticado = false;
    });
    this.event.subscribe('usuario:iniciado', val => {
      this.estaAutenticado = true;
      console.log("El usuario subscrito: ", JSON.stringify(val));
      this.user = val;
    });
  }

  public openPage(): void {
    this.rootPage = CustomerManagementPage;
    this.menuCtrl.close();
  }
  
  public logout(): void {
    let loading = this.loadCtrl.create({
      content: 'Cerrando sesion ...'
    });
    loading.present();
    setTimeout(() => {
      // this.event.unsubscribe("usuario:iniciado");
      this.localSotrage.clear();
      loading.dismiss();
      this.menuCtrl.enable(false);
      this.rootPage = LoginPage;
      this.platform.exitApp();
    }, 1500)
  }

}

