import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerManagementPage } from './customer-management';

@NgModule({
  declarations: [
    CustomerManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerManagementPage),
  ],
})
export class CustomerManagementPageModule {}
