import React from "react";
import { Route, Redirect } from "react-router-dom";

import LinkList from "components/LinkList/LinkList";
import CreateLink from "components/CreateLink/CreateLink";
import Login from "components/Login/Login";
import Search from "components/Search/Search";

export default function HeadRouteser() {
  return (
    <>
      <Route exact path="/" render={() => <Redirect to="/new/1" />} />
      <Route exact path="/create" component={CreateLink} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/top" component={LinkList} />
      <Route exact path="/new/:page" component={LinkList} />
    </>
  );
}
