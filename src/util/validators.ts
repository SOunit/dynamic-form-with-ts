import { FormInputValue } from "../components/Input";

export enum VALIDATOR_TYPES {
  VALIDATOR_TYPE_REQUIRE = "REQUIRE",
  VALIDATOR_TYPE_FILE = "FILE",
  VALIDATOR_TYPE_MIN_LENGTH = "MIN_LENGTH",
  VALIDATOR_TYPE_MAX_LENGTH = "MAX_LENGTH",
  VALIDATOR_TYPE_MIN = "MIN",
  VALIDATOR_TYPE_MAX = "MAX",
  VALIDATOR_TYPE_EMAIL = "EMAIL",
}

export type VALIDATOR_REQUIRE_TYPE = {
  type: VALIDATOR_TYPES.VALIDATOR_TYPE_REQUIRE;
};
export type VALIDATOR_FILE_TYPE = {
  type: VALIDATOR_TYPES.VALIDATOR_TYPE_FILE;
};
export type VALIDATOR_MIN_LENGTH_TYPE = {
  type: VALIDATOR_TYPES.VALIDATOR_TYPE_MIN_LENGTH;
  val: number;
};
export type VALIDATOR_MAX_LENGTH_TYPE = {
  type: VALIDATOR_TYPES.VALIDATOR_TYPE_MAX_LENGTH;
  val: number;
};
export type VALIDATOR_MIN_TYPE = {
  type: VALIDATOR_TYPES.VALIDATOR_TYPE_MIN;
  val: number;
};
export type VALIDATOR_MAX_TYPE = {
  type: VALIDATOR_TYPES.VALIDATOR_TYPE_MAX;
  val: number;
};
export type VALIDATOR_EMAIL_TYPE = {
  type: VALIDATOR_TYPES.VALIDATOR_TYPE_EMAIL;
};

export type Validator =
  | VALIDATOR_REQUIRE_TYPE
  | VALIDATOR_FILE_TYPE
  | VALIDATOR_MIN_LENGTH_TYPE
  | VALIDATOR_MAX_LENGTH_TYPE
  | VALIDATOR_MIN_TYPE
  | VALIDATOR_MAX_TYPE
  | VALIDATOR_EMAIL_TYPE;

export const VALIDATOR_REQUIRE = (): VALIDATOR_REQUIRE_TYPE => ({
  type: VALIDATOR_TYPES.VALIDATOR_TYPE_REQUIRE,
});
export const VALIDATOR_FILE = (): VALIDATOR_FILE_TYPE => ({
  type: VALIDATOR_TYPES.VALIDATOR_TYPE_FILE,
});
export const VALIDATOR_MIN_LENGTH = (
  val: number
): VALIDATOR_MIN_LENGTH_TYPE => ({
  type: VALIDATOR_TYPES.VALIDATOR_TYPE_MIN_LENGTH,
  val: val,
});
export const VALIDATOR_MAX_LENGTH = (
  val: number
): VALIDATOR_MAX_LENGTH_TYPE => ({
  type: VALIDATOR_TYPES.VALIDATOR_TYPE_MAX_LENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val: number): VALIDATOR_MIN_TYPE => ({
  type: VALIDATOR_TYPES.VALIDATOR_TYPE_MIN,
  val: val,
});
export const VALIDATOR_MAX = (val: number): VALIDATOR_MAX_TYPE => ({
  type: VALIDATOR_TYPES.VALIDATOR_TYPE_MAX,
  val: val,
});
export const VALIDATOR_EMAIL = (): VALIDATOR_EMAIL_TYPE => ({
  type: VALIDATOR_TYPES.VALIDATOR_TYPE_EMAIL,
});

export const validate = (value: FormInputValue, validators: Validator[]) => {
  let isValid = true;
  for (const validator of validators) {
    switch (validator.type) {
      case VALIDATOR_TYPES.VALIDATOR_TYPE_REQUIRE: {
        isValid = isValid && value.trim().length > 0;
        break;
      }

      case VALIDATOR_TYPES.VALIDATOR_TYPE_MIN_LENGTH: {
        isValid = isValid && value.trim().length >= validator.val;
        break;
      }

      case VALIDATOR_TYPES.VALIDATOR_TYPE_MAX_LENGTH: {
        isValid = isValid && value.trim().length <= validator.val;
        break;
      }

      case VALIDATOR_TYPES.VALIDATOR_TYPE_MIN: {
        isValid = isValid && +value >= validator.val;
        break;
      }

      case VALIDATOR_TYPES.VALIDATOR_TYPE_MAX: {
        isValid = isValid && +value <= validator.val;
        break;
      }

      case VALIDATOR_TYPES.VALIDATOR_TYPE_EMAIL: {
        isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
        break;
      }
    }
  }
  return isValid;
};
