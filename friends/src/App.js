import React from "react";
import "./AppStyle.js";
import GlobalStyle from "./components/theme/GlobalStyle";
import Friends from "./components/friends/Friends";
import AppWrapper from './AppStyle'

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <AppWrapper>
        <Friends />
      </AppWrapper>
    </React.Fragment>
  );
}

export default App;
