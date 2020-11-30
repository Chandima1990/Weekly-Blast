import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
    selector: 'app-closing',
    templateUrl: './closing.component.html',
    styleUrls: ['./closing.component.scss']
})
export class ClosingComponent implements OnInit {
    teamsData: any[]
    firstTeam: any;
    secondTeam: any;
    thirdTeam: any;
    pos: any;
    constructor() {

    }

    ngOnInit() {
        this.teamsData = JSON.parse(localStorage.getItem("scoreboard"))
        this.teamsData = _.sortBy(this.teamsData, [function (o) { return o.score; }]);

        let members = this.teamsData.map(team => { return team.members });
        members = _.flatten(members)
        this.pos = _.sortBy(members, ["score", "number"]).pop()
        this.firstTeam = this.teamsData.pop()
        this.secondTeam = this.teamsData.pop()
        this.thirdTeam = this.teamsData.pop()


    }

}
