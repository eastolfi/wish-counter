import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoggedGuard } from 'src/app/guards/logged.guard';

import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [ LoggedGuard ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
