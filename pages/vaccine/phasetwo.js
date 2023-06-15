import React, { useEffect, Fragment, useContext } from 'react'
import PhaseHeader from '../../components/shared/PhaseHeader'
import VaccineTable from '../../components/shared/VaccineTable'
import CovidContext from '../../store/covid-context'
import Head from 'next/head'
const PhaseTwo = () => {
  const { getPhaseTwo, phaseTwo } = useContext(CovidContext)

  useEffect(() => {
    let isCanceled = false
    const fetchData = async () => {
      try {
        if (!isCanceled) {
          await getPhaseTwo()
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
    return () => isCanceled = true
  }, [])
  return (
    <>
      <Head>
        <link rel='icon' type='image/png' href='/img/logo.png' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content='آمار به روز ویروس کرونا ٫ وب اپ' />
        <meta name='theme-color' content='#000000' />
        <meta name='keywords' content='کرونا٫ویروس٫سایت٫اپ , covid-19 , virus , corona' />
        <link rel='apple-touch-icon' href='/img/favicon/apple-icon.png' />
        <link rel='manifest' href='/manifest.json' />
        <title>
          ویروس کرونا |
          واکسن های فاز دوم
        </title>
      </Head>
      <PhaseHeader
        title='لیست واکسن ­های فاز دوم'
        link='مشاهده لیست واکسن های فاز سوم'
        to='phasethree'
      >
        <VaccineTable results={phaseTwo} />
      </PhaseHeader>
    </>
  )
}

export default PhaseTwo
