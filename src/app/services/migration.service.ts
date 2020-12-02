import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Banner } from '../models/banner';
import { AuthService } from './auth.service';
import { BannerService } from './banner.service';

const WISHES_STORAGE_KEY = 'wishes';


@Injectable({
    providedIn: 'root'
})
export class MigrationService {

    constructor(
        private readonly firestore: AngularFirestore,
        private readonly authService: AuthService,
        private readonly bannerService: BannerService,
    ) { }

    public migrate(from: string, to: string): Promise<void> {
        if (localStorage.getItem(WISHES_STORAGE_KEY)) {
            return this.migrateFromBeta();
        }

        // if (to === '1.0.0-rc1') {
        //     return this.migrateFromBeta();
        // }

        return Promise.resolve();
    }

    private migrateFromBeta(): Promise<void> {
        const oldBanners: Banner[] = JSON.parse(localStorage.getItem(WISHES_STORAGE_KEY));

        return new Promise((resolve, reject) => {
            const p = [];
            if (oldBanners) {
                oldBanners.forEach((banner: Banner) => {
                    p.push(this.bannerService.saveUserBanner(banner));
                });

                Promise.all(p)
                .then((_result) => {
                    localStorage.removeItem(WISHES_STORAGE_KEY);
                    resolve();
                })
                .catch(reject);
            } else {
                resolve();
            }
        })
    }
}
