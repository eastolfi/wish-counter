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
    private readonly SESSION_USER_KEY = 'session-user';
    private readonly EMPTY_USER = JSON.stringify(null);

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

    public isUserValid(): boolean {
        return this.currentUser.value != null;
    }

    public signUp(username: string, password: string): Promise<firebase.auth.UserCredential> {
        return this.afAuth.createUserWithEmailAndPassword(username, password);
    }

    public signIn(username: string, password: string): Promise<firebase.auth.UserCredential> {
        return this.afAuth.signInWithEmailAndPassword(username, password);
    }

    public signOut(): Promise<void> {
        return this.afAuth.signOut();
    }

    public signInAnonymously(): Promise<firebase.auth.UserCredential> {
        return this.afAuth.signInAnonymously();
    }

    public createAccountFromAnonymous(email: string, password: string): Promise<firebase.auth.UserCredential> {
        return new Promise((resolve, reject) => {
            const credentials: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(email, password);

            const sub = this.afAuth.authState.subscribe((currentUser: firebase.User) => {
                currentUser.linkWithCredential(credentials)
                .then(resolve)
                .catch(reject);
            });

            sub.unsubscribe();
        });
    }

    public getLocalUser(): User {
        const currentUser = localStorage.getItem(this.SESSION_USER_KEY);

        if (currentUser != null && currentUser !== this.EMPTY_USER) {
            return JSON.parse(currentUser) as User;
        }

        return null;
    }

    public clearLocalUser(): void {
        localStorage.removeItem(this.SESSION_USER_KEY);
        this.emitCurrentUser(null);
    }

    private emitCurrentUser(user: User): void {
        this.currentUser.next(user);
    }
}
