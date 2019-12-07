import { EndocSharedModule } from 'src/global/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndpointComponent } from './endpoint.component';
import { QuoteComponent } from './quote/quote.component';
import { NewComponent } from './new/new.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { EndpointRoutingModule } from './endpoint-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EndpointRoutingModule,
    EndocSharedModule
  ],
  declarations: [EndpointComponent, QuoteComponent, NewComponent, DetailsComponent, EditComponent]
})
export class EndpointModule { }
