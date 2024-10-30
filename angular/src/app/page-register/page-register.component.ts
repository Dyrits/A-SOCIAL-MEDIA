import { Component } from '@angular/core';
import { Router } from "@angular/router";

import { ApiService } from '../api.service';
import { LocalStorageService } from "../local-storage.service";

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.scss']
})
export class PageRegisterComponent {

  constructor(private api: ApiService, private storage: LocalStorageService, private router: Router) {}

  ngOnInit() {}

  public errors: string[] = [];

  public credentials = {
    firstName: String(),
    lastName: String(),
    email: String(),
    password: String(),
    confirmation: String()
  }

  public handleSubmit() {
    return this.validate() && this.register()
  }

  private register() {
    const request = {
      type: "POST",
      location: "users/register",
      body: this.credentials
    }
    this.api.makeRequest(request).then(async (response: any) => {
      if (response.token) {
        this.storage.setToken(response.token);
        this.storage.setName(`${response.user.firstName} ${response.user.lastName}`);
        await this.router.navigate(["/"]);
      }
      if (response.error) {
        const { error: { code } } = response.error;
        this.errors.push(code === 11000 ? "This email address is already registered." : "An error occurred. Please try again later.");
      }
    });
  }

  private validate() {
    this.errors = [];
    // Check if all the fields are filled out.
    Object.values(this.credentials).every(credential => credential.trim()) || this.errors.push("Please fill out all the fields.");
    // Check if the email is valid with RegEx.
    const expression = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
    expression.test(this.credentials.email) || this.errors.push("Please enter a valid email address.");
    // Check if the password matches the password confirmation.
    this.credentials.password !== this.credentials.confirmation && this.errors.push("The passwords do not match.");
    return !this.errors.length;
  }

}
