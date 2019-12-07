import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LanguageService {
    private value_key = 'E-LANG';
    constructor(private translate: TranslateService) {
     }

    setDefaultLanguage() {
        const lang = this.getValue();
        this.translate.setDefaultLang( lang || 'en');
    }

    useLanguage(language: string) {
        this.translate.use(language);
        this.setValue(language);
    }

    private getValue(): string  {
        return localStorage.getItem(this.value_key);
    }

    private setValue(lang) {
        localStorage.setItem(this.value_key, lang);
    }
}
