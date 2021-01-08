import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Banner, BannerType, UserBanner } from '../models/banner';

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
    ) {
        super();
    }

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
            );
    }

    public searchBanners(): Observable<Banner[]> {
        return this.firestore.collection(this.BANNERS_COLLECTION, (ref: CollectionReference) => {
            return ref.where('language', '==', this.translate.currentLang)
        })
            .snapshotChanges()
            .pipe(
                map((action: DocumentChangeAction<Banner>[]) => this.toClass(action) as Banner[]),
                // Sorting
                map((banners: Banner[]) => [
                    banners.filter(b => b.type === BannerType.CHARACTER_TEMPORAL)[0],
                    banners.filter(b => b.type === BannerType.WEAPON_TEMPORAL)[0],
                    banners.filter(b => b.type === BannerType.CHARACTER_PERMANENT)[0],
                ])
            );
    }

    public saveUserBanner(banner: UserBanner, user?: User): Promise<void> {
        const currentUser = user || this.authService.currentUser.value;

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
}
