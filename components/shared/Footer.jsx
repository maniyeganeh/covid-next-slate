import React, { useContext } from "react";
import Image from "next/image";
import classes from "./footer.module.css";
import Design from "../Design";
import CovidContext from "../../store/covid-context";
const Footer = () => {
  const { dark } = useContext(CovidContext);
  return (
    <div
      className={
        !dark
          ? `${classes.footerContainer} rtl`
          : `${classes.footerContainer} ${classes.darkMode} rtl`
      }
    >
      <div className={classes.footerRow}>
        <div className={classes.footerBox}>
          <h6>
            تمامی آمارها گرفته شده ازNovelCOVID API و تمامی اطلاعت از سایت رسمی
            سازمان بهداشت جهانی گرفته شده است.
          </h6>
        </div>
        <div className={classes.footerBox}>
          <div className={classes.footerImg}>
            <Image
              src="/img/home.png"
              width="100%"
              height="100%"
              layout="responsive"
            />
          </div>
        </div>
      </div>
      <Design name="Mani Yeganeh" />
    </div>
  );
};

export default Footer;
