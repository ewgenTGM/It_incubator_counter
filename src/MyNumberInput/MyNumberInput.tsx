import React, { FC } from 'react';
import styles from './MyNumberInput.module.css';

type MyNumberInputPropsType = {
  value: number
  onValueChange: ( value: number ) => void
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
            onClick={ () => props.onValueChange( props.value - 1 ) }>
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
            onClick={ () => props.onValueChange( props.value + 1 ) }>
          +
        </button>
      </div>
  );
};

export default MyNumberInput;