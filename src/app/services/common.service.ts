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
            resolve(localStorage.getItem("teamData"))
        })

    }
}
