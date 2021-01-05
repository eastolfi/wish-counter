import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatIconRegistry } from '@angular/material/icon';
import { NgxAuthFirebaseUIConfig, NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

import { environment } from '../environments/environment';

import { MaterialModule } from './components/material/material.module';
import { BottomNavModule } from './components/bottom-nav/bottom-nav.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

const firebaseUiConfig: NgxAuthFirebaseUIConfig = {
    enableFirestoreSync: false, // enable/disable autosync users with firestore
    toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
    toastMessageOnAuthError: true, // whether to open/show a snackbar message on auth error - default : true
    authGuardFallbackURL: '/login', // url for unauthenticated users - to use in combination with canActivate feature on a route
    // authGuardLoggedInURL: '/loggedin', // url for authenticated users - to use in combination with canActivate feature on a route
    passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
    passwordMinLength: 6, // Password length min/max in forms independently of each componenet min/max.
    // Same as password but for the name
    nameMaxLength: 50,
    nameMinLength: 2,
    // If set, sign-in/up form is not available until email has been verified.
    // Plus protected routes are still protected even though user is connected.
    guardProtectedRoutesUntilEmailIsVerified: false,
    enableEmailVerification: false, // default: true
}

const DEFAULT_LANGUAGE = 'en';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        BottomNavModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        TranslateModule.forRoot({
            defaultLanguage: DEFAULT_LANGUAGE,
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        NgxAuthFirebaseUIModule.forRoot(environment.firebase, () => 'Genshin Companion', firebaseUiConfig),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRoutingModule,
        CoreModule,
        MaterialModule,
    ],
    providers: [
        MatIconRegistry
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        private readonly domSanitizer: DomSanitizer,
        private readonly iconRegistry: MatIconRegistry,
        private readonly translate: TranslateService,
    ) {
        this.iconRegistry.addSvgIcon(
            'wc-wish',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/wish.svg')
        );

        const { language } = navigator;

        this.translate.use(language ? language.split('-')[0] : DEFAULT_LANGUAGE);
    }
}
