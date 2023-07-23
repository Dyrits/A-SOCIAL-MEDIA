import { Component } from '@angular/core';

import { AuthService } from "../auth.service";

@Component({
  selector: 'app-page-feed',
  templateUrl: './page-feed.component.html',
  styleUrls: ['./page-feed.component.scss']
})
export class PageFeedComponent {

  constructor(public auth: AuthService) {}
}
