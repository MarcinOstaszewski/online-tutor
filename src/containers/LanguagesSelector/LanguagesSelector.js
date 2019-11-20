import React from 'react'
import LanguageSelect from './LanguageSelect/LanguageSelect';

import styles from './LanguagesSelector.module.css';

const LanguagesSelector = (props) => {
    
    // console.log(props.isActive)


    return ( 
        <div >
            <div className={styles.LangInfo}>
                <div>Język ojczysty:</div>
                <div>Foreign language:</div>
            </div>
            <div className={styles.Selector}>
                <LanguageSelect 
                    languageClicked={props.langChosenHandler} 
                    languages={props.languages}
                    isActive={props.isActive}
                    role="q" 
                    />
                <div className={styles.Divider}> >>> </div>
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