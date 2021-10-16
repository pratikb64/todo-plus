import React, { lazy, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { LoadingModal } from './components';
import { Toaster } from 'react-hot-toast';

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Settings = lazy(() => import('./pages/Settings'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))

function App() {

  return (
    <Suspense fallback={<LoadingModal />}>
      <Router>
        <Toaster position='bottom-center' toastOptions={{
          className: 'shadow-2xl',
          style: {
            background: '#13151a',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            minWidth: '150px'
          }
        }} />
        <Switch>
          <Route path='/settings'>
            <Settings />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/reset-password'>
            <ResetPassword />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </Suspense>
  )
}

export default App
