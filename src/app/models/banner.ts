import { Invocable } from './invocable';

export enum Rarity {
    EPIC = 5, RARE = 4, COMMON = 3
}

export enum PityCap {
    RARE = 10, EPIC_CHARACTER = 90, EPIC_WEAPON = 80
}
export enum SoftPityCap {
    LEGENDARY_CHARACTER = 75, LEGENDARY_WEAPON = 65
}

export enum BannerType {
    CHARACTER_TEMPORAL = 'CHARACTER_TEMP',
    WEAPON_TEMPORAL = 'WEAPON_TEMP',
    CHARACTER_PERMANENT = 'CHARACTER_PERM'
}

export interface Banner {
    id?: string;
    type: BannerType;
    title: string;
    epicPityCap: number;
    featured: Invocable[];
}

export interface UserBanner {
    id?: string;
    userId?: string;
    totalWishes: number;
    wishesToRare: number;
    wishesToEpic: number;
    type: BannerType;
}

export function getPity(type: BannerType, softPity: boolean = false): number {
    if (softPity) {
        return type === BannerType.WEAPON_TEMPORAL ? SoftPityCap.LEGENDARY_WEAPON : SoftPityCap.LEGENDARY_CHARACTER;
    } else {
        return type === BannerType.WEAPON_TEMPORAL ? PityCap.EPIC_WEAPON : PityCap.EPIC_CHARACTER;
    }
}
