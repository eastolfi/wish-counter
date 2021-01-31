import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WishCounterModule } from 'src/app/wish-counter/wish-counter.module';

import { PagesWishCounterComponent } from './pages-wish-counter.component';
import { PagesWishCounterRoutingModule } from './pages-wish-counter-routing.module';

@NgModule({
    declarations: [
        PagesWishCounterComponent,
    ],
    imports: [
        CommonModule,
        PagesWishCounterRoutingModule,
        WishCounterModule,
    ]
})
export class PagesWishCounterModule { }
