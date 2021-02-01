import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Rarity, UserBanner } from 'src/app/models/banner';
import { BannerService } from 'src/app/services/banner.service';

@Component({
    selector: 'wc-dialog-ten-pull',
    templateUrl: './dialog-ten-pull.component.html',
    styleUrls: ['./dialog-ten-pull.component.scss']
})
export class DialogTenPullComponent implements OnInit {
    public pullListRarity: Rarity[] = [];

    constructor(
        private readonly bannerService: BannerService,
        private readonly ref: MatDialogRef<DialogTenPullComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { userBanner: UserBanner },
    ) {
        for (let i = 0; i < 10; i++) {
            this.pullListRarity.push(Rarity.COMMON);
        }
    }

    ngOnInit(): void {
    }

    public increaseRarity(index: number): void {
        if (this.pullListRarity[index] === Rarity.EPIC) {
            this.pullListRarity[index] = Rarity.COMMON;
        } else if (this.pullListRarity[index] === Rarity.RARE) {
            this.pullListRarity[index] = Rarity.EPIC;
        } else {
            this.pullListRarity[index] = Rarity.RARE;
        }
    }

    public trackByIndex(index: number) {
        return index;
    }

    public makeWishes(): void {
        const { userBanner } = this.data;

        this.bannerService.makeTenPullWishes(userBanner, this.pullListRarity)
        .then(() => {
            this.ref.close();
        })
        .catch(e => {
            console.error(e);
        });
    }

}
