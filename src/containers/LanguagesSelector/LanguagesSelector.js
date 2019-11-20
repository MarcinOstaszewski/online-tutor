import React from 'react'
import LanguageSelect from './LanguageSelect/LanguageSelect';

import styles from './LanguagesSelector.module.css';

const LanguagesSelector = (props) => {
    
    return ( 
        <div className={styles.Centered}>
            <LanguageSelect 
                languageClicked={props.langChosenHandler} 
                languages={props.languages}
                isActive={props.isActive}
                role="q" 
                />
            <div className={styles.Divider}> => </div>
            <LanguageSelect  
                languageClicked={props.langChosenHandler} 
                languages={props.languages}
                isActive={props.isActive}
                role="a" 
                />
        </div>
     );
}
 
export default LanguagesSelector;