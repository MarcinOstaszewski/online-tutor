import React, { Component } from 'react';
import { wordsAnimals1, wordsAnimals2, wordsAnimals3 } from '../../assets/wordLists/wordsAnimals';
import { wordsPostOffice } from '../../assets/wordLists/wordsPostOffice';
import { wordsFruitsNuts1, wordsFruitsNuts2, wordsFruitsNuts3 } from '../../assets/wordLists/wordsFruitsNuts';
import { wordsTrees1, wordsTrees2 } from '../../assets/wordLists/wordsTrees';

import styles from './Main.module.css';

class Main extends Component {
    state = {
        chosenListName: '',
        chosenLanguageQuestion: 'pol',
        chosenLanguageAnswer: 'eng',
        lastRandom: 0,
        currKey: 0,
        exampleText: '',
        question: '',
        answer: '',
        answerText: '',
        answerColor: 'black',
        currentKeysArray: [],
                    listChosen: false
    }

    wordsLists = {
        wordsAnimals1: wordsAnimals1,
        wordsAnimals2: wordsAnimals2,
        wordsAnimals3: wordsAnimals3,
        wordsPostOffice: wordsPostOffice,
        wordsFruitsNuts1: wordsFruitsNuts1,
        wordsFruitsNuts2: wordsFruitsNuts2,
        wordsFruitsNuts3: wordsFruitsNuts3,
        wordsTrees1: wordsTrees1,
        wordsTrees2: wordsTrees2,
    }

    checkAnswer = () => {
        let q = this.state.question;
        let givenAnswer = this.state.answerText;
        let a = this.state.answer;
        let currKeysArr = this.state.currentKeysArray;
        let currKey = currKeysArr[this.state.currKey];

        if (a === givenAnswer) {
            currKeysArr.splice(this.state.currKey, 1);
            let question, ansColor;
            if (currKeysArr.length > 0) {
                question = "DOBRZE! " + q + ' to po angielsku ' + givenAnswer + '!';
                ansColor = 'green';
            } else {
                question = "WSPANIALE, poznałeś wszystkie słowa z listy!!!";
                ansColor = 'blue';
            }
            this.setState({
                question: question,
                answerColor: ansColor,
                answerText: '',
                currentKeysArray: currKeysArr
            })
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
                // console.log('Second: ', this.firstTimeEnter, this.state.currentKeysArray)

                if (this.state.currentKeysArray.length > 0) {
                    this.getQuestionFromList(this.wordsLists[this.state.chosenListName], this.state.currentKeysArray);
                } else {
                    this.setState({
                        listChosen: false,
                        chosenListName: '',
                        question: ''
                    })
                }
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
        // console.log("cKA :" + currentKeysArray)
        let chosenListLocal = chosenList || this.state.chosenListName;
        let currentKeysArrayLocal = currentKeysArray || this.state.currentKeysArray;
        let rand = Math.floor(Math.random() * currentKeysArrayLocal.length);
        let chosenKey = currentKeysArrayLocal[rand];
        let question = chosenListLocal[chosenKey][this.state.chosenLanguageQuestion];
        let answer = chosenListLocal[chosenKey][this.state.chosenLanguageAnswer];
        this.setState({
            question: question,
            answer: answer,
            answerColor: 'black',
            currKey: rand
        })
        this.answerInput.focus();
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
        // console.log(this.state.chosenListName)
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