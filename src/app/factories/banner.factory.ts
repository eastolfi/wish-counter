import { BannerType, PittyCap, UserBanner } from '../models/banner';

export class BannerFactory {
    public static createBanner(type: BannerType): UserBanner {
        if (type === BannerType.WEAPON_TEMPORAL) {
            return BannerFactory.createWeaponBanner();
        } else {
            return BannerFactory.createCharacterBanner(type);
        }
    }

    private static createCharacterBanner(type: BannerType): UserBanner {
        return {
            type,
            totalWishes: 0,
            wishesToRare: PittyCap.RARE,
            wishesToEpic: PittyCap.EPIC_CHARACTER,
        } as UserBanner;
    }

    private static createWeaponBanner(): UserBanner {
        return {
            type: BannerType.WEAPON_TEMPORAL,
            totalWishes: 0,
            wishesToRare: PittyCap.RARE,
            wishesToEpic: PittyCap.EPIC_WEAPON,
        } as UserBanner;
    }
}
