import React, { useState, useEffect, useContext, Fragment } from 'react'
import { motion } from 'framer-motion'
import CovidContext from '../../store/covid-context'

const container = {
  show: {
    transition: {
      staggerChildren: 0.35
    }
  }
}

const svgVariant = {
  hidden: {
    opacity: 0,
    x: -40
  },
  visible: {
    opacity: 1,
    x: 0
  }
}
const svgPath = {
  hidden: {
    pathLength: 0
  },
  visible: {
    pathLength: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',

      bounce: 0.3,

      fill: { duration: 1, ease: [1, 0, 0.8, 1] }
    }
  }
}
const HamburgerIcon = () => {
  const { dark } = useContext(CovidContext)
  const [fill, setFill] = useState(false)
  const [width, setWidth] = useState(0)

  const handleResize = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [width])

  return (
    <>
      {width > 760
        ? <motion.div
            variants={container}
            initial='hidden'
            animate='show'
          >

          <motion.svg
            variants={svgVariant}
            initial='hidden'
            animate='visible'
            transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
            height='100%' viewBox='0 -53 384 384' width='100%' xmlns='http://www.w3.org/2000/svg'
            fill='#000000' stroke='none'
          >
            <motion.path
              variants={svgPath}
              fill={fill ? '#000' : 'transparent'}
              strokeWidth='9'
              stroke={dark ? '#fff' : '#000'}
              strokeLinecap='round'
              onAnimationComplete={() => setFill(true)}
              d='m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0'
            />
            <motion.path
              variants={svgPath}
              fill={fill ? '#000' : 'transparent'}
              onAnimationComplete={() => setFill(true)}
              strokeWidth='9'
              stroke={dark ? '#fff' : '#000'}
              strokeLinecap='round'

              d='m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0'
            />
            <motion.path
              variants={svgPath}
              fill={fill ? '#000' : 'transparent'}
              onAnimationComplete={() => setFill(true)}
              strokeWidth='9'
              stroke={dark ? '#fff' : '#000'}
              strokeLinecap='round'

              d='m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0'
            />
          </motion.svg>
          </motion.div>
        : <motion.div
            variants={container}
            initial='hidden'
            animate='show'
          >

          <motion.svg
            variants={svgVariant}
            initial='hidden'
            animate='visible'
            transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
            height='100%' viewBox='0 -53 384 384' width='100%' xmlns='http://www.w3.org/2000/svg'
            fill='#000000' stroke='none'
          >
            <motion.path
              variants={svgPath}
              fill={fill ? '#fff' : 'transparent'}
              strokeWidth='9'
              stroke='#fff'
              strokeLinecap='round'
              onAnimationComplete={() => setFill(true)}
              d='m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0'
            />
            <motion.path
              variants={svgPath}
              fill={fill ? '#fff' : 'transparent'}
              onAnimationComplete={() => setFill(true)}
              strokeWidth='9'
              stroke='#fff'
              strokeLinecap='round'

              d='m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0'
            />
            <motion.path
              variants={svgPath}
              fill={fill ? '#fff' : 'transparent'}
              onAnimationComplete={() => setFill(true)}
              strokeWidth='9'
              stroke='#fff'
              strokeLinecap='round'

              d='m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0'
            />
          </motion.svg>
          </motion.div>}

    </>
  )
}

export default HamburgerIcon
