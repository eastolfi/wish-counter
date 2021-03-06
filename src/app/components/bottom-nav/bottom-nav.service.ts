import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { BottomNavItem } from './bottom-nav';

@Injectable()
export class BottomNavService {
    private items$ = new BehaviorSubject<BottomNavItem[]>([]);

    constructor() { }

    public setItems(items: BottomNavItem[]): void {
        this.items$.next(items);
    }

    public get items(): Observable<BottomNavItem[]> {
        return this.items$;
    }
}
