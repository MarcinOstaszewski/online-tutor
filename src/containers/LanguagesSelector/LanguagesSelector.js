import React from 'react'
import LanguageSelect from './LanguageSelect/LanguageSelect';

import styles from './LanguagesSelector.module.css';

const LanguagesSelector = (props) => {
    
    return ( 
        <div className={styles.Centered}>
            <LanguageSelect 
                languageClicked={props.langChosenHandler} 
                languages={props.languages}
                role="q" />
            <div>=></div>
            <LanguageSelect  
                languageClicked={props.langChosenHandler} 
                languages={props.languages}
                role="a" />
        </div>
     );
}
 
export default LanguagesSelector;