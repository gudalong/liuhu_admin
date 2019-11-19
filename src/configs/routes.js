import Home from '../components/home'
import Login from '../components/login'
import NotFound from '../components/404'

export default  [
  {
    path:'/',
    component:Home,
    exact:true,
  },
  {
    path:'/login',
    component:Login,
    exact:true,
  },
  {
    component:NotFound
  }
]