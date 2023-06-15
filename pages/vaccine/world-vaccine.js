import React, { Fragment, useContext, useEffect, useState } from 'react'
import LoadingComponent from '../../components/shared/LoadingComponent'
import WorldVaccineComponent from '../../components/world-vaccine/WorldVaccineComponent'
import CovidContext from '../../store/covid-context'
import Head from 'next/head'
const WorldVaccine = () => {
  const { getWorldVac, worldVac } = useContext(CovidContext)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    let isCancelled = false
    setLoading(true)
    if (!isCancelled) {
      const fetchData = async () => {
        try {
          await getWorldVac()

          setLoading(false)
        } catch (err) {
          console.log(err)
          setLoading(false)
        }
      }
      fetchData()
    }
    return () => isCancelled = true
  }, [])
  if (loading) {
    return <LoadingComponent title='لطفا منتظر بمانید...!' />
  }
  return (
    <>
      <Head>
        <title>
          ویروس کرونا | آمار میزان واکسیناسیون در جهان
        </title>
      </Head>

      <WorldVaccineComponent data={worldVac} />
    </>
  )
}

export default WorldVaccine
