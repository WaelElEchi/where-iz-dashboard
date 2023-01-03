import React, { useMemo, useEffect } from 'react';

// import redux for auth guard
import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';
// import layout
import Layout from 'layout/Layout';

// import routing modules
import RouteIdentifier from 'routing/components/RouteIdentifier';
import { getRoutes } from 'routing/helper';
import routesAndMenuItems from 'routes.js';
import Loading from 'components/loading/Loading';

import { getUser } from 'auth/authSlice';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(async () => {
    // eslint-disable-next-line
    if (localStorage.getItem('token')) {
      // eslint-disable-next-line
      //history.push(DEFAULT_REDIRECT_PATH);
      const err = await dispatch(getUser());
      await console.log(err);
    } else {
      history.push('/login');
      localStorage.removeItem('token');
    }
  }, [isLogin]);

  const routes = useMemo(() => getRoutes({ data: routesAndMenuItems, isLogin, userRole: 'admin' }), [isLogin, currentUser]);
  if (routes) {
    return (
      <Layout>
        <RouteIdentifier routes={routes} fallback={<Loading />} />
      </Layout>
    );
  }
  return <></>;
};

export default App;
