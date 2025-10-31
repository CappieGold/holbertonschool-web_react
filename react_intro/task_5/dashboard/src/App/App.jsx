import './App.css';
import logo from '../assets/holberton-logo.jpg';
import { getCurrentYear, getFooterCopy } from '../utils/utils';
import Notifications from '../Notifications/Notifications';

function App() {
  return (
    <>
      <div className="root-notifications">
        <Notifications />
      </div>
      <div className="App-header">
        <img src={logo} alt="holberton logo" />
        <h1>School dashboard</h1>
      </div>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
        <form>
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" name="password" />
          <button type="button">OK</button>
        </form>
      </div>
      <div className="App-footer">
        <p>Copyright {getCurrentYear()} {getFooterCopy(true)} main dashboard</p>
      </div>
    </>
  );
}

export default App;
