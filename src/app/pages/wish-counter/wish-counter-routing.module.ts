import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedGuard } from 'src/app/guards/logged.guard';

import { WishCounterComponent } from './wish-counter.component';

const routes: Routes = [
    {
        path: '',
        component: WishCounterComponent,
        canActivate: [ LoggedGuard ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WishCounterRoutingModule { }
