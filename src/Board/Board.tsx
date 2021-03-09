import React, { VFC } from 'react';
import styles from './Board.module.css';

type PropsType = {
  text: string
  isDanger: boolean
}

export const Board: VFC<PropsType> = props => {
  const { isDanger, text } = props;
  const classes: string = `${ styles.board } ` + ( isDanger ? styles.danger : '' );
  return (
      <div className={ classes }>
        <span>ТЕК СЧ: { text }</span>
      </div>
  );
};