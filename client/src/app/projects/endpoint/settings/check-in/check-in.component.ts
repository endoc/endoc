import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/authentication/api.service';
import { CheckInModel } from 'src/models/project/check-in.model';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {
  project_id: string;
  check_in_list: CheckInModel[];
  check_in_to_save: CheckInModel = new CheckInModel();
  publish_link: string;
  loading_html = false;
  loading_pdf = false;
  publishing = false;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.activatedRoute.parent.parent.parent.params.subscribe(params => {
      this.project_id = params['projectId'];
      this.get_check_ins();
      this.check_in_to_save.ProjectId = this.project_id;
    });
  }

  async save_check_in() {
    const res = await this.api.post(`/api/project/${this.project_id}/check-in/add`, this.check_in_to_save, true, true);
    this.get_check_ins();
    this.check_in_to_save = new CheckInModel();
  }

  async get_check_ins() {
    this.check_in_list = await this.api.get(`/api/project/${this.project_id}/check-in/list`);
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
    await this.api.post(`/api/project/${this.project_id}/check-in/${check_in_id}/publish/add`, {}, false, true);
    this.publishing = false;
  }

  async get_publish() {
    // const res = this.api.get(`/api/project/${this.project_id}/check-in/${check_in_id}/export/publish`);
  }
}
