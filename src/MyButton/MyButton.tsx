import React, { VFC } from 'react';
import styles from './MyButton.module.css';

type PropsType = {
  labelText: string
  onClickCallback: () => void
  isDisabled: boolean
}

export const MyButton: VFC<PropsType> = ( { labelText, isDisabled, onClickCallback } ) => {
  const classes: string = `${ styles.btn } ` + ( isDisabled ? styles.disabled : styles.enabled );
  return (
      <button
          className={ classes }
          onClick={ onClickCallback }
          disabled={ isDisabled }>{ labelText }</button>
  );
};