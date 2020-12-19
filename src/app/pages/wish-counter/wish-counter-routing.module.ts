import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'ngx-auth-firebaseui';

import { WishCounterComponent } from './wish-counter.component';

const routes: Routes = [
    {
        path: '',
        component: WishCounterComponent,
        canActivate: [ LoggedInGuard ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WishCounterRoutingModule { }
