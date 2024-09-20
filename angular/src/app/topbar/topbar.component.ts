import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from "../auth.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  constructor(protected auth: AuthService, private router: Router) {}

  ngOnInit() {}

  protected query: string = String();

  public search() {
    console.log(`Searching for ${this.query}...`);
    this.router.navigate(['/search-results'], { queryParams: { query: this.query } });
  }
}
