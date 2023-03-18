import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthService } from "./auth.service";
import { PageRegisterComponent } from "./page-register/page-register.component";
import { PageLoginComponent } from "./page-login/page-login.component";
import { PageFeedComponent } from "./page-feed/page-feed.component";
import { PageProfileComponent } from "./page-profile/page-profile.component";
import { PageMessagesComponent } from "./page-messages/page-messages.component";
import { PageSearchesComponent } from "./page-searches/page-searches.component";
import { PageFriendRequestsComponent } from "./page-friend-requests/page-friend-requests.component";

const options = {
  loggedOut: {
    "register": PageRegisterComponent,
    "login": PageLoginComponent,
  },
  loggedIn: {
    "feed": PageFeedComponent,
    "profile": PageProfileComponent,
    "messages": PageMessagesComponent,
    "search-results": PageSearchesComponent,
    "friend-requests": PageFriendRequestsComponent
  }
};

const routes: Routes = [
  {
    path: "",
    redirectTo: "/feed",
    pathMatch: "full"
  },
  ...Object.entries(options.loggedOut).map(([path, component]) => ({
    path,
    component,
    canActivate: [AuthService]
  })),
  ...Object.entries(options.loggedIn).map(([path, component]) => ({
    path,
    component,
    canActivate: [AuthService],
    data: {
      loggedIn: true
    }
  }))
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
