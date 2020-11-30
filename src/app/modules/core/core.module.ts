import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
        ReactiveFormsModule,
        TranslateModule
    ]
})
export class CoreModule { }
