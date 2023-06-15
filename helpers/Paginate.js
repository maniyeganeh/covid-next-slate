import React from 'react'
import classes from './paginate.module.css'
const Pagination = ({ perPage, totalresults, paginate, currentPage }) => {
  const pageNumber = []
  for (let i = 1; i <= Math.ceil(totalresults / perPage); i++) {
    pageNumber.push(i)
  }

  return (
    <div className='table-responsive rtl'>
      <nav className='Page navigation justify-content-end pagination-sm'>
        <ul className={classes.pagination}>
          {
                        pageNumber.map(number => (
                          <li key={number} className={number === currentPage ? 'page-item active' : 'page-item'}>
                            <a
                              href='#!' className='page-link '
                              style={{ fontFamily: 'IranYekan-Light' }}
                              onClick={() => paginate(number)}
                            >
                              {number}
                            </a>
                          </li>
                        ))
                    }
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
