import React, { Component } from 'react';

import firebase from 'firebase/app';
import 'firebase/database';
// import DBMaintenance from '../../components/Firebase/DBMaintenance'

import styles from './ChooseList.module.css';

class ChooseList extends Component {
    constructor(props) {
        super(props) ;
        this.state = { 
            namesOfWordsLists: [],
            listActive: this.props.listActive
        }
        this.frbs = firebase.database();
        this.listsRef = this.frbs.ref('wordsLists/');
        this.namesRef = this.frbs.ref('listNames/')
    }

    replaceBad = text => {
        return text.replace(/( |\(|\))/g, '');
    }
    
    displayListNames = data => {
        if (Object.keys(data).length > 0) {
            let list = []
            Object.keys(data).forEach(name => {
                let active = '';
                if (name === this.state.listActive) { active = styles.active }
                let elem =  <div key={name} className={active}>
                    <div id={this.replaceBad(name)} onClick={this.getListByName} data-count={data[name]} >{name}</div>
                    <span>{data[name]} elements</span>
                    </div>
                list.push(elem)
            })
            return list
        } else {
            return 'Loading data, please wait...'
        }

    }

    getAllListNames = () => {
        this.namesRef.once('value').then(res => {
            let data = res.val();
            this.setState({namesOfWordsLists: data})
        })
    }

    getListByName = (e) => {
        let txt = e.target.innerText
        this.setState({listActive: txt})
        this.props.listChosenHandler(txt)
    }
    
    componentDidMount() {        
        this.getAllListNames();
    }

    render() { 
        
        const list = this.displayListNames(this.state.namesOfWordsLists)

        return ( 
            <div>
                {/* <DBMaintenance/> */}
                <p className={styles.header}>Choose a list to learn:</p>
                <div className={styles.list}>{list}</div> 
            </div>
        )
    }
}
 
export default ChooseList;