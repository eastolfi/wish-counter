import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'wc-bottom-nav-button',
    templateUrl: './bottom-nav-button.component.html',
    styleUrls: ['./bottom-nav-button.component.scss']
})
export class BottomNavButtonComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    /**
     * Determines whether labels of inactive buttons are hidden.
     */
    @HostBinding('class.label-hidden')
    @Input()
    public hideLabel: boolean;

    /**
     * The icon which is shown on this button.
     */
    @Input()
    public icon: string;

    /**
     * The label which is shown on this button.
     */
    @Input()
    public label: string;

}
