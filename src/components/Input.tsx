import {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  useEffect,
  useReducer,
} from "react";
import { FormInputHandler } from "../hooks/form-hook";
import { validate, Validator } from "../util/validators";
import "./Input.css";

export enum BUTTON_ACTION_TYPES {
  CHANGE = "CHANGE",
  TOUCH = "TOUCH",
}

export type FormInputValue = string;

export type InputState = {
  value: FormInputValue;
  isTouched: boolean;
  isValid: boolean;
};

export type InputChangeAction = {
  type: BUTTON_ACTION_TYPES.CHANGE;
  val: FormInputValue;
  validators: Validator[];
};

export type InputTouchAction = {
  type: BUTTON_ACTION_TYPES.TOUCH;
};

export type InputAction = InputChangeAction | InputTouchAction;

const inputReducer = (state: InputState, action: InputAction) => {
  switch (action.type) {
    case BUTTON_ACTION_TYPES.CHANGE: {
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    }

    case BUTTON_ACTION_TYPES.TOUCH: {
      return {
        ...state,
        isTouched: true,
      };
    }

    default:
      return state;
  }
};

export enum INPUT_ELEMENT_TYPES {
  INPUT = "INPUT",
  TEXTAREA = "TEXTAREA",
}

type InputBaseProps = {
  id: string;
  placeholder?: string;
  label: string;
  errorText: string;
  initialValue?: string;
  initialIsValid?: boolean;
  onInput: FormInputHandler;
  validators: Validator[];
};

type InputUniqueProps = InputBaseProps & {
  element: INPUT_ELEMENT_TYPES.INPUT;
  type: string;
};

type TextareaUniqueProps = InputBaseProps & {
  element: INPUT_ELEMENT_TYPES.TEXTAREA;
  rows?: number;
};

type InputProps = InputUniqueProps | TextareaUniqueProps;

const Input: FC<InputProps> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialIsValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    dispatch({
      type: BUTTON_ACTION_TYPES.CHANGE,
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler: FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = () => {
    dispatch({ type: BUTTON_ACTION_TYPES.TOUCH });
  };

  const element =
    props.element === INPUT_ELEMENT_TYPES.INPUT ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
