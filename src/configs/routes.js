import Home from '../components/home'
import Login from '../containers/login'
import NotFound from '../components/404'
import Category from '../components/category'

const authRoutes = [

  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/category',
    component: Category,
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