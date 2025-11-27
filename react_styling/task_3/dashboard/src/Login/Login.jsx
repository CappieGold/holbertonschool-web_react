import React from 'react';
import WithLogging from '../HOC/WithLogging';

class Login extends React.Component {
  render() {
    return (
      <div className="login-body">
        <p className="mb-4">Login to access the full dashboard</p>
        <form className="flex gap-2 items-center">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="border border-black"
          />
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            className="border border-black"
          />
          <button type="button" className="border border-black px-1">
            OK
          </button>
        </form>
      </div>
    );
  }
}

export default WithLogging(Login);
