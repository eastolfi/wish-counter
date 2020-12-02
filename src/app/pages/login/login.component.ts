import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BottomNavService } from 'src/app/components/bottom-nav/bottom-nav.service';

import { AuthService, User } from 'src/app/services/auth.service';

@Component({
    selector: 'wc-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public form: FormGroup;

    private returnUrl: string;

    constructor(
        private readonly fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private readonly authService: AuthService,
        private readonly bottomNavService: BottomNavService,
    ) { }

    ngOnInit(): void {
        this.initForm();

        this.route.queryParams.subscribe(params => this.returnUrl = params['returnUrl'] || '/wish-counter');
        this.authService.currentUser.subscribe((user: User) => {
            if (user != null) {
                if (this.returnUrl) {
                    this.router.navigateByUrl(this.returnUrl)
                }
            }
        });

        this.bottomNavService.setItems([]);
    }

    public login(): void {
        this.authService.signIn(this.form.get('username').value, this.form.get('password').value)
        .then(() => console.log('Logged in'))
        .catch(console.error);
    }

    // register() {
    //     this.authService.signUp();
    // }

    private initForm() {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

}
