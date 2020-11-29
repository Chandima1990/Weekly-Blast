import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { APIheader } from 'app/models/APIheader';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_KEY: string = "0KBHWL03VWITAOU5O5LEROS9O7QGCN1Y8NZ6NLMV6VFJ3ZUDVBRBO5FM2C2Y4T0I";

  user: any;
  rowData: any;
  ResponseData: { Code: any, result: any, status: any };

  constructor(private apiService: ApiService, private cookieService_login: CookieService, private router: Router) {

    this.cookieService_login.deleteAll();
  }

  async Login(email: string, password: string): Promise<any> {
    let headerList: APIheader[] = [];
    let LoginBody: object = { username: email, password: password, logtype: "normal", AccountType: "Organisation" };


    headerList.push({ Key: "auth", value: this.API_KEY });
    headerList.push({ Key: "sitename", value: "http://sprayrunner-web.azurewebsites.net" });


    // this.apiService.post("AuthLogin", LoginBody, headerList).subscribe(data => {
    //   if (!data.Code) {
    //     this.router.navigate(['home']);
    //     this.cookieService_login.set("LoggedInUser", btoa(escape(JSON.stringify(data))));
    //   } else {
    //     return new Promise((resolve, reject) => { resolve(false); })
    //   }

    // }, 
    // error => {
    //   console.log("network Error!")
    // });


  }

  get isLoggedIn(): boolean {
    const user = unescape(atob(this.cookieService_login.get("LoggedInUser")));
    return (user !== "") ? true : false;
  }

  async SignOut() {
    this.cookieService_login.deleteAll();
    this.router.navigate(['login']);
  }
}
