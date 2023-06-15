import React, { Fragment, useContext } from 'react'
import CovidContext from '../../store/covid-context'

const VaccineTable = props => {
  const { dark } = useContext(CovidContext)
  const { results } = props

  const h = new Date()
  const bg = []

  if (dark) {
    bg.push('table-dark')
  }

  return (

    <div className='table-responsive rtl'>
      <table className={`table table-bordered  table-striped table-hover vaccine-table ${bg}`} style={{ marginTop: '2%', transition: 'linear 0.2s' }}>
        <thead className='thead-light' style={{ fontFamily: 'Peyda', textAlign: 'center' }}>
          <tr>
            <th scope='col'>
              #
            </th>
            <th scope='col'>
              نام شرکت تحقیق و تولید واکسن
            </th>
            <th scope='col'>
              نوع واکسن
            </th>
            <th scope='col'>
              توضیحات (به زبان انگلیسی منتشر شده.)
            </th>
            <th scope='col'>
              آخرین به روز رسانی
            </th>
            <th>

              مرجع

            </th>

          </tr>

        </thead>
        <tbody className='td' style={{ fontFamily: 'IranYekan-Light', textAlign: 'center' }}>
          {results.map((result, index) => (
            <Fragment key={index}>
              <tr>
                <td>
                  {index + 1}
                </td>

                <td>
                  <p>
                    {result.developerResearcher === 'University of Oxford, Oxford Biomedica, … [+187]' ? 'Oxford-ASTRAZENECA' : result.developerResearcher}

                  </p>
                  <p>
                    {result.developerResearcher === 'Janssen Pharmaceutical Companies/ Beth I… [+134]' && 'Janssen Pharmaceutica (Johnson & Johnson)'}
                  </p>
                </td>
                <td className='td-pr'>
                  <p>
                    {(result.category === 'Protein subunit') ? '  بر پایه زیر مجموعه های پروتئین' : null}

                  </p>
                  <p>
                    {(result.category === 'Non-replicating viral vector')
                        ? ' وکتور غیر تکثیرشونده (استفاده از ویروس دیگر جهت حمل ژن های ویروس) '

                        :null}
                  </p>
                  <p>
                    {(result.category === 'RNA-based vaccine') ? 'واکسن ژنتیکی بر پایه RNA' : null}
                  </p>

                  <p>
                    {(result.category === 'Inactivated virus') ? ' ویروس غیرفعال' : null}
                  </p>
                  <p>
                    {(result.category === 'Replicating viral vector') ? '  وکتور های تکثیر شونده' : null}
                  </p>
                  <p>
                    {(result.category === 'DNA-based') ? '     واکسن ژنتیکی بر پایه DNA' : null}
                  </p>
                  <p>
                    {(result.category === 'Live attenuated virus') ? '      ویروس فعال تضعیف شده  ' : null}
                  </p>
                  <p>
                    {(result.category === 'Virus-like particle') ? '      واکسن نانو پارتیکلی ' : null}
                  </p>
                </td>
                <td>
                  {result.description}
                </td>
                <td style={{ fontFamily: 'Peyda' }}>
                  {new Date(result.lastUpdated).toLocaleDateString('fa-ir')}
                </td>
                <td>
                  <a href='https://vaccovid.live/vaccine-tracker' rel='noopener noreferrer' className='td-a' target='_blank' style={{ color: '#00a8ff', fontSize: '15px' }}>
                    اطلاعات بیشتر
                                </a>
                </td>
              </tr>
            </Fragment>
          ))}

          <tr />

        </tbody>

      </table>

    </div>

  )
}

export default VaccineTable
