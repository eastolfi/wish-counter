import { Injectable } from '@angular/core';
import { AngularFirestore, CollectionReference, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Banner } from '../models/banner';
import { AuthService, User } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class BannerService {
    private readonly USER_BANNERS_COLLECTION = 'user-banners';

    constructor(
        private readonly firestore: AngularFirestore,
        private readonly authService: AuthService,
    ) { }

    public searchUserBanners(user?: User): Observable<Banner[]> {
        const currentUser = user || this.authService.currentUser.value;

        return this.firestore.collection(this.USER_BANNERS_COLLECTION,
        (ref: CollectionReference) => ref.where('userId', '==', currentUser.id))
            .snapshotChanges()
            .pipe(
                map((bannerActions: DocumentChangeAction<Banner>[]) => {
                    return bannerActions.map(({ payload }: DocumentChangeAction<Banner>) => {
                        return {
                            id: payload.doc.id,
                            ...payload.doc.data()
                        } as Banner;
                    });
                })
            );
    }

    public saveUserBanner(banner: Banner, user?: User): Promise<void> {
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


        // this.firestore.collection(this.USER_BANNERS_COLLECTION,
        // (ref: CollectionReference) => ref
        //     .where('user-id', '==', userId)
        //     .where('type', '==', banner.type))
        // .snapshotChanges().subscribe((asd: DocumentChangeAction<Banner>[]) => {
        //     asd.forEach(({ payload }: DocumentChangeAction<Banner>) => {
        //         this.firestore.doc(`${this.USER_BANNERS_COLLECTION}/${payload.doc.id}`)
        //         .set({
        //             totalWishes: banner.totalWishes,
        //             wishesToRare: banner.wishesToRare,
        //             wishesToEpic: banner.wishesToEpic
        //         }, { merge: true });
        //     })
        // })
    }
}
