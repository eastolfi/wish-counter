import { Component, OnInit } from '@angular/core';

import { BottomNavService } from 'src/app/components/bottom-nav/bottom-nav.service';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
    selector: 'wc-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(
        private readonly authService: AuthService,
        private readonly bottomNavService: BottomNavService,
    ) { }

    ngOnInit(): void {
        this.bottomNavService.setItems([
            {icon: 'home', label: 'Home', routerLink: 'home'},
            {icon: 'wc-wish', svgIcon: true, label: 'Wish Counter', routerLink: 'wish-counter'},
        ]);
    }

    public get currentUser(): User {
        return this.authService.currentUser.value;
    }
}
