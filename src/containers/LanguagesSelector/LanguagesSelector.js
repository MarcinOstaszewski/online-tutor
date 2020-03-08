import React from 'react'
import LanguageSelect from './LanguageSelect/LanguageSelect';

import styles from './LanguagesSelector.module.css';

const LanguagesSelector = (props) => {
    
    return ( 
        <div className={styles.Selector}>
            <div className={styles.from}>
                <p>From language:</p>
                <LanguageSelect 
                    languageClicked={props.langChosenHandler} 
                    languages={props.languages}
                    isActive={props.isActive}
                    role="q" 
                />
            </div>
            <div className={styles.to}>
                <p>Translation to:</p>
                <LanguageSelect  
                    languageClicked={props.langChosenHandler} 
                    languages={props.languages}
                    isActive={props.isActive}
                    role="a" 
                />
            </div>
        </div>
     );
}
 
export default LanguagesSelector;