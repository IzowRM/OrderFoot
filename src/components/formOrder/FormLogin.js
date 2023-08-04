import './FormLogin.css'
import useInput from "../../hooks/use-Input";
import Modal from "../UI/Modal";
import {useState} from "react";

export const FormLogin = (props) => {

    const [idExist, setIdExist] = useState(false);
    const [isBadPassword , setIsBadPassword] = useState(false);

    function idExistHandler() {
        setIdExist(previdExist => !previdExist);
    }
    function isBadPasswordHandlr() {
        setIsBadPassword(previdExist => !previdExist);
    }

    async function addIdentifierHandler(dataLogin) {
        let passwordExist = false
        let idExists = false;

        try {
            const response = await fetch('https://mdpdinner-ee1eb-default-rtdb.europe-west1.firebasedatabase.app/identifiant.json');
            const data = await response.json();

            const dataLogin = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));

            idExists = dataLogin.some(entry => entry.id.toLowerCase().toString() === enteredEmail.toLowerCase().toString() && entry.password.toString() === enteredName.toString())

            console.log(idExists)

            if(idExists) {
                props.onregisteredHandlers()
            }

        } catch (error) {
            console.error('Error fetching menu:', error);
        }
    }

    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangedHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput,
    } = useInput((value) => value.trim() !== '');

    const {
        value: enteredEmail,
        isValid: enteredEmailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput,
    } = useInput((value) => value.includes('@'));

    let formIsValid = false;

    if (enteredNameIsValid && enteredEmailIsValid) {
        formIsValid = true;
    }

    const formSubmissionHandler = (event) => {
        event.preventDefault();

        if (!enteredNameIsValid) {
            return;
        }

        console.log(enteredName);

        const identifier = {
            id: enteredEmail,
            password: enteredName
        }
        addIdentifierHandler(identifier)
        // nameInputRef.current.value = ''; => NOT IDEAL, DON'T MANIPULATE THE DOM
        resetNameInput();
        resetEmailInput();
    };

    const nameInputClasses = nameInputHasError
        ? 'form-control invalid'
        : 'form-control';

    const emailInputClasses = emailInputHasError
        ? 'form-control invalid'
        : 'form-control';


    return (
        <Modal onClose={props.onClose}>
            <form onSubmit={formSubmissionHandler}>
                <div className={emailInputClasses}>
                    <label htmlFor='email'>Your E-Mail</label>
                    <input
                        type='email'
                        id='email'
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        value={enteredEmail}
                    />
                    {emailInputHasError && (
                        <p className='error-text'>Please enter a valid email.</p>
                    )}
                </div>
                <div className={nameInputClasses}>
                    <label htmlFor='password'>Your Password</label>
                    <input
                        type='password'
                        id='password'
                        onChange={nameChangedHandler}
                        onBlur={nameBlurHandler}
                        value={enteredName}
                    />
                    {nameInputHasError && (
                        <p className='error-text'>Name must not be empty.</p>
                    )}
                </div>
                <div className='form-actions'>
                    <button disabled={!formIsValid}>Submit</button>
                    <button onClick={props.onregisteredHandlers}>
                        Close
                    </button>
                </div>
                {idExist && !isBadPassword && <p>Bad password</p>}
            </form>
        </Modal>
    );
};
