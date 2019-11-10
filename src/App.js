import React, {Component} from 'react';
import Main from './components/Main/Main'
import MainMenu from './containers/MainMenu/MainMenu'
import styles from './App.module.css';

class App extends Component {
	state = {
		chosenListName: ''
	}
	
	wordListChosen = (e) => {
		this.setState({
			chosenListName: 'words' + e.currentTarget.innerText.replace(' ','')
		})
	}

	render(){

		return (
			<div className="App">
				<header>
					<MainMenu wordListClicked={this.wordListChosen}/>
					<div className={styles.NavBar}>NAVBAR</div>
				</header>
				
				<Main chosenListName={this.state.chosenListName}/>

				<footer>Online-Tutor by MarcinO</footer>

			</div>
		);
	}
}

export default App;
