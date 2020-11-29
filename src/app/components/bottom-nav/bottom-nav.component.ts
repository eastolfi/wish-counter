import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BottomNavItem } from './bottom-nav';
import { BottomNavService } from './bottom-nav.service';

@Component({
    selector: 'wc-bottom-nav',
    templateUrl: './bottom-nav.component.html',
    styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {

    constructor(private readonly bottomNavService: BottomNavService) { }

    ngOnInit(): void {
        this.bottomNavService.items.subscribe((navItems: BottomNavItem[]) => {
            this.items = navItems;
        })
    }

    @Input()
    public items: BottomNavItem[] = [];
    public get items$(): Observable<BottomNavItem[]> {
        return this.bottomNavService.items;
    }

    /**
     * The color of this navigation bar, following the logic of Angular Material
     */
    @Input()
    public color: 'primary' | 'accent' | 'warn';

    @HostBinding('class.color-primary')
    public get colorPrimary(): boolean {
        return this.color === 'primary';
    }

    @HostBinding('class.color-accent')
    public get accentPrimary(): boolean {
        return this.color === 'accent';
    }

    @HostBinding('class.color-warn')
    public get warnPrimary(): boolean {
        return this.color === 'warn';
    }

    // /**
    //  * Returns true if the length of {@link items} is greater than 4, which hides labels on inactive items.
    //  */
    // public get hideLabels(): boolean {
    //     return this.items.length > 4;
    // }

}
