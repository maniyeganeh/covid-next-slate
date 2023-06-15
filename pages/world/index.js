import React, { useContext, useEffect, useState, Fragment } from 'react'
import LoadingComponent from '../../components/shared/LoadingComponent'
import WorldComponent from '../../components/WorldComponent'
import CovidContext from '../../store/covid-context'
import Head from 'next/head'

const World = () => {
  const { getWorld } = useContext(CovidContext)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    let isCancelled = false
    setLoading(true)
    const fetchData = async () => {
      try {
        if (!isCancelled) {
          await getWorld()
          setLoading(false)
        }
      } catch (err) {
        console.log(err)
        setLoading(false)
      }
    }
    fetchData()
    return () => isCancelled = true
  }, [])

  if (loading) {
    return <LoadingComponent title='لطفا منتظر بمانید...!' />
  }
  return (
    <>
      <Head>
        <title>
          ویروس کرونا | آمار جهان
        </title>
      </Head>
      <WorldComponent />
    </>

  )
}

export default World
