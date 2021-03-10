import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import authActions from "redux/actions/auth.actions";
import { routeActions } from "redux/actions/route.actions";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

const FB_APP_ID = process.env.REACT_APP_FB_APP_ID;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export const LoginRegister = () => {
  const [formLoginData, setFormLoginData] = useState({
    email: "",
    password: "",
  });
  const [formRegisterData, setFormRegisterData] = useState({
    avatarUrl: "",
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errorsRegister, setErrorsRegister] = useState({
    avatarUrl: "",
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errorsLogin, setErrorsLogin] = useState({
    email: "",
    password: "",
  });
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  const handleLoginChange = (e) =>
    setFormLoginData({ ...formLoginData, [e.target.name]: e.target.value });

  const handleRegisterChange = (e) =>
    setFormRegisterData({
      ...formRegisterData,
      [e.target.name]: e.target.value,
    });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formLoginData;
    if (password.length < 3) {
      setErrorsLogin({
        ...errorsLogin,
        password: "Password must be longer than 3",
      });
      return;
    }
    dispatch(authActions.loginRequest(email, password));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const { avatarUrl, name, email, password } = formRegisterData;
    if (password.length < 2) {
      setErrorsRegister({
        ...errorsLogin,
        password: "Password must be longer than 3",
      });
      return;
    }
    dispatch(authActions.register(avatarUrl, name, email, password));
  };

  const loginWithFacebook = (response) => {
    dispatch(authActions.loginFacebook(response.accessToken));
  };
  const loginWithGoogle = (response) => {
    dispatch(authActions.loginGoogle(response.accessToken));
  };
  const role = useSelector((state) => state.auth.user.role);

  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === "__GO_BACK__") {
        history.goBack();
        dispatch(routeActions.removeRedirectTo());
      } else {
        history.push(redirectTo);
        dispatch(routeActions.removeRedirectTo());
      }
    }
  }, [dispatch, history, redirectTo]);
  if (role === "admin") return <Redirect to="/admin" />;
  if (isAuthenticated && role !== "admin") return <Redirect to="/" />;

  return (
    <div id="login-register">
      <div className="login">
        <center>
          {" "}
          <h1>Login</h1>
        </center>
        <Form onSubmit={handleLoginSubmit}>
          <Form.Group>
            <Form.Control
              type="email"
              required
              placeholder="Email Address"
              name="email"
              value={formLoginData.email}
              onChange={handleLoginChange}
            />
            {errorsLogin.email && (
              <small className="form-text text-danger">
                {errorsLogin.email}
              </small>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              required
              value={formLoginData.password}
              onChange={handleLoginChange}
              minLength="3"
            />
            {errorsLogin.password && (
              <small className="form-text text-danger">
                {errorsLogin.password}
              </small>
            )}
          </Form.Group>
        </Form>
        {loading ? (
          <Button
            className="btn-block"
            variant="primary"
            type="button"
            disabled
          >
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </Button>
        ) : (
          <Button
            onClick={handleLoginSubmit}
            className="btn-block"
            type="submit"
            variant="primary"
          >
            Login
          </Button>
        )}
        <hr />
        <div className="d-flex flex-column text-center">
          <FacebookLogin
            appId={FB_APP_ID}
            fields="name,email,picture"
            callback={loginWithFacebook}
            icon="fa-facebook"
            onFailure={(err) => console.log("FB LOGIN ERROR", err)}
            containerStyle={{
              textAlign: "center",
              backgroundColor: "#3b5998",
              borderColor: "#3b5998",
              flex: 1,
              display: "flex",
              color: "#fff",
              cursor: "pointer",
              marginBottom: "3px",
            }}
            buttonStyle={{
              flex: 1,
              textTransform: "none",
              padding: "12px",
              background: "none",
              border: "none",
            }}
          />
          <GoogleLogin
            className="google-btn d-flex justify-content-center"
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={loginWithGoogle}
            onFailure={(err) => console.log("GOOGLE LOGIN ERROR", err)}
            cookiePolicy="single_host_origin"
          />
        </div>
      </div>
      <div className="register">
        <center>
          {" "}
          <h1>Register</h1>
        </center>

        {/* Register section */}
        <Form onSubmit={handleRegisterSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Avatar"
              name="avatarUrl"
              value={formRegisterData.avatarUrl}
              onChange={handleRegisterChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              value={formRegisterData.name}
              onChange={handleRegisterChange}
            />
            {errorsRegister.name && (
              <small className="form-text text-danger">
                {errorsRegister.name}
              </small>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="Email Address"
              name="email"
              value={formRegisterData.email}
              onChange={handleRegisterChange}
            />
            {errorsRegister.email && (
              <small className="form-text text-danger">
                {errorsRegister.email}
              </small>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formRegisterData.password}
              onChange={handleRegisterChange}
            />
            {errorsRegister.password && (
              <small className="form-text text-danger">
                {errorsRegister.password}
              </small>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={formRegisterData.password2}
              onChange={handleRegisterChange}
            />
          </Form.Group>

          {loading ? (
            <Button
              className="btn-block"
              variant="primary"
              type="button"
              disabled
            >
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </Button>
          ) : (
            <Button
              onClick={handleRegisterSubmit}
              className="btn-block"
              type="submit"
              variant="primary"
            >
              Register
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};
export default LoginRegister;
