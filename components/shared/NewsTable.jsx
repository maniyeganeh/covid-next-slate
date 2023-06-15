import React, { useContext, useRef, useEffect, useState, Fragment } from 'react'
import { FaRegPlusSquare } from 'react-icons/fa'
import Link from 'next/link'
import CovidContext from '../../store/covid-context'
import classes from './table.module.css'
import Pagination from '../../helpers/Paginate'
import AddModal from './AddModal'

const NewsTable = () => {
  const { getNews, news, deleteNews } = useContext(CovidContext)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage] = useState(10)
  const isMounted = useRef(null)
  const indexOfLast = currentPage * perPage
  const indexOfFirst = indexOfLast - perPage
  const currentNews = news.slice(indexOfFirst, indexOfLast)
  const paginate = pageNumber => {
    setCurrentPage(pageNumber)
  }
  useEffect(() => {
    let isCancelled = false
    const fetchData = async () => {
      try {
        if (!isCancelled) {
          await getNews()
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
    return () => isCancelled = true
  }, [news])
  return (
    <>

      <table className={` table table-bordered  table-striped table-hover  ${classes.table} `}>
        <thead className='thead-light'>
          <tr>
            <th scope='col' style={{ width: '30%' }}>
              تیتر خبر
            </th>
            <th scope='col' style={{ width: '20%' }}>
              سازنده خبر
            </th>
            <th scope='col' style={{ width: '20%' }}>
              تاریخ
            </th>
            <th scope='col' style={{ width: '20%' }} onClick={handleShow}>
              <FaRegPlusSquare />
            </th>
          </tr>
        </thead>
        <tbody className={`${classes.newsTd} td`}>
          {currentNews.map((nw, index) =>
            <tr key={index}>
              <td>
                <Link href={`/news/${nw._id}`}>
                  {nw.title}
                </Link>
              </td>
              <td>
                {nw.rec}
              </td>
              <td>
                {new Date(nw.createdAt).toLocaleDateString('fa-ir')}
              </td>
              <td>
                <button
                  className='btn btn-danger' onClick={() => {
                      deleteNews(nw._id)
                    }}
                >
                                    حذف
                </button>
              </td>
            </tr>
          )}
        </tbody>

      </table>
      <Pagination perPage={perPage} totalresults={news.length} paginate={paginate} currentPage={currentPage} />
      <AddModal type='news' handleClose={handleClose} show={show} />
    </>
  )
}

export default NewsTable
