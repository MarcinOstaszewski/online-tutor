import React, { Component } from 'react';
import MainMenuList from '../MainMenuList/MainMenuList';

import styles from './MainMenu.module.css';


class MainMenu extends Component {
    state = {
        isListVisible: false,
    }


    MenuClickHandler = (e) => {
        let vis = this.state.isListVisible;

        this.setState({
            isListVisible: !vis
        })
    }

    render() {
        console.log('MainMenu: ' + this.state.isListVisible)
        return ( 
            <div>
                <div className={[styles.MainMenu, this.state.isListVisible ? styles.active : '' ].join(' ')}
                    onClick={this.MenuClickHandler}
                >MENU</div>
                <MainMenuList visible={this.state.isListVisible} />
            </div> 
        );
    }
}
 
export default MainMenu;