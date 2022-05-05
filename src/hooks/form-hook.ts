import { useCallback, useReducer } from "react";

export enum FORM_ACTION_TYPES {
  INPUT_CHANGE = "INPUT_CHANGE",
  SET_DATA = "SET_DATA",
}

export type Inputs = {
  [key: string]: {
    value: any;
    isValid: boolean;
  };
};

export type FormReducerState = {
  inputs: Inputs;
};

export type InputChangeAction = {
  type: FORM_ACTION_TYPES.INPUT_CHANGE;
  value: any;
  inputId: string;
  isValid: boolean;
};

export type SetDataAction = {
  type: FORM_ACTION_TYPES.SET_DATA;
  inputs: Inputs;
  formIsValid: boolean;
};

export type FormReducerAction = InputChangeAction | SetDataAction;

const formReducer = (state: FormReducerState, action: FormReducerAction) => {
  switch (action.type) {
    case FORM_ACTION_TYPES.INPUT_CHANGE: {
      let formIsValid = true;

      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }

        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    }

    case FORM_ACTION_TYPES.SET_DATA: {
      return {
        inputs: action.inputs,
        isValid: action.formIsValid,
      };
    }

    default:
      return state;
  }
};

export const useForm = (
  initialInputs: Inputs,
  initialFormValidity: boolean
) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  // no dependency means run only first time rendering
  const inputHandler = useCallback(
    (id: string, value: any, isValid: boolean) => {
      dispatch({
        type: FORM_ACTION_TYPES.INPUT_CHANGE,
        value,
        inputId: id,
        isValid,
      });
    },
    []
  );

  const setFormData = useCallback(
    (inputData: Inputs, formValidity: boolean) => {
      dispatch({
        type: FORM_ACTION_TYPES.SET_DATA,
        inputs: inputData,
        formIsValid: formValidity,
      });
    },
    []
  );

  return [formState, inputHandler, setFormData];
};
