import React, {Component} from 'react'


import styles from './MainMenuList.module.css';

class MainMenuList extends Component {

    listChosen = (e) => {
        this.props.clickHandler(e);
        this.props.hideList(e);
    }

    render() {

        return (
            <ul className={[styles.MainMenuList, this.props.visible ? (styles.Visible) : (styles.inVisible)].join(' ')} >
                <li onClick={this.listChosen}>Animals1</li>
                <li onClick={this.listChosen}>Animals2</li>
                <li onClick={this.listChosen}>Animals3</li>
                <li onClick={this.listChosen}>Post Office</li>
            </ul>
         );
    }
}
 
export default MainMenuList;