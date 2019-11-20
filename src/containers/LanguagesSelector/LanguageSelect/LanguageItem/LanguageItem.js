import React from 'react'

import styles from './LanguageItem.module.css';

const LanguageItem = (props) => {

    let isActive;
    if (props.isActive.includes(props.role+props.code)) {
        isActive = styles.Active;
    }

    return ( <div className={[styles.LanguageItem, isActive].join(' ')}
                onClick={props.langClicked}
                role={props.role}
                code={props.code}
                id={props.role+props.code}
                >{props.langName}</div> 
            );
}
 
export default LanguageItem;