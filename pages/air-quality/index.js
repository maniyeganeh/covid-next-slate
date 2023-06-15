import React, { Fragment, useContext, useEffect, useState } from 'react'
import CovidContext from '../../store/covid-context'
import AirQualityComponent from '../../components/AirQualityComponent'
import LoadingComponent from '../../components/shared/LoadingComponent'
import Head from 'next/head'
const AirQuality = () => {
  const { getAirQuality, airQuality } = useContext(CovidContext)
  const [lat, setLat] = useState()
  const [lon, setLon] = useState()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('Latitude is :', position.coords.latitude)
        console.log('Longitude is :', position.coords.longitude)
        setLat(position.coords.latitude)
        setLon(position.coords.longitude)
      }

      )
    } else {
      console.log('Not Found')
    }
  }, [lat, lon])
  useEffect(() => {
    let isCanceled = false
    setLoading(true)
    const fetchData = async () => {
      try {
        if (!isCanceled) {
          await getAirQuality(lat, lon)
          setLoading(false)
        }
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }
    fetchData()

    return () => isCanceled = true
  }, [])
  if (loading) {
    return <LoadingComponent title='لطفا منتظر بمانید...!' />
  }

  return (
    <Fragment>
      <Head>
        <title>
          ویروس کرونا | کیفیت هوا
        </title>
      </Head>

      <AirQualityComponent quality={airQuality} />
    </Fragment>


  )
}

export default AirQuality
