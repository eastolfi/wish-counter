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
    private readonly VERSIONS_PRE_AUTH = ['1.0.0-rc.1', '1.0.0-rc.2', '1.0.0-rc.3'];

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

        localStorage.removeItem(this.STORAGE_KEY_MIGRATION_QUEUE);

        return Promise.resolve();
    }
}
