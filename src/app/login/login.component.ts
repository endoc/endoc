import { Component, OnInit } from '@angular/core';
import { AppuserModel } from 'src/models/auth/appUser.model';
import { ReturnObject } from 'src/models/returnObj.model';
import { Router } from '@angular/router';
import { JwtManager } from 'src/services/authentication/jwt-manager.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/services/authentication/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userToRegister: AppuserModel;
  user: AppuserModel;
  loginResponse: ReturnObject;
  registerResponse: ReturnObject;
  myStyle: object = {};
  myParams: object = {};
  isInLogin = true;
  isLoading = false;
  isRegisterLoading = false;

  constructor(private router: Router, private http: HttpClient, private jwtManager: JwtManager, private api: ApiService) {
    this.user = new AppuserModel();
    this.userToRegister = new AppuserModel();
  }

  async login() {
    if (this.user.Username && this.user.Password) {
      this.isLoading = true;
      this.loginResponse = undefined;
      const res: ReturnObject = await this.api.post('/api/auth/login', this.user, true);
      if (res && res.success === true) {
        this.jwtManager.setJwt(res.data);
        this.router.navigateByUrl('/project');
      } else {
        this.loginResponse = {
          success: false,
          message: 'ERR_LOGIN_NOCREDS'
        };
      }
      this.isLoading = false;
    }
  }

  async register() {
    this.isRegisterLoading = true;
    const res: ReturnObject = await this.api.post('/api/auth/register', this.userToRegister, true);
    if (res && res.success === true) {
      this.jwtManager.setJwt(res.data);
      this.router.navigateByUrl('/project');
    } else {
      this.registerResponse = {
        success: false,
        message: res.message
      };
    }
    this.isRegisterLoading = false;
  }

  toggleRegisterLogin() {
    this.isInLogin = !this.isInLogin;
  }

  ngOnInit() {
    if (this.jwtManager.getUser()) {
      this.router.navigate(['/project']);
    }
  }
}
