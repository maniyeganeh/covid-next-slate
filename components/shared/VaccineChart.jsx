import React, { useContext, useEffect } from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import moment from "moment-jalaali";
import classes from "./chart.module.css";
import CovidContext from "../../store/covid-context";
const VaccineChart = (props) => {
  const { dark } = useContext(CovidContext);
  const { data } = props;
  useEffect(() => {
    moment.loadPersian({ usePersianDigits: true });
  }, []);

  return (
    <ResponsiveContainer className={classes.chart}>
      <AreaChart
        width={500}
        height={400}
        data={data}
        stackOffset="expand"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <Area
          type="monotone"
          dataKey="total"
          name=" مجموع"
          stroke={dark ? "#eeee" : "#000"}
          fill={dark ? "#888" : "#353b48"}
        />
        <Area
          type="monotone"
          dataKey="firstdose"
          name="تزریق دوز اول"
          stroke="#40739e"
          fill="#40739e"
        />
        <Area
          type="monotone"
          dataKey="seconddose"
          name="  تزریق دوز دوم"
          stroke="#192a56"
          fill="#192a56"
        />
        <Area
          type="monotone"
          dataKey="thirddose"
          name="  تزریق دوز سوم"
          stroke="#888"
          fill="#888"
        />

        <Legend
          verticalAlign="bottom"
          height={80}
          color={dark ? "#eeee" : "#000"}
        />
        <CartesianGrid stroke={dark ? "#dfdfdf" : "#404040"} />
        <XAxis
          dataKey="createdAt"
          stroke={dark ? "#eeee" : "#000"}
          padding={{ left: 7, right: 7 }}
          fontSize={12}
          tickFormatter={(timeStr) => moment(timeStr).format("jYYYY/jM/jD")}
        />
        <YAxis
          width={100}
          stroke={dark ? "#eeee" : "#000"}
          tickCount={50}
          tickFormatter={(tick) =>
            tick.toLocaleString("fa-ir").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          fontSize={13}
        >
          <Label dataKey="total" />
        </YAxis>
        <Tooltip
          content="total"
          contentStyle={
            dark ? { backgroundColor: "#000" } : { backgroundColor: "#fff" }
          }
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default VaccineChart;
