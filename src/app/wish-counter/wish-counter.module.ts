import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../modules/core/core.module';

import { DialogTenPullComponent } from './dialogs/dialog-ten-pull/dialog-ten-pull.component';
import { WishCounterComponent } from './wish-counter.component';
import { WishCountEditDialogComponent } from './dialogs/wish-count-edit-dialog/wish-count-edit-dialog.component';

@NgModule({
    declarations: [
        WishCounterComponent,
        WishCountEditDialogComponent,
        DialogTenPullComponent,
    ],
    imports: [
        CommonModule,
        CoreModule,
        SharedModule,
    ],
    exports: [
        WishCounterComponent,
    ]
})
export class WishCounterModule { }
