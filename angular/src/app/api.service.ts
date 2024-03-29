import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient, private storage: LocalStorageService) {
  }

  private successHandler(response: any): any {
    return response;
  }

  private errorHandler(error: any): any {
    console.error("API error: ", error);
    return error;
  }

  public makeRequest(request: { type: string, location: string, body: {} }): any {
    const type = request.type.toUpperCase();
    if (!type) {
      console.warn("No type specified in the request objects.");
      return;
    }
    const body = request.body || {};
    const location = request.location;
    if (!location) {
      console.warn("No location specified in the request objects.");
      return;
    }
    const url = `${this.baseUrl}/${location}`;
    const token = this.storage.getToken();
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : String(),
      })
    };
    if (type === "GET") {
      return this.http.get(url, options).toPromise().then(this.successHandler).catch(this.errorHandler);
    }
    if (type === "POST") {
      return this.http.post(url, body, options).toPromise().then(this.successHandler).catch(this.errorHandler);
    }
    console.warn(`Could not make the request. Make sure a valid type is specified in the request object.`);
  }
}
