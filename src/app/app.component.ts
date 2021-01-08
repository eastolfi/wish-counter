import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { marker as extract } from '@biesbjerg/ngx-translate-extract-marker';


import { MigrationService } from './services/migration.service';

extract([
    'system.update.new-version-available',
])

@Component({
    selector: 'wc-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
        private readonly updates: SwUpdate,
        private readonly translate: TranslateService,
        private readonly migrationService: MigrationService,
    ) { }

    ngOnInit() {
        this.updates.available.subscribe(async (event: UpdateAvailableEvent) => {
            if (confirm(await this.translate.get('system.update.new-version-available', { version: event.available.appData['version'] }).toPromise())) {
                // Put the migration in queue and reload to update it
                this.migrationService.queueMigration(event.current.appData['version'], event.available.appData['version']);
                window.location.reload();
            }
        });

        this.init();

        // put up loading and await
        if (this.migrationService.hasMigrationInQueue()) {
            this.migrationService.migrate()
            .then(/* do nothing ? */)
            .catch(/* flag as failed migration */)
            // .finally(() => window.location.reload());
        }
    }

    private init(): void { }

    public reload(): void {
        window.location.reload();
    }
}
