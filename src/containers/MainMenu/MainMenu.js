import React, { Component } from 'react';
import MainMenuList from '../MainMenuList/MainMenuList';

import styles from './MainMenu.module.css';


class MainMenu extends Component {
    state = {
        isListVisible: false,
    }
    
    
    MenuClickHandler = () => {
        let vis = this.state.isListVisible;
        this.setState({
            isListVisible: !vis
        })
    }

    render() {
        return ( 
            <div>
                <div className={[styles.MainMenu, this.state.isListVisible ? styles.active : '' ].join(' ')}
                    onClick={this.MenuClickHandler}
                >MENU</div>
                <MainMenuList 
                    visible={this.state.isListVisible} 
                    clickHandler={this.props.wordListClicked}
                    hideList={this.MenuClickHandler}
                    wordsLists={this.props.wordsLists}
                />
            </div> 
        );
    }
}
 
export default MainMenu;