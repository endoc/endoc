import { Component, OnInit } from '@angular/core';
import { HeaderModel } from 'src/models/routes/header.model';
import { RouteModel } from 'src/models/routes/route.model';
import { ParameterModel } from 'src/models/routes/parameter.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/services/authentication/api.service';
import { ResponseModel } from 'src/models/routes/reponse.model';
import { CommunicationService } from 'src/services/communication.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  route_to_create: RouteModel = new RouteModel();
  methods: string[];
  parameter_types: string[];
  data_types: string[];
  header_types: string[];
  parameters_mode = 1; // 1=Key-Value, 2=Raw

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private communication: CommunicationService) {
    this.fill_methods();
    this.fill_parameter_types();
    this.fill_parameter_data_types();
    this.fill_headers();
  }

  ngOnInit() {
    this.activatedRoute.parent.params.subscribe((pParams: Params) => {
      this.route_to_create.ProjectId = pParams['projectId'];
    });
  }

  async save_route() {
    if (this.parameters_mode === 1) { delete this.route_to_create.ParametersRaw; }
    if (this.parameters_mode === 2) { delete this.route_to_create.Parameters; }
    const result = await this.api.post(`/api/project/${this.route_to_create.ProjectId}/endpoint/add`, this.route_to_create, true);
    if (result.success) {
      this.communication.newEndpointSaved(result.data._id);
    }
  }

  // Helper methods
  add_new_header() {
    this.route_to_create.Headers.push(new HeaderModel());
  }

  remove_header(index: number) {
    this.route_to_create.Headers.splice(index, 1);
  }

  add_new_parameter() {
    this.route_to_create.Parameters.push(new ParameterModel());
  }

  remove_parameter(index: number) {
    this.route_to_create.Parameters.splice(index, 1);
  }

  add_new_response() {
    this.route_to_create.Responses.push(new ResponseModel());
  }

  remove_response(index: number) {
    this.route_to_create.Responses.splice(index, 1);
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

  // Helpers
  set_parameter_edit_mode(mode: number) {
    this.parameters_mode = mode;
  }
}
