import React from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_REDIRECT_PATH } from 'config.js';

const NavLogo = () => {
  return (
    <div className=" position-relative align-content-center mb-4">
      <Link to={DEFAULT_REDIRECT_PATH}>
        <img style={{ maxHeight: '30px' }} className="image-white" src="/img/logo/logo-white.png" alt="where'iz" />
      </Link>
    </div>
  );
};
export default React.memo(NavLogo);
