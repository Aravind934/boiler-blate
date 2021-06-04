import {NavLink , useHistory} from 'react-router-dom'
import '../style.css'
function Header() {
   
   let history = useHistory()
   let logoutUser = ()=>{
     localStorage.clear()
     history.push('/login')
   }  

    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <NavLink to="#" className="navbar-brand"> &nbsp;&nbsp;Navbar</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/register" exact strict className="nav-link">Register</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login" exact strict className="nav-link">Login</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/home" exact strict className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <button type="button" style={{"border":"none"}} className="nav-link" onClick={logoutUser}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    )
  }
  
  export default Header;
  