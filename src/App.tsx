import { useState } from 'react'
import logo from './logo.svg'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/Home';
import Settings from './pages/Settings';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Switch>
        <Route path='/settings'>
          <Settings />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
