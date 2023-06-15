import React, { useContext, useEffect, useState } from 'react';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';

import CovidContext from '../store/covid-context';
import classes from './iranVaccine.module.css';
import Card from './shared/Card';
import LoadingComponent from './shared/LoadingComponent';
import VaccineChart from './shared/VaccineChart';
import AOS from 'aos';
import ShareIcon from './shared/Shareicon';
import { Col, Container, Row } from 'reactstrap';
import { useQuery } from 'react-query';
const IranVaccineComponent = () => {
  const [loading, setLoading] = useState(false);
  const [shareBtn, setshareBtn] = useState(false);
  const { iranLastVac, iranVacT, iranVac, getIranVaccine, dark } =
    useContext(CovidContext);
  const { data, status } = useQuery('iranVaccine', getIranVaccine, {
    refetchOnWindowFocus: 'always',
    notifyOnChangeProps: 'tracked',
    cacheTime: 5 * 60 * 1000,
  });

  // useEffect(() => {
  //   let isCanceled = false;
  //   setLoading(true);
  //   if (!isCanceled) {
  //     setTimeout(() => {
  //       const fetchData = async () => {
  //         try {
  //           if (!isCanceled) {
  //             await getIranVaccine();
  //             setLoading(false);
  //           }
  //         } catch (err) {
  //           console.log(err);
  //           setLoading(false);
  //         }
  //       };
  //       fetchData();
  //     }, 2000);
  //   }

  //   return () => (isCanceled = true);
  // }, []);
  useEffect(() => {
    AOS.init();
    if (window.navigator.share) {
      setshareBtn(true);
    } else {
      setshareBtn(false);
    }
  }, []);

  const vaccinate = `${parseFloat(
    (iranLastVac?.seconddose / 85190285) * 100
  ).toFixed(2)}`;
  const firstDose = `${parseFloat(
    (iranLastVac?.firstdose / 85190285) * 100
  ).toFixed(2)}`;
  const thirdDose = `${parseFloat(
    ((iranLastVac?.thirddose / 85190285) * 100).toFixed(2)
  )}`;

  const vaccineInjection = `${parseInt(iranLastVac.total - iranVacT.total)}`;

  if (status === 'loading') {
    return <LoadingComponent title="لطفا منتظر بمانید...!" />;
  }

  const shareButton = () => {
    if (navigator.share) {
      window.navigator
        .share({
          title: '             وضعیت تزریق واکسن در ایران',
          text: '      آمار به روز تزریق واکسن در ایران',

          url: document.location.href,
        })
        .then(() => {
          toast.success('با موفقیت ارسال شد');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div
      className={
        !dark
          ? `${classes.iranVacContainer} rtl`
          : `${classes.iranVacContainer} ${classes.iranDrk} rtl`
      }
    >
      <h3>وضعیت تزریق واکسن در ایران</h3>
      <h5>
        <span>
          آخرین به روز رسانی :{' '}
          {new Date(iranLastVac.createdAt).toLocaleDateString('fa-ir')}
        </span>
        {shareBtn && (
          <>
            -
            <span className={classes.icon}>
              <ShareIcon onClick={shareButton} />
            </span>
          </>
        )}
      </h5>

      <div className={classes.iranVacRow}>
        <div
          className={
            !dark
              ? classes.iranVacBox
              : `${classes.iranVacBox} ${classes.iranVacBoxDrk}`
          }
          data-aos="zoom-in"
          data-aos-duration="400"
        >
          <Card
            title="واکسن تزریق شده دوز اول"
            stats={iranLastVac.firstdose}
            bg="#273c75"
          />
        </div>
        <div
          className={
            !dark
              ? classes.iranVacBox
              : `${classes.iranVacBox} ${classes.iranVacBoxDrk}`
          }
          data-aos="zoom-in"
          data-aos-duration="450"
        >
          <Card
            title="واکسن تزریق شده دوز دوم"
            bg="#192a56"
            stats={iranLastVac.seconddose}
          />
        </div>
        <div
          className={
            !dark
              ? classes.iranVacBox
              : `${classes.iranVacBox} ${classes.iranVacBoxDrk}`
          }
          data-aos="zoom-in"
          data-aos-duration="450"
        >
          <Card
            title="واکسن تزریق شده دوز سوم یا بیشتر"
            bg="#10364a"
            stats={iranLastVac.thirddose}
          />
        </div>
      </div>
      <div className={classes.iranVacRow}>
        <div
          className={
            !dark
              ? classes.iranVacBox
              : `${classes.iranVacBox} ${classes.iranVacBoxDrk}`
          }
        >
          <Card
            title=" افرادی که حداقل یک دوز واکسن دریافت کردند      "
            bg="#1B262C"
            stats={firstDose}
            type="vaccinate"
          />
        </div>
        <div
          className={
            !dark
              ? classes.iranVacBox
              : `${classes.iranVacBox} ${classes.iranVacBoxDrk}`
          }
        >
          <Card
            title=" نسبت افراد واکسینه شده به جمعیت  "
            bg="#1B262C"
            stats={vaccinate}
            type="vaccinate"
          />
        </div>
        <div
          className={
            !dark
              ? classes.iranVacBox
              : `${classes.iranVacBox} ${classes.iranVacBoxDrk}`
          }
        >
          <Card
            title="افرادی که دوز سوم یا چهارم دریافت کردند"
            bg="#1B262C"
            stats={thirdDose}
            type="vaccinate"
          />
        </div>
      </div>
      <div className={classes.iranVacRow}>
        <div
          className={
            !dark
              ? classes.iranVacBox
              : `${classes.iranVacBox} ${classes.iranVacBoxDrk}`
          }
        >
          <Card
            title="       واکسن تزریق شده در شبانه روز گذشته  "
            bg="#10364a"
            stats={vaccineInjection}
          />
        </div>
        <div
          className={
            !dark
              ? classes.iranVacBox
              : `${classes.iranVacBox} ${classes.iranVacBoxDrk}`
          }
          data-aos="zoom-in"
          data-aos-duration="500"
        >
          <Card
            title="مجموع واکسن های تزریق شده"
            bg="#353b48"
            stats={iranLastVac.total}
          />
        </div>
      </div>

      <Container className={`${classes.progressContainer} rtl`}>
        <Row>
          <Col md="4" xs="4" sm="4">
            <div className={classes.progress}>
              <CircularProgressbarWithChildren
                value={firstDose}
                text={`${firstDose?.toLocaleString('fa-ir')}%`}
                strokeWidth={5}
                styles={buildStyles({
                  textColor: firstDose > 70 ? '#2c8558' : '#c23616',
                  pathColor: firstDose > 70 ? '#2c8558' : '#c23616',
                  trailColor: '#d2dae2',
                  pathTransitionDuration: 2,
                  textSize: '14px',
                })}
              ></CircularProgressbarWithChildren>
              <h3 className={dark && 'text-color-light'}>
                جمعیتی که دوز اول را دریافت کردند
              </h3>
            </div>
          </Col>
          <Col md="4" xs="4" sm="4">
            <div className={classes.progress}>
              <CircularProgressbarWithChildren
                value={vaccinate}
                text={`${vaccinate?.toLocaleString('fa-ir')}%`}
                strokeWidth={5}
                styles={buildStyles({
                  textColor: vaccinate > 75 ? '#2c8558' : '#c23616',
                  pathColor: vaccinate > 75 ? '#2c8558' : '#c23616',
                  trailColor: '#d2dae2',
                  pathTransitionDuration: 2,
                  textSize: '14px',
                })}
              ></CircularProgressbarWithChildren>

              <h3>نسبت افراد واکسینه شده به جمعیت</h3>
            </div>
          </Col>
          <Col md="4" xs="4" sm="4">
            <div className={classes.progress}>
              <CircularProgressbarWithChildren
                value={thirdDose}
                text={`${thirdDose?.toLocaleString('fa-ir')}%`}
                strokeWidth={5}
                styles={buildStyles({
                  textColor: thirdDose > 75 ? '#2c8558' : '#c23616',
                  pathColor: thirdDose > 75 ? '#2c8558' : '#c23616',
                  trailColor: '#d2dae2',
                  pathTransitionDuration: 2,
                  textSize: '14px',
                })}
              ></CircularProgressbarWithChildren>

              <h3>افرادی که دوز سوم را دریافت کردند</h3>
            </div>
          </Col>
        </Row>
      </Container>

      <div
        className="container-fluid"
        style={{ width: '100%', height: '500px', marginTop: '10%' }}
      >
        <hr />
        <VaccineChart data={data} />
      </div>
    </div>
  );
};

export default IranVaccineComponent;
