import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { marker as extract } from '@biesbjerg/ngx-translate-extract-marker';
import { filter } from 'rxjs/operators';

import { WishCountEditDialogComponent, WishCountEditDialogData } from '../../components/wish-count-edit-dialog/wish-count-edit-dialog.component';
import { BannerFactory } from '../../factories/banner.factory';
import { Banner, BannerType, Rarity } from '../../models/banner';
import { BannerService } from '../../services/banner.service';
import { AuthService, User } from '../../services/auth.service';

extract([
    'system.update.new-version-available',
])

function isNotNull<T>(value: T): value is NonNullable<T> {
    return value != null;
}

@Component({
    selector: 'wc-wish-counter',
    templateUrl: './wish-counter.component.html',
    styleUrls: ['./wish-counter.component.scss']
})
export class WishCounterComponent implements OnInit {

    public banners: Banner[] = [
        BannerFactory.createBanner(BannerType.CHARACTER_TEMPORAL),
        BannerFactory.createBanner(BannerType.WEAPON_TEMPORAL),
        BannerFactory.createBanner(BannerType.CHARACTER_PERMANENT)
    ];
    public readonly BANNER_TYPES = BannerType;
    public readonly RARITY = Rarity;

    constructor(
        public readonly dialog: MatDialog,
        private readonly bannerService: BannerService,
        private readonly authService: AuthService,
    ) { }

    ngOnInit(): void {
        this.authService.currentUser
        .pipe(filter(isNotNull))
        .subscribe((_user: User) => {
            this.loadBanners();
        });
    }

    public openWishEditDialog(banner: Banner): void {
        const dialogRef = this.dialog.open(WishCountEditDialogComponent, {
            width: '250px',
            data: {
                totalWishes: banner.totalWishes,
                wishesToRare: banner.wishesToRare,
                wishesToEpic: banner.wishesToEpic,
                pittyCap: banner.epicPittyCap
            } as WishCountEditDialogData
        });

        dialogRef.afterClosed().subscribe((result: WishCountEditDialogData) => {
            if (result) {
                banner.totalWishes = result.totalWishes;
                banner.wishesToRare = result.wishesToRare;
                banner.wishesToEpic = result.wishesToEpic;
                this.saveBanner(banner);
            }
        })
    }

    public forceWishes(banner: Banner, rarity: Rarity, event: Event) {
        const value = parseInt((event.target as HTMLInputElement).value);

        if (rarity === Rarity.EPIC) {
            banner.wishesToEpic = value;
        } else if (rarity === 4) {
            banner.wishesToRare = value;
        } else {
            banner.totalWishes = value;
        }

        this.saveBanner(banner);
    }

    public addWish(banner: Banner, rarity: Rarity): void {
        if (rarity === Rarity.COMMON && (banner.wishesToRare === 1 || banner.wishesToEpic === 1)) {
            return;
        }

        if (rarity === Rarity.RARE && (banner.wishesToEpic === 1)) {
            return;
        }

        banner.totalWishes++;
        if (rarity === Rarity.EPIC) {
            banner.wishesToEpic = 90;
        } else if (rarity === 4) {
            banner.wishesToEpic--;
            banner.wishesToRare = 10;
        } else {
            banner.wishesToEpic--;
            banner.wishesToRare--;
        }

        this.saveBanner(banner);
    }

    private saveBanner(banner: Banner): void {
        this.bannerService.saveUserBanner(banner);
    }

    private loadBanners(): void {
        this.bannerService.searchUserBanners().subscribe((banners: Banner[]) => {
            if (banners) {
                banners.forEach((savedBanner: Partial<Banner>) => {
                    this.banners.forEach((banner: Banner) => {
                        if (banner.type === savedBanner.type) {
                            banner.id = savedBanner.id;
                            banner.totalWishes = savedBanner.totalWishes;
                            banner.wishesToRare = savedBanner.wishesToRare;
                            banner.wishesToEpic = savedBanner.wishesToEpic;
                        }
                    })
                })
            }
        });
    }

}
