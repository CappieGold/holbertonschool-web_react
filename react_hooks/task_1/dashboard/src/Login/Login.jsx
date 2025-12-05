import { useState } from 'react';
import PropTypes from 'prop-types';
import WithLogging from '../HOC/WithLogging';

function Login({ logIn = () => {}, email: initialEmail = '', password: initialPassword = '' }) {
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [formData, setFormData] = useState({
    email: initialEmail,
    password: initialPassword
  });

  /**
   * Validates if the email has the correct format
   * @param {string} email - The email to validate
   * @returns {boolean} - true if the email is valid
   */
  const isValidEmail = (email) => {
    if (!email || typeof email !== 'string') return false;
    const trimmedEmail = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(trimmedEmail);
  };

  /**
   * Checks if the form is valid
   * @param {string} email - The email value
   * @param {string} password - The password value
   * @returns {boolean} - true if the form is valid
   */
  const validateForm = (email, password) => {
    const isEmailValid = email.length > 0 && isValidEmail(email);
    const isPasswordValid = password.length >= 8;
    return isEmailValid && isPasswordValid;
  };

  const handleChangeEmail = (e) => {
    const newEmail = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      email: newEmail
    }));
    setEnableSubmit(validateForm(newEmail, formData.password));
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      password: newPassword
    }));
    setEnableSubmit(validateForm(formData.email, newPassword));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    logIn(formData.email, formData.password);
  };

  return (
    <div className="App-body flex flex-col p-5 pl-1 h-[45vh] border-t-4 border-[color:var(--main-color)]">
      <p className="text-xl mb-4">Login to access the full dashboard</p>
      <form onSubmit={handleLoginSubmit} className="text-lg flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
        <label htmlFor="email" className="sm:pr-2">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChangeEmail}
          className="border rounded w-3/5 sm:w-auto px-2 py-1"
        />
        <label htmlFor="password" className="sm:pl-2 sm:pr-2">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChangePassword}
          className="border rounded w-3/5 sm:w-auto px-2 py-1"
        />
        <input
          type="submit"
          value="OK"
          disabled={!enableSubmit}
          className="cursor-pointer border px-1 rounded sm:ml-2 w-fit disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </form>
    </div>
  );
}

Login.propTypes = {
  logIn: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string
};

Login.defaultProps = {
  logIn: () => {},
  email: '',
  password: ''
};

export default WithLogging(Login);
