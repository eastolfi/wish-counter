import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }, {
        path: 'login',
        loadChildren: async () => (await import('./pages/pages-login/pages-login.module')).PagesLoginModule
    }, {
        path: 'home',
        loadChildren: async () => (await import('./pages/pages-home/pages-home.module')).PagesHomeModule
    }, {
        path: 'wish-counter',
        loadChildren: async () => (await import('./pages/pages-wish-counter/pages-wish-counter.module')).PagesWishCounterModule
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
