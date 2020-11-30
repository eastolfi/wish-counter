import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }, {
        path: 'login',
        loadChildren: async () => (await import('./pages/login/login.module')).LoginModule
    }, {
        path: 'home',
        loadChildren: async () => (await import('./pages/home/home.module')).HomeModule
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
