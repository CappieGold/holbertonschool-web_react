import './Footer.css';
import { getCurrentYear, getFooterCopy } from '../utils/utils';

function Footer() {
  return (
    <div className="App-footer">
      <p>Copyright {getCurrentYear()} {getFooterCopy(true)} main dashboard</p>
    </div>
  );
}

export default Footer;
