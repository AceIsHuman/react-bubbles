import React, { useState } from "react";
import { Button, Form, Icon, Header } from "semantic-ui-react";

const Login = () => {
  const [creds, setCreds] = useState({
    username: null,
    password: null
  });

  const handleChanges = e => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    });
  };
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <Form>
        <Header>
          <Icon name="user" />
          User Login
        </Header>
        <Form.Input
          name="username"
          placeholder="Username"
          value={creds.username}
          onChange={handleChanges}
        />
        <Form.Input
          name="password"
          placeholder="Password"
          value={creds.password}
          onChange={handleChanges}
        />
        <Button>Submit</Button>
      </Form>
    </>
  );
};

export default Login;
