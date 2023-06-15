import React, { useContext } from 'react'
import CountUp from 'react-countup'
import CovidContext from '../../store/covid-context'
import classes from './card.module.css'
const Card = props => {
  const { dark } = useContext(CovidContext)
  return (
    <div className={!dark ? classes.cardContainer : `${classes.cardContainer} ${classes.cardContainerDrk}`} style={{ backgroundColor: props.bg }}>
      <div className={classes.cardTitle}>
        {props.title}
      </div>
      <div className={classes.cardBody}>
        {
                    props.type === 'vaccinate'
                      ? <CountUp
                          key={props.stats} start={0} end={props.stats} duration={2.5} separator=',' decimals={2}
                          decimal='.'
                        />
                      : <CountUp
                          key={props.stats} start={0} end={props.stats} duration={2.5} separator=','
                        />
                }

        {props.type === 'vaccinate' && <span>%</span>}
      </div>
    </div>
  )
}

export default Card
