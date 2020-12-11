import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    mute: boolean = false;
    onMuted: BehaviorSubject<any>;

    constructor() {
        this.onMuted = new BehaviorSubject(this.mute);
    }
}
