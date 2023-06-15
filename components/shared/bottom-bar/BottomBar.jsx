import React, { useContext } from "react";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import CovidContext from "../../../store/covid-context";
import classes from "./bottom-bar.module.css";
import { RiSurgicalMaskLine } from "react-icons/ri";
import { FaSyringe } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
const BottomBar = () => {
  const { dark } = useContext(CovidContext);
  return (
    <div
      className={
        !dark
          ? classes.bottomContainer
          : `${classes.bottomContainer} ${classes.bottomContainerDark}`
      }
    >
      <Container>
        <Row>
          <Col sm="4" xs="4">
            <Link href="/air-quality">
              <div className={classes.bottomBarBox}>
                <div className={classes.bottomBarBoxIcon}>
                  <RiSurgicalMaskLine size="19px" />
                </div>
                <div className={classes.bottomBarBoxText}>
                  <h6>کیفیت هوا</h6>
                </div>
              </div>
            </Link>
          </Col>
          <Link href="/vaccine/iranvaccine">
            <Col sm="4" xs="4">
              <div className={classes.bottomBarBox}>
                <div className={classes.bottomBarBoxIcon}>
                  <FaSyringe size="19px" />
                </div>
                <div className={classes.bottomBarBoxText}>
                  <h6> آمار تزریق</h6>
                </div>
              </div>
            </Col>
          </Link>

          <Col sm="4" xs="4">
            <Link href="/world">
              <div className={classes.bottomBarBox}>
                <div className={classes.bottomBarBoxIcon}>
                  <BiWorld size="19px" />
                </div>
                <div className={classes.bottomBarBoxText}>
                  <h6> آمار جهان</h6>
                </div>
              </div>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BottomBar;
