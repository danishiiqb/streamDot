import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  useEffect(() => {
    console.log('-->>> MADE BY DANISH IQBAL <<<--');
  }, []);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
