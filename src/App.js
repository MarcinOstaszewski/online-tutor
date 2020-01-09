import React, {Component} from 'react';
import Main from './components/Main/Main';

import { wordsAnimals_part1, wordsAnimals_part2, wordsAnimals_part3 } from './assets/wordLists/wordsAnimals';
import { wordsPostOffice } from './assets/wordLists/wordsPostOffice';
import { wordsPeople } from './assets/wordLists/wordsPeople';
import { wordsWeekDays } from './assets/wordLists/wordsWeekDays';
import { wordsFruitsNuts_part1, wordsFruitsNuts_part2, wordsFruitsNuts_part3 } from './assets/wordLists/wordsFruitsNuts';
import { wordsTrees_part1, wordsTrees_part2 } from './assets/wordLists/wordsTrees';
import { wordsBathroom, wordsHome, wordsHousehold, wordsKitchen, wordsRelations} from './assets/wordLists/wordsHouse';

// import './App.module.css';

class App extends Component {

	wordsLists = {
		wordsPostOffice: wordsPostOffice,
		wordsPeople: wordsPeople,
		wordsWeekDays: wordsWeekDays,
		wordsBathroom: wordsBathroom,
		wordsHome: wordsHome,
		wordsHousehold: wordsHousehold,
		wordsKitchen: wordsKitchen,
		wordsRelations: wordsRelations,
		wordsAnimals_part1: wordsAnimals_part1,
		wordsAnimals_part2: wordsAnimals_part2,
		wordsAnimals_part3: wordsAnimals_part3,
		wordsFruitsNuts_part1: wordsFruitsNuts_part1,
		wordsFruitsNuts_part2: wordsFruitsNuts_part2,
		wordsFruitsNuts_part3: wordsFruitsNuts_part3,
		wordsTrees_part1: wordsTrees_part1,
		wordsTrees_part2: wordsTrees_part2,
	}

	render(){

		return (
			<div className="App">

				<Main wordsLists={this.wordsLists}/>

				<footer>Online-Tutor by MarcinO</footer>

			</div>
		);
	}
}

export default App;
