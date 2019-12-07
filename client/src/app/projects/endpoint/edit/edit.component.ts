import { Component, OnInit } from '@angular/core';
import { HeaderModel } from 'src/models/routes/header.model';
import { RouteModel } from 'src/models/routes/route.model';
import { ParameterModel } from 'src/models/routes/parameter.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/services/authentication/api.service';
import { ResponseModel } from 'src/models/routes/reponse.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  isLoading = false;
  route_to_edit: RouteModel = new RouteModel();
  methods: string[];
  parameter_types: string[];
  data_types: string[];
  header_types: string[];

  constructor(private api: ApiService, private activatedRoute: ActivatedRoute) {
    this.fill_methods();
    this.fill_parameter_types();
    this.fill_parameter_data_types();
    this.fill_headers();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.route_to_edit._id = params['routeId'];
      this.activatedRoute.parent.params.subscribe((pParams: Params) => {
        this.route_to_edit.ProjectId = pParams['projectId'];
        this.get_route_details();
      });
    });
  }

  async get_route_details() {
    this.isLoading = true;
    this.route_to_edit = await this.api.get(`/api/project/${this.route_to_edit.ProjectId}/endpoint/${this.route_to_edit._id}`);
    this.isLoading = false;
  }

  async updateRoute() {
    await this.api.put(`/api/project/${this.route_to_edit.ProjectId}/endpoint/${this.route_to_edit._id}/edit`, this.route_to_edit, false, true);
  }

  // Helper methods
  add_new_header() {
    this.route_to_edit.Headers.push(new HeaderModel());
  }

  remove_header(index: number) {
    this.route_to_edit.Headers.splice(index, 1);
  }

  add_new_parameter() {
    this.route_to_edit.Parameters.push(new ParameterModel());
  }

  remove_parameter(index: number) {
    this.route_to_edit.Parameters.splice(index, 1);
  }
  add_new_response(index: number) {
    this.route_to_edit.Responses.push(new ResponseModel());
  }

  remove_response(index: number) {
    this.route_to_edit.Responses.splice(index, 1);
  }

  // Prefill methods
  private async fill_methods() {
    this.methods = await this.api.get('/api/satellite/http_request_types');
  }

  private async fill_parameter_types() {
    this.parameter_types = await this.api.get('/api/satellite/parameter_types');
  }

  private async fill_parameter_data_types() {
    this.data_types = await this.api.get('/api/satellite/data_types');
  }

  private async fill_headers() {
    this.header_types = await this.api.get('/api/satellite/header_types');
  }

}
