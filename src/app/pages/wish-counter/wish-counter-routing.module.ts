import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WishCounterComponent } from './wish-counter.component';

const routes: Routes = [
    {
        path: '',
        component: WishCounterComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WishCounterRoutingModule { }
