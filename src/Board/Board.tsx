import React from 'react';
import styles from './Board.module.css';

type BoardPropsType = {
  text: string
  isDanger: boolean
}

const Board = (props: BoardPropsType) => {
  const classes: string = `${styles.board} ` + (props.isDanger ? styles.danger : '');
  return (
      <div className={classes}>
        <span>ТЕК СЧ: {props.text}</span>
      </div>
  );
};

export default Board;