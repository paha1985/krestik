import styles from './app.module.css';
import { useState } from 'react';
import { Field } from './field';
import { Information } from './information';
import PropTypes from 'prop-types';

export const App = () => {
	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [isGameEnded, setIsGameEnded] = useState(false);
	const [isDraw, setIsDraw] = useState(false);
	const [field, setField] = useState(Array(9).fill(null));
	const [counter, setCounter] = useState(0);

	function krestik(cells) {
		const WIN_PATTERNS = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let i = 0; i < WIN_PATTERNS.length; i++) {
			const [a, b, c] = WIN_PATTERNS[i];
			if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
				setIsGameEnded(true);
			}
		}
		return null;
	}

	const cellClick = (index) => {
		const fieldCopy = [...field];
		if (isGameEnded || isDraw || fieldCopy[index]) return;
		fieldCopy[index] = currentPlayer;
		krestik(fieldCopy);
		setField(fieldCopy);
		setCounter(counter + 1);
		if (counter === 8) {
			setIsDraw(true);
		}
		currentPlayer === 'X' ? setCurrentPlayer('O') : setCurrentPlayer('X');
	};

	function clear() {
		setCurrentPlayer('X');
		setIsGameEnded(false);
		setIsDraw(false);
		setField(Array(9).fill(null));
		setCounter(0);
	}

	return (
		<AppLayout
			currentPlayer={currentPlayer}
			isGameEnded={isGameEnded}
			isDraw={isDraw}
			clear={clear}
			field={field}
			cellClick={cellClick}
		/>
	);
};

export const AppLayout = ({
	currentPlayer,
	isGameEnded,
	isDraw,
	clear,
	field,
	cellClick,
}) => {
	return (
		<div className={styles['wrapper']}>
			<Information player={currentPlayer} gameOver={isGameEnded} draw={isDraw} />
			<Field cells={field} click={cellClick} />
			<button className={styles['newGame']} onClick={() => clear()}>
				Начать заново
			</button>
		</div>
	);
};

AppLayout.propTypes = {
	currentPlayer: PropTypes.string,
	isGameEnded: PropTypes.bool,
	isDraw: PropTypes.bool,
	clear: PropTypes.func,
	field: PropTypes.array,
	cellClick: PropTypes.func,
};
