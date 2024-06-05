import React from 'react'
import '../styles/navbar.css'
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  const navHome=()=>{
    navigate('/')
  }
  const checkUser = () => {
    navigate('/user-profile');
  }
  return (
    <>
      <nav className='top-navbar'>
        <div className="logo" onClick={navHome}>StoryShelf</div>
        <div className="user-logout">
          <div className="user" onClick={checkUser}>User</div>
          <div className="logout" onClick={handleLogout}>Logout </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
