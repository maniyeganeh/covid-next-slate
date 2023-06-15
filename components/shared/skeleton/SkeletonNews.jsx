import React, { useContext } from 'react'
import CovidContext from '../../../store/covid-context'
import Shimmer from './Shimmer'
import classes from './skeleton.module.css'
import SkeletonElement from './SkeletonElement'
const SkeletonNews = () => {
  const { dark } = useContext(CovidContext)
  return (
    <div className={!dark ? classes.skeletonWrapper : `${classes.skeletonWrapper} ${classes.skeletonWrapperDark}`}>
      <div className={classes.skeletonArt}>
        <SkeletonElement type='news' />
        <SkeletonElement type='news' />
        <SkeletonElement type='news' />
        <SkeletonElement type='news' />
      </div>
      <Shimmer />
    </div>
  )
}

export default SkeletonNews
