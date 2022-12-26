import React from 'react';

import NavgationBar from '_components/NavgationBar';
import LogoSVG from '_assets/icons/logo2.svg';
import GithubSVG from '_assets/icons/github.svg';
import TwitterSVG from '_assets/icons/twitter.svg';
import DiscordSVG from '_assets/icons/discord.svg';

import './index.less';
import { IconButton } from '@mui/material';

const Footer = () => {
  return (
    <footer>
      <div className="footer-menu">
        <LogoSVG style={{ width: '78px', height: '24px', marginRight: '24px' }} />
        <NavgationBar />
        <div className="media">
          <IconButton>
            <GithubSVG />
          </IconButton>
          <IconButton>
            <TwitterSVG />
          </IconButton>
          <IconButton>
            <DiscordSVG />
          </IconButton>
        </div>
      </div>
      <div className="meta-info">
        <span>Media inquires for Uniswap Labs - Contact</span>
        <span className="email">media@salvado.org</span>
      </div>
    </footer>
  );
};

export default Footer;
