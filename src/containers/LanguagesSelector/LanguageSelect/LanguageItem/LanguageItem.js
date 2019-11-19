import React from 'react'

import styles from './LanguageItem.module.css';

const LanguageItem = (props) => {

    return ( <div className={styles.LanguageItem}
                onClick={props.langClicked}
                // role={props.role}
                // code={props.code}
                id={props.role+props.code}
                >{props.langName}</div> );
}
 
export default LanguageItem;