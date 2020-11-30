import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/modules/core/core.module';

import { BannerCounterComponent } from '../../components/banner-counter/banner-counter.component';
import { CardButtonComponent } from '../../components/card-button/card-button.component';
import { WishCountEditDialogComponent } from '../../components/wish-count-edit-dialog/wish-count-edit-dialog.component';

import { WishCounterComponent } from './wish-counter.component';
import { WishCounterRoutingModule } from './wish-counter-routing.module';

@NgModule({
    declarations: [
        WishCounterComponent,
        BannerCounterComponent,
        CardButtonComponent,
        WishCountEditDialogComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        WishCounterRoutingModule
    ]
})
export class WishCounterModule { }
