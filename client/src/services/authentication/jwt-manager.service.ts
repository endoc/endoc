import { Injectable } from '@angular/core';
import * as JWT from 'jwt-decode';
import { AppuserModel } from 'src/models/auth/AppUser.mode';
import { Observable } from 'rxjs';

@Injectable()
export class JwtManager {
    private name = 'E-AUTH-TOKEN';

    // Below code represents an observable which is used on nav-bar component
    // to update fields when user is online and when is not.
    public user$: Observable<AppuserModel>;
    private _userObserver: any = undefined;
    private _user: AppuserModel = undefined;

    constructor() {
        const u = this.getUser() || undefined;
        if (u) { this._user = this.getUser(); }
        this.user$ = new Observable(observer => {
            this._userObserver = observer;
        });
    }

    load() {
        this._userObserver.next(this._user);
    }

    private decodeJwt(): JSON {
        if (this.getJwt()) {
            const decoded: JSON = JWT(this.getJwt());
            return decoded;
        }
        return undefined;
    }

    public setJwt(val: string) {
        localStorage.setItem(this.name, val);
        this._user = this.getUser();
        this._userObserver.next(this._user);
    }

    public clearJwt() {
        localStorage.removeItem(this.name);
        this._user = undefined;
        this._userObserver.next(this._user);
    }

    public getJwt(): any {
        return localStorage.getItem(this.name);
    }

    public getUser(): AppuserModel | undefined {
        const us = this.decodeJwt();
        if (us) {
            const uo: AppuserModel = new AppuserModel();
            uo._id = us['_id'];
            uo.Username = us['Username'];

            return uo;
        }
        return undefined;
    }

}
