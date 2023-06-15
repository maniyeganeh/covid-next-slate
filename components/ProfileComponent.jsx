import React, { useState } from 'react'
import AddVaccine from './AddVaccine'

import classes from './profile.module.css'
import NewsTable from './shared/NewsTable'
import UserDetail from './UserDetail'
import WorldVacTable from './WorldVacTable'

const ProfileComponent = ({ user, uid, logout }) => {
  const [showAddNews, setShowAddNews] = useState(false)
  const [showAddVaccine, setShowAddVaccine] = useState(false)
  const [showWorldVac, setShowWorldVac] = useState(false)
  const showNewsHandler = () => {
    setShowAddNews(true)
    setShowAddVaccine(false)
  }
  const showVaccineHandler = () => {
    setShowAddVaccine(true)
    setShowAddNews(false)
  }
  const showWorldVacHandler = () => {
    setShowWorldVac(true)
    setShowAddNews(false)
    setShowAddVaccine(false)
  }
  const showProfile = () => {
    setShowAddNews(false)
    setShowAddVaccine(false)
    setShowWorldVac(false)
  }

  let content
  if (showAddNews) {
    content = <NewsTable />
  } else if (showAddVaccine) {
    content = <AddVaccine />
  } else if (showWorldVac) {
    content = <WorldVacTable />
  } else {
    content = <UserDetail data={user} />
  }
  return (
    <div className={`${classes.profileContainer} rtl`}>
      <div className={classes.profileRow}>
        <div className={classes.profileBox}>
          <div className={classes.profileTitle}>
            <h5 onClick={showProfile}>
              {user.name}
            </h5>

          </div>
          <div className={classes.profileBtn}>
            <button onClick={showNewsHandler}>
              اضافه کردن خبر
            </button>
          </div>
          <div className={classes.profileBtn}>
            <button onClick={showVaccineHandler}>
              اضافه کردن واکسن
            </button>
          </div>
          <div className={classes.profileBtn}>
            <button onClick={showWorldVacHandler}>
              اضافه کردن آمار جهانی واکسن
            </button>
          </div>

          <div className={classes.logout}>
            <button className='btn btn-danger' onClick={logout}>
              خروج
            </button>
          </div>
        </div>
        <div className={classes.profileBox}>

          {content}
        </div>
      </div>

    </div>
  )
}

export default ProfileComponent
