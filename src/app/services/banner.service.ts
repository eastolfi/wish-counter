import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Banner, BannerGame, BannerType, getPity, Rarity, UserBanner } from '../models/banner';
import { GameSwitchService } from '../components/game-switch/game-switch.service';

import { AuthService, User } from './auth.service';
import { BaseService } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class BannerService extends BaseService {
    private readonly USER_BANNERS_COLLECTION = 'user-banners';
    private readonly BANNERS_COLLECTION = 'banners';

    constructor(
        private readonly firestore: AngularFirestore,
        private readonly translate: TranslateService,
        private readonly authService: AuthService,
        private readonly gameService: GameSwitchService,
    ) {
        super();
    }

    /**
     * Search banner information (pity, etc) of the user
     *
     * @param user
     * @returns The banner information of the user
     */
    public searchUserBanners(user?: User): Observable<UserBanner[]> {
        const currentUser = user || this.authService.currentUser.value;

        if (!currentUser) {
            return new Observable();
        }

        return this.firestore.collection(this.USER_BANNERS_COLLECTION,
        (ref: CollectionReference) => ref.where('userId', '==', currentUser.id) )
            .snapshotChanges()
            .pipe(
                map((bannerActions: DocumentChangeAction<UserBanner>[]) => this.toClass(bannerActions) as UserBanner[]),
                tap(banners => this.addGameInfoToBanners(banners, this.USER_BANNERS_COLLECTION)),
                map(banners => banners.filter(banner => banner.game === this.gameService.getCurrentGame()))
            );
    }

    /**
     * Search all types of banner for the current game
     *
     * @returns The list of banners
     */
    public searchBanners(): Observable<Banner[]> {
        const currentGame = this.gameService.getCurrentGame();
        return this.firestore.collection(this.BANNERS_COLLECTION, (ref: CollectionReference) => {
            return ref.where('language', '==', this.translate.currentLang)
        })
            .snapshotChanges()
            .pipe(
                map((action: DocumentChangeAction<Banner>[]) => this.toClass(action) as Banner[]),
                // Sorting
                map((banners: Banner[]) => [
                    banners.filter(b => b.type === BannerType.CHARACTER_TEMPORAL && b.game === currentGame)[0],
                    banners.filter(b => b.type === BannerType.WEAPON_TEMPORAL && b.game === currentGame)[0],
                    banners.filter(b => b.type === BannerType.CHARACTER_PERMANENT && b.game === currentGame)[0],
                ].filter(banner => banner != null)),
                tap(banners => this.addGameInfoToBanners(banners, this.BANNERS_COLLECTION)),
            );
    }

    private addGameInfoToBanners<T extends Banner | UserBanner>(banners: T[], collection: string) {
        banners
            .filter(banner => banner.game === undefined)
            .forEach(banner => {
                this.firestore.collection(collection)
                    .doc(banner.id)
                    .set({ game: BannerGame.GENSHIN }, { merge: true })
                    .then(() => console.log('Banner updated'))
                    .catch(e => console.error(e));
            })
    }

    public saveUserBanner(banner: UserBanner, user?: User): Promise<void> {
        const currentUser = user || this.authService.currentUser.value;

        if (!banner.game) {
            // banner.game = BannerGame.GENSHIN;
        }

        return new Promise((resolve, reject) => {
            if (banner.id) {
                // Watch out for saving problems
                this.firestore.collection(this.USER_BANNERS_COLLECTION)
                    .doc(banner.id)
                    .set({
                        totalWishes: banner.totalWishes,
                        wishesToRare: banner.wishesToRare,
                        wishesToEpic: banner.wishesToEpic
                    }, { merge: true })
                    .then(resolve)
                    .catch(reject);
            } else {
                this.firestore.collection(this.USER_BANNERS_COLLECTION)
                    .add({
                        userId: currentUser.id,
                        ...banner
                    })
                    .then((result: DocumentReference<Banner>) => {
                        banner.userId = currentUser.id;
                        banner.id = result.id;
                        resolve();
                    })
                    .catch(reject);
            }
        });
    }

    public makeSinglePullWish(banner: UserBanner, pullRarity: Rarity): void {
        banner.totalWishes++;
        if (pullRarity === Rarity.EPIC) {
            banner.wishesToEpic = getPity(banner.type);
        } else if (pullRarity === Rarity.RARE) {
            banner.wishesToEpic--;
            banner.wishesToRare = 10;
        } else {
            banner.wishesToEpic--;
            banner.wishesToRare--;
        }
    }

    public makeTenPullWishes(banner: UserBanner, pullRarity: Rarity[]): Promise<void> {
        return new Promise((resolve, reject) => {
            for (let pull of pullRarity) {
                this.makeSinglePullWish(banner, pull);
            }

            this.firestore.collection(this.USER_BANNERS_COLLECTION)
                .doc(banner.id)
                .set({
                    totalWishes: banner.totalWishes,
                    wishesToRare: banner.wishesToRare,
                    wishesToEpic: banner.wishesToEpic
                }, { merge: true })
                .then(resolve)
                .catch(reject);
        })
    }
}
