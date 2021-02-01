import { Component, Input, OnInit } from '@angular/core';

import { BannerType, PityCap, SoftPityCap, UserBanner } from 'src/app/models/banner';

@Component({
    selector: 'wc-banner-counter',
    templateUrl: './banner-counter.component.html',
    styleUrls: ['./banner-counter.component.scss']
})
export class BannerCounterComponent implements OnInit {
    @Input()
    public banner: UserBanner;

    constructor() { }

    ngOnInit(): void {
    }

    public get progressRare(): number {
        return (PityCap.RARE - this.banner.wishesToRare) * 100 / (PityCap.RARE - 1);
    }

    public get progressEpic(): number {
        const pity = this.banner.type === BannerType.WEAPON_TEMPORAL ? PityCap.EPIC_WEAPON : PityCap.EPIC_CHARACTER;

        return (pity - this.banner.wishesToEpic) * 100 / (pity - 1);
    }

    public get wishesSinceLastPity(): number {
        const pity = this.banner.type === BannerType.WEAPON_TEMPORAL ? PityCap.EPIC_WEAPON : PityCap.EPIC_CHARACTER;

        return pity - this.banner.wishesToEpic;
    }

    public get totalToSoftPityLegendary(): number {
        const pity = this.banner.type === BannerType.WEAPON_TEMPORAL ? PityCap.EPIC_WEAPON : PityCap.EPIC_CHARACTER;
        const softPity = this.banner.type === BannerType.WEAPON_TEMPORAL ? SoftPityCap.LEGENDARY_WEAPON : SoftPityCap.LEGENDARY_CHARACTER;

        return this.banner.wishesToEpic - (pity - softPity);
    }

}
