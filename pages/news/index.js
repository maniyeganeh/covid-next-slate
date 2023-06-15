import React, { useContext, useEffect, Fragment, useState } from 'react'
import { useQuery } from 'react-query'

import Head from 'next/head'
import NewsGrid from '../../components/NewsGrid'
import CovidContext from '../../store/covid-context'
import SkeletonGrid from '../../components/shared/skeleton/SkeletonGrid'
const News = () => {
  const { getNews, news, next } = useContext(CovidContext)


  const { news: data, status } = useQuery('news', () => getNews(1, 12), {


    refetchOnWindowFocus: "always",
    notifyOnChangeProps: "tracked",

  })
  // useEffect(() => {
  //   getNews(next?.page || 1, 5)
  // }, [])

  if (status === 'loading') {
    return <SkeletonGrid type='grid' />
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
          ویروس کرونا | اخبار
        </title>
      </Head>
      <NewsGrid data={news} />
    </>

  )
}

export default News
