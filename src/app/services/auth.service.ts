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

    public signOutAnonym(): void {
        this.emitCurrentUser(null);
    }

    public googleSignIn(): void {
        //
    }

    public ensureUser(): void {
        const localUser: User = this.getLocalUser();

        if (localUser == null) {
            this.saveCurrentUser({
                id: this.generateUserId(),
                email: null,
                emailVerified: false
            });
        } else {
            this.emitCurrentUser(localUser);
        }
    }

    public checkLocalUser(): void {
        const localUser: User = this.getLocalUser();

        if (localUser != null) {
            this.emitCurrentUser(localUser);
        }
    }

    public clearLocalUser(): void {
        localStorage.removeItem(this.SESSION_USER_KEY);
        this.emitCurrentUser(null);
    }

    private emitCurrentUser(user: User): void {
        this.currentUser.next(user);
    }

    private saveCurrentUser(user: User): void {
        localStorage.setItem(this.SESSION_USER_KEY, JSON.stringify(user));
        this.emitCurrentUser(user);
    }

    private getLocalUser(): User {
        const currentUser = localStorage.getItem(this.SESSION_USER_KEY);

        if (currentUser != null && currentUser !== this.EMPTY_USER) {
            return JSON.parse(currentUser) as User;
        }

        return null;
    }

    private generateUserId(): string {
        return (`${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`).replace(/[018]/g, c =>
            (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
        );
    }
}
