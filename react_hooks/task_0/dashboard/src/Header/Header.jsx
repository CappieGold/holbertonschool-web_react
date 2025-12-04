import { useContext } from 'react';
import logo from '../assets/holberton-logo.jpg';
import newContext from '../Context/context';

export default function Header() {
    const { user, logOut } = useContext(newContext)

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
          Welcome {user.email} (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              logOut();
            }}
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
