import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/authentication/api.service';
import { ActivatedRoute } from '@angular/router';
import { ReturnObject } from 'src/models/returnObj.model';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  project_id: string;
  members: any[];

  // Add member on project variables
  member_to_add_on_project: string;
  is_loading_member = false;
  add_member_on_board_response: ReturnObject;

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.activatedRoute.parent.parent.parent.params.subscribe(params => {
      this.project_id = params['projectId'];
      this.get_members();
    });
  }

  public get valid_member_to_add(): boolean {
    if (!this.member_to_add_on_project) {
      return false;
    }
    const user_exists = this.members && this.members.find(x => x.Username.toUpperCase() === this.member_to_add_on_project.toUpperCase() );
    return !user_exists;
  }

  async get_members() {
    this.members = await this.api.get(`/api/project/${this.project_id}/member/list`);
  }

  async add_member_on_project() {
    if (this.valid_member_to_add) {
      this.is_loading_member = true;
      const member = { username: this.member_to_add_on_project };
      this.add_member_on_board_response = await this.api.post(`/api/project/${this.project_id}/member/add`, member, true);
      if (this.add_member_on_board_response.success) {
        this.members = this.add_member_on_board_response.data;
        this.member_to_add_on_project = '';
      }
      this.is_loading_member = false;
    }
  }

  async remove_member_from_project(memberId: string) {
    this.is_loading_member = true;
    const res: ReturnObject = await this.api.delete(`/api/project/${this.project_id}/member/${memberId}/remove`, true);
    if (res.success) {
      this.members = res.data;
    }
    this.is_loading_member = false;
  }
}
