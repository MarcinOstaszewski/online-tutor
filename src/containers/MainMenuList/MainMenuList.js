import React, {Component} from 'react'

import styles from './MainMenuList.module.css';

class MainMenuList extends Component {

    render() {
        let MainListClass = this.props.visible ? (styles.Visible) : (styles.inVisible);

        console.log('List: ' + this.props.visible)

        return (
            <ul className={[styles.MainMenuList, MainListClass].join(' ')} >
                <li>Animals1</li>
                <li>Animals2</li>
                <li>Animals3</li>
                <li>Post Ofice</li>
            </ul>
         );
    }
}
 
export default MainMenuList;