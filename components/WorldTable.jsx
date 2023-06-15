import React, { Fragment, useContext, useEffect, useState } from 'react';
import Table from '../components/shared/Table';
import classes from './worldTable.module.css';
import Pagination from '../helpers/Paginate';
import CovidContext from '../store/covid-context';
import { FaSync } from 'react-icons/fa';
import Select from 'react-select';
const WorldTable = (props) => {
  const { searchCountry, filteredCountry, refData, dark } =
    useContext(CovidContext);
  const { results } = props;

  const [selectValue, setSelectValue] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  let currentResults = [];

  const sortCountries = results.sort((a, b) => {
    if (a.todayCases > b.todayCases) {
      return -1;
    }
    return 0;
  });

  currentResults = sortCountries.slice(indexOfFirst, indexOfLast);
  const searchChangeHandler = (e) => setSearch(e.target.value);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const resetSelect = () => {
    setSelectValue('');
    currentResults = results;
  };
  // const selectChangeHandler = async (e) => {
  //   await setSelectValue(e.target.value);
  // };
  const selectChangeHandler = (value) => {
    setSelectValue(value);
  };
  if (search.length > 0) {
    currentResults = results.filter((i) => {
      return i.country.match(toUpperCase(search));
    });
  } else if (selectValue !== '') {
    currentResults = results.filter((cn) => {
      return cn.continent.match(selectValue.value);
    });
  }

  const options = [
    {
      label: 'آسیا',
      value: 'Asia',
    },
    {
      label: 'اروپا',
      value: 'Europe',
    },
    {
      label: 'آفریقا',
      value: 'Africa',
    },
    {
      label: 'استرالیا و اقیانوسیه',
      value: 'Australia-Oceania',
    },
    {
      label: ' آمریکای شمالی',
      value: 'North America',
    },
    {
      label: ' آمریکای جنوبی',
      value: 'South America',
    },
  ];
  const customStyles = {
    control: (base, state) => ({
      ...base,

      outline: 'none',
      borderRadius: 10,

      boxShadow: state.isFocused ? null : null,
      '&:hover': {
        borderColor: state.isFocused ? '#c23616' : '',
      },
    }),
    menu: (base) => ({
      ...base,
      border: 'none',
      borderRadius: 20,
      backgroundColor: '#fff',
      marginTop: 10,
      boxShadow: '0px 4px 21px rgba(0, 0, 0, 0.15)',
    }),
    menuList: (base) => ({
      ...base,
      borderRadius: 20,
      padding: 0,
    }),
    input: (base) => ({
      ...base,
      height: '90% !important',
      border: 'none',
    }),

    indicatorSeparator: (base) => ({
      ...base,
      display: 'none',
    }),
    container: (base) => ({
      ...base,
      marginBottom: '3%',
      borderRadius: '10px',
      height: '30px',
      overFlow: 'hidden',
      boxShadow: '0px 4px 21px rgba(0, 0, 0, 0.15)',
    }),
  };

  return (
    <>
      <div className={classes.worldContainer}>
        <div className={`${classes.titleRow} rtl`}>
          <div
            className={
              !dark
                ? `${classes.title} rtl`
                : `${classes.title} ${classes.titleDrk} rtl`
            }
          >
            <h2 style={{}}>
              تعداد کشور ها :
              <span className="badge badge-danger">{results.length}</span>
            </h2>
          </div>
          <div
            className={
              !dark
                ? `${classes.searchInput} input-group mb-3`
                : `${classes.searchInput} ${classes.searchInputDrk} input-group mb-3`
            }
          >
            {selectValue.length === 0 && (
              <input
                type="text"
                className={`${classes.input} form-control`}
                value={search}
                onChange={searchChangeHandler}
                placeholder="جستجو"
                inputMode="search"
              />
            )}
          </div>
          <div
            className={
              dark
                ? classes.selectSec
                : `${classes.selectSec} ${classes.selectSecDrk}`
            }
          >
            <Select
              className={classes.select}
              defaultValue={''}
              value={selectValue}
              options={options}
              onChange={selectChangeHandler}
              styles={customStyles}
              placeholder="انتخاب قاره"
              isSearchable
            />
            {selectValue && (
              <button onClick={resetSelect}>
                <FaSync />
              </button>
            )}
          </div>
          {/* <div className={dark ? classes.selectSec : `${classes.selectSec} ${classes.selectSecDrk}`}>

            <select value={selectValue} onChange={selectChangeHandler}>
              <option value='' disabled selected>
                انتخاب کنید
              </option>

              {options.map((option) => (
                <>

                  <option value={option.value}>{option.label}</option>

                </>
              ))}
            </select>
           

          </div> */}
        </div>
        <Table results={currentResults} />
        {filteredCountry.length === 0 && search.length === 0 && (
          <Pagination
            perPage={perPage}
            totalresults={results.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </div>
    </>
  );
};

export default WorldTable;
