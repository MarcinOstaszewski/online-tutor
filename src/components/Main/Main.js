import React, { Component } from 'react';
import styles from './Main.module.css';

import words_post from '../../assets/wordLists/wordsPost';

class Main extends Component {
    state = {
        lastRandom: 0,
        random: 0,
        exampleText: '---',
        question: 'Naciśnij "Losuj słowo"',
        answerText: '',
        started: false
    }
    
    list = words_post; // later it will fetch lists from DB

    rnd = (max) => {
        return Math.floor(Math.random() * max);
    } 

    chooseQuestion = () => {
        return this.list[this.state.random].q
    }

    checkAnswer = () => {
        let correct = (this.state.answerText === this.list[this.state.lastRandom].a);
        console.log(correct);
        let q = this.state.question;
        let a = this.state.answerText;
        this.setState({
            question: "DOBRZE -- " + q + ' to po angielsku ' + a + '!',
            started: false
        })
        return this.list[this.state.lastRandom].a;
    }

    changeAnswerHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    updateRnd = () => {
        let rnd = this.state.random;
        this.setState({
            lastRandom: rnd,
            random: this.rnd(  Object.keys(this.list).length  )
        })
    }

    updateQuestion = () => {
        this.updateRnd();
        console.log(this.state.random);
        this.setState({
            question: this.chooseQuestion()
        })
    }

    startGame = () => {
        this.updateQuestion();
        this.setState({
            started: true,
            answerText: ''
        })
    }

    componentDidMount = () => {
        this.updateRnd();
        console.log(this.state.question)
    }
    
    render() {
        let button;
        this.state.started ? 
            button = <button className={[styles.button, styles.btnConfirm].join(' ')}
                onClick={this.checkAnswer}>Sprawdź</button> :
            button = <button className={[styles.button, styles.btnStart].join(' ')}
                onClick={this.startGame}>Losuj słowo</button>
        ;

        return (
            <main className={styles.Centered}>
                <div className={styles.exampleText}>{this.state.exampleText}</div>
                <div className={styles.questionDiv}>{this.state.question}</div>
                <input type="text" 
                    name="answerText"
                    className={styles.answerInput}
                    onChange={this.changeAnswerHandler}
                    value={this.state.answerText} />
                {button}
            </main>
        )
    }
}

export default Main;