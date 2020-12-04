import { Component, OnInit } from '@angular/core';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';

import { MigrationService } from './services/migration.service';
import { AuthService } from './services/auth.service';


@Component({
    selector: 'wc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private readonly updates: SwUpdate,
        private readonly translate: TranslateService,
        private readonly authService: AuthService,
        private readonly migrationService: MigrationService,
    ) { }

    ngOnInit() {
        this.authService.checkLocalUser();

        this.updates.available.subscribe(async (event: UpdateAvailableEvent) => {
            if (confirm(await this.translate.get('system.update.new-version-available', { version: event.available.appData['version'] }).toPromise())) {
                this.migrationService.migrate(event.current.appData['version'], event.available.appData['version'])
                .then(/* do nothing ? */)
                .catch(/* flag as failed migration */)
                .finally(() => window.location.reload());
            }
        });
    }

    test() {
        this.migrationService.migrate('1.0.0-rc1', '1.0.0-rc2');
    }
}
