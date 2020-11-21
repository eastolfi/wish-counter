import { marker as extract } from '@biesbjerg/ngx-translate-extract-marker';

import { Rarity } from './banner';

extract([
    'item.weapon.sword'
])

enum WeaponType {
    SWORD = 'item.weapon.sword'
}

export interface Invocable {
    name: string;
    rarity: Rarity;
}

interface Character extends Invocable {
    secondName: string;
}

interface Weapon extends Invocable {
    type: WeaponType;
}
