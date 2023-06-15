import React, { Fragment, useContext, useEffect } from 'react'
import PhaseHeader from '../../components/shared/PhaseHeader'
import VaccineTable from '../../components/shared/VaccineTable'
import CovidContext from '../../store/covid-context'
import Head from 'next/head'
const PhaseThree = () => {
  const { getPhaseThree, phaseThree } = useContext(CovidContext)

  useEffect(() => {
    let isCanceled = false
    const fetchData = async () => {
      try {
        if (!isCanceled) {
          await getPhaseThree()
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
          واکسن های فاز سوم
        </title>
      </Head>
      <PhaseHeader
        title='لیست واکسن ­های فاز سوم'
        link='مشاهده لیست واکسن های فاز چهارم'
        to='phasefour'
      >
        <VaccineTable results={phaseThree} />
      </PhaseHeader>
    </>
  )
}

export default PhaseThree
