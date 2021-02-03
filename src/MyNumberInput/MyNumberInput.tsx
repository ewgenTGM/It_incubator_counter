import React, { FC } from 'react';
import styles from './MyNumberInput.module.css';

type MyNumberInputPropsType = {
  minValue: number
  maxValue: number
  onChange: ( value: string ) => void
  error?: boolean
}

const MyNumberInput: FC<MyNumberInputPropsType> = ( props ) => {
  return (
      <div className={ styles.MyNumberInput }>
        <input
            className={ styles.number_input }
            type="number"
            min={ props.minValue }
            max={ props.maxValue }
            onChange={ event => props.onChange( event.currentTarget.value ) }/>
      </div>
  );
};

export default MyNumberInput;