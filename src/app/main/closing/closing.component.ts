import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from 'app/services/common.service';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-closing',
    templateUrl: './closing.component.html',
    styleUrls: ['./closing.component.scss']
})
export class ClosingComponent implements OnInit, OnDestroy {
    teamsData: any[]
    firstTeam: any;
    secondTeam: any;
    thirdTeam: any;
    pos: any;
    mute: boolean;
    audio = new Audio();
    unsubscribeAll: Subject<any>;
    constructor(private cs: CommonService) {
        this.audio.load()
        this.unsubscribeAll = new Subject();
    }
    ngOnDestroy(): void {
        this.pauseAudio();
    }

    ngOnInit() {
       
        this.teamsData = JSON.parse(localStorage.getItem("scoreboard"))
        this.mute = JSON.parse(localStorage.getItem("mute")) || false
        this.teamsData = _.orderBy(this.teamsData, ['score', 'place'], ['desc', 'asc']);

        this.teamsData = this.teamsData.map((team, index) => {
            return {
                team: team.team,
                score: team.score,
                colspan: (index == 0) ? 4 : ((index < 3) ? 2 : 1),
                place: index,
                members: team.members
            }
        })

        let members = this.teamsData.map(team => { return team.members });
        members = _.flatten(members)
        this.pos = _.sortBy(members, ["score", "number"]).pop()
        this.playAudio("/assets/images/custom/team/closing.wav")
        // this.firstTeam = this.teamsData.pop()
        // this.secondTeam = this.teamsData.pop()
        // this.thirdTeam = this.teamsData.pop()


    }

    playAudio(src) {
        if (!this.mute) {
            this.audio.pause()
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

}
