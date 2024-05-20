import styles from './information.module.css';
import React from 'react';
import PropTypes from 'prop-types';

export const Information = (props) => {
	return (
		<InformationLayout
			player={props.player}
			gameOver={props.gameOver}
			draw={props.draw}
		/>
	);
};

export const InformationLayout = ({ player, gameOver, draw }) => {
	return (
		<div className={styles['info']}>
			{gameOver
				? 'Победил игрок ' + (player === 'X' ? 'O' : 'X')
				: draw
					? 'Ничья'
					: 'Ход игрока ' + player}
		</div>
	);
};

Information.propTypes = {
	player: PropTypes.string,
	gameOver: PropTypes.bool,
	draw: PropTypes.bool,
};
