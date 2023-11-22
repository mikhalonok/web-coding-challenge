import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignUpFormRequest} from "../interfaces/sign-up-form-request.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) { }

  public signUp(requestData: SignUpFormRequest): Observable<any> {
    delete requestData.password; // since it's not required as per AC

    return this.httpClient.post('https://demo-api.now.sh/users', requestData);
  }
}
