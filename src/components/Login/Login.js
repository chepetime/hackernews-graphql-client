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

  const isLoggedIn =
    authToken &&
    authToken !== "false" &&
    authToken !== "undefined" &&
    authToken !== "";

  const onCompleted = (data) => {
    const res = login ? data.login : data.signup || false;
    if (res?.token) {
      setAuthToken(res.token);
      props.history.push(`/`);
    }
  };

  const [signupMutation] = useMutation(SIGNUP_MUTATION, {
    onCompleted,
  });

  const [loginMutation] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  useEffect(() => {
    if (isLoggedIn) {
      props.history.push(`/`);
    }
  }, [isLoggedIn, props.history]);

  return (
    <div className="flex p-6 bg-orange-700 mb-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("AAAAA");
          if (login) {
            loginMutation({ variables: { email, password, name } });
          } else {
            signupMutation({ variables: { email, password, name } });
          }
        }}
      >
        <div className="max-w-lg">
          <h4 className="p-3 mr-2 text-white">{login ? "Login" : "Sign Up"}</h4>

          {!login && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Your name"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mb-2"
            />
          )}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Your email address"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mb-2"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Choose a safe password"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mb-4"
          />

          <button
            type="submit"
            className="inline-block rounded py-2 px-4 mr-2 bg-gray-400 hover:bg-orange-500 text-white text-gray-800 hover:text-orange-900 cursor-pointer"
          >
            {login ? "login" : "register"}
          </button>

          <div
            className="inline-block rounded py-2 px-4 ml-2 bg-gray-400 hover:bg-orange-500 text-white text-gray-800 hover:text-orange-900 cursor-pointer"
            onClick={() => setLogin((login) => !login)}
          >
            {login ? "need to create an account?" : "already have an account?"}
          </div>
        </div>
      </form>
    </div>
  );
}
