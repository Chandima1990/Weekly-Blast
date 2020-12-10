import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { environment } from 'environments/environment';
import * as _ from 'lodash';
import { CountdownComponent } from 'ngx-countdown';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


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

    constructor(private hc: HttpClient, private _fuseSidebarService: FuseSidebarService, public _matDialog: MatDialog) {
        this.leftTime = this.gameList[0].time
    }

    ngOnInit() {
        this.teamsData = JSON.parse(localStorage.getItem("scoreboard"))
        if (!this.teamsData) {
            this.loadFromCSV();
        }
        this.audio.load();
    }

    //#region loading teams
    loadFromCSV() {

        this.hc.get("/assets/user_files/groupedByTeamPickerWheel.csv",
            { responseType: "text" }).subscribe(data => {
                this.teamsData = data.split('\n')
                let result = []

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
                cats.forEach((item: any) => {
                    List.push({
                        team: item,
                        score: 0,
                        place: 0,
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
    //#region audio
    begin() {
        this.audio.src = "/assets/images/custom/team/clock.wav";
        this.countdown.begin();
        this.audio.loop = true;
        this.audio.play()
        this.audio.volume = 1
    }

    pause() {
        this.countdown.pause();
        this.audio.pause()
    }

    resume() {
        this.countdown.resume();
        this.audio.src = "/assets/images/custom/team/clock.wav";
        this.audio.loop = true;
        this.audio.volume = 1
        this.audio.play()
    }

    restart() {
        this.countdown.restart();
        this.audio.pause()
    }

    stop() {
        this.countdown.stop();
        this.audio.pause()
    }

    timesUp(event) {
        if (event.action == "done") {
            this.audio.pause()
            this.audio.src = "/assets/images/custom/team/timesup.wav";
            this.audio.volume = 0.1
            this.audio.loop = false;
            this.audio.play();
        }
    }
    //#endregion

    setTime(event) {
        this.leftTime = this.gameList[event.selectedIndex].time
    }

    //#region scoring
    plus(volunteer, vteam) {

        this.audio.src = "/assets/images/custom/team/error.wav";
        this.audio.loop = false;
        this.audio.play();

        if (this.teamsData.find(team => { return team == vteam }).score != this.maxGameSteps) {

            this.teamsData.find(team => { return team == vteam }).members.find(member => { return member == volunteer }).score++;
            this.teamsData.find(team => { return team == vteam }).score++;

            localStorage.setItem("scoreboard", JSON.stringify(this.teamsData))

            if (this.teamsData.find(team => { return team == vteam }).score == this.maxGameSteps) {
                this.audio.src = "/assets/images/custom/team/crowdhomerunapplause.wav";
                this.wonfirstplace = "fade-in";

                this.audio.onended = (() => {
                    this.wonfirstplace = "fade-out";
                    setTimeout(() => { this.wonfirstplace = "hidden" }, 2500)
                })
            } else {
                this.audio.src = "/assets/images/custom/team/applause2.wav";
            }

            this.audio.loop = false;
            this.audio.play();
        }
    }

    minus(volunteer, vteam) {
        this.audio.src = "/assets/images/custom/team/error.wav";
        this.audio.loop = false;
        this.audio.play();
        if (this.teamsData.find(team => { return team == vteam }).members.find(member => { return member == volunteer }).score != 0) {

            this.teamsData.find(team => { return team == vteam }).members.find(member => { return member == volunteer }).score--;
            this.teamsData.find(team => { return team == vteam }).score--;

            localStorage.setItem("scoreboard", JSON.stringify(this.teamsData))


            this.audio.src = "/assets/images/custom/team/missed.wav";
            // this.audio.load();
            this.audio.loop = false;
            this.audio.play();

        }
    }
    //#endregion

    clearCache() {

        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Re-fetching? Remember that scoreboard will be reset.';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {

                localStorage.removeItem("scoreboard");
                this.audio.src = "/assets/images/custom/team/reset_teams.wav";
                this.audio.loop = false;
                this.audio.play();
                this.teamsData = null;
                this.loadFromCSV();
            }
            this.confirmDialogRef = null;
        });
    }
}
