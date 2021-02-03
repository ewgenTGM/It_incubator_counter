import React from 'react';
import styles from './MyButton.module.css';

type MyButtonPropsType = {
  labelText: string
  onClickCallback: () => void
  isDisabled: boolean
}

const MyButton = (props: MyButtonPropsType) => {
  const classes: string = `${styles.btn} ` + (props.isDisabled ? styles.disabled : styles.enabled);
  return (
      <button
          className={classes}
          onClick={props.onClickCallback}
          disabled={props.isDisabled}>{props.labelText}</button>
  );
};

export default MyButton;