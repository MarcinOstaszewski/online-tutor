import React, { Component } from 'react';
import MainMenu from '../../containers/MainMenu/MainMenu'

import styles from './Main.module.css';

import { wordsAnimals1, wordsAnimals2, wordsAnimals3 } from '../../assets/wordLists/wordsAnimals';
import { wordsPostOffice } from '../../assets/wordLists/wordsPostOffice';
import { wordsFruitsNuts1, wordsFruitsNuts2, wordsFruitsNuts3 } from '../../assets/wordLists/wordsFruitsNuts';
import { wordsTrees1, wordsTrees2 } from '../../assets/wordLists/wordsTrees';

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

    wordListChosen = (txt) => {
        const chosenListName = 'words' + txt.replace(' ', '');
        const chosenList = this.wordsLists[chosenListName];
        const currentKeysArray = Object.keys(chosenList); // array with only keys
        this.setState({ 
            chosenListName: chosenListName,
            currentKeysArray: currentKeysArray,
        })
        this.getQuestionFromList(chosenList, currentKeysArray);
        this.setState({
            chosenListName: 'words' + txt.replace(' ', ''),
        })
    }

    checkAnswer = () => {
        const q = this.state.question;
        const givenAnswer = this.state.answerText;
        const a = this.state.answer;
        const currKeysArr = this.state.currentKeysArray;
        const currKey = currKeysArr[this.state.currKey];

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

    firstEnter = true;

    keyDownHandler = (e) => {
        if (e.key === 'Enter') {
            if (this.firstEnter) {
                console.log('First: ', this.firstEnter)
                this.checkAnswer();
                this.firstEnter = false;
            } else {
                if (this.state.currentKeysArray.length > 0) {
                    this.getQuestionFromList(this.wordsLists[this.state.chosenListName], this.state.currentKeysArray);
                } else {
                    this.setState({
                        chosenListName: '',
                        question: ''
                    })
                }
                this.firstEnter = true;
            }
        }
    }
    changeInputTextHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getQuestionFromList = (chosenList, currentKeysArray) => {
        const chosenListLocal = chosenList || this.state.chosenListName;
        const currentKeysArrayLocal = currentKeysArray || this.state.currentKeysArray;
        const rand = Math.floor(Math.random() * currentKeysArrayLocal.length);
        const chosenKey = currentKeysArrayLocal[rand];
        const question = chosenListLocal[chosenKey][this.state.chosenLanguageQuestion];
        const answer = chosenListLocal[chosenKey][this.state.chosenLanguageAnswer];
        this.setState({
            question: question,
            answer: answer,
            answerColor: 'black',
            currKey: rand
        })
        this.answerInput.focus();
    }

    componentDidUpdate = () => {
        console.log('updated!')
        console.log(this.state.chosenListName)
    }
    
    render() {
        const chosenListNameText = this.state.chosenListName === ""
            ? 'Wybierz listę słów z MENU' 
            : ('Wybrana lista: ');
        
        return (

            <div>
                <header>
					<MainMenu wordListClicked={this.wordListChosen}
                        wordsLists={this.wordsLists}
                    />
					<div className={styles.NavBar}>NAVBAR</div>
				</header>

                <main className={styles.Centered} >
                    <div className={styles.chosenListName}>{chosenListNameText}<b>{this.state.chosenListName.replace('words','')}</b></div>
                
                    <div className={styles.exampleText}>{this.state.exampleText}</div>
                    
                    <div className={styles.questionDiv}
                        style={{color: this.state.answerColor}}>{this.state.question}</div>

                    <input type="text" 
                        name="answerText"
                        ref={(input) => { this.answerInput = input; }} 
                        className={[styles.answerInput, (this.state.chosenListName !== '') ? "" : styles.invisible].join(' ','')}
                        onChange={this.changeInputTextHandler}
                        onKeyDown={this.keyDownHandler}
                        value={this.state.answerText} 
                        focus="true"
                        />
                </main>
            </div>
        )
    }
}

export default Main;