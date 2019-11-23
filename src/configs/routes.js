import Home from '../components/home'
import Login from '../containers/login'
import NotFound from '../components/404'

const authRoutes = [

  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    component: NotFound
  }
]

const noAuthRoutes = [{
  path: '/login',
  component: Login,
  exact: true,
} ]

export {
  authRoutes,
  noAuthRoutes
}