import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from 'src/app/components/material/material.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        TranslateModule,
        MaterialModule
    ],
    exports: [
        MaterialModule,
        TranslateModule
    ]
})
export class CoreModule { }
