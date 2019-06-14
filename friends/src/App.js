import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import "./AppStyle.js";
import GlobalStyle from "./components/theme/GlobalStyle";
import Friends from "./components/friends/Friends";
import AppWrapper from './AppStyle'
import NewFriendPage from './components/friends/FriendForm'
import Header from './components/header/Header/Header'

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Router>
        <Switch>
          <AppWrapper>
            <Header />
            <Route exact path="/" component={Friends} />
            <Route  path="/add_friend" component={NewFriendPage} />
            <Route path="/friend/:friendId" render={props => <NewFriendPage {...props} />} />
        </AppWrapper>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
