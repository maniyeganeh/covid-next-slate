import axios from "axios";
import millify from "millify";
import React, { Fragment, useState } from "react";
import { useContext } from "react";
import { useQuery } from "react-query";
import Pagination from "../../helpers/Paginate";
import CovidContext from "../../store/covid-context";
import LoadingComponent from "../shared/LoadingComponent";
import classes from "./style.module.css";
const getCountriesVac = async () => {
  try {
    const { data } = await axios(
      "https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=1"
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

const VaccineCountries = () => {
  const { dark } = useContext(CovidContext);
  const { data, status } = useQuery("vacCountries", getCountriesVac);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const bg = [];
  let currentResults = [];
  currentResults = data?.slice(indexOfFirst, indexOfLast);
  const searchChangeHandler = (e) => setSearch(e.target.value);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  if (dark) {
    bg.push("table-dark");
  }
  const toUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  if (search.length > 0) {
    currentResults = data?.filter((i) => {
      return i.country.match(toUpperCase(search));
    });
  }
  if (status === "loading") {
    return <LoadingComponent />;
  }
  return (
    <div className="container-fluid rtl">
      <div className={classes.input}>
        <input type="text" placeholder="جستجو" onChange={searchChangeHandler} />
      </div>
      <div className="table-responsive rtl">
        <table
          className={` table table-bordered  table-hover ${classes.table} ${bg} `}
          style={{
            transition: "linear 0.2s",
          }}
        >
          <thead className="thead-light">
            <tr>
              <th scope="col">اسم کشور</th>
              <th scope="col">میزان تزریق</th>
              <th scope="col">تاریخ آخرین بروزرسانی</th>
            </tr>
          </thead>
          <tbody>
            {currentResults?.map((item, index) => (
              <Fragment key={index}>
                <tr>
                  <td>{item.country}</td>
                  <td>
                    {Object?.entries(item.timeline).map(([key, value]) => (
                      <Fragment key={key}>
                        {millify(value).toLocaleString("fa-ir")}
                      </Fragment>
                    ))}
                  </td>
                  <td>
                    {Object?.entries(item.timeline).map(([key, value]) => (
                      <Fragment key={key}>{key}</Fragment>
                    ))}
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
        {search.length === 0 && (
          <Pagination
            perPage={perPage}
            totalresults={data.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
};

export default VaccineCountries;
