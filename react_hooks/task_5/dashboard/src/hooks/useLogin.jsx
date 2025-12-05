import { useState } from 'react';

function useLogin(onLogin) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableSubmit, setEnableSubmit] = useState(false);

  const isValidEmail = (emailValue) => {
    if (!emailValue || typeof emailValue !== 'string') return false;
    const trimmedEmail = emailValue.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(trimmedEmail);
  };

  const validateForm = (emailValue, passwordValue) => {
    const isEmailValid = emailValue.length > 0 && isValidEmail(emailValue);
    const isPasswordValid = passwordValue.length >= 8;
    return isEmailValid && isPasswordValid;
  };

  const handleChangeEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEnableSubmit(validateForm(newEmail, password));
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setEnableSubmit(validateForm(email, newPassword));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (onLogin && enableSubmit) {
      onLogin(email, password);
    }
  };

  return {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit
  };
}

export default useLogin;
