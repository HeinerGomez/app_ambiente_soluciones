import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverItemChecklistPage } from './popover-item-checklist';

@NgModule({
  declarations: [
    PopoverItemChecklistPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverItemChecklistPage),
  ],
})
export class PopoverItemChecklistPageModule {}
