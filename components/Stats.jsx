import React, { useContext, useEffect } from "react";
import Link from "next/link";
import classes from "./stats.module.css";
import CountUp from "react-countup";
import { FaExclamationTriangle } from "react-icons/fa";
import AOS from "aos";
import Chart from "./shared/Chart";
import CovidContext from "../store/covid-context";
import { motion } from "framer-motion";

const Stats = (props) => {
  const { data, chartData } = props;
  const { dark } = useContext(CovidContext);
  useEffect(() => {
    AOS.init();
  }, []);
  const variants = {
    hidden: {
      opacity: 0,
      x: -20,
      transition: {
        when: "afterChildren",
      },
    },
    visble: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        duration: 0.2,
      },
    },
  };
  const mortality = parseFloat((data.deaths / data.cases) * 100).toFixed(1);
  const infectionRisk = parseFloat(
    (data.cases / data.population) * 100
  ).toFixed(2);
  return (
    <div className="rtl">
      <div className={classes.countryName}>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
          className={
            !dark
              ? classes.countryBox
              : `${classes.countryBox} ${classes.countryBoxDrk}`
          }
        >
          <h3>نام کشور : {data.country === "Iran" ? "ایران" : data.country}</h3>
        </motion.div>
      </div>

      <div className={classes.statsContainer}>
        <div className={classes.statsRow}>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visble"
            className={
              !dark
                ? classes.statsBox
                : `${classes.statsBox} ${classes.statsBoxDrk}`
            }
          >
            <h4>
              <span style={{ marginLeft: "1%" }}>
                {data.todayCases > 10000 && <FaExclamationTriangle />}
              </span>
              تعداد مبتلایان جدید
            </h4>
            <h6>
              <CountUp
                key={data.country}
                start={0}
                end={typeof data.todayCases !== undefined && data.todayCases}
                duration={2.5}
                separator=","
              />{" "}
              +
            </h6>
          </motion.div>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visble"
            className={
              !dark
                ? classes.statsBox
                : `${classes.statsBox} ${classes.statsBoxDrk}`
            }
          >
            <h4>آخرین آمار جانباختگان</h4>
            <h6>
              <CountUp
                key={data.country}
                start={0}
                end={typeof data.todayDeaths !== undefined && data.todayDeaths}
                duration={2.5}
                separator=","
              />{" "}
              +
            </h6>
          </motion.div>

          <motion.div
            variants={variants}
            initial="hidden"
            animate="visble"
            className={
              !dark
                ? classes.statsBox
                : `${classes.statsBox} ${classes.statsBoxDrk}`
            }
          >
            <h4>بهبود یافتگان</h4>
            <h6>
              <CountUp
                key={data.country}
                start={0}
                end={
                  typeof data.todayRecovered !== undefined &&
                  data.todayRecovered
                }
                duration={2.5}
                separator=","
              />{" "}
              +
            </h6>
          </motion.div>
        </div>
        <div className={classes.statsRow}>
          <div
            className={
              !dark
                ? classes.statsBox
                : `${classes.statsBox} ${classes.statsBoxDrk}`
            }
            data-aos="flip-up"
          >
            <h4>تعداد کل مبتلایان</h4>
            <h6>
              <CountUp
                key={data.country}
                start={0}
                end={typeof data.cases !== undefined && data.cases}
                duration={2.5}
                separator=","
              />
            </h6>
          </div>
          <div
            className={
              !dark
                ? classes.statsBox
                : `${classes.statsBox} ${classes.statsBoxDrk}`
            }
            data-aos="flip-up"
          >
            <h4>تعداد کل جانباختگان</h4>
            <h6>
              <CountUp
                key={data.country}
                start={0}
                end={typeof data.deaths !== undefined && data.deaths}
                duration={2.5}
                separator=","
              />
            </h6>
          </div>

          <div
            className={
              !dark
                ? classes.statsBox
                : `${classes.statsBox} ${classes.statsBoxDrk}`
            }
            data-aos="flip-up"
          >
            <h4>تعداد کل بهبود یافتگان</h4>
            <h6>
              <CountUp
                key={data.country}
                start={0}
                end={typeof data.recovered !== undefined && data.recovered}
                duration={2.5}
                separator=","
              />
            </h6>
          </div>
        </div>
        <div className={classes.statsRow}>
          <div
            className={
              !dark
                ? classes.statsBox1
                : `${classes.statsBox1} ${classes.statsBoxDrk1}`
            }
            data-aos="flip-up"
          >
            <h4>نسبت مرگ مبتلایان</h4>
            <h6>{mortality} %</h6>
          </div>

          <div
            className={
              !dark
                ? classes.statsBox1
                : `${classes.statsBox1} ${classes.statsBoxDrk1}`
            }
            data-aos="flip-up"
          >
            <h4>خطر ابتلا به بیماری</h4>
            <h6>{infectionRisk} %</h6>
          </div>
        </div>
        <div className=" d-flex flex-column mb-3 p-2 align-items-center">
          <small
            className={dark ? "text-light" : "text-dark"}
            style={{ fontFamily: "Iran-sans-reg" }}
          >
            آخرین به روز رسانی :{new Date(data.updated).toLocaleString("fa-ir")}
          </small>
        </div>
        <div
          className={
            !dark ? classes.linkBtn : `${classes.linkBtn} ${classes.linkBtnDrk}`
          }
        >
          <Link href="/vaccine/iranvaccine">
            <button className="btn btn-info">وضعیت تزریق واکسن در ایران</button>
          </Link>
        </div>

        <div
          className="container-fluid"
          style={{ width: "100%", height: "500px", marginTop: "10%" }}
        >
          <Chart data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Stats;
