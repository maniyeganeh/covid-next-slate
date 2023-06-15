import React from 'react'
import { FaBars } from 'react-icons/fa'
import HamburgerIcon from '../shared/HamburgerIcon'
import classes from './drawerToggle.module.css'

const DrawerToggle = props => {
  return (
    <button className={classes.toggleBtn} onClick={props.click}>
      {/* <FaBars/> */}
      <div style={{ width: '40px', height: '40px' }}>
        <HamburgerIcon />
      </div>

    </button>
  )
}

export default DrawerToggle
