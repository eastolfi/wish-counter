import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/app';

import { BottomNavService } from 'src/app/components/bottom-nav/bottom-nav.service';

@Component({
    selector: 'wc-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    private returnUrl: string;

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly bottomNavService: BottomNavService,
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => this.returnUrl = params['redirectUrl'] || '/home');

        this.bottomNavService.setItems([]);
    }

    public onUserLogged(user: firebase.User): void {
        if (user) {
            if (this.returnUrl) {
                this.router.navigateByUrl(this.returnUrl)
            }
        }

    }
}
