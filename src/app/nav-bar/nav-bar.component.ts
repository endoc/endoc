import { Component, OnInit } from '@angular/core';
import { JwtManager } from 'src/services/authentication/jwt-manager.service';
import { AppuserModel } from 'src/models/auth/AppUser.mode';
import { LanguageService } from 'src/services/language/lang.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public usr: AppuserModel;
  public _page: string;
  public isOnProjectPage = false;

  constructor(private jwt: JwtManager, private translate: LanguageService, private router: Router) { }

  ngOnInit() {
    this.jwt.user$.subscribe(latestCollection => {
      this.usr = latestCollection;
    });

    this.jwt.load();

    this.router.events.subscribe(
      (url: any) => {
        this._page = url.url;
        if (this._page && this._page.includes('/projects/')) {
          this.isOnProjectPage = true;
        } else {
          this.isOnProjectPage = false;
        }
    });
  }

  useLanguage(language: string) {
    this.translate.useLanguage(language);
  }

  logOut() {
    this.jwt.clearJwt();
    this.router.navigateByUrl('/');
  }

}
