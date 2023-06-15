import React, { Fragment, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import CovidContext from '../../store/covid-context'
import ProfileComponent from '../../components/ProfileComponent'
const Profile = () => {
  const { getUser, userId, user, logout } = useContext(CovidContext)
  const router = useRouter()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await getUser(userId)
      } catch (err) {
        console.log(err)
      }
    }
    fetchUser()
  }, [])
  useEffect(() => {
    if (!userId) {
      router.push('/user/login')
    }
  }, [])

  return (
    <>
      <Head>
        <link rel='icon' type='image/png' href='/img/logo.png' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content='آمار به روز ویروس کرونا ٫ وب اپ' />
        <meta name='theme-color' content='#000000' />
        <meta name='keywords' content='کرونا٫ویروس٫سایت٫اپ , covid-19 , virus , corona' />
        <link rel='apple-touch-icon' href='/img/favicon/apple-icon.png' />
        <link rel='manifest' href='/manifest.json' />
        <title>
          ویروس کرونا | {user.name}
        </title>
      </Head>
      <ProfileComponent user={user} uid={userId} logout={logout} />

    </>

  )
}

export default Profile
