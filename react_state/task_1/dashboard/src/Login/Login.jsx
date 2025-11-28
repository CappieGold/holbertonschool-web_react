import React from 'react';
import WithLogging from '../HOC/WithLogging';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      email: '',
      password: '',
      enableSubmit: false
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  /**
   * Valid if the email is in the correct format
   * @param {string} email - The email to be validated
   * @returns {boolean} - true if the email is valid
   */
  isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const trimmedEmail = email.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  /**
   * Checks if the form is valid and updates enableSubmit
   * @param {string} email - The value of email
   * @param {string} password - The value of the password
   */
  validateForm(email, password) {
    const isEmailValid = email.length > 0 && this.isValidEmail(email);
    const isPasswordValid = password.length >= 8;

    return isEmailValid && isPasswordValid;
  }

  /**
   * Manages form submission
   * @param {Event} e - The submission event
   */
  handleLoginSubmit(e) {
    e.preventDefault();
    this.setState({ isLoggedIn: true });
  }

  /**
   * Manages changes in the email field
   * @param {Event} e - The event of change
   */
  handleChangeEmail(e) {
    const newEmail = e.target.value;
    this.setState((prevState) => ({
      email: newEmail,
      enableSubmit: this.validateForm(newEmail, prevState.password)
    }));
  }

  /**
   * Manages changes in the password field
   * @param {Event} e - The event of change
   */
  handleChangePassword(e) {
    const newPassword = e.target.value;
    this.setState((prevState) => ({
      password: newPassword,
      enableSubmit: this.validateForm(prevState.email, newPassword)
    }));
  }

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <div className="App-body flex flex-col p-5 pl-1 h-[45vh] border-t-4 border-[color:var(--main-color)]">
        <p className="text-xl mb-4">Login to access the full dashboard</p>
        <form onSubmit={this.handleLoginSubmit} className="text-lg flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
          <label htmlFor="email" className="sm:pr-2">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={this.handleChangeEmail}
            className="border rounded w-3/5 sm:w-auto px-2 py-1"
          />
          <label htmlFor="password" className="sm:pl-2 sm:pr-2">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={this.handleChangePassword}
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
}

export default WithLogging(Login);
