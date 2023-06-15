import React, { useContext, useEffect, useState, Fragment } from 'react'

import Head from 'next/head'
import LoadingComponent from '../../components/shared/LoadingComponent'
import WorldTable from '../../components/WorldTable'
import CovidContext from '../../store/covid-context'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'

const Countries = () => {
  const [loading, setLoading] = useState(false)
  const { countries, getCountries } = useContext(CovidContext)
  const { data, status } = useQuery('countries', getCountries, {
    cacheTime: 60 * 1000,
    staleTime: 1000,
    refetchOnWindowFocus: "always",
    refetchOnMount: "always",
    refetchInterval: 10 * 60 * 1000,

    notifyOnChangeProps: "tracked"


  })


  // useEffect(() => {
  //   let isCancelled = false
  //   setLoading(true)
  //   if (!isCancelled) {
  //     setTimeout(() => {
  //       const fetchData = async () => {
  //         try {
  //           if (!isCancelled) {
  //             await getCountries()
  //             setLoading(false)
  //           }
  //         } catch (err) {
  //           console.log(err)
  //           setLoading(false)
  //         }
  //       }
  //       fetchData()
  //     }, 2000)
  //   }

  //   return () => isCancelled = true
  // }, [])
  if (status === 'loading') {
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
          ویروس کرونا | جدول کشورها
        </title>
      </Head>
      <WorldTable results={data} />
    </>

  )
}

export default Countries

