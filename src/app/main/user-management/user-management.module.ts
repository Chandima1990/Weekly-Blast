import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';

import { UserManagementComponent } from './user-management.component';
import { SpinnerComponent } from 'app/uielements/spinner/spinner.component';

const routes = [
    {
        path: 'usermanagement',
        component: UserManagementComponent
    }
];

@NgModule({
    declarations: [
        UserManagementComponent
    ],
    imports: [
        RouterModule,//.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule
    ],
    exports: [
        UserManagementComponent
    ]
})
export class UserManagementModule {
}
