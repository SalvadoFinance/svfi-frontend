import NavgationBar from '_components/NavgationBar';
import { ConnectWallet, SwitchChain } from '_components/ConnectWalletWrap';
import LogoSVG from '_assets/icons/logo1.svg';

import './index.less';

const Header = () => {
  return (
    <header>
      <LogoSVG />
      <NavgationBar />
      <SwitchChain style={{ marginRight: '32px' }} />
      <ConnectWallet isMobile={false} />
    </header>
  );
};

export default Header;
