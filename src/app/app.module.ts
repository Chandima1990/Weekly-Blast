import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';

import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import 'hammerjs';


import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule, FuseCountdownModule, FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';

import { LoginModule } from './main/login/login.module';
import { CookieService } from 'ngx-cookie-service';
import { UserManagementModule } from './main/user-management/user-management.module';
import { AuthGuard } from './guards/auth.guard';
import { LoginService } from './services/login.service';
import { AppRoutingModule } from './app-routing.module';
import { InterceptorService } from './services/interceptor-service.service';
import { HomeComponent } from './main/home/home.component';
import { SpinnerComponent } from './uielements/spinner/spinner.component';
import { SampleComponent } from './main/sample/sample.component';
import { UserManagementComponent } from './main/user-management/user-management.component';
import { HomeModule } from './main/home/home.module';
import { TeamsComponent } from './main/teams/teams.component';
import { GamesComponent } from './main/games/games.component';
import { ClosingComponent } from './main/closing/closing.component';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { ScorePipe } from './main/games/score.pipe';

import { CountdownGlobalConfig, CountdownModule } from 'ngx-countdown';
import { RefetchComponent } from './main/games/refetch/refetch.component';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { MatSnackBar, MatSnackBarContainer, MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        AppComponent,
        TeamsComponent,
        GamesComponent,
        ClosingComponent, ScorePipe, RefetchComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatGridListModule,
        MatCardModule,
        MatDividerModule,
        MatBadgeModule,
        MatProgressBarModule,
        MatSliderModule,
        MatStepperModule,
        MatListModule,
        FuseConfirmDialogModule,
        MatSnackBarModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        FuseCountdownModule,

        // App modules
        LayoutModule,
        SampleModule,
        LoginModule,
        UserManagementModule,
        HomeModule,
        //this is a test comment
        //AppRoutingModule

        CountdownModule


    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        HttpClientModule,
        CookieService,
        AuthGuard, ScorePipe,
        MatSnackBar,
        LoginService, {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        },
        CountdownGlobalConfig
    ],
    entryComponents: [
        FuseConfirmDialogComponent, MatSnackBarContainer
    ]
})
export class AppModule {
}
