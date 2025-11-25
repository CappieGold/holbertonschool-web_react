import React from 'react';
import './Login.css';
import WithLogging from '../HOC/WithLogging';

class Login extends React.Component {
  render() {
    return (
      <div className="login-body">
        <p>Login to access the full dashboard</p>
        <form>
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" />
          <button type="button">OK</button>
        </form>
      </div>
    );
  }
}

export default WithLogging(Login);
