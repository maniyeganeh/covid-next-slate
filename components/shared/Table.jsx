import React, { Fragment, useContext } from 'react'
import CountUp from 'react-countup'
import Link from 'next/link'
import classes from './table.module.css'
import CovidContext from '../../store/covid-context'
import millify from 'millify'
const Table = ({ results }) => {
  const { filteredCountry, dark } = useContext(CovidContext)

  const h = new Date()
  const bg = []

  if (dark) {
    bg.push('table-dark')
  }

  return (
  //         <div className="table-responsive rtl">

  //         <table className={` table table-bordered  table-hover ${classes.table} ${bg} `} style={{
  //             transition: "linear 0.2s"
  //         }}>
  //             <thead className={`thead-light`} >
  //                 <tr>

  //                     <th scope="col" >
  //                         اسم کشور
  //                </th>
  //                     <th scope="col">
  //                         تعداد مبتلایان جدید
  //                </th>
  //                     <th scope="col">
  //                         آخرین آمار جانباختگان
  //                    </th>
  //                     <th scope="col">
  //                         بهبود یافتگان
  //                </th>
  //                     <th scope="col">
  //                         تعداد کل مبتلایان

  //                </th>
  //                     <th scope="col">
  //                         تعداد کل جانباختگان
  //                </th>
  //                <th scope="col">
  //                            تست های انجام شده
  //                </th>
  //                     <th scope="col">
  //                         بیماران در شرایط وخیم
  //                </th>
  //                     <th scope="col">
  //                         روز
  //                </th>
  //                     <th scope="col">
  //                         جمعیت کشور
  //                </th>

  //                 </tr>
  //             </thead>
  //             <tbody className="td">

  //                  {results.map((result,index) => (
  //                     <Fragment key={index}>
  //                         <tr>

  //                             <td style={{backgroundSize:"cover" , backgroundPosition:"center" , backgroundColor:"grey" , backgroundBlendMode:"multiply"}}>

  //                                 {result.Country}
  //                             </td>

  //                             <td className={result.NewCases > 20000 && classes.deaths}>
  //                                 <CountUp key={result.Country} separator={","} end={`${result.NewCases === null ? 0 :result.NewCases}`} duration={1} />
  //                             </td>
  //                             <td className={result.NewDeaths > 400 && classes.NewDeaths}>
  //                                 {result.NewDeaths === null ? 0 : result.NewDeaths}

  //                             </td>
  //                             <td>
  //                                 <CountUp key={result.Country} separator={","} end={`${result.NewRecovered}`} />
  //                             </td>
  //                             <td>
  //                                 <CountUp key={result.Country} separator={","} end={`${result.TotalCases}`} />

  //                             </td>
  //                             <td>
  //                                 <CountUp key={result.Country} separator={","} end={`${result.TotalDeaths}`} />

  //                             </td>
  //                             <td>
  //                             {millify(result.TotalTests)}
  //                             </td>
  //                             <td>
  //                                 <CountUp key={result.Country} separator={","} end={`${result.Serious_Critical}`} />

  //                             </td>
  //                             <td style={{fontFamily:"Peyda"}}>
  //                                 {new Date().toLocaleString("fa-ir")}
  //                             </td>
  //                             <td>
  //                                 {millify(result.Population)}
  //                                 {/* <CountUp key={result.country} separator={","} start={result.population} end={`${parseInt(result.population)}`} /> */}

  //                             </td>
  //                         </tr>

  //                     </Fragment>

  //                 ))}

  //                 {/* <tr> */}

  //                 {/* <td>
  //                     {result.country}
  //                 </td>
  //                 <td>
  //                    <CountUp key={result.country} separahrefr={","} end= {result.cases.new} duration={1}/>
  //                 </td>
  //                 <td>
  //                     {result.deaths.new === null ? 0 : result.deaths.new}
  //                 </td>
  //                 <td>
  //                     <CountUp key={result.country} separahrefr={","} end={result.cases.recovered}/>
  //                 </td>
  //                 <td>
  //                 <CountUp key={result.country} separahrefr={","} end={result.cases.hreftal}/>

  //                 </td>
  //                 <td>
  //                 <CountUp key={result.country} separahrefr={","} end={result.deaths.hreftal}/>

  //                 </td>
  //                 <td>
  //                     {result.day}
  //                 </td>
  //                 <td>
  //                 <CountUp key={result.country} separahrefr={","} start={result.population} end={result.population}/>

  //                 </td> */}
  //                 {/* </tr> */}
  //             </tbody>
  //         </table>

  // </div>

    <div className='table-responsive rtl'>

      <table
        className={` table table-bordered  table-hover ${classes.table} ${bg} `} style={{
          transition: 'linear 0.2s'
        }}
      >
        <thead className='thead-light'>
          <tr>

            <th scope='col'>
              اسم کشور
            </th>
            <th scope='col'>
              تعداد مبتلایان جدید
            </th>
            <th scope='col'>
              آخرین آمار جانباختگان
            </th>
            <th scope='col'>
              بهبود یافتگان
            </th>
            <th scope='col'>
              تعداد کل مبتلایان

            </th>
            <th scope='col'>
              تعداد کل جانباختگان
            </th>
            <th scope='col'>
              تست های انجام شده
            </th>
            <th scope='col'>
              بیماران در شرایط وخیم
            </th>
            <th scope='col'>
              روز
            </th>
            <th scope='col'>
              جمعیت کشور
            </th>

          </tr>
        </thead>
        <tbody className='td'>

          {results.map((result, index) => (
            <Fragment key={index}>
              <tr>

                <td style={{ backgroundImage: `url(${result.countryInfo.flag})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'grey', backgroundBlendMode: 'multiply' }}>
                  <Link href={`/countries/${result.country.toLowerCase()}`} className={`${bg}`} style={{ background: 'none', width: '100%', textDecoration: 'underline', color: '#fff' }}>
                    {result.country}
                  </Link>
                </td>

                <td className={result.todayCases > 20000 && classes.deaths}>
                  <CountUp key={result.country} separator=',' end={`${result.todayCases === null ? 0 : result.todayCases}`} duration={1} />
                </td>
                <td className={result.todayDeaths > 400 && classes.deaths}>
                  {result.todayDeaths === null ? 0 : result.todayDeaths}

                </td>
                <td>
                  <CountUp key={result.country} separator=',' end={`${result.recovered}`} />
                </td>
                <td>
                  <CountUp key={result.country} separator=',' end={`${result.cases}`} />

                </td>
                <td>
                  <CountUp key={result.country} separator=',' end={`${result.deaths}`} />

                </td>
                <td>
                  {millify(result.tests)}
                </td>
                <td>
                  <CountUp key={result.country} separator=',' end={`${result.critical}`} />

                </td>
                <td style={{ fontFamily: 'Peyda' }}>
                  {new Date(result.updated).toLocaleString('fa-ir')}
                </td>
                <td>
                  {millify(result.population)}
                  {/* <CountUp key={result.country} separator={","} start={result.population} end={`${parseInt(result.population)}`} /> */}

                </td>
              </tr>

            </Fragment>

          ))}

          {/* <tr> */}

          {/* <td>
                            {result.country}
                        </td>
                        <td>
                           <CountUp key={result.country} separahrefr={","} end= {result.cases.new} duration={1}/>
                        </td>
                        <td>
                            {result.deaths.new === null ? 0 : result.deaths.new}
                        </td>
                        <td>
                            <CountUp key={result.country} separahrefr={","} end={result.cases.recovered}/>
                        </td>
                        <td>
                        <CountUp key={result.country} separahrefr={","} end={result.cases.hreftal}/>

                        </td>
                        <td>
                        <CountUp key={result.country} separahrefr={","} end={result.deaths.hreftal}/>

                        </td>
                        <td>
                            {result.day}
                        </td>
                        <td>
                        <CountUp key={result.country} separahrefr={","} start={result.population} end={result.population}/>

                        </td> */}
          {/* </tr> */}
        </tbody>
      </table>

    </div>
  )
}

export default Table
