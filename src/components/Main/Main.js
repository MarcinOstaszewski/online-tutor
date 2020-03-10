import React, { Component } from 'react';
import { Route, Switch, BrowserRouter, NavLink } from 'react-router-dom';
import { firebaseConfig } from '../Firebase/config';
import firebase from 'firebase/app';
import 'firebase/database';

import ChooseList from '../../containers/ChooseList/ChooseList'
import LanguagesSelector from '../../containers/LanguagesSelector/LanguagesSelector';
import Learning from './../../containers/Learning/Learning'

import styles from './Main.module.css';

class Main extends Component {
    constructor(props) {
        super(props);
        firebase.initializeApp(firebaseConfig);
        this.frbs = firebase.database();
        this.state = {
            chosenListName: '',
            lastRandom: 0,
            currKey: 0,
            langsActive: ["qpol", "aeng"],
            placeholder: "wpisz odpowiedź"
        }
    }

    languages = {pol: "Polski", eng: "English", ger: "Deutsche", esp: "Español"}

    listChosenHandler = name => {
        this.frbs.ref('lists/').child(name).once('value').then(res=> {
            let list = res.val().list;
            this.setState({
                chosenListName: name,
                chosenListContent: list,
                currentKeysArray: Object.keys(list)
            })
        })
    }

    languageChosenHandler = e => {
        console.log(e.target.id)
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

    makeNavLink = (num, big, small, bottom, iconName, moving) => {
        let mov = moving ? styles[moving] : '';
        let icon = iconName ? <i className={[mov, iconName].join(' ')}></i>: '';
        return <div className='navlink'>
            <span><sup>{num}</sup> {big}</span><span>{small}</span><div>{bottom} {icon}</div>
        </div>
    }
    
    render() {

        let listName = 'not chosen yet...';
        let iconName = 'fas fa-chevron-left';
        let isMoving = 'moving';
        if (this.state.chosenListName !== '') {
            iconName = 'fas fa-check';
            isMoving = '';
            listName = this.state.chosenListName;
        }
        let navLangsNames = '';
        if (this.state.langsActive.length > 1) {
            navLangsNames = <span>from: <b>{this.languages[this.state.langsActive[0].slice(1)]}</b> to: <b>{this.languages[this.state.langsActive[1].slice(1)]}</b></span>
            console.log(navLangsNames)
        }

        return (
            // <FirebaseContext.Consumer>
                <div>
                    <BrowserRouter className="rerer">
                        <header>
                            <NavLink to="/choose">{this.makeNavLink('1.', 'Choose', 'a list of words', listName, iconName, isMoving)}</NavLink>
                            <NavLink to="/select">{this.makeNavLink('2.', 'Select', 'languages', navLangsNames)}</NavLink>
                            <NavLink to="/learn">{this.makeNavLink('3.', 'Start', 'learning')}</NavLink>
                        </header>

                        <main className={styles.Centere____d}> 
                            <Switch>
                                <Route path="/choose" 
                                    render={() => { return <ChooseList 
                                        listChosenHandler={this.listChosenHandler}
                                        chosenListName={this.state.chosenListName} 
                                        /> 
                                    } }
                                />
                                <Route path="/select" 
                                    render={() => { return <LanguagesSelector 
                                        languages={this.languages} 
                                        langChosenHandler={this.languageChosenHandler}
                                        isActive={this.state.langsActive} /> 
                                    } }
                                />
                                <Route path="/learn" 
                                    render={() => { return <Learning 
                                        chosenListName={this.state.chosenListName}
                                        chosenListContent={this.state.chosenListContent}
                                        currentKeysArray={this.state.currentKeysArray}
                                        langsActive={this.state.langsActive}
                                        languages={this.languages}
                                        />
                                    }} 
                                />
                            </Switch>
                        </main>
                    </BrowserRouter>
                </div>
            // </FirebaseContext.Consumer>
        )
    }
}

export default Main;