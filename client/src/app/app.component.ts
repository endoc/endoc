import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/services/language/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent  {
  constructor(private translate: LanguageService) {
    translate.setDefaultLanguage();
  }
}
