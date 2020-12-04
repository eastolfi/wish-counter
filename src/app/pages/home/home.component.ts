import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BottomNavService } from 'src/app/components/bottom-nav/bottom-nav.service';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
    selector: 'wc-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public anomymForm: FormGroup;

    constructor(
        private readonly fb: FormBuilder,
        private readonly authService: AuthService,
        private readonly bottomNavService: BottomNavService,
    ) {
        this.initForm();
    }

    ngOnInit(): void {
        this.bottomNavService.setItems([
            {icon: 'home', label: 'Home', routerLink: 'home'},
            {icon: 'wc-wish', svgIcon: true, label: 'Wish Counter', routerLink: 'wish-counter'},
        ]);
    }

    public get currentUser(): User {
        return this.authService.currentUser.value;
    }

    public logout(): void {
        this.authService.signOut()
        .then(window.location.reload)
        .catch(console.warn);
    }

    public updateMail(): void {
        this.authService.createAccountFromAnonymous(this.anomymForm.get('email').value, this.anomymForm.get('password').value)
        .then(window.location.reload)
        .catch(console.error);
    }

    private initForm(): void {
        this.anomymForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

}
