import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'ScorePipe',
    pure: true
})
export class ScorePipe implements PipeTransform {
    transform(value: any): any {
        return _.sumBy(value, "score");
    }

    constructor() { }

    //   GetMemberList(value: any): any {
    //     let contents = []

    //     value.split(',').forEach(element => {
    //       if (element.length != 0) {
    //         contents.push(this.us.allUsers.find(user => user.ID == element))
    //       }
    //     });

    //     return contents.map(user => { return user.FirstName + " " + user.LastName })
    //   }


}
