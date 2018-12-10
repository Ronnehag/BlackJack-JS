
class PlayingDeck {
    constructor() {
        this.deck = new Array();
        this.resetDeck();
        this.shuffle();
    }

    shuffle() {
        let counter = this.deck.length;
        while (counter > 0) {
            let index = Math.floor(Math.random() * counter--);

            let tmp = this.deck[counter];
            this.deck[counter] = this.deck[index];
            this.deck[index] = tmp;
        }
        return this;
    }
    
    deal() {
        return this.deck.pop();
    }

    resetDeck() {
        let deck = [];
        const suits = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
        const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
        for (let suit in suits) {
            for (let value in values) {
                let card = {
                    suit: suits[suit],
                    value: values[value],
                    toString() {
                        return `${this.value}_of_${this.suit.toLowerCase()}`; 
                        // ex) 2_of_Diamonds, will be used to set the img src.
                    },
                    weight() {
                        switch (this.value) {
                            case "J":
                            case "Q":
                            case "K":
                                return 10;
                            case "A":
                                return [1, 11];
                            default:
                                return this.value;
                        }
                    }
                };
                deck.push(card);
                this.deck = deck;
            }
        }
    }
}