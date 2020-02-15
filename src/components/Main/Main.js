import React, { Component } from 'react';
import axios from '../../axios-firebase';
import { Route, Switch, BrowserRouter, NavLink } from 'react-router-dom';
import { firebaseConfig } from '../Firebase/config';
import firebase from 'firebase/app';
import 'firebase/database';

// import Test from '../../containers/Test/Test';
import MainMenu from '../../containers/MainMenu/MainMenu';
import LanguagesSelector from '../../containers/LanguagesSelector/LanguagesSelector';
import styles from './Main.module.css';

class Main extends Component {
    constructor(props) {
        super(props);
        firebase.initializeApp(firebaseConfig);
        this.frbs = firebase.database();
        this.state = {
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
    }


    wordsLists = this.props.wordsLists;

    languages = {pol: "Polski", eng: "English", ger: "Deutsche", esp: "Español"}

    addWordsToList = () => { // listName = 'wordsWeekDays'
        // const name = "wordsAnimals_part2"
        // const sendIt = {
        //     'name': 'Animals part 2',
        //     'list': this.wordsLists[name]
        // }
        for (let i in this.wordsLists) {
            console.log(i)
            console.log(this.wordsLists[i].name)
            console.log(this.wordsLists[i].list)
            
            // if (i === 'wordsFruitsNuts_part3') {

                let sendIt = {
                    name: this.wordsLists[i].name,
                    list: this.wordsLists[i].list
                }
                
                axios.post('/wordsLists/'+ i + '.json', sendIt) // wordsLists.
                .then(resp=>{
                    console.log(resp)
                })
                .catch(err=>{
                    console.log(err)
                });
            // }
        }
    }

    getListFromFireBase = () => {
        // axios.get('https://online-tutor-words.firebaseio.com/wordsLists.json')
        //     .then(res => {
        //         for (let i in res.data) {
        //             console.log(res.data[i])
        //         }
        //     })
        //     .catch(err => console.log(err))
        const listsRef = this.frbs.ref('wordsLists/wordsHome/');
        listsRef.once('value').then(res => {
            let list = res.val();
            let content = Object.keys(list)
            list = list[content[0]];
            console.log(list.name, list.list)
        })
        // listsRef.child('wordsHome').once('value').then( res => {
        //     console.log(res)
        // })
    }

    writeToFireBase = () => {
        console.log(firebase)
        const testRef = this.frbs.ref('test/');
        testRef.set("333")
    }

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

    getQuestionFromList = (chosenList, currentKeysArray = this.state.currentKeysArray) => {
        const chosenListLocal = chosenList || this.state.chosenListName;
        const rand = Math.floor(Math.random() * currentKeysArray.length);
        const chosenKey = currentKeysArray[rand];
        const question = chosenListLocal[chosenKey][this.state.chosenLanguageQuestion];
        const answer = chosenListLocal[chosenKey][this.state.chosenLanguageAnswer];
        this.setState({
            question: question,
            answer: answer,
            answerColor: 'black',
            currKey: rand,
        })
        // this.answerInput.focus();
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
            : ('Lista: ');
        
        let LEDcolor = '';
        switch (this.state.answerColor) {
            case 'red': LEDcolor = styles.LEDcolorRed; break;
            case 'green': LEDcolor = styles.LEDcolorGreen; break;
            default:
        }

        let allRemaining = this.state.currentKeysArray.length
        let uniqueRemaining = (new Set(this.state.currentKeysArray)).size

        let wordsRemain = this.state.chosenListName === "" ? "" :
            <span className={styles.wordsRemain}>, Pozostało: <b>{uniqueRemaining}</b> słów, <b>{allRemaining}</b> powtórek</span>;

        return (
            // <FirebaseContext.Consumer>
                <div>
                    <header>
                        <MainMenu 
                            wordListClicked={this.wordListChosen}
                            wordsLists={this.wordsLists}
                            languages={this.languages} 
                            isActive={this.state.langsActive}
                        />
                        <BrowserRouter>
                            <NavLink to="/learn">Start to learn</NavLink>
                            <NavLink to="/lang">Languages Selector</NavLink>
                            <NavLink to="/lists">Choose a list</NavLink>
                        </BrowserRouter>
                    </header>

                    <main className={styles.Centered}> 

                        <Switch>
                            <Route path="/lang" 
                                render={() => { return <LanguagesSelector 
                                    languages={this.languages} 
                                    langChosenHandler={this.languageChosenHandler}
                                    isActive={this.state.langsActive} /> 
                                } }
                            />
                            <Route path="/learn"
                                render={() => { return (<div>
                                    <div className={styles.chosenListName}>
                                    {chosenListNameText}<b>{this.state.chosenListName.replace('words','').replace('_', ' ')}</b> 
                                    {wordsRemain}
                                    </div>

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
                                </div>)
                                }} />
                        </Switch>
                        {/* <button onClick={this.addWordsToList}>SEND</button> */}
                        <button onClick={this.getListFromFireBase}>GET</button>
                        <button onClick={this.writeToFireBase}>WRITE</button>
                        
                    </main>
                </div>
            // </FirebaseContext.Consumer>
        )
    }
}

export default Main;