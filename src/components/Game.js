import React, { Component } from 'react'
import slika1 from '../images/card-1.jpeg'
import slika2 from '../images/card-2.jpeg'
import slika3 from '../images/card-3.jpeg'
import slika4 from '../images/card-4.jpeg'
import slika5 from '../images/card-5.jpeg'
import slika6 from '../images/card-6.jpeg'


export default class Game extends Component {
    constructor(props){
        super(props);

        this.state = {
            score: 0,
            tries: 5,
            cards: [
                { id: 1, path: '../images/card-1.jpeg',  img: slika1, isVisible: false},
                { id: 2, path: '../images/card-2.jpeg',  img: slika2, isVisible: false},
                { id: 3, path: '../images/card-3.jpeg',  img: slika3, isVisible: false},
                { id: 4, path: '../images/card-4.jpeg',  img: slika4, isVisible: false},
                { id: 5, path: '../images/card-5.jpeg',  img: slika5, isVisible: false},
                { id: 6, path: '../images/card-6.jpeg',  img: slika6, isVisible: false},
                { id: 7, path: '../images/card-1.jpeg',  img: slika1, isVisible: false},
                { id: 8, path: '../images/card-2.jpeg',  img: slika2, isVisible: false},
                { id: 9, path: '../images/card-3.jpeg',  img: slika3, isVisible: false},
                { id: 10, path: '../images/card-4.jpeg',  img: slika4, isVisible: false},
                { id: 11, path: '../images/card-5.jpeg',  img: slika5, isVisible: false},
                { id: 12, path: '../images/card-6.jpeg',  img: slika6, isVisible: false},
            ],
            selectedCards: [],
            isChecked: false,
            tryAgain: true
        }
    }

    decreaseTries(){
        let { tries } = this.state;
        if(tries === 1){
            console.log('kraj');
        }

        this.setState({ tries: tries - 1});
    }

    generateCards(){
        let { cards } = this.state;
        console.log(cards);
        return cards.map((card) => (
            <div onClick={() => this.handleCardClick(card)} style={{margin: 5, border: '1px solid black', height: 130, width: 100, minWidth: 100, textAlign: 'center'}}>
                {(card.isVisible  || this.isSelectedCard(card.id) )
                 && 
                    <img src={card.img} style={{height: 130, width: 100}}/>
                }
            </div>
        ))
    }

    isSelectedCard(id){
        let { selectedCards } = this.state;
        if(!selectedCards) return false;

        for (let i = 0; i < selectedCards.length; i++) {
            if(selectedCards[i].id === id) {
                return true;
            }
        }
        return false;
    }

    isMatch(){
        let {selectedCards, cards, tries, score} = this.state;
        if(!selectedCards || selectedCards.length < 2) 
            return false;
        
        if(selectedCards.length === 2 && selectedCards[0].path === selectedCards[1].path){
            let newCards = [];
            for (let i = 0; i < cards.length; i++) {
                let card = cards[i];
                if(card.id === selectedCards[0].id || card.id === selectedCards[1].id)
                    card.isVisible = true;

                newCards.push(card)
            }
            this.setState({cards: newCards, selectedCards: [], score: score + 1});

            if(score === 5){
                this.setState({tryAgain: true})
            }

        }else {
            if(tries === 1){
                this.setState({tryAgain: true})
            }
            this.decreaseTries();
        }

    }

    async handleCardClick(newSelectedCard){
        let { selectedCards, tries } = this.state;

        if(selectedCards && selectedCards === 2 )
            await this.setState({ selectedCards: []});

        if(selectedCards && selectedCards.length === 1)
            await this.setState({ selectedCards: [selectedCards[0],newSelectedCard]});
        else
            await this.setState({ selectedCards: [newSelectedCard]});

        this.isMatch();

    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        while (0 !== currentIndex) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        
        for (let i = 0; i < array.length; i++) {
            array[i].isVisible = false;            
        }

        return array;
    }
      
    startNewGame = async () => {
        let { cards } = this.state;
        let newArray = this.shuffle(cards);

        await this.setState({
            cards: newArray,
            score: 0,
            tries: 5,
            tryAgain: false,
            selectedCards: []
        });
    }

    getRandomCards(){
        let { cards } = this.state;
    }

    render() {
        let cardsJSX = this.generateCards();
        let {tryAgain, tries, score} = this.state;
        let isStart = tries === 5 && score === 0;

        return (
            <div>
                <div style={{height: 55, backgroundColor: '#eeeeee', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <span>Pokusaji: {tries}</span>
                    <span style={{paddingLeft: 20}}>Skor: {score}</span>
                </div>
                {!isStart && tryAgain && <h2 style={{ textAlign: 'center'}}>{score === 6 ? 'Pobeda' : 'Poraz'}</h2>}
                <div className="content" style={{marginTop: 100, display:'flex', justifyContent: 'center', alignItems: 'center'}}> 
                    {tryAgain ?
                        <div style={{width: 200, height: 150, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <button onClick={this.startNewGame} style={{padding: 7, width: 120, borderRadius: 10, backgroundColor: 'green', color: '#fff'}}>
                               { isStart ? 'Igraj' : 'Igraj ponovo'}
                            </button>
                        </div>
                    :
                    <div style={{width: 500, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                        {cardsJSX}
                    </div>}
                </div>
            </div>
        )
    }
}
