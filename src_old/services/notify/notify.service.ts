import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  show(text: any, is_success: boolean) {
    if (is_success) {
      this.toastr.success(text, '', { easeTime: 150 });
    } else {
      this.toastr.error(text, '', { easeTime: 150 });
    }
  }
}
