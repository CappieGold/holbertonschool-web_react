import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
  return (
    <div className="App-footer flex flex-row justify-center items-center border-t-[3px] border-[var(--color-main)] p-4 italic fixed bottom-0 left-0 right-0 bg-white">
      <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
    </div>
  );
}

export default Footer;
