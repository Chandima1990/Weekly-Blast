import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// @ts-ignore
import csv from '../../assets/user_files/groupedByTeamPickerWheel.csv';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    mute: boolean = false;

    onMuted: BehaviorSubject<any>;

    constructor(private hc: HttpClient) {
        this.onMuted = new BehaviorSubject(this.mute);
    }

    readCSV(): Promise<any> {
        return new Promise((resolve, reject) => {

            let headers = new HttpHeaders().
                set("Cache-Control", `no-cache`).
                set("Pragma", 'no-cache').
                set("Expires", '0');
            this.hc.get("/assets/user_files/groupedByTeamPickerWheel.csv", { responseType: 'text', headers: headers })
                .subscribe((data) => {
                    console.log({ "InService": data })

                    resolve(data);
                }, (err) => {
                    console.log(err)
                });
        })

    }
}
