import React from 'react'
import Link from 'next/link'
import classes from '../components/shared/error.module.css'

const Custom404 = () => {
  return (
    <div className={`${classes.customdContainer} rtl`}>
      <h1>
        <span>
          {' '}
          ۴۰۴ | {' '}
        </span>
        {' '}
        صفحه مورد نظر یافت نشد!
      </h1>
      <Link href='/'>
        <button className='btn btn-info'>
          رفتن به صفحه اصلی
        </button>
      </Link>
    </div>
  )
}

export default Custom404
