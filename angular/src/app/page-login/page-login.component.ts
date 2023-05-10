import { Component } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent {

  constructor(private api: ApiService) {}

}
