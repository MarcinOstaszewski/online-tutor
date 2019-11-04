import React, { Component } from 'react';
import styles from './Main.module.css'

class Main extends Component {
    state = {

    }
    
    render() {
        return (
            <main className={styles.Centered}>
                <div className={styles.exampleText}>example text</div>
                <div className={styles.question}>przetłumacz</div>
                <input type="text" className={styles.answer}></input>
                <button className={styles.buttonConfirm}>Sprawdź    </button>
            </main>
        )
    }
}

export default Main;