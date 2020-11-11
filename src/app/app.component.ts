import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'wish-counter';
  public wishesToRare = 10;
  public wishesToEpic = 90;
  private wishes = [];

  ngOnInit(): void {
    const savedWishes = JSON.parse(localStorage.getItem('wishes')) || [];
    this.wishes = savedWishes;

    this.wishes.forEach(wish => {
      this.addWish(wish.rarity, false);
    });
  }

  public addWish(rarity: number, fromUser: boolean = true): void {
    switch (rarity) {
      case 5:
        this.wishesToEpic = 90;
        this.wishesToRare = 10;

        if (fromUser) this.wishes.push({ rarity: 5 });
        break;
      case 4:
        this.wishesToEpic--;
        this.wishesToRare = 10;
        if (fromUser) this.wishes.push({ rarity: 4 });
        break;
      default:
        this.wishesToRare--;
        this.wishesToEpic--;
        if (fromUser) this.wishes.push({ rarity: 3 });
    }

    if (fromUser) {
      localStorage.setItem('wishes', JSON.stringify(this.wishes));
    }
  }
}
