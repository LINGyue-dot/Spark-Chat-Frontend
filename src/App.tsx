import React from 'react';
import styled from 'styled-components';
import Demo from './pages/demo';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from './pages/login';

function App() {
  return (
    <AppContainer>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return <Redirect to="/login" />;
            }}
          />

          <Route path="/demo">
            <Demo />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  paddding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default App;
