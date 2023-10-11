import { Component } from '@angular/core';

import { AuthService } from "../auth.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  constructor(public auth: AuthService) {}
}
