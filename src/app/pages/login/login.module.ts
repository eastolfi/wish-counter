import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

import { CoreModule } from 'src/app/modules/core/core.module';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        CoreModule,
        NgxAuthFirebaseUIModule,
        LoginRoutingModule
    ]
})
export class LoginModule { }
