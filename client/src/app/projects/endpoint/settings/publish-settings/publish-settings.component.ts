import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/services/authentication/api.service';
import { NotificationService } from 'src/services/notify/notify.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-publish-settings',
  templateUrl: './publish-settings.component.html',
  styleUrls: ['./publish-settings.component.css']
})
export class PublishSettingsComponent implements OnInit {
  project_id: string;
  publish: any;
  publish_exists: boolean;
  public_link: string;
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private notify: NotificationService, private translate: TranslateService) { }

  ngOnInit() {
    this.activatedRoute.parent.parent.parent.params.subscribe(params => {
      this.project_id = params['projectId'];
      this.get_publish();
    });
  }

  async get_publish() {
    const res: any = await this.api.get(`/api/project/${this.project_id}/check-in/NOT_APPLICABLE/publish/view`, true);
    if (res.success && res.status === 200) {
      this.publish = res.data;
      this.public_link = this.publish_public_link();
      this.publish_exists = true;
    } else if (res.success && res.status === 200) {
      this.publish_exists = false;
    }
  }

  async delete() {
    const res: any = await this.api.delete(`/api/project/${this.project_id}/check-in/NOT_APPLICABLE/publish/${this.publish._id}/delete`, true, true);
    if (res.success) {
      this.publish_exists = false;
      this.publish = {};
      this.public_link = '';
    }
  }

  async copy_public_url() {
    try {
      const n: any = window.navigator;
    const translated: string = this.translate.instant('PUBLISH.Copied');
    this.notify.show(translated, true);
    } catch (e) {
      const translated: string = this.translate.instant('PUBLISH.NotCopied');
      this.notify.show(translated, false);
    }
  }

  public publish_public_link(): string {
    if (!this.publish) {
      return '';
    } else {
      const parsedUrl = new URL(window.location.href);
      const baseUrl = parsedUrl.origin;
      const public_url = `${baseUrl}/public/api/${this.publish.PublicHash}`;
      return public_url;
    }
  }
}
