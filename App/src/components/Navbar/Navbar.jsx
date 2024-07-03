//css
import './Navbar.css'

//hooks
import { NavLink } from "react-router-dom";


//imports

import interrogação from '../../assets/Icones/interrogação.png'
import pokedex from '../../assets/Icones/pokedex.png'



const Navbar = () => {
  return (
    <div className='header'>
      <menu className='main'>

        <NavLink to='/' activeClassName='active'><li><img src={interrogação} alt="" /></li></NavLink>
        <NavLink to='/Pokedex' activeClassName='active'><li><img src={pokedex} alt="" /></li></NavLink>

      </menu>
    </div>
  )
}

export default Navbar