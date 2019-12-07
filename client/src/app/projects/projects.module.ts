import { EndocSharedModule } from 'src/global/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';

@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    EndocSharedModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
