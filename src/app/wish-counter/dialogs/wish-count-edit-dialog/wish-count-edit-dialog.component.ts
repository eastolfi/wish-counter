import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Rarity } from 'src/app/models/banner';

export interface WishCountEditDialogData {
    totalWishes: number;
    wishesToRare: number;
    wishesToEpic: number;
    pityCap: number;
}

@Component({
    selector: 'wc-wish-count-edit-dialog',
    templateUrl: './wish-count-edit-dialog.component.html',
    styleUrls: ['./wish-count-edit-dialog.component.scss']
})
export class WishCountEditDialogComponent implements OnInit {
    public readonly RARITY = Rarity;

    constructor(
        public dialogRef: MatDialogRef<WishCountEditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: WishCountEditDialogData
    ) { }

    ngOnInit(): void {
    }

    public updateWish(rarity: Rarity, event: Event): void {
        const value = parseInt((event.target as HTMLInputElement).value);

        if (rarity === Rarity.EPIC) {
            this.data.wishesToEpic = value;
        } else if (rarity === Rarity.RARE) {
            this.data.wishesToRare = value;
        } else {
            this.data.totalWishes = value;
        }
    }

}
