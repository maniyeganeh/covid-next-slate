import React from "react";
import classes from "./design.module.css";
import { FaRegCopyright } from "react-icons/fa";

const Design = (props) => {
  return (
    <div className={classes.designContainer}>
      <div className={classes.designRow}>
        <div className={classes.designBox}>
          <h6>
            Design And Develop By{" "}
            <span>
              <a href="https://maniyeganeh.ir" target="_blank" rel="noreferrer">
                {props.name}
              </a>
            </span>
            <FaRegCopyright />
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Design;
