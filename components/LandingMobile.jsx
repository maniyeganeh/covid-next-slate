import React, { useContext } from "react";
import classes from "./landingMobile.module.css";
import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import CovidContext from "../store/covid-context";
const varinats = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};
const item = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  show: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    duration: 0.8,
  },
};

const LandingMobile = () => {
  const { dark } = useContext(CovidContext);
  return (
    <div
      className={
        !dark
          ? `${classes.mobileContainer} rtl`
          : `${classes.mobileContainer} ${classes.mobileContainerDrk} rtl`
      }
    >
      <motion.div
        variants={varinats}
        initial="hidden"
        animate="show"
        className={classes.mobileRow}
      >
        <Link href="/stats">
          <motion.div
            variants={item}
            // initial={{ opacity: 0, y: "-100" }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ type: "spring", duration: 1, bounce: 0.5 }}
            whileTap={{ scale: 0.9, opacity: 0.5 }}
            className={
              !dark
                ? classes.mobileBox
                : `${classes.mobileBox} ${classes.mobileBoxDrk}`
            }
          >
            <div
              className={
                !dark ? classes.icon : `${classes.icon} ${classes.iconDrk}`
              }
            >
              <Image src="/img/scale.png" width="75%" height="75%" />
            </div>
            <h5>آمار کشور ایران</h5>
          </motion.div>
        </Link>
        <Link href="/news">
          <motion.div
            variants={item}
            // initial={{ opacity: 0, y: "-100" }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
            whileTap={{ scale: 0.9, opacity: 0.5 }}
            className={
              !dark
                ? classes.mobileBox
                : `${classes.mobileBox} ${classes.mobileBoxDrk}`
            }
          >
            <div
              className={
                !dark ? classes.icon : `${classes.icon} ${classes.iconDrk}`
              }
            >
              <Image src="/img/news.png" width="75%" height="75%" />
            </div>
            <h5>آخرین اخبار</h5>
          </motion.div>
        </Link>
      </motion.div>
      <motion.div
        variants={varinats}
        initial="hidden"
        animate="show"
        className={classes.mobileRow1}
      >
        <Link href="/vaccine">
          <motion.div
            variants={item}
            // initial={{ opacity: 0, y: "-100" }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ type: "spring", duration: 2, bounce: 0.5 }}
            whileTap={{ scale: 0.9, opacity: 0.5 }}
            className={
              !dark
                ? classes.mobileBox1
                : `${classes.mobileBox1} ${classes.mobileBoxDrk1}`
            }
          >
            <div
              className={
                !dark
                  ? classes.iconVaccine
                  : `${classes.iconVaccine} ${classes.iconVaccineDrk}`
              }
            >
              <Image src="/img/vaccine.png" width="70%" height="70%" />
            </div>
            <h5>از واکسن چه خبر؟</h5>
          </motion.div>
        </Link>
      </motion.div>
      <motion.div
        variants={varinats}
        initial="hidden"
        animate="show"
        className={classes.mobileRow}
        style={{ marginBottom: "22%" }}
      >
        <Link href="/countries">
          <motion.div
            variants={item}
            // initial={{ opacity: 0, y: "-100" }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ type: "spring", duration: 2.5, bounce: 0.5 }}
            whileTap={{ scale: 0.9, opacity: 0.5 }}
            className={
              !dark
                ? classes.mobileBox
                : `${classes.mobileBox} ${classes.mobileBoxDrk}`
            }
          >
            <div
              className={
                !dark ? classes.icon : `${classes.icon} ${classes.iconDrk}`
              }
            >
              <Image src="/img/table.png" width="70%" height="70%" />
            </div>
            <h5>جدول کشور ها</h5>
          </motion.div>
        </Link>
        <Link href="/map">
          <motion.div
            variants={item}
            // initial={{ opacity: 0, y: "-100" }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ type: "spring", duration: 3, bounce: 0.5 }}
            whileTap={{ scale: 0.9, opacity: 0.5 }}
            className={
              !dark
                ? classes.mobileBox
                : `${classes.mobileBox} ${classes.mobileBoxDrk}`
            }
          >
            <div
              className={
                !dark ? classes.icon : `${classes.icon} ${classes.iconDrk}`
              }
            >
              <Image src="/img/map.png" width="70%" height="70%" />
            </div>
            <h5>نقشه ویروس</h5>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
};

export default LandingMobile;
