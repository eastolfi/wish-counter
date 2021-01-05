import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from 'src/app/components/material/material.module';
import { CardButtonComponent } from 'src/app/components/card-button/card-button.component';

@NgModule({
    declarations: [
        CardButtonComponent,
    ],
    imports: [
        CommonModule,
        TranslateModule,
        MaterialModule
    ],
    exports: [
        MaterialModule,
        ReactiveFormsModule,
        TranslateModule,
        CardButtonComponent
    ]
})
export class CoreModule { }
