import { marker as extract } from '@biesbjerg/ngx-translate-extract-marker';

import { Banner, BannerType, PittyCap } from '../models/banner';

extract([
    'banner.character.temporal.title', 'banner.weapon.temporal.title', 'banner.character.permanent.title',
    'banner.character.temporal.description', 'banner.weapon.temporal.description', 'banner.character.permanent.description',
])

export class BannerFactory {
    public static createBanner(type: BannerType): Banner {
        if (type === BannerType.WEAPON_TEMPORAL) {
            return BannerFactory.createWeaponBanner();
        } else {
            return BannerFactory.createCharacterBanner(type);
        }
    }

    private static createCharacterBanner(type: BannerType): Banner {
        return {
            type,
            title: type === BannerType.CHARACTER_TEMPORAL ? 'banner.character.temporal.title' : 'banner.character.permanent.title',
            description: type === BannerType.CHARACTER_TEMPORAL ? 'banner.character.temporal.description' : 'banner.character.permanent.description',
            totalWishes: 0,
            wishesToRare: PittyCap.RARE,
            wishesToEpic: PittyCap.EPIC_CHARACTER,
            featured: [],
            epicPittyCap: PittyCap.EPIC_CHARACTER
        } as Banner;
    }

    private static createWeaponBanner(): Banner {
        return {
            type: BannerType.WEAPON_TEMPORAL,
            title: 'banner.weapon.temporal.title',
            description: 'banner.weapon.temporal.description',
            totalWishes: 0,
            wishesToRare: PittyCap.RARE,
            wishesToEpic: PittyCap.EPIC_WEAPON,
            featured: [],
            epicPittyCap: PittyCap.EPIC_WEAPON
        } as Banner;
    }
}
