import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BottomNavService } from 'src/app/components/bottom-nav/bottom-nav.service';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
    selector: 'wc-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public form: FormGroup;

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

    public getDailyRotation() {
        const weaponDrops = [
            { item: 'decarabian', altName: 'plate', weekdays: ['monday', 'thursday'] },
            { item: 'guyun', altName: 'pillar', weekdays: ['monday', 'thursday'] },
            { item: 'boreal wolf', altName: 'wolf tooth', weekdays: ['tuesday', 'friday'] },
            { item: 'mist veiled', altName: 'balls', weekdays: ['tuesday', 'friday'] },
            { item: 'dandelion', altName: 'cuffs', weekdays: ['wednesday', 'saturday'] },
            { item: 'aerosiderite', altName: 'stone', weekdays: ['wednesday', 'saturday'] },
        ];
        const talentDrops = [
            { item: 'freedom', characters: ['Amber', 'Barbara', 'Sucrose', 'Klee', 'Tartaglia', 'Diona'], weekdays: ['monday', 'thursday'] },
            { item: 'prosperity', characters: ['Ningguang', 'Qiqi', 'Keqing', 'Xiao*', 'Rosaria*'], weekdays: ['monday', 'thursday'] },
            { item: 'resistance', characters: ['Noelle', 'Bennet', 'Diluc', 'Jean', 'Mona', 'Razor'], weekdays: ['tuesday', 'friday'] },
            { item: 'diligence', characters: ['Xiangling', 'Chongyun', 'Ganyu*', 'Ayaka*'], weekdays: ['tuesday', 'friday'] },
            { item: 'ballad', characters: ['Fischl', 'Kaeya', 'Lisa', 'Venti', 'Albedo*'], weekdays: ['wednesday', 'saturday'] },
            { item: 'gold', characters: ['Beidou', 'Xingqiu', 'Xinyan', 'Zhongli'], weekdays: ['wednesday', 'saturday'] },
        ]

        const today = this.form.get('weekday').value;
        if (today === 'sunday') {
            return {
                weaponDrops, talentDrops
            }
        } else {
            return {
                weaponDrops: weaponDrops.filter(drop => drop.weekdays.includes(today)),
                talentDrops: talentDrops.filter(drop => drop.weekdays.includes(today))
            }
        }
    }
    public updateWeekday(weekday: string) {
        console.log(weekday)
    }

    private initForm(): void {
        this.form = this.fb.group({
            weekday: ['monday']
        });

        this.form.get('weekday').valueChanges.subscribe((day: string) => {
            this.updateWeekday(day);
        });
    }

}
