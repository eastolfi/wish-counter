import { Invocable } from './invocable';

export enum Rarity {
    EPIC = 5, RARE = 4, COMMON = 3
}

export enum PittyCap {
    RARE = 10, EPIC_CHARACTER = 90, EPIC_WEAPON = 80
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
    epicPittyCap: number;
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
