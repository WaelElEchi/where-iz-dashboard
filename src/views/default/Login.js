import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Form, Spinner } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import { setCurrentUser } from 'auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';

import { SERVICE_URL } from 'config';
import axios from 'axios';

const Login = () => {
  const title = 'Login';
  const description = 'Login Page';
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentUser, isLogin } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== '') history.push('/');
  }, []);

  const HandleLogin = (form) => {
    setIsLoading(true);

    const { email, password } = form;
    console.log(form);

    axios
      .post(`${SERVICE_URL}/auth/login`, { email, password })
      .then(({ status, data }) => {
        if (status === 200) {
          localStorage.setItem('token', data.token);
          history.push(`/`);
          dispatch(setCurrentUser(data.data));
        }
      })
      .catch((err) => {
        localStorage.removeItem('token');
        if (err.response) {
          const { status, data } = err.response;

          if (status === 400 || status === 401) {
            setErrorMsg(err.response.data.error);
            console.log(err.response.data.error);
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const HandleBlur = (e) => {
    setErrorMsg('');
  };

  const HandleFocus = (e) => {
    setErrorMsg('');
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(6, 'Must be at least 6 chars!').required('Password is required'),
  });

  const initialValues = { email: '', password: '' };
  const onSubmit = (values) => {
    // console.log(values);
    /* dispatch(loginUser(values)).then(function (X) {
      console.log(X);
    }); */
    HandleLogin(values);
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const leftSide = (
    <div className="min-h-100 d-flex ">
      <div className="position-absolute top-0 start-0">
        {/*  <img className="m-3 image-white" style={{ maxHeight: '75px' }} src="/img/logo/carrefour.png" alt="carrefour" /> */}
      </div>
    </div>
  );

  const rightSide = (
    <div className="sw-lg-70 min-h-100 min-w-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <div className="d-flex justify-content-center padding-bottom-20">
          <NavLink to="/login">
            <div className="">
              {/* <h2 style={{ color: '#1ea8e7', fontSize: '36px' }}>Where'iz</h2>{' '} */}
              <img
                style={{ maxHeight: '50px', alignItems: 'center', justifyContent: 'center', justifyItems: 'center' }}
                src="/img/logo/logoDefault.png"
                alt="where'iz"
              />
            </div>
          </NavLink>
        </div>
        <div className="mb-5">
          {/* <h1 className="cta-1 mb-0 text-primary text-center font-weight-bold">Login</h1> */}
          {/* <h2 className="cta-1 text-primary">Connectez vous en tant qu'administrateur</h2> */}
        </div>

        <div>
          <form id="loginForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="email" />
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={HandleBlur}
                onFocus={HandleFocus}
              />
              {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
            </div>
            <div className="mb-3 filled form-group tooltip-end-top">
              <CsLineIcons icon="lock-off" />
              <Form.Control
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                placeholder="Password"
                onBlur={HandleBlur}
                onFocus={HandleFocus}
              />

              {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
            </div>
            {errorMsg && <div style={{ color: 'red', fontSize: '12px' }}>{errorMsg}</div>}
            <Button size="lg" type="submit">
              {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <HtmlHead title={title} description={description} />
      <LayoutFullpage left={leftSide} right={rightSide} />
    </>
  );
};

export default Login;
