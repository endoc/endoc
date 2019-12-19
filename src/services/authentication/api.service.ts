import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { saveAs } from 'file-saver';
import { NotificationService } from '../notify/notify.service';
import { TranslateService } from '@ngx-translate/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Expose-Headers': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string;

  constructor(private http: HttpClient, private notification: NotificationService, private translate: TranslateService) {
    this.apiUrl = environment.apiUrl;
  }

  async post(path: string, data, return_full_response = false, notify_user = false): Promise<any> {
    const url = `${this.apiUrl}${path}`;
    let response;
    await this.http.post<any>(url, data, httpOptions)
      .toPromise()
      .then(
        (s) => response = this.treat_success(s, return_full_response, notify_user),
        (e) => response = this.treat_error(e)
      );
    return response;
  }

  async get(path: string, return_full_response = false, notify_user = false): Promise<any> {
    const url = `${this.apiUrl}${path}`;
    let response;
    await this.http.get<any>(url, httpOptions)
      .toPromise()
      .then(
        (s) => response = this.treat_success(s, return_full_response, notify_user),
        (e) => response = this.treat_error(e)
      );
    return response;
  }

  async put<T>(path: string, data, return_full_response = false, notify_user = false): Promise<T> {
    const url = `${this.apiUrl}${path}`;
    let response;
    await this.http.put<T>(url, data, httpOptions)
      .toPromise()
      .then(
        (s) => response = this.treat_success(s, return_full_response, notify_user),
        (e) => response = this.treat_error(e)
      );
    return response;
  }

  async delete<T>(path: string, return_full_response = false, notify_user = false): Promise<T> {
    const url = `${this.apiUrl}${path}`;
    let response;
    await this.http.delete<T>(url, httpOptions)
      .toPromise()
      .then(
        (s) => response = this.treat_success(s, return_full_response, notify_user),
        (e) => response = this.treat_error(e)
      );
    return response;
  }

  async file(file_type: string, path: string, data: any) {
    const url = `${this.apiUrl}${path}`;
    switch (file_type) {
      case 'pdf':
        const res_post: any = await this.http.post(url, data, { responseType: 'blob' as 'json' }).toPromise();
        const blob_post = new Blob([res_post], { type: 'application/pdf' });
        saveAs(blob_post, 'endoc.pdf');
        break;
      case 'html':
        const res_put: any = await this.http.post<Blob>(url, data, { responseType: 'blob' as 'json' }).toPromise();
        const blob_put = new Blob([res_put]);
        saveAs(blob_put, 'endoc.html');
        break;
      default:
        break;
    }
  }

  private returnData(res) {
    return res ? res.data : undefined;
  }

  treat_success(res, return_full_response, notify_user = false): any {
    if (notify_user) {

      if (res && res.message) {
        const translated: string = this.translate.instant('RESPONSE.' + res.message);
        // Show message only if message has been translated
        if (!translated.includes('RESPONSE.')) {
          this.notification.show(translated, res.success);
        }
      }
    }
    return return_full_response ? res : this.returnData(res);
  }

  treat_error(res): any {
    // Errors not handled in serverside so no custom error message will be avalabile!
    const translated = this.translate.instant('RESPONSE.ERR_SOMETHING_WENT_WRONG');
    this.notification.show(translated, false);
    return undefined;
  }
}
