import React, { useState, useEffect, useContext } from "react";
import CovidContext from "../store/covid-context";
import classes from "./vaccine.module.css";
import Link from "next/link";

const VaccineComponent = () => {
  const { vaccine, dark } = useContext(CovidContext);
  const [total, setTotal] = useState("");
  const [phaseone, setPhaseOne] = useState("");
  const [phaseTwo, setPhaseTwo] = useState("");
  const [phaseThree, setPhaseThree] = useState("");
  const [limit, setLimit] = useState("");
  const [auth, setAuth] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    vaccine.map(
      (vac) => (
        setTotal(vac.total),
        setPhaseOne(vac.phase1),
        setPhaseTwo(vac.phase2),
        setPhaseThree(vac.phase3),
        setLimit(vac.limited),
        setAuth(vac.auth),
        setDate(vac.updatedAt)
      )
    );
  }, [vaccine]);

  return (
    <>
      <div
        className={
          !dark
            ? `${classes.vaccineContainer} rtl`
            : `${classes.vaccineContainer} ${classes.vaccineContainerDrk} rtl`
        }
      >
        <h3>وضعیت واکسن های کرونا در سراسر دنیا</h3>
        <div className={classes.vaccineRow}>
          <div
            className={
              !dark
                ? classes.vaccineBox
                : `${classes.vaccineBox} ${classes.vaccineBoxDrk}`
            }
          >
            <h5>مجموع واکسن ها</h5>
            <div
              className={
                !dark
                  ? classes.vaccineTotal
                  : `${classes.vaccineTotal} ${classes.vaccineDrkBg}`
              }
            >
              <h6>{total}</h6>
            </div>
          </div>
          <div
            className={
              !dark
                ? classes.vaccineBox
                : `${classes.vaccineBox} ${classes.vaccineBoxDrk}`
            }
          >
            <h5>فاز اول</h5>
            <div
              className={
                !dark
                  ? classes.vaccineOne
                  : `${classes.vaccineOne} ${classes.vaccineDrkBg}`
              }
            >
              <h6>{phaseone}</h6>
            </div>
          </div>
          <div
            className={
              !dark
                ? classes.vaccineBox
                : `${classes.vaccineBox} ${classes.vaccineBoxDrk}`
            }
          >
            <h5>فاز دوم</h5>
            <div
              className={
                !dark
                  ? classes.vaccineTwo
                  : `${classes.vaccineTwo} ${classes.vaccineDrkBg}`
              }
            >
              <h6>{phaseTwo}</h6>
            </div>
          </div>
          <div
            className={
              !dark
                ? classes.vaccineBox
                : `${classes.vaccineBox} ${classes.vaccineBoxDrk}`
            }
          >
            <h5>فاز سوم</h5>
            <div
              className={
                !dark
                  ? classes.vaccineThree
                  : `${classes.vaccineThree} ${classes.vaccineDrkBg}`
              }
            >
              <h6>{phaseThree}</h6>
            </div>
          </div>
          <div
            className={
              !dark
                ? classes.vaccineBox
                : `${classes.vaccineBox} ${classes.vaccineBoxDrk}`
            }
          >
            <h5>محدود</h5>
            <div
              className={
                !dark
                  ? classes.vaccineLimit
                  : `${classes.vaccineLimit} ${classes.vaccineDrkBg}`
              }
            >
              <h6>{limit}</h6>
            </div>
          </div>
          <div className={classes.vaccineBox}>
            <h5>تایید شده</h5>
            <div
              className={
                !dark
                  ? classes.vaccineAuth
                  : `${classes.vaccineAuth} ${classes.vaccineDrkBg}`
              }
            >
              <h6>{auth}</h6>
            </div>
          </div>
        </div>
        <div className={classes.date}>
          <h5>
            <span>آخرین به روز رسانی:</span>
            {new Date(date).toLocaleString("fa-ir")}
          </h5>
        </div>
        <div className={classes.iranBtn}>
          <Link href="/vaccine/iranvaccine">
            <button className="btn btn-info">
              آخرین آمار تزریق واکسن در ایران
            </button>
          </Link>
          <Link href="/vaccine/world-vaccine">
            <button className="btn btn-success">
              آخرین آمار تزریق واکسن در جهان
            </button>
          </Link>
        </div>
        <div className={classes.vaccineBtnWrapper}>
          <div className={classes.vaccineRow}>
            <div className={classes.vaccineBtn}>
              <Link href="/vaccine/phaseone">
                <button>واکسن های فاز یک</button>
              </Link>
            </div>
            <div className={classes.vaccineBtn}>
              <Link href="/vaccine/phasetwo">
                <button>واکسن های فاز دو</button>
              </Link>
            </div>
            <div className={classes.vaccineBtn}>
              <Link href="/vaccine/phasethree">
                <button>واکسن های فاز سه</button>
              </Link>
            </div>
            <div className={classes.vaccineBtn}>
              <Link href="/vaccine/phasefour">
                <button>واکسن های فاز چهار</button>
              </Link>
            </div>
          </div>
        </div>
        <div className={classes.vaccineProg}>
          <h3>فرایند آزمایش واکسن</h3>
          <div className={classes.vaccineLvl}>
            <p>
              <span>آزمایش پیش ­بالینی :</span>
              دانشمندان واکسن را روی حیواناتی نظیر موش یا میمون آزمایش می­ کنند
              تا ببینند واکنش ایمنی ایجاد می ­کند یا خیر
            </p>
          </div>
          <div className={classes.vaccineLvl}>
            <p>
              <span>فاز اول آزمایش ایمنی:</span>
              دانشمندان واکسن را روی تعداد کمی از انسان­ها آزمایش می­کنند تا
              ایمنی و دوز آن را بسنجند و تحریک سیستم ایمنی به تایید برسد.
            </p>
          </div>

          <div className={classes.vaccineLvl}>
            <p>
              <span>فاز دوم آزمایش جامع:</span>
              دانشمندان واکسن را روی صدها نفر در گروه­های جداگانه، مثلا کودکان و
              افراد مسن، آزمایش می­کنند تا ببینند عملکرد آن متفاوت است یا خیر.
              این آزمایش بیشتر ایمنی و توانایی واکسن در تحریک سیستم ایمنی را
              می­سنجد. در ماه ژوئن، اداره ­ی کل خوراک و دارو آمریکا اظهار داشت
              واکسن ویروس کرونا باید دست کم از 50% از کسانی که واکسن زده ­اند
              محافظت کند تا موثر تلقی شود.
            </p>
          </div>

          <div className={classes.vaccineLvl}>
            <p>
              <span>فاز سوم:</span>
              آزمایش میزان کارآمدی: دانشمندان واکسن را روی هزاران نفر آزمایش
              می­کنند و منتظر می­ مانند ببینند چند نفر در مقایسه با داوطلبانی که
              مسکن دریافت کرده بودند آلوده می­ شوند. براساس این آزمایشات می­توان
              تعیین کرد واکسن قابلیت ایجاد مصونیت دربرابر ویروس کرونا را دارد یا
              خیر.
            </p>
          </div>

          <div className={classes.vaccineLvl}>
            <p>
              <span>تایید:</span>
              بازرسان هر کشور نتایج آزمایشات را بررسی می­کنند و تصمیم می­گیرند
              واکسن مورد تایید هست یا خیر. حین پاندمی، قبل از این­که واکسن به
              تایید رسمی برسد درموارد اضطراری مورد استفاده قرار می­گیرد.
            </p>
          </div>

          <div className={classes.vaccineLvl}>
            <p>
              <span>ترکیب مراحل:</span>
              یک روش دیگر برای تسریع فرایند تولید واکسن ترکیب مراحل است. مثلا،
              بعضی از واکسن­های ویروس کرونا در حال حاضر در فاز آزمایشی I/II
              هستند و برای اولین بار روی صدها نفر آزمایش شدند. (توجه داشته باشید
              که منبع خبری ما ترکیب مراحل I/II آزمایش را همان فاز اول و دوم تلقی
              می­کند).
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VaccineComponent;
