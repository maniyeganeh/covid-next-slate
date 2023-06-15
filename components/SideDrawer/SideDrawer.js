import React, { useContext, Fragment } from 'react'
import { menuItems } from '../../helpers/menu-items'
import classes from './sideDrawer.module.css'
import Link from 'next/link'
import Image from 'next/image'
import CovidContext from '../../store/covid-context'
import { AnimatePresence, motion } from 'framer-motion'
import { FaCloudSun, FaCloudMoon } from 'react-icons/fa'
import SunIcon from '../shared/icons/SunIcon'
import MoonIcon from '../shared/icons/MoonIcon'

const SideDrawer = props => {
  const { token, userId, darkModeFun, dark } = useContext(CovidContext)
  const variant = {
    open: { opacity: 1, x: 0 },
    close: { opacity: 0, x: -100 }
  }

  // let drawerClasses = `${classes.sideDrawer}`
  // if(props.show){
  //     drawerClasses = `${classes.sideDrawer} ${classes.open}`
  // }
  return (
  // <nav className={`${drawerClasses} rtl`}>
    <>
      <AnimatePresence>

        {props.show &&
          <motion.nav
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ x: { type: 'spring', stiffness: 350 } }}
            className={!dark ? `${classes.sideDrawer} rtl` : `${classes.sideDrawer} ${classes.sideDrawerDrk} rtl`}
          >
            <ul>
              {token &&
                <li>
                  <Link href={`/user/${userId}`}>
                      <a>
                          پنل ادمین
                                        </a>
                    </Link>
                </li>}
              {menuItems.map((item, index) => (
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  key={index} onClick={props.drawerClickHanlder}
                >
                  <Link href={item.to}>
                      <a>
                          {item.title}
                        </a>
                    </Link>

                </motion.li>
              ))}
              <li>

                <motion.div
                  whileTap={{ scale: 0.5 }}
                  className={classes.modeBtn} onClick={darkModeFun}
                >
                  {dark
                      ? <SunIcon />
                      : <MoonIcon />}
                </motion.div>
              </li>
              <div className={classes.maskImg}>
                <Image src='/img/mask.png' width='100%' height='100%' />

              </div>

            </ul>
          </motion.nav>}
      </AnimatePresence>
    </>
  )
}

export default SideDrawer
