import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import UrlRouter from "./url_router";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <UrlRouter />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);

reportWebVitals();
