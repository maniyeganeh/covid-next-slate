import React, { Fragment } from 'react'
import Head from 'next/head'
import IranVaccineComponent from '../../components/IranVaccineComponent'

const IranVaccine = () => {
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
          وضعیت واکسن در ایران
        </title>
      </Head>
      <IranVaccineComponent />
    </>

  )
}

export default IranVaccine
