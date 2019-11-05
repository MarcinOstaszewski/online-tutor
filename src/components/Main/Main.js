import React, { Component } from 'react';
import styles from './Main.module.css';

import words_post from '../../assets/wordLists/wordsPost';

class Main extends Component {
    state = {
        random: 0,
        answerText: ''
    }

    list = words_post; // later it will fetch lists from DB

    rand = (max) => Math.floor(Math.random() * max);

    chooseQuestion = () => {
        console.log(this.list[this.state.random].q)

        return this.list[this.state.random].q
    }

    checkAnswer = () => {
        return this.list[this.state.random].a
    }

    changeAnswerHandler = (event) => {
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentDidMount = () => {
        this.setState({
            random: this.rand( Object.keys(this.list).length )
        })
        this.chooseQuestion();
    }
    
    render() {
        return (
            <main className={styles.Centered}>
                <div className={styles.exampleText}>example text</div>
                <div className={styles.question}></div>
                <input type="text" 
                    name="answerText"
                    className={styles.answer}
                    onChange={this.changeAnswerHandler}
                    value={this.state.answerText}></input>
                <button className={styles.buttonConfirm}
                    onClick={this.checkAnswer}>Sprawdź</button>
                {/* <button className={styles.buttonStart}
                    onClick={this.checkAnswer}>START</button> */}
            </main>
        )
    }
}

export default Main;