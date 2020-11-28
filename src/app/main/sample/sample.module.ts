import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { SampleComponent } from './sample.component';
import { HttpHeaders } from '@angular/common/http';
import { User } from 'app/models/User';
import { ApiService } from 'app/services/api.service';


import { MatGridListModule } from '@angular/material/grid-list';


const routes = [
  {
    path: 'sample',
    component: SampleComponent
  }
];

@NgModule({
  declarations: [
    SampleComponent
  ],
  imports: [
    RouterModule,//.forChild(routes),

    TranslateModule,

    FuseSharedModule,
  ],
  exports: [
    SampleComponent
  ]
})


export class SampleModule {
  constructor() { }


 
}