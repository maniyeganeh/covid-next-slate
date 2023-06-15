import React, { useContext } from 'react'
import CovidContext from '../../../store/covid-context'
import classes from './skeleton.module.css'
const Shimmer = () => {
  const { dark } = useContext(CovidContext)
  return (
    <div className={classes.shimmerWrapper}>
      <div className={!dark ? classes.shimmer : `${classes.shimmer} ${classes.shimmerDark}`} />
    </div>
  )
}

export default Shimmer
