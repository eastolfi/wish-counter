import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { marker as extract } from '@biesbjerg/ngx-translate-extract-marker';

import { WishCountEditDialogComponent, WishCountEditDialogData } from './components/wish-count-edit-dialog/wish-count-edit-dialog.component';
import { BannerFactory } from './factories/banner.factory';
import { Banner, BannerType, Rarity } from './models/banner';

extract([
    'system.update.new-version-available',
])

const WISHES_STORAGE_KEY = 'wishes';

@Component({
    selector: 'wc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public banners: Banner[] = [
        BannerFactory.createBanner(BannerType.CHARACTER_TEMPORAL),
        BannerFactory.createBanner(BannerType.WEAPON_TEMPORAL),
        BannerFactory.createBanner(BannerType.CHARACTER_PERMANENT)
    ];
    public readonly BANNER_TYPES = BannerType;
    public readonly RARITY = Rarity;

    constructor(
        public readonly dialog: MatDialog,
        private readonly updates: SwUpdate,
        private readonly translate: TranslateService
    ) {
        this.updates.available.subscribe(async (event: UpdateAvailableEvent) => {
            if (confirm(await this.translate.get('system.update.new-version-available', { version: event.current.appData['version'] }).toPromise())) {
                window.location.reload();
            }
        });
        // updates.activated.subscribe(event => {
        //     alert(`App updated. Old version was ${event.previous}. New version is ${event.current}`)
        // });
    }

    ngOnInit(): void {
        this.migrateWishes();
        this.loadBanners();
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
                this.saveBanners();
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

        this.saveBanners();
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

        this.saveBanners();
    }

    private saveBanners(): void {
        localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(this.banners.map(({ type, totalWishes, wishesToRare, wishesToEpic }: Banner) => {
            return {
                type, totalWishes, wishesToRare, wishesToEpic
            } as Partial<Banner>
        })));
    }

    private loadBanners(): void {
        const banners = JSON.parse(localStorage.getItem(WISHES_STORAGE_KEY));

        if (banners) {
            banners.forEach((savedBanner: Partial<Banner>) => {
                this.banners.forEach((banner: Banner) => {
                    if (banner.type === savedBanner.type) {
                        banner.totalWishes = savedBanner.totalWishes;
                        banner.wishesToRare = savedBanner.wishesToRare;
                        banner.wishesToEpic = savedBanner.wishesToEpic;
                    }
                })
            })
        }
    }

    private migrateWishes(): void {
        // To be implemented
    }
}
