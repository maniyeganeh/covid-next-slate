import React, { useContext, useEffect, useState, Fragment } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import CovidContext from '../../store/covid-context'
import Stats from '../../components/Stats'
import CountStats from '../../components/shared/CountStats'
import LoadingComponent from '../../components/shared/LoadingComponent'

const SingleCountry = () => {
  const [loading, setLoading] = useState(false)
  const { getSingleCountry, singleCountry, countryInfo, getIranChart, iranChart } = useContext(CovidContext)
  const router = useRouter()
  const country = router.query.countryname
  useEffect(() => {
    let isCanceled = false
    setLoading(true)
    const fetchData = async () => {
      try {
        if (!isCanceled) {
          await getSingleCountry(country)
          setLoading(false)
        }
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }
    fetchData()
    return () => isCanceled = true
  }, [country])
  useEffect(() => {
    let isCanceled = false
    setLoading(true)
    const fetchData = async () => {
      try {
        if (!isCanceled) {
          await getIranChart(country)
          setLoading(false)
        }
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }
    fetchData()
    return () => isCanceled = true
  }, [country])
  if (loading) {
    return <LoadingComponent title='لطفا منتظر بمانید...!' />
  }
  return (
    <>
      <Head>
        <link rel='icon' type='image/png' href='/img/logo.png' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content='آمار به روز ویروس کرونا ٫ وب اپ , اخبار ویروس' />
        <meta name='theme-color' content='#000000' />
        <meta name='keywords' content='کرونا٫ویروس٫سایت٫اپ , covid-19 , virus , corona' />
        <link rel='apple-touch-icon' href='/img/favicon/apple-icon.png' />
        <link rel='manifest' href='/manifest.json' />
        <title>
          ویروس کرونا |  {singleCountry.country}
        </title>
      </Head>
      <CountStats data={singleCountry} countryInfo={countryInfo} chartData={iranChart} />

    </>
  )
}

export default SingleCountry
