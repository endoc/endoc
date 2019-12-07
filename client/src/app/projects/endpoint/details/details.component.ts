import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RouteModel } from 'src/models/routes/route.model';
import { ApiService } from 'src/services/authentication/api.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  project_id: string;
  endpoint_id: string;
  selected_route: RouteModel;
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, public deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.endpoint_id = params['routeId'];
      this.activatedRoute.parent.params.subscribe((pParams: Params) => {
        this.project_id = pParams['projectId'];
        this.get_route_details();
      });
    });
  }

  async get_route_details() {
    this.selected_route = undefined;
    this.selected_route = await this.api.get(`/api/project/${this.project_id}/endpoint/${this.endpoint_id}`);
  }


  public get css_class_of_path_method(): string {
    switch (this.selected_route.Method) {
      case 'POST':
        return 'warning';
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
}
