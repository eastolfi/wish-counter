import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { GameSwitchComponent } from './game-switch.component';
import { GameSwitchService } from './game-switch.service';

@NgModule({
    declarations: [GameSwitchComponent],
    imports: [
        CommonModule,
        MaterialModule,
    ],
    exports: [GameSwitchComponent],
    providers: [GameSwitchService]
})
export class GameSwitchModule {}
