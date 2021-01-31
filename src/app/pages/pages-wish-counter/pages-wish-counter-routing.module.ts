import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'ngx-auth-firebaseui';

import { PagesWishCounterComponent } from './pages-wish-counter.component';

const routes: Routes = [
    {
        path: '',
        component: PagesWishCounterComponent,
        canActivate: [ LoggedInGuard ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesWishCounterRoutingModule { }
