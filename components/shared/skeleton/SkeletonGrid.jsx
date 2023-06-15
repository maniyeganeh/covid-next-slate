import React, { useContext } from 'react'
import CovidContext from '../../../store/covid-context'
import Shimmer from './Shimmer'
import SkeletonElement from './SkeletonElement'
import classes from './skeleton.module.css'
const SkeletonGrid = () => {
  const { dark } = useContext(CovidContext)
  return (
    <div className={`${classes.skeletonGrid} rtl`}>
      <div className={classes.skeletonRow}>
        <div className={!dark ? classes.skeletonBox : `${classes.skeletonBox} ${classes.skeletonBoxDark}`}>
          <div className={!dark ? classes.skeletonAvatar : `${classes.skeletonAvatar} ${classes.skeletonAvatarDark}`} />
          <SkeletonElement type='news' />
          <SkeletonElement type='news' />
          <Shimmer />
        </div>
        <div className={!dark ? classes.skeletonBox : `${classes.skeletonBox} ${classes.skeletonBoxDark}`}>
          <div className={!dark ? classes.skeletonAvatar : `${classes.skeletonAvatar} ${classes.skeletonAvatarDark}`} />

          <SkeletonElement type='news' />
          <SkeletonElement type='news' />
          <Shimmer />

        </div>
        <div className={!dark ? classes.skeletonBox : `${classes.skeletonBox} ${classes.skeletonBoxDark}`}>
          <div className={!dark ? classes.skeletonAvatar : `${classes.skeletonAvatar} ${classes.skeletonAvatarDark}`} />

          <SkeletonElement type='news' />
          <SkeletonElement type='news' />

          <Shimmer />
        </div>

      </div>
    </div>
  )
}

export default SkeletonGrid
