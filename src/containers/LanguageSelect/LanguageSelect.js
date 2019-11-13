import React from 'react';

import styles from './LanguageSelect.module.css';

const LanguageSelect = () => {
    return ( 
        <div className={styles.LanguageSelect}>
            <div>Polski</div>
            <div>English</div>
            <div>Deutsche</div>
            <div>Español</div>
        </div>
     );
}
 
export default LanguageSelect;