import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'ngx-auth-firebaseui';

import { HomeComponent } from 'src/app/home/home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [ LoggedInGuard ],
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesHomeRoutingModule { }
