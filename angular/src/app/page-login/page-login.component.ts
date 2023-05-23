import { Component } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent {

  public errors: string[] = [];

  public credentials = {
    email: String(),
    password: String(),
  }

  constructor(private api: ApiService) {}

  public handleSubmit() {
    return this.validate() && this.login()
  }

  private login() {
    const request = {
      type: "POST",
      location: "users/login",
      body: this.credentials
    }
    this.api.makeRequest(request).then((response: any) => {
      console.info("Login response: ", response);
    });
  }

  private validate() {
    this.errors = [];
    // Check if all the fields are filled out.
    Object.values(this.credentials).every(credential => credential.trim()) || this.errors.push("Please fill out all the fields.");
    // Check if the email is valid with RegEx.
    const expression = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
    expression.test(this.credentials.email) || this.errors.push("Please enter a valid email address.");
    return !this.errors.length;
  }

}
