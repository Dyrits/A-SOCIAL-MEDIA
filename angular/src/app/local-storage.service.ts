import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {

  token: string = "#Token-ASM";

  constructor() {
  }

  private set(key: string, value: string) {
    localStorage ? localStorage.setItem(key, value) : alert("Browser is unable to store and retrieve data locally.");
  }

  private get(key: string) {
    return localStorage ? localStorage.getItem(key) : alert("Browser is unable to store and retrieve data locally.");
  }

  private remove(key: string) {
    return localStorage ? localStorage.removeItem(key) : alert("Browser is unable to store and retrieve data locally.");
  }

  public setName(value: string) {
    this.set("name", value);
  }

  public getName() {
    return this.get("name");
  }

  public removeName() {
    this.remove("name");
  }

  public setToken(value: string) {
    this.set(this.token, value);
  }

  public getToken() {
    return this.get(this.token);
  }

  public removeToken() {
    this.remove(this.token);
  }
}
