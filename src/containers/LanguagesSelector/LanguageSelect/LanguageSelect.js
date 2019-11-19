import React from 'react';
import LanguageItem from './LanguageItem/LanguageItem'

import styles from './LanguageSelect.module.css';

const LanguageSelect = (props) => {

    let langKeys = Object.keys(props.languages);
    let langItems = langKeys.map( key => {
        return <LanguageItem
            langName={props.languages[key]} 
            role={props.role}
            key={key}
            code={key}
            langClicked={props.languageClicked}
            />
    })
    
    return ( 
        <div className={styles.LanguageSelect}>
            {langItems}
        </div>
     );
}
 
export default LanguageSelect;
