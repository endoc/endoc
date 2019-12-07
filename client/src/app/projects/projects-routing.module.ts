import { ProjectsComponent } from './projects.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: ':projectId', loadChildren: () => import('./endpoint/endpoint.module').then(m => m.EndpointModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
