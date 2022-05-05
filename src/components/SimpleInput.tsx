import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";

type SimpleInputProps = {};

const SimpleInput: FC<SimpleInputProps> = (props) => {
  const [enteredName, setEnteredName] = useState("");

  const nameInputChangeHandler: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setEnteredName(event.target.value);
  };

  const formSubmissionHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log("form submit");
    console.log(enteredName);
    setEnteredName("");
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          value={enteredName}
          onChange={nameInputChangeHandler}
          type="text"
          id="name"
        />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
