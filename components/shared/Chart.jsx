import React, { useContext, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import moment from "moment-jalaali";
import classes from "./chart.module.css";
import LoadingComponent from "./LoadingComponent";
import CovidContext from "../../store/covid-context";
const Chart = (props) => {
  const { data } = props;
  const { dark } = useContext(CovidContext);
  useEffect(() => {
    moment.loadPersian({ usePersianDigits: true });
  }, []);
  if (data.length === 0) {
    return <LoadingComponent />;
  }
  return (
    <ResponsiveContainer
      className={!dark ? classes.chart : `${classes.chart} ${classes.darkMode}`}
    >
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="Confirmed"
          name="مبتلایان"
          stroke="#e67e22"
        />
        <Line
          type="monotone"
          dataKey="Active"
          name=" بیماران بستری"
          stroke="#007965"
        />

        <Line
          type="monotone"
          dataKey="Deaths"
          name=" درگذشتگان"
          stroke="#e84545"
        />

        <Legend verticalAlign="bottom" height={80} />
        <CartesianGrid stroke={dark ? "#eeee" : "#8888"} strokeDashArray="4" />
        <XAxis
          dataKey="Date"
          stroke={dark ? "#eeee" : "#000"}
          padding={{ left: 7, right: 7 }}
          fontSize={12}
          tickFormatter={(timeStr) => moment(timeStr).format("jYYYY/jM/jD")}
        />
        <YAxis
          stroke={dark ? "#eeee" : "#000"}
          width={70}
          type="number"
          domain={[0, "Confirmed"]}
          tickCount={50}
          tickFormatter={(tick) =>
            tick.toLocaleString("fa-ir").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          fontSize={13}
        />
        <Tooltip
          content="Deaths"
          contentStyle={
            dark ? { backgroundColor: "#000" } : { backgroundColor: "#fff" }
          }
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
