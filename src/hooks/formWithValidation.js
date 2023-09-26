import React from 'react';

export function useFormWithValidation(initialState = {}, initialIsValid = false) {
  
  const [values, setValues] = React.useState(initialState);
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(initialIsValid);
  const [isLoading, setIsLoading] = React.useState(false);

  //---ОБРАБОТЧИКИ---
  function handleChange(e) {
    const input = e.target;
    const name = input.name;
    const value = input.value;

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: input.validationMessage});
    setIsValid(input.closest('form').checkValidity());
  };

  return {values, errors, isValid, handleChange, setValues, setIsValid, setErrors, isLoading, setIsLoading};
};