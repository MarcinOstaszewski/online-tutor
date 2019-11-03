import React from 'react';
import './App.css';

function App() {
return (
	<div className="App">

		<header className="NavBar">
			<p>NAVBAR</p>
		</header>
		
		<main>
			<div className="center">
				<div className="example"></div>
				<div className="question">QUESTION</div>
				<input type="text" className="answer"></input>
				<button className="button-confirm">OK</button>
			</div>
		</main>

		<footer></footer>
		
	</div>
);
}

export default App;
