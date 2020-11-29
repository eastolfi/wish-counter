import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material/material.module';

import { BottomNavComponent } from './bottom-nav.component';
import { BottomNavButtonComponent } from './bottom-nav-button/bottom-nav-button.component';
import { BottomNavService } from './bottom-nav.service';

@NgModule({
    declarations: [
        BottomNavComponent,
        BottomNavButtonComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule
    ],
    providers: [
        BottomNavService
    ],
    exports: [
        BottomNavComponent,
        BottomNavButtonComponent
    ]
})
export class BottomNavModule { }
