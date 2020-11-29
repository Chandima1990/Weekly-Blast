import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { environment } from 'environments/environment';
import * as _ from 'lodash';
import { on } from 'process';
import { BehaviorSubject } from 'rxjs';
import { GamesList } from './games-list';

@Component({
    selector: 'app-games',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
    teamsData: any
    onteamsData: BehaviorSubject<any>
    gameList: any[]
    maxGameSteps = environment.maxGameSteps;
    stopTime: Date;

    constructor(private hc: HttpClient, private _fuseSidebarService: FuseSidebarService) {

        
        this.onteamsData = new BehaviorSubject(JSON.parse(localStorage.getItem("scoreboard"))._value);
        this.gameList = GamesList.List;
    }
    
    ngOnInit() {
        this.stopTime = new Date();
        this.stopTime = new Date(this.stopTime.setSeconds(this.stopTime.getSeconds() + 90))
        this.teamsData = JSON.parse(localStorage.getItem("scoreboard"))

        if (this.teamsData.length == 0) {

            this.hc.get("/assets/images/custom/team/groupedByTeamPickerWheel.csv",
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
                            members: result.filter(a => {
                                return a.TeamName.replace(" ", "").replaceAll('"', '') == item
                            }).map(member => {
                                return {
                                    number: member.Number.replaceAll('"', ''),
                                    team: member.TeamName.replaceAll('"', ''),
                                    name: member.Member.replaceAll('"', ''),
                                    gender: member.Gender.replaceAll('"', ''),
                                    score: 0
                                }
                            })
                        })
                    })

                    this.teamsData = List;
                    this.onteamsData.next(this.teamsData)
                    localStorage.setItem("scoreboard", JSON.stringify(this.onteamsData))
                })
        }

    }

    toggleBar() {
        this._fuseSidebarService.getSidebar('scoreboard').toggleOpen();
    }

    formatLabel(value: number) {
        if (value >= 1000) {
            return Math.round(value / 1000) + 'k';
        }

        return value;
    }

    plus(volunteer, vteam) {
        if (this.teamsData.find(team => { return team == vteam }).score != this.maxGameSteps) {

            this.teamsData.find(team => { return team == vteam }).members.find(member => { return member == volunteer }).score++;
            this.teamsData.find(team => { return team == vteam }).score++;

            localStorage.setItem("scoreboard", JSON.stringify(this.teamsData))

            let audio = new Audio();
            if (this.teamsData.find(team => { return team == vteam }).score == this.maxGameSteps) {
                audio.src = "/assets/images/custom/team/crowdhomerunapplause.wav";
            } else {
                audio.src = "/assets/images/custom/team/applause2.wav";
            }

            audio.load();
            audio.play();
        }
    }
    minus(volunteer, vteam) {
        if (this.teamsData.find(team => { return team == vteam }).members.find(member => { return member == volunteer }).score != 0) {

            this.teamsData.find(team => { return team == vteam }).members.find(member => { return member == volunteer }).score--;
            this.teamsData.find(team => { return team == vteam }).score--;

            localStorage.setItem("scoreboard", JSON.stringify(this.teamsData))

            let audio = new Audio();
            audio.src = "/assets/images/custom/team/missed.wav";
            audio.load();
            audio.play();
        }
    }
}
