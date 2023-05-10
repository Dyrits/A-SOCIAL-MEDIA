import { Component } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.scss']
})
export class PageRegisterComponent {

  constructor(private api: ApiService) {}

  ngOnInit() {}

  public errors: string[] = [];

  public credentials = {
    firstName: String(),
    lastName: String(),
    email: String(),
    password: String(),
    passwordConfirmation: String()
  }

  public handleSubmit() {
    return this.validate() && this.register()
  }

  private register() {
    console.info("Registering...");
  }

  private validate() {
    this.errors = [];
    // Check if all the fields are filled out.
    Object.values(this.credentials).every(credential => credential.trim()) || this.errors.push("Please fill out all the fields.");
    // Check if the email is valid with RegEx.
    const expression = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
    expression.test(this.credentials.email) || this.errors.push("Please enter a valid email address.");
    // Check if the password matches the password confirmation.
    this.credentials.password !== this.credentials.passwordConfirmation && this.errors.push("The passwords do not match.");
    return !this.errors.length;
  }

}
