import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BottomNavService } from 'src/app/components/bottom-nav/bottom-nav.service';
import { Rarity } from 'src/app/models/banner';
import { AuthService, User } from 'src/app/services/auth.service';

enum Element {
    Pyro = 'Pyro', Hydro = 'Hydro', Anemo = 'Anemo', Electro = 'Electro', Dendro = 'Dendro', Cryo = 'Cryo', Geo = 'Geo'
}

interface AscensionGems {
    // element: Element,
    sliver: number;
    fragment: number;
    chunk: number;
    gemstone: number;
}

interface Inventory {
    ascensionGems: {
        [key in Element]: AscensionGems
    }
}

@Component({
    selector: 'wc-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public readonly Element: typeof Element = Element;
    public readonly Rarity: typeof Rarity = Rarity;

    public inventory: Inventory = {
        ascensionGems: {
            [Element.Pyro]: { sliver: 68, fragment: 2, chunk: 0, gemstone: 0 },
            [Element.Hydro]: { sliver: 53, fragment: 6, chunk: 0, gemstone: 0 },
            [Element.Anemo]: { sliver: 46, fragment: 17, chunk: 0, gemstone: 0 },
            [Element.Electro]: { sliver: 72, fragment: 8, chunk: 1, gemstone: 0 },
            [Element.Dendro]: { sliver: 0, fragment: 0, chunk: 0, gemstone: 0 },
            [Element.Cryo]: { sliver: 60, fragment: 12, chunk: 0, gemstone: 0 },
            [Element.Geo]: { sliver: 99, fragment: 0, chunk: 5, gemstone: 0 },
        }
    }
    public alchemyForm: FormGroup;

    public originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
        return 0;
    }

    constructor(
        private readonly fb: FormBuilder,
        private readonly authService: AuthService,
        private readonly bottomNavService: BottomNavService,
    ) {
        this.initForm();
     }

    ngOnInit(): void {
        this.bottomNavService.setItems([
            {icon: 'home', label: 'Home', routerLink: 'home'},
            {icon: 'wc-wish', svgIcon: true, label: 'Wish Counter', routerLink: 'wish-counter'},
        ]);
    }

    public get currentUser(): User {
        return this.authService.currentUser.value;
    }

    private initForm() {
        this.alchemyForm = this.fb.group({
            gemstone: [0],
            chunk: [0],
            fragment: [0],
        })
    }

    public updateMaterials(element: Element): void {
        const available = this.inventory.ascensionGems[element];

        // const required = {
        //     [Rarity.RARE]: 0,
        //     [Rarity.COMMON]: 0,
        //     [Rarity.FODDER]: 0
        // }
        const instructions = [];
        const targetGemstone = this.alchemyForm.get('gemstone').value;
        const neededGemstone = Math.max(0, targetGemstone - available.gemstone)
        console.log(`Gemstone ${available.gemstone}/${targetGemstone} (missing ${neededGemstone})`)

        // if (available.gemstone >= targetGemstone && targetGemstone !== 0) {
        //     console.log('enough gemstones')
        // } else if (targetGemstone !== 0) {
        //     console.log(`you need ${targetGemstone - available.gemstone} gemstones`)
        // }

        const targetChunk = this.alchemyForm.get('chunk').value;
        const chunksForGemstone = neededGemstone * 3;
        const totalChunks = targetChunk + chunksForGemstone;
        const neededChunk = Math.max(0, totalChunks - available.chunk)
        console.log(`Chunks ${available.chunk}/${totalChunks} (missing ${neededChunk})`)
        instructions.push({
            kind: 'craft',
            sourceAmount: neededGemstone * 3,
            sourceType: 'chunk',
            targetAmount: neededGemstone,
            targetType: 'gemstone'
        })

        // const chunksForGemstone = targetGemstone > 0 ? (targetGemstone - available.gemstone) * 3 - available.chunk : 0;

        // if (available.chunk >= totalChunks && totalChunks !== 0) {
        //     console.log('enough chunks')
        // } else if (totalChunks !== 0) {
        //     console.log(`you need ${totalChunks - available.chunk} chunks`)
        // }


        const targetFragment = this.alchemyForm.get('fragment').value;
        const fragmentsForChunk = totalChunks * 3;
        const totalFragments =  targetFragment + fragmentsForChunk;
        const neededFragment = Math.max(0, totalFragments - available.fragment)
        console.log(`Fragments ${available.fragment}/${totalFragments} (missing ${neededFragment})`)
        instructions.push({
            kind: 'craft',
            sourceAmount: neededChunk * 3,
            sourceType: 'fragment',
            targetAmount: neededChunk,
            targetType: 'chunk'
        })

        const sliversForFragment = totalFragments * 3;
        const totalSlivers = targetFragment + sliversForFragment;
        const neededSliver = Math.max(0, totalSlivers - available.sliver)
        console.log(`Slivers ${available.sliver}/${totalSlivers} (missing ${neededSliver})`)
        instructions.push({
            kind: 'craft',
            sourceAmount: neededFragment * 3,
            sourceType: 'sliver',
            targetAmount: neededFragment,
            targetType: 'fragment'
        })

        instructions.push({
            kind: 'farm',
            amount: neededSliver,
            type: 'sliver'
        })

        instructions.reverse();
        instructions.forEach(i => {
            if (i.kind === 'farm') {
                console.log(`Farm at least ${i.amount} ${i.type}`)
            }

            if (i.kind === 'craft') {
                console.log(`Craft ${i.sourceAmount} ${i.sourceType} into ${i.targetAmount} ${i.targetType}`)
            }
        })

        // console.log(totalSlivers)


        // const requiredFragment = Math.max(0, requiredChunk > 0 ? (requiredChunk) * 3 - available.fragment : 0);
        // const requiredSliver = requiredFragment > 0 ? (requiredFragment) * 3 - available.sliver : 0;
        // // const requiredFragment = targetChunk > 0 ? (targetChunk - available.chunk) * 3 - available.fragment : 0;
        // // const requiredFragment2 = requiredChunk > 0 ? (requiredChunk - available.chunk) * 3 - available.fragment : 0;

        // console.log(`Craft ${requiredSliver + available.sliver} slivers into`)

        // console.log(requiredSliver)

        // const required = {
        //     // [Rarity.EPIC]: targetGemstone > 0 ? targetGemstone - available.gemstone : 0,
        //     [Rarity.RARE]: targetGemstone > 0 ? (targetGemstone - available.gemstone) * 3 : 0,
        //     [Rarity.COMMON]: targetFragment > 0 ? targetFragment - available.fragment : 0,
        //     [Rarity.FODDER]: targetFragment > 0 ? targetFragment - available.fragment : 0
        // }

        // const target = {
        //     [Rarity.EPIC]: targetGemstone > 0 ? targetGemstone - available.gemstone : 0,
        //     [Rarity.RARE]: targetChunk > 0 ? targetChunk - available.chunk : 0,
        //     [Rarity.COMMON]: targetFragment > 0 ? targetFragment - available.fragment : 0,
        //     // [Rarity.FODDER]: targetFragment > 0 ? targetFragment - available.fragment : 0
        // }


        // 5
        // if (rarity === Rarity.EPIC) {
        //     required[Rarity.RARE] = this.alchemyForm.get('gemstone').value;
        // }

        // if (rarity === Rarity.RARE) {
        //     required[Rarity.COMMON] = this.alchemyForm.get('chunk').value;
        // }

        // if (rarity === Rarity.COMMON) {
        //     required[Rarity.FODDER] = this.alchemyForm.get('fragment').value;
        // }

        // console.log(target)

        // console.log(this.calculateCraftingRequirements(target))

        // const missingMaterials = value - (rarity === 5 ? available.gemstone : rarity === 4 ? available.chunk : available.fragment);

        // if (missingMaterials > 0) {
        //     console.log(`Missing ${missingMaterials}`);

        //     const nextMissing = rarity === 5 ? available.gemstone : rarity === 4 ? available.chunk : available.fragment;
        // }
    }


    // private calculateCraftingRequirements(value: { [Rarity.RARE]: number, [Rarity.COMMON]: number, [Rarity.FODDER]: number }): { [key in Rarity]: number } {
    //     let nextRarity: Rarity;
    //     let result = {
    //         [Rarity.EPIC]: 0,
    //         [Rarity.RARE]: 0,
    //         [Rarity.COMMON]: 0,
    //         [Rarity.FODDER]: 0,
    //     };

    //     if (rarity === Rarity.EPIC) {
    //         nextRarity = Rarity.RARE;
    //     }

    //     if (rarity === Rarity.RARE) {
    //         nextRarity = Rarity.COMMON;
    //     }

    //     if (rarity === Rarity.COMMON) {
    //         nextRarity = Rarity.FODDER;
    //     }

    //     result[nextRarity] = value[rarity] * 3;

    //     // if (rarity !== Rarity.COMMON) {
    //     //     result = this.calculateCraftingRequirements(result[nextRarity], nextRarity);
    //     // }
    //     while (rarity !== Rarity.FODDER) {
    //         this.calculateCraftingRequirements(result, nextRarity);
    //     }

    //     return result;
    // }
}
