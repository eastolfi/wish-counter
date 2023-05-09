import { Injectable } from '@angular/core';
import { BannerGame } from 'src/app/models/banner';

@Injectable()
export class GameSwitchService {
    private readonly STORAGE_KEY_CURRENT_GAME = 'currentGame';

    constructor() {}

    public changeGame(to: BannerGame): void {
        localStorage.setItem(this.STORAGE_KEY_CURRENT_GAME, JSON.stringify(to));
    }

    public getCurrentGame(): BannerGame {
        const game = localStorage.getItem(this.STORAGE_KEY_CURRENT_GAME);

        return JSON.parse(game || BannerGame.GENSHIN);
    }
}
