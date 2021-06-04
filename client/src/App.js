import Header from './components/header'
import Register from './components/register'
import Login from './components/login'
import {BrowserRouter as Router,Route,Redirect} from 'react-router-dom'
import Home from './components/home'
import Forget from './components/forget'
let App = (props)=>{

  return(
    <Router>
      <Header/>
      <Route path='/register' exact strict component={Register}/>
      <Route path='/login' exact strict component={Login}/>
      <Route path='/forgetPassword' exact strict component={Forget}/>
      <Route path='/home' exact strict render={()=>(
        localStorage.getItem('token') ? <Home/> : <Redirect to="/login" />
      )}/>
    </Router>  
  )
}

export default App