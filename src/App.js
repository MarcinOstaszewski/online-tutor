import React from 'react';
import Main from './components/Main/Main'
import styles from './App.module.css';

const App = () => {

	return (
		<div className="App">

			<header>
				<div className={styles.NavBar}>-NAVBAR-</div>
			</header>
			
			<Main />

			<footer>Online-Tutor by MarcinO</footer>

		</div>
	);
}

export default App;
