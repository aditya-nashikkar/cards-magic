import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  cardsPack = [];
  selectedCards = [];
  selectedCardsPack = [];
  firstRow = [];
  secondRow = [];
  thirdRow = [];
  start: number;
  end: number;
  userInput: number;
  static round: number = 0; 
  disBtn: boolean;
  directions = 
    [
      'There are 21 cards on the screen divided into three columns.',
      'Think of any card from those 21 cards.',
      'Now click on the column where you see your card.',
      'On clicking the column, cards will reshuffle.',
      'Now again see where your is and click that column.',
      'Repeat the step one more time.',
      'On clicking the third time. The number you thought will pop-up on the screen.'
    ];

  constructor() { }

  ngOnInit() {
    this.getCardsPack();
    this.getTwentyOneRandomCards();
    this.setSelectedCards();
    this.distributeInThree();
    document.getElementById('direction-modal').click();
  }

  getCardsPack() {
    for(let i=1; i<=13; i++) {
      this.cardsPack.push({
        number: i,
        type: '&spades;',
        color: '#252525'
      });
    }
    for(let i=1; i<=13; i++) {
      this.cardsPack.push({
        number: i,
        type: '&hearts;',
        color: '#e44145'
      });
    }
    for(let i=1; i<=13; i++) {
      this.cardsPack.push({
        number: i,
        type: '&diams;',
        color: '#e44145'
      });
    }
    for(let i=1; i<=13; i++) {
      this.cardsPack.push({
        number: i,
        type: '&clubs;',
        color: '#252525'
      });
    }
  }

  getTwentyOneRandomCards() {
    while(this.selectedCards.length < 21){
      let r = Math.floor((Math.random()*51) + 1);
      if(this.selectedCards.indexOf(r) === -1) 
        this.selectedCards.push(r);
    }
  }

  setSelectedCards() {
    for(let i=0; i<21; i++) {
      this.selectedCardsPack[i] = this.cardsPack[this.selectedCards[i]];
    }
  }

  distributeInThree() {
    let count = 0;
    for(let i=0; i<7; i++) {
      this.firstRow[count] = this.selectedCardsPack[i];
      count++;
    }
    count = 0;
    for(let i=7; i<14; i++) {
      this.secondRow[count] = this.selectedCardsPack[i];
      count++;
    }
    count = 0;
    for(let i=14; i<21; i++) {
      this.thirdRow[count] = this.selectedCardsPack[i];
      count++;
    }
  }

  splitCards() {
    let counter1 = 0;
    let counter2 = 0;
    let counter3 = 0;
    for(let i=0; i<21; i++) {
      if(i%3 == 0) {
        this.firstRow[counter1] = this.selectedCardsPack[i];
        counter1++;
      } else if(i%3 == 1) {
        this.secondRow[counter2] = this.selectedCardsPack[i];
        counter2++;
      } else if(i%3 == 2) {
        this.thirdRow[counter3] = this.selectedCardsPack[i];
        counter3++;
      }      
    }
  }

  sendChoice(i: number) {
    CardsComponent.round = CardsComponent.round + 1;
    if(CardsComponent.round <= 3) {
      if(CardsComponent.round <= 3) {
        this.rearrangeDeck(i);
        this.splitCards();
      } 

      if(CardsComponent.round  === 3) {
        this.disBtn = true; 
        document.getElementById('result-modal').click();
      }
    }
  }

  rearrangeDeck(i) {
    if(i == 1) {
      for(let i=0; i<7; i++) {
        this.selectedCardsPack[i] = this.thirdRow[i];
      }
      for(let i=7; i<14; i++) {
        this.selectedCardsPack[i] = this.firstRow[i-7];
      }
      for(let i=14; i<21; i++) {
        this.selectedCardsPack[i] = this.secondRow[i-14];
      }
    } else if(i == 2) {
      for(let i=0; i<7; i++) {
        this.selectedCardsPack[i] = this.thirdRow[i];
      }
      for(let i=7; i<14; i++) {
        this.selectedCardsPack[i] = this.secondRow[i-7];
      }
      for(let i=14; i<21; i++) {
        this.selectedCardsPack[i] = this.firstRow[i-14];
      }
    } else if(i == 3) {
      for(let i=0; i<7; i++) {
        this.selectedCardsPack[i] = this.secondRow[i];
      }
      for(let i=7; i<14; i++) {
        this.selectedCardsPack[i] = this.thirdRow[i-7];
      }
      for(let i=14; i<21; i++) {
        this.selectedCardsPack[i] = this.firstRow[i-14];
      }
    }
  }

  pageRefresh(): void {
    location.reload();
  }

}
