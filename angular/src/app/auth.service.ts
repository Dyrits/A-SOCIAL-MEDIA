import { Injectable } from "@angular/core";
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";

import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private router: Router, private storage: LocalStorageService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let activate = this.isLoggedIn();
    let redirect = "/feed";
    if (route.data["loggedIn"]) {
      activate = !activate;
      redirect = "/register";
    }
    if (!activate) {
      return true;
    } else {
      await this.router.navigate([redirect]);
      return false;
    }
  }

  private isLoggedIn() {
    return !!this.storage.getToken();
  }

  public async logout() {
    this.storage.removeToken();
    this.storage.removeName();
    await this.router.navigate(["/login"]);
  }
}
