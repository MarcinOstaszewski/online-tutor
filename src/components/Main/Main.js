import React, { Component } from 'react';
import { wordsPostOffice } from '../../assets/wordLists/wordsPostOffice';
import { wordsAnimals1, wordsAnimals2, wordsAnimals3 } from '../../assets/wordLists/wordsAnimals';

import styles from './Main.module.css';

class Main extends Component {
    state = {
        chosenListName: '',
        lastRandom: 0,
        currKey: 0,
        exampleText: '',
        question: '',
        answer: '',
        currentKeysArray: [],
        answerText: '',
        answerColor: 'black',
        listChosen: false,
    }

    wordsLists = {
        wordsAnimals1: wordsAnimals1,
        wordsAnimals2: wordsAnimals2,
        wordsAnimals3: wordsAnimals3,
        wordsPostOffice: wordsPostOffice
    }

    checkAnswer = () => {
        let q = this.state.question;
        let givenAnswer = this.state.answerText;
        let a = this.state.answer;
        let currKeysArr = this.state.currentKeysArray;
        let currKey = currKeysArr[this.state.currKey];

        if (a === givenAnswer) {
            if (currKeysArr.length > 1) {
                currKeysArr.splice(this.state.currKey, 1);
                this.setState({
                    question: "DOBRZE! " + q + ' to po angielsku ' + givenAnswer + '!',
                    answerColor: 'green',
                    answerText: '',
                    currentKeysArray: currKeysArr
                })
            } else {
                this.setState({
                    question: "WSPANIALE, poznałeś wszystkie słowa z listy!!!",
                    answerColor: 'blue',
                    answerText: '',

                })
            }
        } else {
            currKeysArr.push(currKey)
            this.setState({
                question: "Niestety... " + q + ' to po angielsku ' + a + '!',
                answerColor: 'red',
                answerText: '',
                currentKeysArray: currKeysArr
            })
        }
        this.answerInput.focus()
    }

    firstTimeEnter = true;

    keyDownHandler = (e) => {
        if (e.key === 'Enter') {
            if (this.firstTimeEnter) {
                console.log('First: ', this.firstTimeEnter)
                this.checkAnswer();
                this.firstTimeEnter = false;
            } else {
                console.log('Second: ', this.firstTimeEnter, this.state.chosenListName)
                this.getQuestionFromList(this.wordsLists[this.state.chosenListName], this.state.currentKeysArray);
                this.firstTimeEnter = true;
            }
        }
    }
    changeInputTextHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getQuestionFromList = (chosenList, currentKeysArray) => {
        console.log("cKA :" + currentKeysArray)
        let chosenListLocal = chosenList || this.state.chosenListName;
        let currentKeysArrayLocal = currentKeysArray || this.state.currentKeysArray;
        let rand = Math.floor(Math.random() * currentKeysArrayLocal.length);
        let chosenKey = currentKeysArrayLocal[rand];
        let question = chosenListLocal[chosenKey].q;
        let answer = chosenListLocal[chosenKey].a;
        this.setState({
            question: question,
            answer: answer,
            answerColor: 'black',
            currKey: rand,
        })
        this.answerInput.focus();
        // console.log(this.state.currentKeysArray)
    }

    componentDidUpdate = (oldprops) => {
        const newProps = this.props;
        if (oldprops.chosenListName !== newProps.chosenListName) {
            let chosenList = this.wordsLists[this.props.chosenListName];
            let currentKeysArray = Object.keys(chosenList); // array with all question/answer keys
            this.setState({ 
                chosenListName: this.props.chosenListName,
                currentKeysArray: currentKeysArray,
                listChosen: true
            })
            this.getQuestionFromList(chosenList, currentKeysArray);
        }
        this.answerInput.focus()
    }
    
    render() {
        let chosenListNameText = this.state.chosenListName === ""
            ? 'Wybierz listę słów z MENU' 
            : ('Wybrana lista: ');
        
        return (
            <main className={styles.Centered} >
                <div className={styles.chosenListName}>{chosenListNameText}<b>{this.state.chosenListName}</b></div>
                
                <div className={styles.exampleText}>{this.state.exampleText}</div>
                
                <div className={styles.questionDiv}
                    style={{color: this.state.answerColor}}>{this.state.question}</div>

                <input type="text" 
                    name="answerText"
                    ref={(input) => { this.answerInput = input; }} 
                    className={[styles.answerInput, this.state.listChosen ? "" : styles.invisible].join(' ','')}
                    onChange={this.changeInputTextHandler}
                    onKeyDown={this.keyDownHandler}
                    value={this.state.answerText} 
                    focus="true"
                    />
            </main>
        )
    }
}

export default Main;