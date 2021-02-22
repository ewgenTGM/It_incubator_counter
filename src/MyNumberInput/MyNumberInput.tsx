import React, { FC } from 'react';
import styles from './MyNumberInput.module.css';

type MyNumberInputPropsType = {
  value: number
  onIncrement: () => void
  onDecrement: () => void
  error?: boolean
  incDisabled?: boolean
  decDisabled?: boolean
}

const MyNumberInput: FC<MyNumberInputPropsType> = ( props ) => {
  return (
      <div className={ styles.MyNumberInput }>
        <button
            className={ styles.btn }
            disabled={ props.decDisabled }
            onClick={ props.onDecrement }>
          -
        </button>
        <input
            className={ styles.number_input }
            type="text"
            readOnly={ true }
            value={ props.value }/>
        <button
            className={ styles.btn }
            disabled={ props.incDisabled }
            onClick={ props.onIncrement }>
          +
        </button>
      </div>
  );
};

export default MyNumberInput;