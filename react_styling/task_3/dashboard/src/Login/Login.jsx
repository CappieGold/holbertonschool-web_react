import React from 'react';
import WithLogging from '../HOC/WithLogging';

class Login extends React.Component {
  render() {
    return (
      <div className="login-body">
        <p className="mb-5">Login to access the full dashboard</p>
        <form className="flex gap-2.5 items-center">
          <label htmlFor="email" className="font-bold">Email: </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="p-[5px] border border-[#ccc] rounded-[3px]"
          />
          <label htmlFor="password" className="font-bold">Password: </label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            className="p-[5px] border border-[#ccc] rounded-[3px]"
          />
          <button 
            type="button"
            className="px-2.5 py-[5px] bg-white border border-[#ccc] rounded-[3px] cursor-pointer hover:bg-[#f0f0f0]"
          >
            OK
          </button>
        </form>
      </div>
    );
  }
}

export default WithLogging(Login);
