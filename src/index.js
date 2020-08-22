import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

import AuthContextProvider from "providers/AuthContextProvider";
import { AUTH_TOKEN } from "utils/constants";

import "styles/index.css";
import App from "components/App/App";
import * as serviceWorker from "serviceWorker";

const httpLink = createHttpLink({
  uri: "https://shrouded-earth-48074.herokuapp.com",
});

const wsLink = new WebSocketLink({
  uri: `ws://shrouded-earth-48074.herokuapp.com`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router>
        <ApolloProvider client={client}>
          <Suspense fallback={<div className="AppLoading"></div>}>
            <App />
          </Suspense>
        </ApolloProvider>
      </Router>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
