import { QuoteComponent } from './quote/quote.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new/new.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { EndpointComponent } from './endpoint.component';

const routes: Routes = [
  {
    path: '',
    component: EndpointComponent,
    children: [
      { path: '', component: QuoteComponent },
      { path: 'endpoint/new', component: NewComponent },
      { path: 'endpoint/:routeId', component: DetailsComponent },
      { path: 'endpoint/:routeId/edit', component: EditComponent },

      // Project settings
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndpointRoutingModule { }
