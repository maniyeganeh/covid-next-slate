import React, { Fragment, useContext, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import classes from './worldVac.module.css'
import CovidContext from '../store/covid-context'
import InputComponent from './shared/InputComponent'
const WorldVacTable = () => {
  const { getWorldVac, worldVac, editStats } = useContext(CovidContext)
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [first, setFirst] = useState('')
  const [second, setSecond] = useState('')
  const changeFirst = e => setFirst(e.target.value)
  const changeSecond = e => setSecond(e.target.value)
  useEffect(() => {
    let isCancelled = false
    const fetchData = async () => {
      try {
        if (!isCancelled) {
          await getWorldVac()
        }
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
    return () => isCancelled = true
  }, [])
  useEffect(() => {
    worldVac.map(vac => {
      setFirst(vac.firstDose)
      setSecond(vac.secondDose)
    })
  }, [])

  const submitEdit = async (id, first, second) => {
    await editStats(id, first, second)
  }
  return (
    <>
      {worldVac.map((vac, index) => (
        <div key={index} className={classes.formContainer}>
          <form className={classes.formRow}>
            <div className={classes.inputGroup}>
              <InputComponent inputType='text' name='id' place='First Dose' value={vac._id} />
            </div>
            <div className={classes.inputGroup}>
              <InputComponent inputType='number' name='firstDose' place='First Dose' value={first} change={changeFirst} />
            </div>
            <div className={classes.inputGroup}>
              <InputComponent inputType='number' name='secondDose' place='First Dose' value={second} change={changeSecond} />
            </div>
            <button
              className='btn btn-success' onClick={() => {
                submitEdit(vac._id, first, second)
              }}
            >
              Send
            </button>
          </form>
        </div>
      ))}

      <table className={` table table-bordered  table-striped table-hover  ${classes.table} `}>
        <thead className='thead-light'>
          <tr>
            <th scope='col' style={{ width: '30%' }}>
              #
            </th>
            <th scope='col' style={{ width: '30%' }}>
              دوز اول
            </th>
            <th scope='col' style={{ width: '20%' }}>
              دوز دوم
            </th>
            <th scope='col' style={{ width: '20%' }}>
              تاریخ
            </th>
            <th scope='col' style={{ width: '20%' }} onClick={handleShow}>
              -
            </th>
          </tr>
        </thead>
        <tbody className={`${classes.newsTd} td`}>
          {worldVac.map((nw, index) =>
            <tr key={index}>
              <td>

                {nw._id}

              </td>
              <td>

                {nw.firstDose}

              </td>
              <td>
                {nw.secondDose}
              </td>
              <td>
                {new Date(nw.updatedAt).toLocaleString('fa-ir')}
              </td>
              <td>
                <FaEdit />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default WorldVacTable
