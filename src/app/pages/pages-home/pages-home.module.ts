import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from 'src/app/home/home.module';

import { PagesHomeRoutingModule } from './pages-home-routing.module';
import { PagesHomeComponent } from './pages-home.component';

@NgModule({
    declarations: [PagesHomeComponent],
    imports: [
        CommonModule,
        PagesHomeRoutingModule,
        HomeModule
    ]
})
export class PagesHomeModule { }
