import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/authentication/api.service';
import { ActivatedRoute } from '@angular/router';
import { CheckInModel } from 'src/models/project/check-in.model';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
  project_id: string;
  check_ins: CheckInModel[];
  loading_html = false;
  loading_pdf = false;
  publishing = false;
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.activatedRoute.parent.parent.parent.params.subscribe(params => {
      this.project_id = params['projectId'];
      this.get_check_ins();
    });
  }

  async export_html(check_in_id) {
    this.loading_html = true;
    await this.api.file('html', `/api/project/${this.project_id}/check-in/${check_in_id}/export/html`, {});
    this.loading_html = false;
  }

  async export_pdf(check_in_id) {
    this.loading_pdf = true;
    await this.api.file('pdf', `/api/project/${this.project_id}/check-in/${check_in_id}/export/pdf`, {});
    this.loading_pdf = false;
  }

  async publish(check_in_id) {
    this.publishing = true;
    await this.api.post(`/api/project/${this.project_id}/check-in/${check_in_id}/export/publish`, {});
    this.publishing = false;
  }

  async get_check_ins() {
    this.check_ins = await this.api.get(`/api/project/${this.project_id}/check-in/list`);
  }
}
