import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
    selector: 'wc-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public form: FormGroup;
    public currentUser: User;

    constructor(
        private readonly fb: FormBuilder,
        private readonly authService: AuthService
    ) { }

    ngOnInit(): void {
        this.initForm();
        this.authService.currentUser.subscribe((user: User) => {
            this.currentUser = user;
        });
    }

    public login(): void {
        this.authService.signIn(this.form.get('username').value, this.form.get('password').value)
        .then(() => window.location.reload())
        .catch(console.error);
    }
    public logout(): void {
        this.authService.signOut()
        .then(console.log)
        .catch(console.warn);
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
