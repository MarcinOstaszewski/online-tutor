import React, {Component} from 'react'


import styles from './MainMenuList.module.css';

class MainMenuList extends Component {

    listChosen = (e) => {
        this.props.clickHandler(e.currentTarget.innerText);
        this.props.hideList();
    }

    render() {
        const listOfWordLists = (Object.keys(this.props.wordsLists))
            .map( elem => <li onClick={this.listChosen} key={elem}>{elem.replace('words','')}</li> )
            
        return (
            <ul className={[styles.MainMenuList, this.props.visible ? (styles.Visible) : (styles.inVisible)].join(' ')} >
                {listOfWordLists}
            </ul>
         );
    }
}
 
export default MainMenuList;