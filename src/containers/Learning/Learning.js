import React, {Component} from 'react';

import styles from './Learning.module.css'

class Learning extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            chosenLanguageQuestion: props.langsActive[0].slice(1),
            chosenLanguageAnswer: props.langsActive[1].slice(1),
            chosenListName: props.chosenListName,
            chosenListContent: props.chosenListContent,
            answerColor: 'black',
            exampleText: '',
            question: '',
            answer: '',
            answerText: '',
            currentKeysArray: props.currentKeysArray,
        }
    }

    getQuestionFromList = () => {
        const localList = this.state.chosenListContent;
        const rand = Math.floor(Math.random() * this.state.currentKeysArray.length);
        const chosenKey = this.state.currentKeysArray[rand];
        const question = localList[chosenKey][this.state.chosenLanguageQuestion];
        const answer = localList[chosenKey][this.state.chosenLanguageAnswer];
        this.setState({
            question: question,
            answer: answer,
            answerColor: 'black',
            currKey: rand,
        })
        this.answerInput.focus();
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
                // question = `${q} ==> ${a}!`
                question = <span>{q} <i class="fas fa-arrows-alt-h"></i> {a}</span>;
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
                // question: `${q} ==> ${a}!`,
                question: <span>{q} <i class="fas fa-exchange-alt"></i> {a}</span>,
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
                this.checkAnswer();
                this.firstEnter = false;
                this.setState({
                    placeholder: 'naciśnij Enter'
                })
            } else {
                if (this.state.currentKeysArray.length > 0) {
                    this.getQuestionFromList(this.state.chosenListContent, this.state.currentKeysArray);
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

    componentDidMount = () => {
        console.log(this.state.chosenListName)
        if (this.state.chosenListName !== "") {
            this.getQuestionFromList(this.state.chosenListName, this.state.chosenListContent)
        }
    }

    render() { 

        const chosenListNameText = (this.state.chosenListName === "")
            ? <div><div>Before you start:</div><div>1. Chose a list of words,</div><div>2. Select languages: <b>from</b> and <b>to</b>.</div></div>
            : <span>Active list: </span>;
        
        let allRemaining, uniqueRemaining, LEDcolor = '', questionBlock;

        switch (this.state.answerColor) {
            case 'red': LEDcolor = styles.LEDcolorRed; break;
            case 'green': LEDcolor = styles.LEDcolorGreen; break;
            default:
        }
        if (this.state.currentKeysArray) {
            allRemaining = this.state.currentKeysArray.length
            uniqueRemaining = (new Set(this.state.currentKeysArray)).size
        }

        let wordsRemain = this.state.chosenListName === "" ? "" :
            <span className={styles.wordsRemain}><b>{uniqueRemaining}</b> words to learn, <b>{allRemaining}</b> repetitions</span>;

        console.log(this.state.chosenLanguageQuestion, this.state.chosenLanguageAnswer)
        if (this.state.question) {
            questionBlock = <div className={styles.questionDiv}
                                style={{color: this.state.answerColor}}>
                                
                                <div className={styles.questionAnswer}>
                                    <div>
                                        <div className={[styles.questionLED, LEDcolor].join(' ')}></div>
                                        <b>{this.state.question}</b>
                                        <div className={[styles.questionLED, LEDcolor].join(' ')}></div>
                                    </div>
                                    <div className={styles.textSmall}>translate from:<strong>&nbsp;{this.props.languages[this.state.chosenLanguageQuestion]}</strong>
                                    &nbsp;to:<strong>&nbsp;{this.props.languages[this.state.chosenLanguageAnswer]}</strong></div>
                                </div>
                                
                            </div>
        }

        
        return (
            <div>
                <div className={styles.chosenListName}>
                <div>{chosenListNameText}<strong>{this.props.chosenListName.replace('words','').replace('_', ' ')}</strong></div>
                <div className={styles.textSmall}>{wordsRemain}</div>
                </div>

                {questionBlock}

                <input type="text" 
                    name="answerText"
                    ref={(input) => { this.answerInput = input; }}  // only for getting focus
                    className={[styles.answerInput, (this.state.chosenListName !== '') ? "" : styles.invisible].join(' ','')}
                    onChange={this.changeInputTextHandler}
                    onKeyDown={this.keyDownHandler}
                    value={this.state.answerText} 
                    focus="true"
                    placeholder={this.state.placeholder}
                    />
            </div>
        );
    }
}
 
export default Learning;