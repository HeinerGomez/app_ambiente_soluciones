import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { CustomerManagementPage } from '../customer-management/customer-management';
import { ApiHttpProvider } from '../../providers/api-http/api-http';
import { NativeStorage } from '@ionic-native/native-storage';
import { ENVIRONMENT } from '../../environment/environment';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public nameIcon: string;
  public passwordLooks: boolean;
  public typeInput: string;
  public user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menuCtrl: MenuController, public http: ApiHttpProvider,
    public toastCtrl: ToastController, public localStorage: NativeStorage) {
    this.nameIcon = 'eye';
    this.passwordLooks = false;
    this.typeInput = 'password';
    this.menuCtrl.enable(false);
    this.user = {
      'userId': null,
      'pwd': null
    }
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

  public switchPasswordLooks(): void {
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
    this.http.get('/authenticate', this.user).then(response => {
      let data = JSON.parse(response.data);
      let dataResponse = data.data;
      console.warn("Respuesta: ", JSON.stringify(dataResponse));
      if (dataResponse.code != "401") {
        let user = {
          'foto': ENVIRONMENT.URL_API_PUBLIC + '/' + dataResponse.user.fot_usuari,
          'nombre': dataResponse.user.nom_usuari,
          'token': dataResponse.token
        }
        // guardo el token la info del usuario en el localstorage
        this.localStorage.remove('user').then(() => {
          this.localStorage.setItem('user', user).then(response => {
            this.navCtrl.setRoot(CustomerManagementPage, {user} ).then(rs => {
              this.menuCtrl.enable(true);
            });
          });
        }).catch( error => {
          console.error("ERROR: ", JSON.stringify(error));
        });
      } else {
        this.toastCtrl.create({
          'message': 'Accesos Incorrectos',
          'position': 'bottom',
          'closeButtonText': 'Entendido',
          'showCloseButton': true,
          'duration': 3000
        }).present();
      }
    }).catch(error => {
      console.error("ERROR: ", JSON.stringify(error));
    });
  }

}
