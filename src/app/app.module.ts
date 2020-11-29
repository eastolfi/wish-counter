import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatIconRegistry } from '@angular/material/icon';

import { environment } from '../environments/environment';

import { MaterialModule } from './components/material/material.module';
import { BottomNavModule } from './components/bottom-nav/bottom-nav.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/locale/', '.json');
}

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
            defaultLanguage: 'es',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
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
    ) {
        this.iconRegistry.addSvgIcon(
            'wc-wish',
            this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/wish.svg')
        );
    }
}
