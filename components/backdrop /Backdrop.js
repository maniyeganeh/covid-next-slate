import React from 'react'
import classes from './bacdrop.module.css'
const BackDrop = props => {
  return (
    <div className={classes.backdrop} onClick={props.click} />
  )
}

export default BackDrop
