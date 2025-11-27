import logo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className="App-header flex flex-row items-center text-[var(--color-main)] border-b-[3px] border-[var(--color-main)] text-[1.4rem] pb-5">
      <img 
        src={logo} 
        alt="holberton logo" 
        className="h-[200px] w-[200px] mr-5"
      />
      <h1 className="text-[2.2rem]">School Dashboard</h1>
    </div>
  );
}

export default Header;
