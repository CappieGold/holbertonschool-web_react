import logo from '../assets/holberton-logo.jpg';

export default function Header({ user, logOut }) {
  const handleLogoutClick = (e) => {
    e.preventDefault();
    logOut();
  };

  return (
    <div className="App-header flex flex-col">
      <div className="flex items-center py-2 max-[520px]:flex-col">
        <img src={logo} className="App-logo h-60 pointer-events-none max-[520px]:h-60" alt="holberton logo" />
        <h1 className="font-bold text-[color:var(--main-color)] text-5xl max-[520px]:text-5xl max-[520px]:mt-2 max-[435px]:text-4xl">
          School Dashboard
        </h1>
      </div>
      {user.isLoggedIn && (
        <section id="logoutSection" className="text-right pr-4">
          Welcome <b>{user.email}</b> (
          <a
            href="#"
            onClick={handleLogoutClick}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            logout
          </a>
          )
        </section>
      )}
    </div>
  );
}
