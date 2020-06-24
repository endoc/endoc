import { EndocSharedModule } from 'src/global/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticlesModule } from 'ngx-particle';

import { LoginRoutingModule } from '../login/login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    EndocSharedModule,
    LoginRoutingModule,
    ParticlesModule
  ]
})
export class LoginModule { }
