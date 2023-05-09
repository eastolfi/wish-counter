import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { GameSwitchService } from './game-switch.service';
import { BannerGame } from 'src/app/models/banner';

@Component({
    selector: 'wc-game-switch',
    templateUrl: './game-switch.component.html',
    styleUrls: ['./game-switch.component.scss'],
})
export class GameSwitchComponent implements OnInit {
    @Output()
    public gameChanged = new EventEmitter<void>();

    public isChecked = false;

    constructor(private readonly service: GameSwitchService) {}

    ngOnInit(): void {
        const game = this.service.getCurrentGame();

        this.isChecked = game === BannerGame.HONKAI_STAR_RAIL;
    }

    public onChange({ checked }: MatSlideToggleChange): void {
        this.service.changeGame(checked ? BannerGame.HONKAI_STAR_RAIL : BannerGame.GENSHIN);
        this.gameChanged.emit();
    }
}
