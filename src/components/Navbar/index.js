import React from 'react'
import { Link } from 'react-router-dom'

import LocationIcon from '@material-ui/icons/LocationOn'
import PersonIcon from '@material-ui/icons/Person'
import CodeIcon from '@material-ui/icons/Code'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AddCircleIcon from '@material-ui/icons/ControlPoint'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder'

import logoIcon from '../../assets/images/logoIcon.png'
import s from '../../assets/css/navbar.css'

const Navbar = () =>  
<div className={s.sidenavContainer}>
  <img className={s.sidenavHamburger} src={logoIcon}/>
  <div className={s.sidenav}>
    <div className={s.sidenavTop}>
      <ul>
        <li>
          <Link to="/"><LocationIcon/>Explore</Link>
        </li>
        <li>
          <Link to="/search"><PersonIcon/>Cases</Link>
        </li>
        <li>
          <Link to="/about"><FavoriteIcon/>About</Link>
        </li>
        <li>
          <Link to="/submit"><AddCircleIcon/>Contribute</Link>
        </li>
        <li>
          <Link to="/notify"><NotificationsIcon/>Updates</Link>
        </li>
      </ul>
    </div>
  </div>
</div>

export default Navbar 
