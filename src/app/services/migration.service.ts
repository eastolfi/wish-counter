import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { catchError, filter, first, flatMap, map, mergeAll, mergeMap, take, toArray } from 'rxjs/operators';
import { Banner, UserBanner } from '../models/banner';
import { AuthService, User } from './auth.service';
import { BannerService } from './banner.service';

import { isNotNull } from 'src/app/utils/rxjs.utils';
import { of, Subscription } from 'rxjs';

const WISHES_STORAGE_KEY = 'wishes';

class MigrationError extends Error {
    public static MISSING_USER = 1;

    public code: number;

    constructor(message: string, code?: number) {
        super(message)

        if (code) {
            this.code = code;
        }
    }

    public static missingUserError(message?: string): MigrationError {
        return new MigrationError(message || 'Could not find user', MigrationError.MISSING_USER);
    }
}

@Injectable({
    providedIn: 'root'
})
export class MigrationService {
    private readonly STORAGE_KEY_MIGRATION_QUEUE = 'migration-queue';
    private readonly STORAGE_KEY_MIGRATION_QUEUE_USER = 'migration-queue-user';

    private currentUser: User;
    private bannerSubscription: Subscription;

    constructor(
        private readonly firestore: AngularFirestore,
        private readonly authService: AuthService,
        private readonly bannerService: BannerService,
    ) {
        // migrate old banner structure to new
        this.authService.currentUser
        .pipe(filter(isNotNull))
        .subscribe((user: User) => {
            this.currentUser = user;

            this.checkUserDependentMigrations();
        });
    }

    public queueMigration(from: string, to: string): void {
        localStorage.setItem(this.STORAGE_KEY_MIGRATION_QUEUE, JSON.stringify({ from, to }));
    }

    public hasMigrationInQueue(): boolean {
        return !!localStorage.getItem(this.STORAGE_KEY_MIGRATION_QUEUE);
    }

    public migrate(): Promise<void> {
        const { from, to } = JSON.parse(localStorage.getItem(this.STORAGE_KEY_MIGRATION_QUEUE));

        localStorage.removeItem(this.STORAGE_KEY_MIGRATION_QUEUE);

        return this.dispatchMigration(from, to);
    }

    private dispatchMigration(from: string, to: string): Promise<void> {
        // handle error
        // if (this.isVersionBeforeVersion(from, '1.2.0')) {
        //     if (this.currentUser) {
        //         return this.migrateBannerStructureRefactor_1_2_0();
        //     } else {
        //         // save for later
        //         return this.queueUserDependentMigration(from, to);
        //     }
        // }
        return Promise.resolve();
    }

    private isVersionBeforeVersion(first: string, second: string): boolean {
        if (first === second) {
            return false;
        }

        const [ firstVersion, firstCandidate ] = first.split('-rc.');
        const [ secondVersion, secondCandidate ] = second.split('-rc.');

        if (firstVersion.replace('.', '') === secondVersion.replace('.', '')) {
            return (firstCandidate || '9999') < (secondCandidate || '9999');
        } else {
            return firstVersion.replace('.', '') < secondVersion.replace('.', '');
        }
    }

    private queueUserDependentMigration(from: string, to: string): Promise<void> {
        localStorage.setItem(this.STORAGE_KEY_MIGRATION_QUEUE_USER, JSON.stringify({ from, to }));

        return Promise.resolve();
    }

    private checkUserDependentMigrations(): Promise<void> {
        const userMigration = localStorage.getItem(this.STORAGE_KEY_MIGRATION_QUEUE_USER);

        if (userMigration) {
            const { from, to } = JSON.parse(userMigration);

            localStorage.removeItem(this.STORAGE_KEY_MIGRATION_QUEUE_USER);

            return this.dispatchMigration(from, to);
        } else {
            Promise.resolve();
        }
    }

    // private waitForUser(): Promise<User> {
    //     return new Promise((resolve, reject) => {
    //         const t = setTimeout(() => {
    //             // Change this
    //             reject(MigrationError.missingUserError());
    //         }, 1000 * 15);

    //         this.authService.currentUser
    //         .pipe(filter(isNotNull))
    //         .subscribe((user: User) => {
    //             clearTimeout(t);

    //             resolve(user);
    //         });
    //     })
    // }

    // private checkBannerStructureRefactorMigration_1_2_0(): Promise<void> {
    //     return new Promise((resolve, reject) => {
    //         this.waitForUser()
    //         .then((user: User) => {
    //             this.migrateBannerStructureRefactor_1_2_0(user);
    //             // map old banner to new one
    //             // or delete old fields

    //             // this.bannerService.searchUserBanners(user)
    //             // .pipe(
    //             //     mergeMap((banners: UserBanner[]) => banners),
    //             //     map((banner: UserBanner) => {
    //             //         delete banner[''];
    //             //         return banner;
    //             //     })
    //             // )
    //             // .subscribe((banner: UserBanner) => {
    //             //     this.bannerService.saveUserBanner(banner, user);
    //             // })
    //         })
    //         .catch((error: MigrationError) => {
    //             // save for later?
    //             if (error.code === MigrationError.MISSING_USER) {
    //                 // save for later ?
    //             }
    //         })
    //     })
    // }

    private migrateBannerStructureRefactor_1_2_0(): Promise<void> {
        return new Promise((resolve, reject) => {
            // map old banner to new one
            // or delete old fields

            // this.bannerSubscription =
            this.bannerService.searchUserBanners(this.currentUser).toPromise().then(a => {
                debugger;
                resolve()
            }).catch(e => {
                debugger;
                reject(e)
            })
            // this.bannerService.searchUserBanners(this.currentUser)
            // .pipe(
            //     mergeMap((banners: UserBanner[]) => banners),
            //     map((banner: UserBanner) => {
            //         delete banner[''];
            //         return banner;
            //     }),
            //     catchError((error: Error) => {
            //         console.log(error);

            //         return of(null);
            //     })
            // )
            // .subscribe((banner: UserBanner) => {
            //     if (banner) {
            //         // this.bannerService.saveUserBanner(banner, this.currentUser);

            //         resolve();
            //     } else {
            //         // Improve
            //         reject('A problem occured')
            //     }
            // });
        });
    }
}
