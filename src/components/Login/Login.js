import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION, LOGIN_MUTATION } from "graphql/mutations";

import { useAuth } from "context/auth";

export default function Login(props) {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { authToken, setAuthToken } = useAuth();

  const onCompleted = (data) => {
    const { token } = login ? data.login : data.signup;
    setAuthToken(token);
    props.history.push(`/`);
  };

  const [signupMutation] = useMutation(SIGNUP_MUTATION, {
    onCompleted,
  });

  const [loginMutation] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  useEffect(() => {
    if (authToken) {
      props.history.push(`/`);
    }
  }, [authToken, props.history]);

  return (
    <div>
      <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4>
      <div className="flex flex-column">
        {!login && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        {login && (
          <div
            className="pointer mr2 button"
            onClick={() =>
              loginMutation({ variables: { email, password, name } })
            }
          >
            login
          </div>
        )}
        {!login && (
          <div
            className="pointer mr2 button"
            onClick={() =>
              signupMutation({ variables: { email, password, name } })
            }
          >
            login
          </div>
        )}
        <div
          className="pointer button"
          onClick={() => setLogin((login) => !login)}
        >
          {login ? "need to create an account?" : "already have an account?"}
        </div>
      </div>
    </div>
  );
}
