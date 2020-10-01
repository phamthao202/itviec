import React from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../redux/action/authAction";
import {useHistory} from "react-router-dom"
const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const login = (e) => {
    e.preventDefault();
    console.log(e.target.pass.value)
    const user = { email: e.target.email.value, password: e.target.pass.value };
    dispatch(authAction.login(user));
    history.push('/')
    
  };
  return (
    <div>
      {console.log("user issss", user)}
      {user && user.email}
      <h1>Login page</h1>
      <button onClick={() => login()}>Login</button>
      <div className="job-detail-header">
        <img src="https://itviec.com/assets/logo-itviec-65afac80e92140efa459545bc1c042ff4275f8f197535f147ed7614c2000ab0f.png" />
      </div>
      <div className="container">
        <Form onSubmit={(e) => login(e)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="pass" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
