import { Component } from '@angular/core';

import { AuthService } from "../auth.service";
import { ApiService } from '../api.service';

@Component({
  selector: 'app-page-feed',
  templateUrl: './page-feed.component.html',
  styleUrls: ['./page-feed.component.scss']
})
export class PageFeedComponent {

  constructor(public auth: AuthService, private api: ApiService) {}

  ngOnInit() {
    this.api.makeRequest({ type: "GET", location: "users/temporary", body: {} }).then((response: any) => {
      console.log(response);
    });
  }
}
