import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginModule } from 'src/app/login/login.module';

import { PagesLoginRoutingModule } from './pages-login-routing.module';
import { PagesLoginComponent } from './pages-login.component';

@NgModule({
    declarations: [
        PagesLoginComponent
    ],
    imports: [
        CommonModule,
        PagesLoginRoutingModule,
        LoginModule
    ]
})
export class PagesLoginModule { }
