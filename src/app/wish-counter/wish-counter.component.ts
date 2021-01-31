import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { isNotNull } from 'src/app/utils/rxjs.utils';
import { DialogTenPullComponent } from 'src/app/wish-counter/dialogs/dialog-ten-pull/dialog-ten-pull.component';

import { BottomNavService } from '../components/bottom-nav/bottom-nav.service';
import { WishCountEditDialogComponent, WishCountEditDialogData } from './dialogs/wish-count-edit-dialog/wish-count-edit-dialog.component';
import { BannerFactory } from '../factories/banner.factory';
import { Banner, BannerType, Rarity, UserBanner } from '../models/banner';
import { BannerService } from '../services/banner.service';
import { AuthService, User } from '../services/auth.service';

@Component({
    selector: 'wc-wish-counter',
    templateUrl: './wish-counter.component.html',
    styleUrls: ['./wish-counter.component.scss']
})
export class WishCounterComponent implements OnInit {
    public banners$: Observable<Banner[]>;
    public userBanners: {
        [key in BannerType]: UserBanner
    } = {
        [BannerType.CHARACTER_TEMPORAL]: BannerFactory.createBanner(BannerType.CHARACTER_TEMPORAL),
        [BannerType.WEAPON_TEMPORAL]: BannerFactory.createBanner(BannerType.WEAPON_TEMPORAL),
        [BannerType.CHARACTER_PERMANENT]: BannerFactory.createBanner(BannerType.CHARACTER_PERMANENT)
    };

    public readonly BANNER_TYPES = BannerType;
    public readonly RARITY = Rarity;

    constructor(
        public readonly dialog: MatDialog,
        private readonly bannerService: BannerService,
        private readonly authService: AuthService,
        private readonly bottomNavService: BottomNavService,
    ) { }

    ngOnInit(): void {
        this.bottomNavService.setItems([
            {icon: 'home', label: 'Home', routerLink: 'home'},
            {icon: 'wc-wish', svgIcon: true, label: 'Wish Counter', routerLink: 'wish-counter'},
        ]);

        this.loadBanners();

        this.authService.currentUser
        .pipe(filter(isNotNull))
        .subscribe((_user: User) => {
            this.loadUserBanners();
        });
    }

    public makeTenPulls({ type }: Banner): void {
        const userBanner: UserBanner = this.userBanners[type];

        this.dialog.open(DialogTenPullComponent, {
            width: '500px',
            data: { userBanner }
        });
    }

    public openWishEditDialog({ epicPittyCap, type }: Banner): void {
        const userBanner: UserBanner = this.userBanners[type];

        const dialogRef = this.dialog.open(WishCountEditDialogComponent, {
            width: '250px',
            data: {
                totalWishes: userBanner.totalWishes,
                wishesToRare: userBanner.wishesToRare,
                wishesToEpic: userBanner.wishesToEpic,
                pittyCap: epicPittyCap
            } as WishCountEditDialogData
        });

        dialogRef.afterClosed().subscribe((result: WishCountEditDialogData) => {
            if (result) {
                userBanner.totalWishes = result.totalWishes;
                userBanner.wishesToRare = result.wishesToRare;
                userBanner.wishesToEpic = result.wishesToEpic;
                this.saveBanner(userBanner);
            }
        })
    }

    public forceWishes(banner: UserBanner, rarity: Rarity, event: Event) {
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

    public addWish(banner: UserBanner, rarity: Rarity): void {
        if (rarity === Rarity.COMMON && (banner.wishesToRare === 1 || banner.wishesToEpic === 1)) {
            return;
        }

        if (rarity === Rarity.RARE && (banner.wishesToEpic === 1)) {
            return;
        }

        this.bannerService.makeSinglePullWish(banner, rarity);

        this.saveBanner(banner);
    }

    private saveBanner(banner: UserBanner): void {
        this.bannerService.saveUserBanner(banner);
    }

    private loadBanners(): void {
        this.banners$ = this.bannerService.searchBanners();
    }

    private loadUserBanners(): void {
        this.bannerService.searchUserBanners()
        .subscribe((banners: UserBanner[]) => {
            banners.forEach((banner: UserBanner) => this.userBanners[banner.type] = banner)
        });
    }
}
