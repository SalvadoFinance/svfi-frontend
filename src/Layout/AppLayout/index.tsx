import React from 'react';
import cns from 'classnames';
import { Outlet } from 'react-router-dom';
import Header from '_components/Header';

import './index.less';
import Footer from '_components/Footer';

export interface IAppLayout {
  className?: string;
}

const AppLayout: React.FC<React.PropsWithChildren<IAppLayout>> = ({ children, className, ...props }) => {
  return (
    <div className={cns('app-container', className)} {...props}>
      <Header />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default AppLayout;
