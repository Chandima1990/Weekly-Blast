import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// import components 
import { TeamsComponent } from './main/teams/teams.component';
import { GamesComponent } from './main/games/games.component';
import { ClosingComponent } from './main/closing/closing.component';


const routes: Routes = [
    {
        path: '',
        component: TeamsComponent
    },
    { path: 'games', component: GamesComponent },
    { path: 'closing', component: ClosingComponent },
    { path: 'teams', component: TeamsComponent },
]
@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes, {
        anchorScrolling: 'enabled'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
