import React, { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import VaccineComponent from '../../components/VaccineComponent'
import CovidContext from '../../store/covid-context'
import LoadingComponent from '../../components/shared/LoadingComponent'

const Vaccine = () => {
  const [loading, setLoading] = useState(true)
  const { getVaccines } = useContext(CovidContext)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2100)
    return () => clearTimeout(timer)
  }, [])
  useEffect(() => {
    let isCanceled = false
    const fetchData = async () => {
      try {
        if (!isCanceled) {
          await getVaccines()
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
    return () => isCanceled = true
  }, [])
  if (loading) {
    return <LoadingComponent title='لطفا منتظر بمانید...!' />
  }
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
          واکسن
        </title>
      </Head>
      <VaccineComponent />
    </>

  )
}

export default Vaccine
