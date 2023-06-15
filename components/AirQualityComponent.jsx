import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { Col, Row } from "reactstrap";
import CovidContext from "../store/covid-context";

import classes from "./air.module.css";
const AirQualityComponent = ({ quality }) => {
  const { dark } = useContext(CovidContext);
  let airQuality;
  if (quality?.aqicn) {
    airQuality = quality?.aqicn.toLocaleString("fa-ir");
  }

  return (
    <div
      className={
        !dark
          ? `${classes.airContainer} rtl`
          : `${classes.airContainer} ${classes.airDrk} rtl`
      }
    >
      <Row>
        <Container>
          <Col md={12} xs={12} sm={12}>
            <div className={classes.airbox}>
              <div className={classes.airHeader}>
                <h6>شاخص کیفیت هوای نزدیک ترین ایستگاه</h6>
              </div>
              <div className={classes.airBody}>
                <h5>{airQuality}</h5>
                <p
                  className={
                    quality.aqicn > 0 && quality.aqicn < 50
                      ? `card-text bg-success ${classes.airQ}`
                      : null
                  }
                >
                  {quality.aqicn > 0 && quality.aqicn < 50 ? " سالم" : null}
                </p>
                <p
                  className={
                    quality.aqicn >= 50 && quality.aqicn < 101
                      ? `card-text ${classes.moderate} ${classes.airQ}`
                      : null
                  }
                >
                  {quality.aqicn >= 50 && quality.aqicn < 101
                    ? "قابل قبول"
                    : null}
                </p>
                <p
                  className={
                    quality.aqicn > 100 && quality.aqicn <= 150
                      ? `card-text  ${classes.unhlt} ${classes.airQ}`
                      : null
                  }
                >
                  {quality.aqicn > 100 && quality.aqicn <= 150
                    ? " ناسالم برای افراد حساس"
                    : null}
                </p>
                <p
                  className={
                    quality.aqicn > 150 && quality.aqicn < 200
                      ? `card-text  ${classes.dng} ${classes.airQ}`
                      : null
                  }
                >
                  {quality.aqicn > 150 && quality.aqicn < 200
                    ? " ناسالم برای تمامی افراد "
                    : null}
                </p>
                <p
                  className={
                    quality.aqicn > 200 && quality.aqicn < 300
                      ? `card-text  ${classes.dng} ${classes.airQ}`
                      : null
                  }
                >
                  {quality.aqicn > 200 && quality.aqicn < 300
                    ? " بسیار ناسالم "
                    : null}
                </p>
                <p
                  className={
                    quality.aqicn > 300 && quality.aqicn < 500
                      ? `card-text ${classes.danger} ${classes.airQ} `
                      : null
                  }
                >
                  {quality.aqicn > 300 && quality.aqicn < 500
                    ? "    خطرناک "
                    : null}
                </p>
              </div>
              <div className={`${classes.airFooter} text-muted`}>
                <span>
                  {" "}
                  آخرین به روز رسانی :{" "}
                  {new Date(quality.ts).toLocaleTimeString("fa-ir")}{" "}
                </span>
              </div>
            </div>
          </Col>
        </Container>
      </Row>
    </div>
  );
};

export default AirQualityComponent;
