import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { MembersComponent } from './members/members.component';
import { ExportComponent } from './export/export.component';
import { CheckInComponent } from './check-in/check-in.component';
import { PublishSettingsComponent } from './publish-settings/publish-settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      { path: 'members', component: MembersComponent },
      { path: 'export', component: ExportComponent },
      { path: 'check-in', component: CheckInComponent },
      { path: 'publish', component: PublishSettingsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
