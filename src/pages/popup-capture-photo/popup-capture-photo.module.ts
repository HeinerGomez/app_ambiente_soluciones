import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopupCapturePhotoPage } from './popup-capture-photo';

@NgModule({
  declarations: [
    PopupCapturePhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(PopupCapturePhotoPage),
  ],
})
export class PopupCapturePhotoPageModule {}
