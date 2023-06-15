import React, { useContext, useState, useEffect } from "react";

import BackDrop from "../backdrop /Backdrop";
import Footer from "../shared/Footer";
import MainHeader from "../shared/MainHeader";
import SideDrawer from "../SideDrawer/SideDrawer";
import classes from "./layout.module.css";
import CovidContext from "../../store/covid-context";
import BottomBar from "../shared/bottom-bar/BottomBar";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

const Layout = (props) => {
  const { dark } = useContext(CovidContext);
  const [appLoader, setAppLoader] = useState(true);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const { asPath } = useRouter();
  const drawerToggleHandler = () => {
    setSideDrawerOpen((prevState) => !prevState);
  };

  const backdropClickHanlder = () => {
    setSideDrawerOpen(false);
  };

  let backdrop;
  if (sideDrawerOpen) {
    backdrop = <BackDrop click={backdropClickHanlder} />;
  }

  return (
    <div
      className={dark ? classes.darkMode : classes.layout}
      style={{ height: "100%" }}
    >
      <MainHeader drawerClickHanlder={drawerToggleHandler} />

      <SideDrawer
        drawerClickHanlder={drawerToggleHandler}
        show={sideDrawerOpen}
      />
      {backdrop}
      <div
        className={
          !dark
            ? classes.mobileMarg
            : `${classes.mobileMarg} ${classes.darkMobile}`
        }
      >
        {props.children}
      </div>

      <Footer />
      <AnimatePresence>
        {asPath === "/" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`${classes.bottomMobile} d-md-none rtl`}
          >
            <BottomBar />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
