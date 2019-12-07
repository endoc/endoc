import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';
import { EndocSharedModule } from 'src/global/modules/shared.module';
import { DocComponent } from './doc/doc.component';

@NgModule({
  imports: [
    PublicRoutingModule,
    EndocSharedModule,
    CommonModule
  ],
  declarations: [PublicComponent, DocComponent]
})
export class PublicModule { }
