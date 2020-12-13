import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { environment } from 'environments/environment';
import * as _ from 'lodash';
import { CountdownComponent } from 'ngx-countdown';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'app/services/common.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { remove, take } from 'lodash';


@Component({
    selector: 'app-games',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
    @ViewChild('timer', { static: false }) private countdown: CountdownComponent;
    // [config]="config" (event)="handleEvent($event)"

    teamsData: any;
    wonfirstplace = "hidden";
    gameList: any[] = require('../../../assets/user_files/game_list.json')
    maxGameSteps = environment.maxGameSteps;
    stopTime: Date;
    leftTime: number = 0;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    audio = new Audio();
    winingQueue = []
    mute: boolean;
    unsubscribeAll: Subject<any>;
    constructor(private cs: CommonService, public _matDialog: MatDialog, private _fuseSidebarService: FuseSidebarService) {
        this.unsubscribeAll = new Subject();
        this.audio.load();
        this.leftTime = this.gameList[0].time
        this.pauseAudio()
    }

    ngOnInit() {

        console.log({ "ngOnInit_B4_LS": this.teamsData })
        this.teamsData = JSON.parse(localStorage.getItem("scoreboard"))
        console.log({ "ngOnInit_AT_LS": this.teamsData })
        this.winingQueue = JSON.parse(localStorage.getItem("winingQueue")) || []
        this.mute = JSON.parse(localStorage.getItem("mute")) || false

        if (!this.teamsData) {
            this.loadFromCSV();
        }
        localStorage.setItem("scoreboard", JSON.stringify(this.teamsData))
    }

    //#region loading teams
    loadFromCSV() {
        console.log({ "B4_LoadMethod": this.teamsData })

        this.cs.readCSV().then(data => {
            this.teamsData = data.split('\n')
            let result = []
            console.log({ "LoadMethod": this.teamsData })
            var headers = this.teamsData[0].split(",");
            this.teamsData.reverse()
            this.teamsData.pop()
            this.teamsData.reverse()
            for (var i = 0; i < this.teamsData.length; i++) {

                var obj = {};
                var currentline = this.teamsData[i].split(",");

                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j].replace(" ", "").replaceAll('"', '')] = currentline[j];
                }
                result.push(obj);
            }
            let cats = [...new Set(result.map(item => item.TeamName.replaceAll(" ", '').replaceAll('"', '')))]

            let List = []
            cats.forEach((item: any,index) => {
                List.push({
                    team: "Team " + (index+1),
                    score: 0,
                    place: null,
                    colspan: 1,
                    members: result.filter(a => {
                        return a.TeamName.replace(" ", "").replaceAll('"', '') == item
                    }).map(member => {
                        return {
                            number: member.Number.replaceAll('"', ''),
                            team: member.TeamName.replaceAll('"', ''),
                            name: member.Member.replaceAll('"', ''),
                            gender: member.Gender.replaceAll('"', ''),
                            score: 0,
                        }
                    }),
                })
            })
            this.teamsData = List;
            localStorage.setItem("scoreboard", JSON.stringify(this.teamsData))
        })
    }
    //#endregion


    toggleBar(): void {
        this._fuseSidebarService.getSidebar('scoreboard').toggleOpen();
    }

    formatLabel(value: number) {
        if (value >= 1000) {
            return Math.round(value / 1000) + 'k';
        }

        return value;
    }

    //#region timer
    begin() {
        this.countdown.begin();
        this.audio.loop = true;
        this.playAudio("/assets/images/custom/team/clock.wav")
    }

    pause() {
        this.countdown.pause();
        this.pauseAudio()
    }

    resume() {
        this.countdown.resume();
        this.audio.loop = true;
        this.playAudio("/assets/images/custom/team/clock.wav")
    }

    restart() {
        this.countdown.restart();
        this.pauseAudio()
    }

    stop() {
        this.countdown.stop();
        this.pauseAudio()
    }

    timesUp(event) {
        if (event.action == "done") {
            this.pauseAudio()
            this.audio.loop = false;
            this.playAudio("/assets/images/custom/team/timesup.wav")
        }
    }
    //#endregion

    setTime(event) {
        this.leftTime = this.gameList[event.selectedIndex].time
    }

    //#region scoring
    plus(volunteer, vteam) {

        if (this.teamsData.find(team => { return team == vteam }).score != this.maxGameSteps) {

            this.teamsData.find(team => { return team == vteam }).members.find(member => { return member == volunteer }).score++;
            this.teamsData.find(team => { return team == vteam }).score++;

            localStorage.setItem("scoreboard", JSON.stringify(this.teamsData))

            if (this.teamsData.find(team => { return team == vteam }).score == this.maxGameSteps) {

                this.pauseAudio()
                this.playAudio("/assets/images/custom/team/winningapplaude.wav");

                vteam.place = this.winingQueue.length + 1
                this.winingQueue.push(vteam)
                localStorage.setItem("winingQueue", JSON.stringify(this.winingQueue))

                this.wonfirstplace = "fade-in";
                setTimeout(() => {
                    this.wonfirstplace = "hidden"
                    this.wonfirstplace = "fade-out";
                    setTimeout(() => {
                        this.wonfirstplace = "hidden"
                    }, 2500)
                }, 3000)
            } else {

                this.pauseAudio()
                this.playAudio("/assets/images/custom/team/applause.wav");
            }

            this.audio.loop = false;
            this.audio.play();
        } else {

            this.playAudio("/assets/images/custom/team/error.wav");
            this.audio.loop = false;
            this.audio.play();

        }
    }

    minus(volunteer, vteam) {
        if (this.teamsData.find(team => { return team == vteam }).members.find(member => { return member == volunteer }).score != 0) {

            if (this.teamsData.find(team => { return team == vteam }).score == this.maxGameSteps) {
                this.winingQueue.splice(this.winingQueue.indexOf(vteam), 1)
                localStorage.setItem("winingQueue", JSON.stringify(this.winingQueue))
                vteam.place--;
            }

            this.teamsData.find(team => { return team == vteam }).members.find(member => { return member == volunteer }).score--;
            this.teamsData.find(team => { return team == vteam }).score--;

            localStorage.setItem("scoreboard", JSON.stringify(this.teamsData))


            this.playAudio("/assets/images/custom/team/missed.wav");
            this.audio.loop = false;
            this.audio.play();

        } else {

            this.playAudio("/assets/images/custom/team/error.wav");
            this.audio.loop = false;
            this.audio.play();
        }
    }
    //#endregion

    clearCache() {

        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Attention!!! scoreboard will be reset.';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.removeItem("scoreboard")
                console.log(localStorage)
                this.playAudio("/assets/images/custom/team/reset_teams.wav");
                this.audio.loop = false;
                this.audio.play();
                this.teamsData = null;
                this.loadFromCSV();
            }
            this.confirmDialogRef = null;
        });
    }
    removeItem(key) {
        localStorage.removeItem(key)
        if (localStorage.getItem(key)) {
            this.removeItem(key)
            console.log(localStorage)
            console.log(key)
        }

    }
    //#region  audio
    playAudio(src) {
        if (!this.mute) {
            this.pauseAudio()
            this.audio.src = src;
            this.audio.play()
        }
    }
    pauseAudio() {
        this.audio.pause()
    }

    muteToggle() {

        this.mute = !this.mute
        if (this.mute) {
            this.audio.volume = 0;
        } else {
            this.audio.volume = 1;
        }

        localStorage.setItem("mute", JSON.stringify(this.mute))
    }
    //#endregion

}
