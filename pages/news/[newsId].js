import React, { useContext, useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import SingleNewsComponent from '../../components/SingleNewsComponent'
import { getNewsHandler, getSingleNewsHandler } from '../../helpers/api-util'
import LoadingComponent from '../../components/shared/LoadingComponent'
import SkeletonNews from '../../components/shared/skeleton/SkeletonNews'

const SingleNews = props => {

  if (!props.news) {
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
          ویروس کرونا | {props.news.title}
        </title>
      </Head>
      <SingleNewsComponent singleNews={props.news} />
    </>

  )
}

export const getServerSideProps = async ({ res, query }) => {

  res.setHeader('Cache-Control', `s-maxage=60, stale-while-revalidate`)
  const newsId = query.newsId
  const news = await getSingleNewsHandler(newsId)

  return {
    props: {
      news,
    }
  }
}
// export const getStaticProps = async (context) => {
//   const newsId = context.params.newsId
//   const news = await getSingleNewsHandler(newsId)
//   if (!news) {
//     return {
//       notFound: true
//     }
//   }
//   return {
//     props: {
//       news: news
//     },
//     revalidate: 10
//   }
// }

// export async function getStaticPaths() {
//   const allNews = await getNewsHandler()

//   const paths = allNews.map(event => ({ params: { newsId: event._id } }))

//   return {
//     paths: paths,
//     fallback: 'blocking'
//   }
// }

export default SingleNews
