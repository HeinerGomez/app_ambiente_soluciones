import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChecklistDetailPage } from './checklist-detail';

@NgModule({
  declarations: [
    ChecklistDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(ChecklistDetailPage),
  ],
})
export class ChecklistDetailPageModule {}
