import React, { useContext, useEffect, Fragment } from 'react'
import PhaseHeader from '../../components/shared/PhaseHeader'
import VaccineTable from '../../components/shared/VaccineTable'
import CovidContext from '../../store/covid-context'
import Head from 'next/head'

const PhaseFour = () => {
  const { getPhaseFour, phaseFour } = useContext(CovidContext)
  useEffect(() => {
    let isCanceled = false
    const fetchData = async () => {
      try {
        if (!isCanceled) {
          await getPhaseFour()
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
        <meta name='keywords' content='کرونا٫ویروس٫سایت٫اپ' />
        <link rel='apple-touch-icon' href='/img/favicon/apple-icon.png' />
        <link rel='manifest' href='/manifest.json' />
        <title>
          ویروس کرونا |
          واکسن های فاز چهارم
        </title>
      </Head>
      <PhaseHeader
        title='لیست واکسن ­های فاز چهارم'
        link='  بازگشت'
        to=''
      >
        <VaccineTable results={phaseFour} />
      </PhaseHeader>
    </>
  )
}

export default PhaseFour
