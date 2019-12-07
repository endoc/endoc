import { Component, OnInit } from '@angular/core';
import { ProjectModel } from 'src/models/project/project.model';
import { RouteModel } from 'src/models/routes/route.model';
import { ReturnObject } from 'src/models/returnObj.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ApiService } from 'src/services/authentication/api.service';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.css']
})
export class EndpointComponent implements OnInit {
  routeId: string;
  route_filter: string;
  selected_project_model: ProjectModel;
  selected_project: string;
  selected_route: string;
  routes_list: RouteModel[] = [];
  is_loading_routes = false;
  is_loading_project = false;

  // Add member on project variables
  member_to_add_on_project: string;
  is_loading_member = false;
  add_member_on_board_response: ReturnObject;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    public deviceService: DeviceDetectorService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.selected_project = params['projectId'];
      this.get_project_data();
    });
  }

  select_route(routeId) {
    this.router.navigate([`endpoint/${routeId}`], {
      relativeTo: this.activatedRoute
    });
  }

  public get get_route_list(): RouteModel[] {
    return this.route_filter ? this.routes_list.filter(x => x.Path.toUpperCase().includes(this.route_filter.toUpperCase())) : this.routes_list;
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

  async get_project_details() {
    this.is_loading_project = true;
    this.selected_project_model = await this.api.get(`/api/project/${this.selected_project}`);
    this.is_loading_project = false;
  }

  async get_all_routes() {
    this.is_loading_routes = true;
    this.routes_list = await this.api.get(`/api/project/${this.selected_project}/endpoint/list`);
    this.is_loading_routes = false;
  }

  get_project_data() {
    this.get_all_routes();
    this.get_project_details();
  }

  async add_member_on_project() {
    this.is_loading_member = true;
    const member = { username: this.member_to_add_on_project };
    // this.add_member_on_board_response = await this.api.get(`/api/project/add-member/${this.selected_project}/${this.member_to_add_on_project}`, true);
    this.add_member_on_board_response = await this.api.post(`/api/project/${this.selected_project}/member/add`, member, true);
    if (this.add_member_on_board_response.success) {
      this.selected_project_model.Members = this.add_member_on_board_response.data;
      this.member_to_add_on_project = '';
    }
    this.is_loading_member = false;
  }

  async remove_member_from_project(memberId: string) {
    this.is_loading_member = true;
    const res: ReturnObject = await this.api.delete(`/api/project/${this.selected_project}/member/${memberId}/remove`, true);
    if (res.success) {
      this.selected_project_model.Members = res.data;
    }
    this.is_loading_member = false;
  }

}
