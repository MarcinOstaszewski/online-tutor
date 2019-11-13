import React from 'react'
import LanguageSelect from '../LanguageSelect/LanguageSelect';

import styles from './LanguagesSelector.module.css';

const LanguagesSelector = (props) => {

    return ( 
        <div>
            <LanguageSelect 
                className={styles.LanguageSelect}
                languageClicked={this.props.langChosenHandler} 
                role="question"/>
            <LanguageSelect 
                className={styles.LanguageSelect} 
                languageClicked={this.props.langChosenHandler} 
                role="answer"/>
        </div>
     );
}
 
export default LanguagesSelector;