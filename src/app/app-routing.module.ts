import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }, {
        path: 'login',
        loadChildren: async () => (await import('./pages/login/login.module')).LoginModule
    }, {
        path: 'wish-counter',
        loadChildren: async () => (await import('./pages/wish-counter/wish-counter.module')).WishCounterModule
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
