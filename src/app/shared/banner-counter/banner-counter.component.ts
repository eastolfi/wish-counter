import { Component, Input, OnInit } from '@angular/core';

import { BannerType, getPity, PityCap, SoftPityCap, UserBanner } from 'src/app/models/banner';

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

    public get progressEpic(): number {
        return (PityCap.RARE - this.banner.wishesToRare) * 100 / (PityCap.RARE - 1);
    }

    public get progressLegendary(): number {
        const pity = getPity(this.banner.type);

        return (pity - this.banner.wishesToEpic) * 100 / (pity - 1);
    }

    public get wishesSinceLastPity(): number {
        const pity = getPity(this.banner.type);

        return pity - this.banner.wishesToEpic;
    }

    public get totalToSoftPityLegendary(): number {
        const pity = getPity(this.banner.type);
        const softPity = getPity(this.banner.type, true);

        return this.banner.wishesToEpic - (pity - softPity);
    }

}
