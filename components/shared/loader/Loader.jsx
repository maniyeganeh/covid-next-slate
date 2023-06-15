import React from 'react'
import classes from './loader.module.css'
import { motion } from 'framer-motion'
const Loader = () => {
  const variants = {
    start: {
      y: 0
    },
    end: {
      y: -10,
      scale: 1.1,
      transition: {
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeateType: 'reverse',
        bounce: 0.3
      }
    }
  }

  return (
    <motion.div
      variants={variants}

      className={classes.loaderContainer} style={{ backgroundColor: 'red', borderRadius: '50%', width: '50px', height: '50px' }}
    />
  )
}

export default Loader
