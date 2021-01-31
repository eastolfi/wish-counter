import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

import { CoreModule } from '../modules/core/core.module';

import { LoginComponent } from './login.component';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        NgxAuthFirebaseUIModule,
    ],
    exports: [
        LoginComponent
    ]
})
export class LoginModule { }
