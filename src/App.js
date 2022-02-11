import React, { useEffect } from 'react';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './pages/SignUp';
import { AuthProvider } from './context/AuthContext';
import { DbContextProvider } from './context/dbContext';
import RoutesProtected from './helpers/routesProtected';
import WatchDash from './pages/WatchDash';
import IsUserLogged from './helpers/isUserLogged';
import Login from './pages/Login';
import { GlobalCntxtProvider } from './context/GlobalContext';
import Home from './pages/Home';
import WatchMov from './pages/WatchMov';
import WatchTv from './pages/WatchTv';

function App() {
  useEffect(() => {
    console.log('-->>> MADE BY DANISH IQBAL <<<--');
  }, []);
  return (
    <>
      <Router>
        <DbContextProvider>
          <GlobalCntxtProvider>
            <AuthProvider>
              <Switch>
                <Route exact path='/' component={HomePage}></Route>
                <IsUserLogged exact path='/signup'>
                  <SignUp></SignUp>
                </IsUserLogged>
                <IsUserLogged exact path='/login'>
                  <Login></Login>
                </IsUserLogged>
                <RoutesProtected
                  path='/watchDash'
                  exact
                  component={WatchDash}
                ></RoutesProtected>
                <RoutesProtected
                  path='/home/:id'
                  exact
                  component={Home}
                ></RoutesProtected>
                <RoutesProtected
                  path='/movie/:name/:id'
                  exact
                  component={WatchMov}
                ></RoutesProtected>
                <RoutesProtected
                  path='/tv/:name/:id'
                  exact
                  component={WatchTv}
                ></RoutesProtected>
              </Switch>
            </AuthProvider>
          </GlobalCntxtProvider>
        </DbContextProvider>
      </Router>
    </>
  );
}

export default App;
