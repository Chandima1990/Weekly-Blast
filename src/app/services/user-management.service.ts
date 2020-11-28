import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { APIheader } from 'app/models/APIheader';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  API_KEY: string = "$2a$10$6iQk9vI3fSVIinxv.rjQF.iwiUfyruvyTdbTPuIbwOIcNId1v28G6";//'$2a$10$nbZNbnLltjzPkcumltuQt..icVp4r.Z383E2.Dm32rnMU.CThZlJG';

  user: any;

  rowData: any;
  newData: [{ Name: any, LoginDetails: any }];

  constructor(private apiService: ApiService) { }

  GetUsers() {
    let headerList: APIheader[] = [];
    // let LoginBody: object = { username: "jake.majerovic@thinklessdigital.com", password: "1111", logtype: "normal", AccountType: "Organisation" };

    headerList.push({ Key: "auth", value: this.API_KEY });
    headerList.push({ Key: "userid", value: "" });
    headerList.push({ Key: "busrid", value: "QEwuP134x3c0g9Am5OC4fg||||" });
    headerList.push({ Key: "sitename", value: "http://sprayrunner-web.azurewebsites.net" });
    //headerList.push({ Key: "", value: "" });

    console.log("Done");
    this.apiService.get(`AccountGet`, headerList, "?emp=")
      .subscribe((data) => {
        this.user = data;
        this.rowData = data;
        // this.user.UserList.forEach(value => {
        //     this.newData.push({ Name: value.FirstName + value.LastName, LoginDetails: value.Email });
        // })
        this.rowData = this.newData;
      });
  }
}
