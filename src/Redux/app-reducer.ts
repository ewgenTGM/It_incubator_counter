import { useDispatch } from 'react-redux';
import { COUNTER_ACTION_TYPE, CounterActionType } from './actions';


// export const saveStateToLocalStorage = () => ( { type: COUNTER_ACTION_TYPE.SAVE_STATE_TO_LOCAL_STORAGE } );
// export const loadStateFromLocalStorage = ( state: AppStateType ) => ( {
//   type: COUNTER_ACTION_TYPE.LOAD_STATE_FROM_LOCAL_STORAGE,
//   state
// } );
//
// const saveStateToLocalStorage = ( state: AppStateType ): void => {
//   localStorage.setItem( 'app_state', JSON.stringify( state ) );
// };
// const loadStateFromLocalStorage = (): AppStateType | null => {
//   const item: string | null = localStorage.getItem( 'app_state' );
//   return item ? JSON.parse( item ) : null;
// };
// const clearStateInLocalStorage = (): void => {
//   localStorage.removeItem( 'app_state' );
// };

export type AppStateType = typeof initialState;

const initialState = {
  counter: 0,
  minValue: 0,
  maxValue: 10,
  globalMinValue: 0,
  globalMaxValue: 10,
  isFormBlocked: true,
  isSettersBlocked: false
};

export const counterReducer = ( state: AppStateType = initialState, action: CounterActionType ): AppStateType => {
  switch ( action.type ) {
    case COUNTER_ACTION_TYPE.INIT:
      return {
        ...state,
        ...action.payload,
        counter: action.payload.globalMinValue,
        minValue: action.payload.globalMinValue,
        maxValue: action.payload.globalMaxValue
      };
    case COUNTER_ACTION_TYPE.INC_COUNTER:
      return { ...state, counter: state.counter + 1 };
    case COUNTER_ACTION_TYPE.INC_MIN_VALUE:
      return { ...state, minValue: state.minValue + 1 };
    case COUNTER_ACTION_TYPE.DEC_MIN_VALUE:
      return { ...state, minValue: state.minValue - 1 };
    case COUNTER_ACTION_TYPE.INC_MAX_VALUE:
      return { ...state, maxValue: state.maxValue + 1 };
    case COUNTER_ACTION_TYPE.DEC_MAX_VALUE:
      return { ...state, maxValue: state.maxValue - 1 };
    case COUNTER_ACTION_TYPE.RESET_COUNTER:
      return { ...state, counter: state.minValue };
    case COUNTER_ACTION_TYPE.SET_IS_FORM_BLOCKED:
      return { ...state, ...action.payload };
    case COUNTER_ACTION_TYPE.SET_IS_SETTERS_BLOCKED:
      return { ...state, ...action.payload };
      // case SAVE_STATE_TO_LOCAL_STORAGE:
      //   saveStateToLocalStorage( state );
      //   return state;
      // case LOAD_STATE_FROM_LOCAL_STORAGE:
      //   return { ...action.state };
    default:
      return state;
  }
};

export const TypedDispatch = () => {
  const dispatch = useDispatch();
  return ( action: CounterActionType ) => {
    dispatch( action );
  };
};