import React, { Component } from 'react';
import styles from './Main.module.css';

import wordsPost from '../../assets/wordLists/wordsPost';
import wordsAnimals from '../../assets/wordLists/wordsAnimals';

class Main extends Component {
    state = {
        lastRandom: 0,
        random: 0,
        exampleText: '---',
        question: 'Wybierz listę słów poniżej',
        answerText: '',
        answerColor: 'black',
        listChosen: false,
        started: false,
    }

    listName = ''

    wordsLists = {
        wordsAnimals: wordsAnimals,
        wordsPost: wordsPost
    }
    
    getRandom = (max) => {
        return Math.floor(Math.random() * max);
    } 

    chooseQuestion = () => {
        return this.wordsLists[this.listName][this.state.random].q
    }

    checkAnswer = () => {
        let q = this.state.question;
        let inputA = this.state.answerText;
        let correctA = this.wordsLists[this.listName][this.state.lastRandom].a
        let correct = (this.state.answerText === correctA);
        if (correct) {
            this.setState({
                question: "DOBRZE! " + q + ' to po angielsku ' + inputA + '!',
                answerColor: 'green',
                started: false
            })
        } else {
            this.setState({
                question: "Niestety... " + q + ' to po angielsku ' + correctA + '!',
                answerColor: 'red',
                started: false
            })
        }
        return this.wordsLists[this.listName][this.state.lastRandom].a;
    }

    keyDownHandler = (e) => {
        if (e.key === 'Enter') {
            this.checkAnswer();
        }
    }
    changeAnswerHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateRnd = () => {
        let rand = this.state.random;
        this.setState({
            lastRandom: rand,
            random: this.getRandom(Object.keys(this.wordsLists[this.listName]).length)
        })
    }

    updateQuestion = () => {
        this.updateRnd();
        console.log(this.state.random);
        this.setState({
            question: this.chooseQuestion(),
            answerColor: 'black'
        })
    }

    startGame = () => {
        this.updateQuestion();
        this.setState({
            started: true,
            answerText: ''
        })
    }

    chooseWordList = (e) => {
        console.log(e.target.innerText);
        this.listName = 'words' + e.target.innerText;
        this.updateRnd();
        // this.startGame();
        this.setState({
            question: 'Naciśnij "Losuj słowo"',
            listChosen: true
        })
    }

    componentDidMount = () => {
        console.log(this.state.question)
    }
    
    render() {
        let button, buttonText;
        buttonText = this.state.listChosen ? 'Losuj słowo' : 'Wybierz listę poniżej';
        button = this.state.started ?
            <button className={[styles.button, styles.btnConfirm].join(' ')}
                onClick={this.checkAnswer}>Wpisz odpowiedź i sprawdź</button> :
            <button className={[styles.button, styles.btnStart].join(' ')}
                onClick={this.startGame}
                disabled={!this.state.listChosen}>{buttonText}</button>
        ;

        return (
            <main className={styles.Centered}>
                <div className={styles.exampleText}>{this.state.exampleText}</div>
                <div className={styles.questionDiv}
                    style={{color: this.state.answerColor}}>{this.state.question}</div>
                <input type="text" 
                    name="answerText"
                    className={styles.answerInput}
                    onChange={this.changeAnswerHandler}
                    onKeyDown={this.keyDownHandler}
                    value={this.state.answerText} 
                    />
                {button}

                <button className={[styles.button, styles.btnWords].join(' ')}
                    onClick={this.chooseWordList}>Animals</button>
                <button className={[styles.button, styles.btnWords].join(' ')}
                    onClick={this.chooseWordList}>Post</button>
            </main>
        )
    }
}

export default Main;