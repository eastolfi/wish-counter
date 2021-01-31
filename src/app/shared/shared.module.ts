import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from '../components/material/material.module';

import { CardButtonComponent } from './card-button/card-button.component';
import { BannerCounterComponent } from './banner-counter/banner-counter.component';

@NgModule({
    declarations: [
        CardButtonComponent,
        BannerCounterComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        TranslateModule
    ],
    exports: [
        CardButtonComponent,
        BannerCounterComponent,
    ]
})
export class SharedModule { }
