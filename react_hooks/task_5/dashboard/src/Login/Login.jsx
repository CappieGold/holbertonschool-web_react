import WithLogging from '../HOC/WithLogging';
import useLogin from '../hooks/useLogin';

const Login = ({ logIn }) => {
  const {
    email,
    password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit
  } = useLogin(logIn);

  return (
    <div className="flex flex-col h-[60vh] p-5 pl-10 border-t-4 border-[#e1003c]">
      <p className="font-roboto text-xl">Login to access the full dashboard</p>
      <form 
        className="my-5 text-lg font-roboto flex flex-row max-[900px]:flex-col" 
        onSubmit={handleLoginSubmit}
      >
        <label htmlFor="email" className="pr-2.5 max-[900px]:block">
          Email
        </label>
        <input
          type="email"
          name="user_email"
          id="email"
          className="mr-2.5 border rounded px-2 py-1 max-[900px]:block max-[900px]:mb-2.5 max-[900px]:py-1.5 max-[900px]:text-xl max-[900px]:w-full max-[900px]:box-border"
          value={email}
          onChange={handleChangeEmail}
        />
        <label htmlFor="password" className="pr-2.5 max-[900px]:block">
          Password
        </label>
        <input
          type="password"
          name="user_password"
          id="password"
          className="mr-2.5 border rounded px-2 py-1 max-[900px]:block max-[900px]:mb-2.5 max-[900px]:py-1.5 max-[900px]:text-xl max-[900px]:w-full max-[900px]:box-border"
          value={password}
          onChange={handleChangePassword}
        />
        <input
          type="submit"
          value="OK"
          className="cursor-pointer border px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed max-[900px]:block max-[900px]:mt-2.5 max-[900px]:py-1.5 max-[900px]:text-base max-[900px]:w-full max-[900px]:box-border"
          disabled={!enableSubmit}
        />
      </form>
    </div>
  );
};

export default WithLogging(Login);
