import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";   


import './sign-up-form.style.scss';


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};


const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;



    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
        //prevenir default form submission behavior
        event.preventDefault();
        //Si las contraseñas no coinciden, no hago nada
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        //Si las contraseñas coinciden, llamo a la función de firebase para crear el usuario
        try {
           const {user}= await createAuthUserWithEmailAndPassword(email, password);
           
            // Reset form fields after successful sign up
           await createUserDocumentFromAuth(user, { displayName });
           resetFormFields();
            
        } catch (error) {
            if( error.code === 'auth/email-already-in-use') {
                alert('Email already in use');
            }else{
                console.error('Error creating user', error);
            }        
        }
    }
    
    
    
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }
    return (
        <div className='sign-up-container'>
            <h2>I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    required
                    onChange={handleChange}
                    name="displayName"
                    value={displayName}
                />
                <FormInput
                    label="Email"
                    type="email"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
                />
                <FormInput
                    label="Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="password"
                    value={password}
                />
                <FormInput
                    label="Confirm Password"
                    type="password"
                    required
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword}
                />
                <Button type="submit">Sign Up</Button>
            
            </form>

        </div>

    );
}
export default SignUpForm;