import PropTypes from 'prop-types';
import WithLogging from '../HOC/WithLogging';
import useLogin from '../hooks/useLogin';

function Login({ logIn = () => {} }) {
  const {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit
  } = useLogin(logIn);

  return (
    <div className="App-body flex flex-col p-5 pl-1 h-[45vh] border-t-4 border-[color:var(--main-color)]">
      <p className="text-xl mb-4">Login to access the full dashboard</p>
      <form onSubmit={handleLoginSubmit} className="text-lg flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
        <label htmlFor="email" className="sm:pr-2">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChangeEmail}
          className="border rounded w-3/5 sm:w-auto px-2 py-1"
        />
        <label htmlFor="password" className="sm:pl-2 sm:pr-2">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
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
  logIn: PropTypes.func
};

export default WithLogging(Login);
