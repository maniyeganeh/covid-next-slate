import React, { useContext } from 'react'
import CovidContext from '../../../store/covid-context'
import classes from './error.module.css'
import Link from 'next/link'
const ErrorComponent = () => {
  const { dark } = useContext(CovidContext)
  return (
    <div className={!dark ? classes.errorContainer : `${classes.errorContainer} ${classes.errorContainerDark}`}>
      <div className={classes.errorBox}>
        <h3>
          متاسفانه سرویس جدول کشور ها از دسترس خارج شده است٫ لطفا مجدد تلاش کنید
        </h3>
        <h5>
          در تلاش برای رفع این مشکل هستیم.
        </h5>
        <Link href='/'>
          <button>
            رفتن به صفحه اصلی
          </button>
        </Link>

      </div>
    </div>
  )
}

export default ErrorComponent
