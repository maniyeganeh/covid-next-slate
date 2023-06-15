import React, { Fragment, useContext, useEffect, useState } from 'react';
import AOS from 'aos';
import CovidContext from '../store/covid-context';
import classes from './landing.module.css';
import Chart from './shared/Chart';
import Link from 'next/link';
import { FaChevronLeft } from 'react-icons/fa';
import NewsLanding from './NewsLanding';
import Image from 'next/image';
import LandingMobile from './LandingMobile';
import LoadingComponent from './shared/LoadingComponent';
import { motion } from 'framer-motion';
import { useQueries, useQuery } from 'react-query';

const varinats = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const item = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
  transition: {
    duration: 0.8,
  },
};
const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const { getIranChart, iranChart, getNews, news, dark } =
    useContext(CovidContext);

  const results = useQueries([
    {
      queryKey: ['iran'],

      queryFn: () => getIranChart('iran'),
      config: {
        cacheTime: 5 * 60 * 1000,

        notifyOnChangeProps: 'tracked',

        onSuccess: () => setLoading(false),
        onError: () => setLoading(false),
      },
    },
    {
      queryKey: ['news'],
      queryFn: () => getNews(1, 4),
      config: {
        notifyOnChangeProps: 'tracked',

        onSuccess: () => setLoading(false),
        onError: () => setLoading(false),
      },
    },
  ]);

  // useEffect(() => {
  //   let isCancelled = false;
  //   const fetchData = async () => {
  //     try {
  //       if (!isCancelled) {
  //         await getIranChart("iran");

  //         setLoading(false);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  //   return () => (isCancelled = true);
  // }, []);
  // useEffect(() => {
  //   let unMounted = false;
  //   setTimeout(() => {
  //     const fetchData = async () => {
  //       try {
  //         if (!unMounted) {
  //           await getNews();
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     fetchData();
  //   }, 3000);

  //   return () => (unMounted = true);
  // }, []);
  useEffect(() => {
    AOS.init();
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <>
      <div className={`${classes.landingContainer} rtl container-fluid`}>
        <motion.div
          variants={varinats}
          initial="hidden"
          animate="show"
          className={classes.landingRow}
        >
          <motion.div
            variants={item}
            // initial={{ opacity: 0, x: 80 }}
            // animate={{ opacity: 1, x: 0 }}
            // transition={{ type: "spring", duration: 0.3 }}
            className={
              !dark
                ? classes.landingBox
                : `${classes.landingBox} ${classes.darkMode}`
            }
          >
            <div className={classes.titleRow}>
              <div className={classes.titleBox} style={{ marginTop: '1%' }}>
                <h6 style={{ fontSize: '18px' }}>آخرین اخبار</h6>
              </div>
              <div className={classes.titleBox}>
                <Link href="/news" className={classes.click}>
                  <a className={classes.click}>
                    <FaChevronLeft />
                  </a>
                </Link>
              </div>
            </div>
            <hr />
            <NewsLanding data={results[1].data} status={results[1].status} />
          </motion.div>

          <motion.div
            variants={item}
            // initial={{ opacity: 0, x: -80 }}
            // animate={{ opacity: 1, x: 0 }}
            // transition={{ type: "spring", duration: 0.3 }}
            className={
              !dark
                ? classes.landingBox
                : `${classes.landingBox} ${classes.darkMode}`
            }
          >
            <div className={classes.titleRow}>
              <div className={classes.titleBox}>
                <h6>نمودار وضعیت ویروس کرونا در کشور</h6>
              </div>
              <div className={classes.titleBox}>
                <Link href="/stats" className={classes.click}>
                  <a className={classes.click}>
                    <FaChevronLeft />
                  </a>
                </Link>
              </div>
            </div>
            <hr />
            <Chart data={iranChart} />
          </motion.div>
        </motion.div>

        <motion.div
          variants={varinats}
          initial="hidden"
          animate="show"
          className={classes.landingRow1}
          data-aos="fade-in"
        >
          <Link href="/countries">
            <motion.div
              variants={varinats}
              className={
                !dark
                  ? classes.landingBox1
                  : `${classes.landingBox1} ${classes.darkMode}`
              }
            >
              <div className={classes.boxImg}>
                <Image src="/img/table.png" width="100%" height="100%" />
              </div>
              <h4>جدول کشور ها</h4>
            </motion.div>
          </Link>
          <Link href="/map">
            <motion.div
              variants={varinats}
              className={
                !dark
                  ? classes.landingBox1
                  : `${classes.landingBox1} ${classes.darkMode}`
              }
            >
              <div className={classes.boxImg}>
                <Image src="/img/map.png" width="100%" height="100%" />
              </div>
              <h4>نقشه ویروس</h4>
            </motion.div>
          </Link>
          <Link href="/vaccine">
            <motion.div
              variants={varinats}
              className={
                !dark
                  ? classes.landingBox1
                  : `${classes.landingBox1} ${classes.darkMode}`
              }
            >
              <div className={classes.boxImg}>
                <Image src="/img/vaccine.png" width="100%" height="100%" />
              </div>
              <h4>از واکسن چه خبر؟!</h4>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      <LandingMobile />
    </>
  );
};

export default LandingPage;
