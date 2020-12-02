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

    public currentUser = new BehaviorSubject<User>(null);

    constructor(
        private readonly afAuth: AngularFireAuth
    ) {
        this.afAuth.authState.subscribe((user: firebase.User) => {
            if (user == null) {
                this.saveCurrentUser(null);
            } else {
                this.saveCurrentUser({
                    id: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    emailVerified: user.emailVerified
                })
            }
        });
    }

    public signUp(): void {
        this.afAuth.createUserWithEmailAndPassword('pruebas@test.com', 'pruebas')
        .then(console.log)
        .catch(console.warn)
    }

    public signIn(): void {
        this.afAuth.signInWithEmailAndPassword('pruebas@test.com', 'pruebas')
        .then(console.log)
        .catch(console.warn)
    }

    public signOut(): void {
        this.afAuth.signOut()
        .then(console.log)
        .catch(console.warn)
    }

    public googleSignIn(): void {
        //
    }

    public ensureUser(): void {
        const currentUser = localStorage.getItem(this.SESSION_USER_KEY);
        if (!currentUser) {
            this.saveCurrentUser({
                id: this.generateUserId(),
                email: null,
                emailVerified: false
            });
        } else {
            this.emitCurrentUser(JSON.parse(currentUser) as User);
        }
    }

    private emitCurrentUser(user: User): void {
        this.currentUser.next(user);
    }

    private saveCurrentUser(user: User): void {
        localStorage.setItem(this.SESSION_USER_KEY, JSON.stringify(user));
        this.emitCurrentUser(user);
    }

    private generateUserId(): string {
        return (`${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`).replace(/[018]/g, c =>
            (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
        );
    }
}