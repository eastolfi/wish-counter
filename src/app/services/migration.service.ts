import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { first, flatMap, mergeAll, mergeMap, take, toArray } from 'rxjs/operators';
import { Banner } from '../models/banner';
import { AuthService, User } from './auth.service';
import { BannerService } from './banner.service';

const WISHES_STORAGE_KEY = 'wishes';


@Injectable({
    providedIn: 'root'
})
export class MigrationService {
    private readonly STORAGE_KEY_MIGRATION_QUEUE = 'migration-queue';
    private readonly VERSIONS_PRE_AUTH = ['1.0.0-rc.1', '1.0.0-rc.2'];

    constructor(
        private readonly firestore: AngularFirestore,
        private readonly authService: AuthService,
        private readonly bannerService: BannerService,
    ) { }

    public queueMigration(from: string, to: string): void {
        localStorage.setItem(this.STORAGE_KEY_MIGRATION_QUEUE, JSON.stringify({ from, to }));
    }

    public hasMigrationInQueue(): boolean {
        return !!localStorage.getItem(this.STORAGE_KEY_MIGRATION_QUEUE);
    }

    public migrate(): Promise<void> {
        const { from, to } = JSON.parse(localStorage.getItem(this.STORAGE_KEY_MIGRATION_QUEUE));

        if (localStorage.getItem(WISHES_STORAGE_KEY)) {
            return this.migrateFromBeta();
        } else if (this.VERSIONS_PRE_AUTH.includes(from)) {
            this.migrateNotAuthVersions();
        }

        return Promise.resolve();
    }

    private migrateFromBeta(): Promise<void> {
        const oldBanners: Banner[] = JSON.parse(localStorage.getItem(WISHES_STORAGE_KEY));

        return new Promise((resolve, reject) => {
            if (oldBanners) {
                Promise.all(oldBanners.map((banner: Banner) => this.bannerService.saveUserBanner(banner)))
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

    private migrateNotAuthVersions(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            try {
                // Recover the local user
                const localUser: User = this.authService.getLocalUser();

                // Recover the banners saved for the local user
                const banners = await this.bannerService.searchUserBanners(localUser).pipe(first()).toPromise();

                // Clear the custom local user
                this.authService.clearLocalUser();

                // Create a new anonymous user
                await this.authService.signInAnonymously();

                // Save the banners under this new user
                this.authService.currentUser.subscribe(async (user: User) => {
                    const t = setTimeout(() => {
                        reject("The migration did not finish successfully. Reload to try again");
                    }, 60 * 1000);

                    if (user != null) {
                        await Promise.all(banners.map((banner: Banner) => this.bannerService.saveUserBanner(banner)));

                        clearTimeout(t);
                        localStorage.removeItem(this.STORAGE_KEY_MIGRATION_QUEUE);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}
