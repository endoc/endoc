import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/authentication/api.service';
import { CheckInModel } from 'src/models/project/check-in.model';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent implements OnInit {
  check_in_id: string;
  ci: CheckInModel;
  filter: string;
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.check_in_id = params['checkInId'];
      this.get_check_in();
    });
  }

  public get endpoint_list(): any[] {
    if (this.ci && this.ci.Endpoints) {
      return  this.filter ? this.ci.Endpoints.filter(x => x.Path.toUpperCase().includes(this.filter.toUpperCase())) : this.ci.Endpoints;
    }
    return [];
  }

  public css_class_of_path_method(method: string): string {
    switch (method) {
      case 'POST':
        return 'warning text-dark';
      case 'GET':
        return 'primary';
      case 'DELETE':
        return 'danger';
      case 'PUT':
        return 'success';
      default:
        return 'dark';
    }
  }

  async get_check_in() {
    this.ci = await this.api.get(`/api/public/api-doc/${this.check_in_id}/view`);
  }
}
