import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'wc-card-button',
    templateUrl: './card-button.component.html',
    styleUrls: ['./card-button.component.scss']
})
export class CardButtonComponent implements OnInit {
    @Input()
    public disabled: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

}
