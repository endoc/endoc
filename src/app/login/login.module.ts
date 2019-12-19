import { EndocSharedModule } from 'src/global/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from '../login/login-routing.module';
import { LoginComponent } from './login.component';
import { ParticlesModule } from 'angular-particle';

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
