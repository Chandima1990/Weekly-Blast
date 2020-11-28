import { Component } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { ApiService } from 'app/services/api.service';
import { User } from 'app/models/User';
import { APIheader, HeaderMaker } from 'app/models/APIheader';

@Component({
    selector: 'sample',
    templateUrl: './sample.component.html',
    styleUrls: ['./sample.component.scss']
})
export class SampleComponent {

    public show: boolean = false;
    public buttonName: any = 'Show';
    breakpoint: number;
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService, private apiService: ApiService
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
    }

    ngOnInit() {
        //this.GetUserList();
        this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
    }
    API_KEY = '$2a$10$nbZNbnLltjzPkcumltuQt..icVp4r.Z383E2.Dm32rnMU.CThZlJG';
    visibleRowIndex: number = null;
    
    
    
    user: User;
    columnDefs = [
        { headerName: 'Name', field: 'Name', sortable: true },
        { headerName: 'Login Details', field: 'LoginDetails', sortable: true, filter: true }
    ];
    
    //headerList: [];
    rowData: any;
    newData: [{ Name: any, LoginDetails: any }];
    
    GetUserList() {
        const a = HeaderMaker.create({Key :"dsa", value: this.API_KEY});
        let headerList = [] as APIheader[];
        headerList.push({ Key: "auth", value: this.API_KEY });
        headerList.push({ Key: "userid", value: "" });
        headerList.push({ Key: "busrid", value: "QEwuP134x3c0g9Am5OC4fg||||" });
        headerList.push({ Key: "sitename", value: "https://yakr.azurewebsites.net" });
        headerList.push({ Key: "Ocp-Apim-Subscription-Key", value: "0a8ecd9b068841859834cbfaf272a933" });

        // const headers = new HttpHeaders().set("auth", this.API_KEY)
        //     .append("userid", "")
        //     .append("busrid", "QEwuP134x3c0g9Am5OC4fg||||")
        //     .append("sitename", "https://yakr.azurewebsites.net")
        //     .append("Ocp-Apim-Subscription-Key", "0a8ecd9b068841859834cbfaf272a933");

        this.apiService.get(`https://xataapi.azurewebsites.net/api/get/v1.0.0/AccountGet`, headerList, "")
            .subscribe((data) => {
                this.user = data;
                this.rowData = data;
                // this.user.UserList.forEach(value => {
                //     this.newData.push({ Name: value.FirstName + value.LastName, LoginDetails: value.Email });
                // })
                this.rowData = this.newData;
            });

    }

    onResize(event) {
        this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
    }

    toggle() {
        this.show = !this.show;

        // CHANGE THE NAME OF THE BUTTON.
        if (this.show)
            this.buttonName = "Hide";
        else
            this.buttonName = "Show";
    }
}
