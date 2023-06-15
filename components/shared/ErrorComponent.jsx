import React, { Fragment } from 'react'

import Link from 'next/link'
import classes from './error.module.css'

const ErrorComponent = props => {
  return (
    <>

      <div className={`${classes.errorContainer} rtl`}>
        <div className={classes.errorCard}>
          <div className={classes.errorHeader}>
            {props.title}
          </div>
          <Link href={`${props.to}`}>
            <button className='btn btn-danger'>
              {props.link}
            </button>
          </Link>
        </div>

      </div>
    </>
  )
}

export default ErrorComponent
