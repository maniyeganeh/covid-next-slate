import React, { useContext } from 'react'
import CountUp from 'react-countup'
import CovidContext from '../store/covid-context'
import Card from './shared/Card'

import classes from './world.module.css'

const WorldComponent = () => {
  const { world, dark } = useContext(CovidContext)

  return (
  //         <div className={`${classes.worldContainer} rtl`} >
  //         <div className={classes.worldRow1}>
  //         <Card title="تعداد مبتلایان جدید"
  //             bg={!dark ? "#f39c12" : "#424242"}
  //             stats={world.NewCases}
  //         />
  //         <Card title="  آخرین آمار جانباختگان"
  //             bg={!dark ? "#e74c3c" : "#616161"}
  //             stats={world.NewDeaths}
  //         />
  //           <Card title="  بهبود یافتگان "
  //             bg={!dark ? "#27ae60" : "#757575"}
  //             stats={world.NewRecovered}
  //         />
  //         </div>
  //    <div className={classes.worldRow2}>
  //    <Card title="   تعداد کل مبتلایان
  // "
  //             bg={!dark ? "#f39c12" : "#424242"}
  //             stats={world.TotalCases}
  //         />
  //           <Card title="   تعداد کل جانباختگان "
  //             bg={!dark ? "#e74c3c" : "#616161"}
  //             stats={world.TotalDeaths}
  //         />
  //           <Card title="   تعداد کل بهبود یافتگان "
  //             bg={!dark ? "#27ae60" : "#757575"}
  //             stats={world.TotalRecovered}
  //         />
  //    </div>
  //    <div className={classes.statsRow}>
  //                     <div className={classes.statsBox1} >
  //                         <h4>
  //           بیماران بستری
  //                         </h4>
  //                         <h6>
  //                         <CountUp key={world.ActiveCases} start={0} end={typeof world.ActiveCases!= undefined && world.ActiveCases} duration={2.5} separator={","} />

  //                         </h6>
  //                     </div>

  //                     <div className={classes.statsBox1} >
  //                         <h4>
  //                               بیماران در شرایط وخیم
  //                         </h4>
  //                         <h6>

  //                             {world.Serious_Critical}

  //                         </h6>
  //                     </div>

  //                 </div>

  //                 <div className={classes.date}>
  //                     <h6 className={!dark ? classes.light : classes.dark}>
  //                         {new Date().toLocaleString("fa-ir")}
  //                         </h6>
  //                 </div>
  //     </div>

    <div className={`${classes.worldContainer} rtl`}>
      <div className={classes.worldRow1}>
        <Card
          title='تعداد مبتلایان جدید'
          bg={!dark ? '#f39c12' : '#424242'}
          stats={world.todayCases}
        />
        <Card
          title='  آخرین آمار جانباختگان'
          bg={!dark ? '#e74c3c' : '#616161'}
          stats={world.todayDeaths}
        />
        <Card
          title='  بهبود یافتگان '
          bg={!dark ? '#27ae60' : '#757575'}
          stats={world.todayRecovered}
        />
      </div>
      <div className={classes.worldRow2}>
        <Card
          title='   تعداد کل مبتلایان
 '
          bg={!dark ? '#f39c12' : '#424242'}
          stats={world.cases}
        />
        <Card
          title='   تعداد کل جانباختگان '
          bg={!dark ? '#e74c3c' : '#616161'}
          stats={world.deaths}
        />
        <Card
          title='   تعداد کل بهبود یافتگان '
          bg={!dark ? '#27ae60' : '#757575'}
          stats={world.recovered}
        />
      </div>
      <div className={classes.statsRow}>
        <div className={classes.statsBox1}>
          <h4>
            بیماران بستری
          </h4>
          <h6>
            <CountUp key={world.active} start={0} end={typeof world.active !== undefined && world.active} duration={2.5} separator=',' />

          </h6>
        </div>

        <div className={classes.statsBox1}>
          <h4>
            بیماران در شرایط وخیم
          </h4>
          <h6>
            <CountUp key={world.critical} start={0} end={typeof world.critical !== undefined && world.critical} duration={2.5} separator=',' />

          </h6>
        </div>

      </div>

      <div className={classes.date}>
        <h6 className={!dark ? classes.light : classes.dark}>
          {new Date(world.updated).toLocaleString('fa-ir')}
        </h6>
      </div>
    </div>
  )
}

export default WorldComponent
