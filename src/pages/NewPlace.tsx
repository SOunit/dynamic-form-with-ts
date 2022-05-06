import { FormEventHandler } from "react";
import Button from "../components/Button";
import Input, { INPUT_ELEMENT_TYPES } from "../components/Input";
import { useForm } from "../hooks/form-hook";
import { VALIDATOR_MIN_LENGTH, VALIDATOR_REQUIRE } from "../util/validators";

const NewPlace = () => {
  const [formState, inputHandler] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
      address: { value: "", isValid: false },
    },
    false
  );

  const placeSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        type="text"
        label="Title"
        element={INPUT_ELEMENT_TYPES.INPUT}
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText={"Please input valid title."}
      />
      <Input
        id="description"
        label="Description"
        element={INPUT_ELEMENT_TYPES.TEXTAREA}
        validators={[VALIDATOR_MIN_LENGTH(5)]}
        errorText={"Please input valid description(at least 5 characters)."}
        onInput={inputHandler}
      />
      <Input
        id="address"
        type="text"
        label="Address"
        element={INPUT_ELEMENT_TYPES.INPUT}
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        errorText={"Please input valid address."}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
