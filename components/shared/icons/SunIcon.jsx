import React from 'react'
import { motion } from 'framer-motion'
const SunIcon = () => {
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
      xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'
    >
      <motion.path
        fill='transparent'
        strokeWidth='20'
        stroke='#fbd433'
        strokeLinecap='round'
        variants={pathVariants}
        d='M256 118a22 22 0 01-22-22V48a22 22 0 0144 0v48a22 22 0 01-22 22zM256 486a22 22 0 01-22-22v-48a22 22 0 0144 0v48a22 22 0 01-22 22zM369.14 164.86a22 22 0 01-15.56-37.55l33.94-33.94a22 22 0 0131.11 31.11l-33.94 33.94a21.93 21.93 0 01-15.55 6.44zM108.92 425.08a22 22 0 01-15.55-37.56l33.94-33.94a22 22 0 1131.11 31.11l-33.94 33.94a21.94 21.94 0 01-15.56 6.45zM464 278h-48a22 22 0 010-44h48a22 22 0 010 44zM96 278H48a22 22 0 010-44h48a22 22 0 010 44zM403.08 425.08a21.94 21.94 0 01-15.56-6.45l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.55 37.56zM142.86 164.86a21.89 21.89 0 01-15.55-6.44l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.56 37.55zM256 358a102 102 0 11102-102 102.12 102.12 0 01-102 102z'
      />
    </motion.svg>
  )
}

export default SunIcon
