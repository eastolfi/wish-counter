import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const MATERIAL_COMPONENTS = [
    MatButtonModule,
    MatProgressBarModule,
    MatCardModule,
    MatRippleModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTabsModule,
    MatSlideToggleModule,
]

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MATERIAL_COMPONENTS
    ],
    exports: [
        MATERIAL_COMPONENTS
    ]
})
export class MaterialModule { }
