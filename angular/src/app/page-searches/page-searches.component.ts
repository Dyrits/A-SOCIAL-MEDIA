import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ApiService } from "../api.service";

@Component({
  selector: "app-page-searches",
  templateUrl: "./page-searches.component.html",
  styleUrls: ["./page-searches.component.scss"]
})
export class PageSearchesComponent {
  public users: any[] = [];
  public query: string = String();

  constructor(private api: ApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params["query"];
      this.search();
    });
  }

  private search() {
    this.api.makeRequest({type: "GET", location: `users/search?query=${this.query}`, body: {}})
      .then((response: any) => {
        this.users = response.users;
      });
  }
}
