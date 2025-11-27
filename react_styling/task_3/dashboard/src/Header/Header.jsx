import logo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className="App-header flex flex-row items-center text-[var(--color-main)]">
      <img 
        src={logo} 
        alt="holberton logo" 
        className="h-[200px] w-[200px]"
      />
      <h1 className="text-[2rem]">School Dashboard</h1>
    </div>
  );
}

export default Header;
