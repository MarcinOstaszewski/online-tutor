import React, { Component } from 'react';
import MainMenu from '../../containers/MainMenu/MainMenu';
import LanguagesSelector from '../../containers/LanguagesSelector/LanguagesSelector';

import styles from './Main.module.css';

import { wordsAnimals_part1, wordsAnimals_part2, wordsAnimals_part3 } from '../../assets/wordLists/wordsAnimals';
import { wordsPostOffice } from '../../assets/wordLists/wordsPostOffice';
import { wordsPeople } from '../../assets/wordLists/wordsPeople';
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
        langsActive: ["qpol", "aeng"],
        placeholder: "wpisz odpowiedź"
    }

    wordsLists = {
        wordsAnimals_part1: wordsAnimals_part1,
        wordsAnimals_part2: wordsAnimals_part2,
        wordsAnimals_part3: wordsAnimals_part3,
        wordsPostOffice: wordsPostOffice,
        wordsPeople: wordsPeople,
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
                question = `${q} ==> ${a}!`
                ansColor = 'green';
            } else {
                question = "WSPANIALE, poznałeś wszystkie słowa z listy!!!";
                ansColor = 'blue';
            }
            this.setState({
                question: question,
                answerColor: ansColor,
                answerText: '',
                currentKeysArray: currKeysArr,
                placeholder: 'naciśnij Enter'
            })
        } else {
            currKeysArr.push(currKey)
            this.setState({
                question: `${q} ==> ${a}!`,
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
                this.setState({
                    placeholder: 'naciśnij Enter'
                })
            } else {
                if (this.state.currentKeysArray.length > 0) {
                    this.getQuestionFromList(this.wordsLists[this.state.chosenListName], this.state.currentKeysArray);
                    this.setState({
                        placeholder: 'wpisz odpowiedź'
                    })
                } else {
                    this.setState({
                        chosenListName: '',
                        question: '',
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
            currKey: rand,
        })
        this.answerInput.focus();
    }

    languageChosenHandler = e => {
        let currLangs = this.state.langsActive;
        let clicked = e.target.id;
        let dir = clicked.slice(0,1);
        let lang = clicked.slice(1);
        if (dir === "q") {
            currLangs.shift();
            currLangs.unshift(clicked);
        } else {
            currLangs.pop();
            currLangs.push(clicked);
        }
        dir === "q" ? this.setState({
            chosenLanguageQuestion: lang,
            langsActive: currLangs
        }) : this.setState({
            chosenLanguageAnswer: lang,
            langsActive: currLangs
        })
    }

    // componentDidUpdate = () => {
    //     console.log(this.state.langsActive)
    // }
    
    render() {
        const chosenListNameText = this.state.chosenListName === ""
            ? 'Wybierz języki oraz listę słów z Menu'
            : ('Wybrana lista: ');
        
        let LEDcolor = '';
        switch (this.state.answerColor) {
            case 'red': LEDcolor = styles.LEDcolorRed; break;
            case 'green': LEDcolor = styles.LEDcolorGreen; break;
            default:
        }

        return (

            <div>
                <header>
					<MainMenu 
                        wordListClicked={this.wordListChosen}
                        wordsLists={this.wordsLists}
                        languages={this.languages} 
                        isActive={this.state.langsActive}
                        />
				</header>

                <main className={styles.Centered} >

                    <LanguagesSelector 
                        languages={this.languages} 
                        langChosenHandler={this.languageChosenHandler}
                        isActive={this.state.langsActive}
                        />

                    <div className={styles.chosenListName}>{chosenListNameText}<b>{this.state.chosenListName.replace('words','')}</b></div>
                
                    {/* <div className={styles.exampleText}>{this.state.exampleText}</div> */}


                    <div className={styles.questionDiv}
                        style={{color: this.state.answerColor}}>
                        <div className={[styles.questionLED, LEDcolor].join(' ')}></div>
                        {this.state.question}
                        <div className={[styles.questionLED, LEDcolor].join(' ')}></div>
                    </div>

                    <input type="text" 
                        name="answerText"
                        ref={(input) => { this.answerInput = input; }} 
                        className={[styles.answerInput, (this.state.chosenListName !== '') ? "" : styles.invisible].join(' ','')}
                        onChange={this.changeInputTextHandler}
                        onKeyDown={this.keyDownHandler}
                        value={this.state.answerText} 
                        focus="true"
                        placeholder={this.state.placeholder}
                        />
                </main>
            </div>
        )
    }
}

export default Main;