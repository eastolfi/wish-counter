import { Injectable } from '@angular/core';
import { Banner } from '../models/banner';

const WISHES_STORAGE_KEY = 'wishes';

@Injectable({
    providedIn: 'root'
})
export class BannerService {

    constructor() { }

    public searchUserBanners(): Partial<Banner>[] {
        return JSON.parse(localStorage.getItem(WISHES_STORAGE_KEY));
    }

    public saveUserBanners(banners: Banner[]) {
        localStorage.setItem(WISHES_STORAGE_KEY, JSON.stringify(banners.map(({ type, totalWishes, wishesToRare, wishesToEpic }: Banner) => {
            return {
                type, totalWishes, wishesToRare, wishesToEpic
            } as Partial<Banner>
        })));
    }
}
