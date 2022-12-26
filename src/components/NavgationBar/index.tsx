import { NavLink } from 'react-router-dom';

import pageURL from '_constants/pageURL';

import './index.less';

const NavgationBar = () => {
  const menuList = [
    {
      title: 'Tokens',
      router: pageURL.tokens,
    },
    {
      title: 'Auto-Invest',
      router: pageURL.autoInvest
        .replace(':chainName', 'Goerli')
        .replace(':coinId', 'wrapped-bitcoin')
        .replace(':coinAddress', '0x3d119231CC7a939b5D2831de3ff05886EEbD2871'),
    },
    {
      title: 'Position',
      router: pageURL.position,
    },
  ];

  function handleOnClickGoNavgation() {
    return () => {};
  }
  return (
    <ul className="navgation-bar">
      {menuList.map((item) => {
        return (
          <li onClick={handleOnClickGoNavgation} key={item.title}>
            <NavLink to={item.router} className={({ isActive }) => (isActive ? 'active-bar-item' : undefined)}>
              {item.title}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};

export default NavgationBar;
