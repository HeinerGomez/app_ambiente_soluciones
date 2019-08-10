import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// componente root
import { MyApp } from './app.component';
// modulos de las pages
import { LoginPageModule } from '../pages/login/login.module';
import { CustomerManagementPageModule } from '../pages/customer-management/customer-management.module';
import { ChecklistDetailPageModule } from '../pages/checklist-detail/checklist-detail.module';
import { PopoverItemChecklistPageModule } from '../pages/popover-item-checklist/popover-item-checklist.module';
import { PopupCapturePhotoPageModule } from '../pages/popup-capture-photo/popup-capture-photo.module';
import { PopupCaptureFirmPageModule } from '../pages/popup-capture-firm/popup-capture-firm.module';
// providers
import { ApiHttpProvider } from '../providers/api-http/api-http';
import { HTTP } from '@ionic-native/http';
import { ListItemPageModule } from '../pages/list-item/list-item.module';
import { NativeStorage } from '@ionic-native/native-storage';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    CustomerManagementPageModule,
    ChecklistDetailPageModule,
    PopoverItemChecklistPageModule,
    PopupCapturePhotoPageModule,
    PopupCaptureFirmPageModule,
    ListItemPageModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiHttpProvider,
    NativeStorage,
    HTTP,
    Camera,
    Network,
    Geolocation
  ]
})
export class AppModule {}
