import { Component, Input, OnInit } from '@angular/core';

import { Banner, PittyCap } from 'src/app/models/banner';

@Component({
    selector: 'wc-banner-counter',
    templateUrl: './banner-counter.component.html',
    styleUrls: ['./banner-counter.component.scss']
})
export class BannerCounterComponent implements OnInit {
    @Input()
    public banner: Banner;

    constructor() { }

    ngOnInit(): void {
    }

    public get progressRare(): number {
        return (PittyCap.RARE - this.banner.wishesToRare) * 100 / (PittyCap.RARE - 1);
    }

    public get progressEpic(): number {
        return (PittyCap.EPIC_CHARACTER - this.banner.wishesToEpic) * 100 / (PittyCap.EPIC_CHARACTER - 1);
    }

}
