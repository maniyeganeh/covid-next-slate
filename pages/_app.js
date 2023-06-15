import React, { useEffect } from 'react'
import Router from "next/router"
import Head from 'next/head'
import ReactGa from 'react-ga'
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-circular-progressbar/dist/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-v4-rtl/dist/css/bootstrap-rtl.min.css'
import '../styles/globals.css'
import 'aos/dist/aos.css'
import Layout from '../components/layout/Layout'
import { CovidContextProvider } from '../store/covid-context'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AnimatePresence } from 'framer-motion'
import NProgress from "nprogress"
const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  const publicVapidKey = 'BHBG2R_5emryh07CQE-a4j4Ck-bmhM2y9gM2_1RMOVacTO96t4eS16w_Bs-P4b174E9E-X5CIWGUJWWwrkgZnVk'

  const send = async () => {
    const register = await navigator.serviceWorker.register('/serviceworker.js', {
      scope: '/'
    })

    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })

    await fetch('https://api.maniyeganeh.ir/api/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'content-type': 'application/json',
        'sec-fetch-mode': 'cors'
      },
      mode: 'cors'

    })
  }
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/')

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/serviceworker.js', { scope: '/' })
          .then((reg) => { })
          .catch((err) => console.log('Failure:', err))
      })
      window.addEventListener('install', () => {
        navigator.serviceWorker.register('/serviceworker.js', { scope: '/' })
          .then(reg => console.log(reg))
          .catch(err => console.log(err))
      })
      send().catch(err => {
        console.log(err)
      })
    }
  }, [])
  useEffect(() => {
    ReactGa.initialize('UA-152054343-2')
    ReactGa.pageview('/')
  }, [])
  NProgress.configure({ showSpinner: false, easing: 'ease', speed: 500 })
  Router.events.on('routeChangeStart', () => NProgress.start())
  Router.events.on('routeChangeComplete', () => NProgress.done())
  Router.events.on('routeChangeError', () => NProgress.done());
  return (
    <CovidContextProvider>

      <Head>
        <link rel='stylesheet' href="/nprogress.css" crossOrigin='anonymous' referrerPolicy='no-referrer' />

        <link rel='manifest' href='/manifest.json' />
        <title>ویروس کرونا </title>
      </Head>

      <>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />

          <AnimatePresence exitBeforeEnter>
            <Layout>
              <Component {...pageProps} />

            </Layout>
          </AnimatePresence>
          <ToastContainer />
        </QueryClientProvider>
      </>

    </CovidContextProvider>
  )
}

export default MyApp
MyApp.getInitialProps = async (ctx) => {

  const { Component, router } = ctx

  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps }
}