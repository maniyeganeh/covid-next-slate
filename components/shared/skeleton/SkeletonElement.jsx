import React, { useContext } from 'react'
import CovidContext from '../../../store/covid-context'
import classes from './skeleton.module.css'
const SkeletonElement = ({ type }) => {
  const { dark } = useContext(CovidContext)
  let classNames
  if (type === 'news') {
    classNames = !dark ? `${classes.skleton} ${classes.skeletonNews}` : `${classes.skleton} ${classes.skeletonNews} ${classes.skletonDark}`
  } else if (type === 'grid') {
    classNames = !dark ? `${classes.skleton} ${classes.skeletonText}` : `${classes.skleton} ${classes.skeletonText} ${classes.skeletonTextDark}`
  }
  return (
    <div className={classNames} />
  )
}

export default SkeletonElement
