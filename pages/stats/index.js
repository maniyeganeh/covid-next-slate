import React, { useContext, createRef, useEffect, useState, Fragment } from 'react'
import Head from 'next/head'
import CovidContext from '../../store/covid-context'
import Stats from '../../components/Stats'
import LoadingComponent from '../../components/shared/LoadingComponent'
import html2canvas from "html2canvas";
import { FaCamera } from "react-icons/fa"
import classes from "./style.module.css"
import { Spinner } from "reactstrap";

const IranStats = props => {
  const [loading, setLoading] = useState(false)
  const [saveLoad, setSaveLoad] = useState(false)
  const { getIranStats, iranStats, iranChart } = useContext(CovidContext)


  useEffect(() => {
    let isCancelled = false
    setLoading(true)
    if (!isCancelled) {
      setTimeout(() => {
        const fetchData = async () => {
          try {
            if (!isCancelled) {
              await getIranStats()
              setLoading(false)
            }
          } catch (err) {
            console.log(err)
            setLoading(false)
          }
        }
        fetchData()
      }, 2000)
    }
    return () => isCancelled = true
  }, [])
  if (loading) {
    return <LoadingComponent title='لطفا منتظر بمانید...!' />
  }
  const exportAsPicture = () => {
    var html = document.getElementsByTagName('HTML')[0]
    var body = document.getElementsByTagName('BODY')[0]
    var htmlWidth = html.clientWidth;
    var bodyWidth = body.clientWidth;

    var data = document.getElementById('exportContainer')
    var newWidth = data.scrollWidth - data.clientWidth


    if (newWidth > data.clientWidth) {
      htmlWidth += newWidth
      bodyWidth += newWidth
    }

    html.style.width = htmlWidth + 'px'
    body.style.width = bodyWidth + 'px'


    html2canvas(data).then((canvas) => {
      setSaveLoad(true)
      var image = canvas.toDataURL('image/png', 1.0);
      setSaveLoad(false)
      return image
    }).then((image) => {
      setSaveLoad(true)
      saveAs(image, 'dailystats.png')
      html.style.width = null
      body.style.width = null
    })
    setSaveLoad(false)
  }

  const saveAs = (blob, fileName) => {
    var elem = window.document.createElement('a');
    elem.href = blob
    elem.download = fileName;
    elem.style = 'display:none;';
    (document.body || document.documentElement).appendChild(elem);
    if (typeof elem.click === 'function') {
      elem.click();
    } else {
      elem.target = '_blank';
      elem.dispatchEvent(new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      }));
    }
    URL.revokeObjectURL(elem.href);
    elem.remove()
  }


  return (
    <>
      <Head>
        <link rel='icon' type='image/png' href='/img/logo.png' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content='آمار به روز ویروس کرونا ٫ وب اپ , اخبار ویروس' />
        <meta name='theme-color' content='#000000' />
        <meta name='keywords' content='کرونا٫ویروس٫سایت٫اپ , covid-19 , virus , corona' />
        <link rel='apple-touch-icon' href='/img/favicon/apple-icon.png' />
        <link rel='manifest' href='/manifest.json' />
        <title>
          ویروس کرونا |  آمار کشور ایران
        </title>
      </Head>
      <div className={classes.container} id="exportContainer" >
        <Stats data={iranStats} chartData={iranChart} />

      </div>
      <div className={classes.buttonContainer} onClick={exportAsPicture}>
        <button>
          {
            saveLoad ?
              <Spinner />
              :
              <FaCamera />
          }
        </button>

      </div>
    </>
  )
}
//  export const getStaticProps = async() => {
//      const statsData = await getIranStatsDataHandler()
//      console.log(statsData);
//      return{
//          props:{
//              statsData:statsData
//          }
//      }

//  }
export default IranStats
