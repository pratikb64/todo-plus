import React, { lazy, Suspense, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { LoadingModal, ProtectedRoute } from './components';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import CONSTANTS from './configs/Constants';
import { setAuth } from './redux/authReducer';
import { setLoading } from './redux/appReducer';

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Settings = lazy(() => import('./pages/Settings'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const TodoList = lazy(() => import('./pages/TodoList'))


function App() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    axios({
      url: CONSTANTS.BASE_URL + "/v1/user",
      method: "GET",
      withCredentials: true,
    })
      .then((d) => {
        dispatch(setAuth(d.data))
        dispatch(setLoading(false))
      })
      .catch(() => dispatch(setLoading(false)));
  }, []);


  return (
    <Suspense fallback={<LoadingModal fallback={true} />}>
      <LoadingModal />
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
          <ProtectedRoute path='/settings' component={Settings} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/reset-password' component={ResetPassword} />
          <Route path='/t/:id' component={TodoList} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    </Suspense>
  )
}

export default App
