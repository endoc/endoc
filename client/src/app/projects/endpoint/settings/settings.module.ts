import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { EndocSharedModule } from 'src/global/modules/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { MembersComponent } from './members/members.component';
import { ExportComponent } from './export/export.component';
import { CheckInComponent } from './check-in/check-in.component';
import { PublishSettingsComponent } from './publish-settings/publish-settings.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    EndocSharedModule
  ],
  declarations: [SettingsComponent, MembersComponent, ExportComponent, CheckInComponent, PublishSettingsComponent]
})
export class SettingsModule { }
