import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';

export interface User {
    id: string;
    displayName?: string;
    email: string;
    emailVerified: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public currentUser = new BehaviorSubject<User>(null);

    constructor(
        private readonly afAuth: AngularFireAuth
    ) {
        this.afAuth.authState.subscribe((user: firebase.User) => {
            if (user != null) {
                this.emitCurrentUser({
                    id: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    emailVerified: user.emailVerified
                });
            } else {
                this.emitCurrentUser(null);
            }
        });
    }

    private emitCurrentUser(user: User): void {
        this.currentUser.next(user);
    }
}
