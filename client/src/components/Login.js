import React from "react";
import { Button, Form, Icon, Header } from "semantic-ui-react";

const Login = () => {
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
        <Form.Input name="username" placeholder="Username" />
        <Form.Input name="password" placeholder="Password" />
        <Button>Submit</Button>
      </Form>
    </>
  );
};

export default Login;
