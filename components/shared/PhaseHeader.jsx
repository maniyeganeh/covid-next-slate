import React, { useContext } from 'react'
import Link from 'next/link'
import classes from './phase.module.css'
import CovidContext from '../../store/covid-context'

const PhaseHeader = props => {
  const { dark } = useContext(CovidContext)
  return (
    <div className={`${classes.phasecontainer} rtl`}>
      <div className={classes.phaseRow}>
        <div className={!dark ? classes.phaseBox : `${classes.phaseBox} ${classes.phaseBoxDrk}`}>
          <h3>
            {props.title}
          </h3>

        </div>
        <div className={classes.phaseBox}>
          <Link href={`/vaccine/${props.to}`}>
            <button className='btn btn-info'>
              {props.link}
            </button>
          </Link>
        </div>

      </div>
      {props.children}
    </div>
  )
}

export default PhaseHeader
