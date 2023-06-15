import React, { useContext } from 'react'
import classes from './header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import DrawerToggle from '../SideDrawer/DrawerToggle'
import { motion } from 'framer-motion'
import CovidContext from '../../store/covid-context'

const MainHeader = props => {
  const { dark } = useContext(CovidContext)
  return (
    <div className={!dark ? `${classes.headerContainer} rtl` : `${classes.headerContainerDark} rtl`}>
      <div className={classes.headerRow}>
        <div className={classes.headeBox}>
          <Link href='/'>
            <a>

              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 90 }}
                transition={{ duration: 3, type: 'spring', bounce: 0.3 }}
                whileTap={{ scale: 0.05 }}
                whileHover={{ scale: 1.1 }}
                className={classes.logo}
              >
                <Image src='/img/logo.png' width='100%' height='100%' />

              </motion.div>
            </a>
          </Link>

        </div>
        <div className={classes.headeBox}>

          <DrawerToggle click={props.drawerClickHanlder} />

        </div>
      </div>
    </div>
  )
}

export default MainHeader
