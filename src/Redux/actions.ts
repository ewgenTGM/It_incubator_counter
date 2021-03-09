export enum COUNTER_ACTION_TYPE {
  INC_COUNTER = 'INC_COUNTER',
  INC_MIN_VALUE = 'INC_MIN_VALUE',
  DEC_MIN_VALUE = 'DEC_MIN_VALUE',
  INC_MAX_VALUE = 'INC_MAX_VALUE',
  DEC_MAX_VALUE = 'DEC_MAX_VALUE',
  RESET_COUNTER = 'RESET_COUNTER',
  SET_IS_FORM_BLOCKED = 'SET_IS_FORM_BLOCKED',
  SET_IS_SETTERS_BLOCKED = 'SET_IS_SETTERS_BLOCKED',
  INIT = 'INIT',
  // SAVE_STATE_TO_LOCAL_STORAGE = 'SAVE_STATE_TO_LOCAL_STORAGE',
  // LOAD_STATE_FROM_LOCAL_STORAGE = 'LOAD_STATE_FROM_LOCAL_STORAGE',
}

// Action type

type IncCounterActionType = { type: COUNTER_ACTION_TYPE.INC_COUNTER };
export const incCounter = (): IncCounterActionType => ( { type: COUNTER_ACTION_TYPE.INC_COUNTER } );

type IncMinValueActionType = { type: COUNTER_ACTION_TYPE.INC_MIN_VALUE };
export const incMinValue = (): IncMinValueActionType => ( { type: COUNTER_ACTION_TYPE.INC_MIN_VALUE } );

type DecMinValueActionType = { type: COUNTER_ACTION_TYPE.DEC_MIN_VALUE };
export const decMinValue = (): DecMinValueActionType => ( { type: COUNTER_ACTION_TYPE.DEC_MIN_VALUE } );

type IncMaxValueActionType = { type: COUNTER_ACTION_TYPE.INC_MAX_VALUE };
export const incMaxValue = (): IncMaxValueActionType => ( { type: COUNTER_ACTION_TYPE.INC_MAX_VALUE } );

type DecMaxValueActionType = { type: COUNTER_ACTION_TYPE.DEC_MAX_VALUE };
export const decMaxValue = (): DecMaxValueActionType => ( { type: COUNTER_ACTION_TYPE.DEC_MAX_VALUE } );

type ResetCounterActionType = { type: COUNTER_ACTION_TYPE.RESET_COUNTER };
export const resetCounter = (): ResetCounterActionType => ( { type: COUNTER_ACTION_TYPE.RESET_COUNTER } );

type SetIsFormBlockedActionType = {
  type: COUNTER_ACTION_TYPE.SET_IS_FORM_BLOCKED
  payload: { isFormBlocked: boolean }
}
export const setIsFormBlocked = ( isBlocked: boolean ): SetIsFormBlockedActionType => ( {
  type: COUNTER_ACTION_TYPE.SET_IS_FORM_BLOCKED,
  payload: { isFormBlocked: isBlocked }
} );

type SetIsSettersBlockedActionType = {
  type: COUNTER_ACTION_TYPE.SET_IS_SETTERS_BLOCKED
  payload: { isSettersBlocked: boolean }
}
export const setIsSettersBlocked = ( isBlocked: boolean ): SetIsSettersBlockedActionType => ( {
  type: COUNTER_ACTION_TYPE.SET_IS_SETTERS_BLOCKED,
  payload: { isSettersBlocked: isBlocked }
} );

type InitActionType = {
  type: COUNTER_ACTION_TYPE.INIT,
  payload: {
    globalMinValue: number
    globalMaxValue: number
  }
}
export const init = ( globalMinValue: number, globalMaxValue: number ): InitActionType => ( {
  type: COUNTER_ACTION_TYPE.INIT,
  payload: {
    globalMinValue,
    globalMaxValue
  }
} );

export type CounterActionType = IncCounterActionType |
    IncMinValueActionType |
    DecMinValueActionType |
    IncMaxValueActionType |
    DecMaxValueActionType |
    ResetCounterActionType |
    SetIsFormBlockedActionType |
    SetIsSettersBlockedActionType |
    InitActionType