import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import classes from '../stats.module.css'
import CountUp from 'react-countup'
import Chart from '../shared/Chart'
import { FaExclamationTriangle } from 'react-icons/fa'
import AOS from 'aos'
import CovidContext from '../../store/covid-context'

const CountStats = props => {
  const { dark } = useContext(CovidContext)
  const { data, chartData, countryInfo } = props

  useEffect(() => {
    AOS.init()
  }, [])
  const mortality = parseFloat(data.deaths / data.cases * 100).toFixed(1)
  const infectionRisk = parseFloat(data.cases / data.population * 100).toFixed(2)
  return (
    <div className='rtl'>

      <div className={classes.countryName}>
        <div className={!dark ? classes.countryBox : `${classes.countryBox} ${classes.countryBoxDrk}`}>
          <h3>
            نام کشور :
            <span className={data.country === 'Iran' && classes.iran}>
              {data.country === 'Iran' ? 'ایران' : data.country}
            </span>

          </h3>
        </div>
        <div className={classes.countryBox}>
          <div className={!dark ? classes.countryImg : `${classes.countryImg} ${classes.countryImgDrk}`}>
            <img src={countryInfo.flag} loading='lazy' />
          </div>

        </div>
      </div>

      <div className={classes.statsContainer}>

        <div className={classes.statsRow} data-aos='flip-up'>

          <div className={!dark ? classes.statsBox : `${classes.statsBox} ${classes.statsBoxDrk}`}>
            <h4>
              <span style={{ marginLeft: '1%' }}>
                {data.todayCases > 10000 && <FaExclamationTriangle />}

              </span>

              تعداد مبتلایان جدید
            </h4>
            <h6>
              <CountUp key={data.country} start={0} end={typeof data.todayCases !== undefined && data.todayCases} duration={2.5} separator=',' /> +
            </h6>
          </div>
          <div className={!dark ? classes.statsBox : `${classes.statsBox} ${classes.statsBoxDrk}`}>
            <h4>
              آخرین آمار جانباختگان
            </h4>
            <h6>
              <CountUp key={data.country} start={0} end={typeof data.todayDeaths !== undefined && data.todayDeaths} duration={2.5} separator=',' /> +

            </h6>
          </div>

          <div className={!dark ? classes.statsBox : `${classes.statsBox} ${classes.statsBoxDrk}`}>
            <h4>
              بهبود یافتگان
            </h4>
            <h6>
              <CountUp key={data.country} start={0} end={typeof data.todayRecovered !== undefined && data.todayRecovered} duration={2.5} separator=',' /> +

            </h6>
          </div>

        </div>
        <div className={classes.statsRow} data-aos='flip-up'>
          <div className={!dark ? classes.statsBox : `${classes.statsBox} ${classes.statsBoxDrk}`}>
            <h4>
              تعداد کل مبتلایان
            </h4>
            <h6>
              <CountUp key={data.country} start={0} end={typeof data.cases !== undefined && data.cases} duration={2.5} separator=',' />

            </h6>

          </div>
          <div className={!dark ? classes.statsBox : `${classes.statsBox} ${classes.statsBoxDrk}`}>
            <h4>
              تعداد کل جانباختگان
            </h4>
            <h6>
              <CountUp key={data.country} start={0} end={typeof data.deaths !== undefined && data.deaths} duration={2.5} separator=',' />

            </h6>
          </div>

          <div className={!dark ? classes.statsBox : `${classes.statsBox} ${classes.statsBoxDrk}`}>
            <h4>
              تعداد کل بهبود یافتگان
            </h4>
            <h6>
              <CountUp key={data.country} start={0} end={typeof data.recovered !== undefined && data.recovered} duration={2.5} separator=',' />

            </h6>
          </div>

        </div>
        <div className={classes.statsRow1} data-aos='flip-up'>
          <div className={!dark ? classes.statsBox2 : `${classes.statsBox2} ${classes.statsBoxDrk1}`}>
            <h4>
              نسبت مرگ مبتلایان

            </h4>
            <h6>
              {mortality} %
            </h6>
          </div>
          <div className={!dark ? classes.statsBox2 : `${classes.statsBox2} ${classes.statsBoxDrk1}`}>
            <h4>
              خطر ابتلا به بیماری

            </h4>
            <h6>
              {infectionRisk} %
            </h6>
          </div>

        </div>
        {
                    data.country === 'Iran' &&
                      <div className={!dark ? classes.linkBtn : `${classes.linkBtn} ${classes.linkBtnDrk}`}>
                        <Link href='/vaccine/iranvaccine'>
                          <button className='btn btn-info'>
                            وضعیت تزریق واکسن در ایران
                          </button>
                        </Link>
                      </div>
                }
        <div className={!dark ? classes.date : `${classes.date} ${classes.dateDrk}`}>
          {new Date(data.updated).toLocaleString('fa-ir')}
        </div>

        <div className='container-fluid' style={{ width: '90%', height: '500px', marginTop: '4%' }}>
          <Chart data={chartData} />
        </div>

      </div>

    </div>
  )
}

export default CountStats
