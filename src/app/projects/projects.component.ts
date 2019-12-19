import { Component, OnInit } from '@angular/core';
import { ProjectModel } from 'src/models/project/project.model';
import { ApiService } from 'src/services/authentication/api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  project_to_create: ProjectModel = new ProjectModel();
  project_list: ProjectModel[] = [];
  filter: string;
  is_loading = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.populate_project_list();
  }

  async populate_project_list() {
    this.is_loading = true;
    this.project_list = await this.api.get(`/api/project/list`);
    this.is_loading = false;
  }

  public get get_project_list(): ProjectModel[] {
    return this.filter ? this.project_list.filter(x => this.is_valid(x)) : this.project_list;
  }

  private is_valid(x: ProjectModel): boolean {
    return (x.Title && x.Title.toUpperCase().includes(this.filter.toUpperCase()))
      || (x.Description && x.Description.toUpperCase().includes(this.filter.toUpperCase()));
  }

  async save_project() {
    const project: ProjectModel = await this.api.post('/api/project/add', this.project_to_create, false, true);
    this.project_list.push(project);
    this.project_to_create = new ProjectModel();
  }
}
