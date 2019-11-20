import React, { Component } from 'react';
import MainMenu from '../../containers/MainMenu/MainMenu';
import LanguagesSelector from '../../containers/LanguagesSelector/LanguagesSelector';

import styles from './Main.module.css';

import { wordsAnimals_part1, wordsAnimals_part2, wordsAnimals_part3 } from '../../assets/wordLists/wordsAnimals';
import { wordsPostOffice } from '../../assets/wordLists/wordsPostOffice';
import { wordsFruitsNuts_part1, wordsFruitsNuts_part2, wordsFruitsNuts_part3 } from '../../assets/wordLists/wordsFruitsNuts';
import { wordsTrees_part1, wordsTrees_part2 } from '../../assets/wordLists/wordsTrees';

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
        langsActive: "qpol",
    }

    wordsLists = {
        wordsAnimals_part1: wordsAnimals_part1,
        wordsAnimals_part2: wordsAnimals_part2,
        wordsAnimals_part3: wordsAnimals_part3,
        wordsPostOffice: wordsPostOffice,
        wordsFruitsNuts_part1: wordsFruitsNuts_part1,
        wordsFruitsNuts_part2: wordsFruitsNuts_part2,
        wordsFruitsNuts_part3: wordsFruitsNuts_part3,
        wordsTrees_part1: wordsTrees_part1,
        wordsTrees_part2: wordsTrees_part2,
    }

    languages = {pol: "Polski", eng: "English", ger: "Deutsche", esp: "Español"}

    wordListChosen = txt => {
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

    partAnsw = {
        pol: " to po ",
        eng: " is in ",
        ger: " ist IM ",
        esp: " es UN "
    }

    checkAnswer = () => {
        const q = this.state.question;
        const givenAnswer = this.state.answerText;
        const a = this.state.answer;
        const currKeysArr = this.state.currentKeysArray;
        const currKey = currKeysArr[this.state.currKey];
        const part1 = this.partAnsw[this.state.chosenLanguageQuestion]

        if (a === givenAnswer) {
            currKeysArr.splice(this.state.currKey, 1);
            let question, ansColor;
            if (currKeysArr.length > 0) {
                question = "DOBRZE! " + q + part1 + 'angielsku ' + givenAnswer + '!';
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
                question: "Niestety... " + q + part1 + 'angielsku ' + a + '!',
                answerColor: 'red',
                answerText: '',
                currentKeysArray: currKeysArr
            })
        }
        this.answerInput.focus()
    }

    firstEnter = true;

    keyDownHandler = e => {
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
    changeInputTextHandler = e => {
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

    languageChosenHandler = e => {
        let clicked = e.target.id;
        let dir = clicked.slice(0,1);
        let lang = clicked.slice(1);
        dir === "q" ? this.setState({
            chosenLanguageQuestion: lang,
            langsActive: clicked
        }) : this.setState({
            chosenLanguageAnswer: lang,
            langsActive: clicked
        })
    }
    
    

    // componentDidUpdate = () => {
    //     console.log(this.state.langsActive)
    // }
    
    render() {
        const chosenListNameText = this.state.chosenListName === ""
            ? 'Wybierz listę słów z MENU' 
            : ('Wybrana lista: ');
        
        return (

            <div>
                <header>
					<MainMenu 
                        wordListClicked={this.wordListChosen}
                        wordsLists={this.wordsLists}
                        />
				</header>

                <main className={styles.Centered} >
                    <div className={styles.chosenListName}>{chosenListNameText}<b>{this.state.chosenListName.replace('words','')}</b></div>
                
                    {/* <div className={styles.exampleText}>{this.state.exampleText}</div> */}

                    <LanguagesSelector 
                        languages={this.languages} 
                        langChosenHandler={this.languageChosenHandler}
                        isActive={this.state.langsActive}
                        />

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