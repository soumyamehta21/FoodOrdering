import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => {
  return value.trim() === "";
};
const isValid = (value) => {
  return value.trim().length === 5;
};

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const postalInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isValid(enteredPostal);

    setFormInputsValidity({
      name: enteredNameIsValid,
      city: enteredCityIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
    });

    const formIsValid =
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredNameIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) {
      return;
    }

    nameInputRef.current.value = "";
    streetInputRef.current.value = "";
    cityInputRef.current.value = "";
    postalInputRef.current.value = "";
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formInputsValidity.name && <p>Name cannot be empty!!!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formInputsValidity.street && <p>Street cannot be empty!!!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInputRef} type="text" id="postal" />
        {!formInputsValidity.postal && <p>Enter a valid PostalCode!!!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formInputsValidity.city && <p>City cannot be empty!!!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
