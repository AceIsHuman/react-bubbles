import React, { useState } from "react";
import { Button, Form, Icon, Header } from "semantic-ui-react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = props => {
  const [creds, setCreds] = useState({
    username: "",
    password: ""
  });

  const handleChanges = e => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", creds)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
      })
      .catch(err => console.error(err.response));
    props.history.push('/bubbles');
  };
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <Form onSubmit={handleSubmit}>
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
          type="password"
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
