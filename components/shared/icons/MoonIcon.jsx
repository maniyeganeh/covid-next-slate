import React from 'react'
import classes from './icon.module.css'
import { motion } from 'framer-motion'
const MoonIcon = () => {
  const svgVariants = {
    hidden: {
      rotate: 0
    },
    visible: {
      rotate: 0,
      transition: { duration: 1 }
    }
  }
  const pathVariants = {
    hidden: {
      pathLength: 0
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      rotate: [0, 20, 0],
      transition: {
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse',
        bounce: 0.3,
        fill: { duration: 1, ease: [1, 0, 0.8, 1] }
      }
    }
  }
  return (

    <motion.svg

      variants={svgVariants}
      initial='hidden'
      animate='visible'
      xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' style={{ width: '100%', height: '100%' }}
    >
      <motion.path
        fill='transparent'
        strokeWidth='20'
        stroke='  #0c1915'
        strokeLinecap='round'
        variants={pathVariants}
        d='M264 480A232 232 0 0132 248c0-94 54-178.28 137.61-214.67a16 16 0 0121.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200 31.34 0 59.57-5.07 81.61-14.67a16 16 0 0121.06 21.06C442.28 426 358 480 264 480z'
      />
    </motion.svg>

  )
}

export default MoonIcon
