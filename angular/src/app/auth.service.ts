import { Injectable } from "@angular/core";
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let activate = this.isLoggedIn();
    let redirect = "/feed";
    if (route.data["loggedIn"]) {
      activate = !activate;
      redirect = "/register";
    }
    if (!activate) {
      return true;
    } else {
      this.router.navigate([redirect]);
      return false;
    }
  }

  private isLoggedIn() {
    return false;
  }
}
