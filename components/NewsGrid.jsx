import React, { useContext, useEffect, useState } from 'react';
import classes from './news.module.css';
import Link from 'next/link';
import CovidContext from '../store/covid-context';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaRegNewspaper,
  FaChevronLeft,
  FaChevronRight,
  FaSistrix,
  FaTimes,
} from 'react-icons/fa';
import Masonry from 'react-masonry-css';
import { Spinner } from 'react-bootstrap';
const varinats = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const item = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  show: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    duration: 0.5,
  },
};

const NewsGrid = ({ data }) => {
  const { dark, next, getNews, prev, searchNews, totalRes } =
    useContext(CovidContext);
  const [search, setSearch] = useState('');
  const [perPage, setPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const loadMore = async () => {
    if (search.length > 0) {
      setLoading(true);
      await searchNews(search, next?.page, 12);
      setLoading(false);
      window.scrollTo(0, 0);
    } else {
      setLoading(true);
      await getNews(next?.page, 12);
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };
  const loadPrev = async () => {
    if (search.length > 0) {
      setLoading(true);
      await searchNews(search, prev?.page, 12);
      setLoading(false);
      window.scrollTo(0, 0);
    } else {
      setLoading(true);
      await getNews(prev?.page, 12);
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };
  const searchNewsHandler = async (e) => {
    e.preventDefault();
    setSearchLoading(true);
    await searchNews(search, 1, 12);
    setShowSearchBar(false);
    setSearchLoading(false);
  };
  const resetSearch = async () => {
    setSearch('');
    await getNews(1, 12);
  };
  const showSearchBarHandler = () => {
    setShowSearchBar((prevState) => !prevState);
  };
  const breakPoints = {
    default: 3,
    1100: 2,
    700: 1,
  };
  useEffect(() => {
    if (search.length > 1) {
      searchNews(search, 1, 12);
      console.log('Search...!', search.length);
    } else {
      getNews(1, 12);
    }
  }, [search]);
  const rowRender = () => (
    <Masonry
      breakpointCols={breakPoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {data?.map((news, index) => (
        <Link key={index} href={`news/${news._id}`} passHref>
          <motion.div
            variants={item}
            className={
              !dark
                ? classes.newsBox
                : `${classes.newsBox} ${classes.newsBoxDrk}`
            }
            style={{
              backgroundImage: `url(https://api.maniyeganeh.ir/${news.image})`,
            }}
          >
            <h2>{news.title}</h2>

            <h6>{news.subtitle}</h6>
          </motion.div>
        </Link>
      ))}
    </Masonry>
  );
  return (
    <div className={`${classes.newsContainer} rtl`}>
      {!showSearchBar && search.length === 0 && (
        <div className={classes.searchBtn} onClick={showSearchBarHandler}>
          <button
            className={
              dark ? 'btn btn-light text-white' : 'btn btn-dark text-black'
            }
          >
            <FaSistrix />
          </button>
        </div>
      )}
      {search.length > 0 && !showSearchBar && (
        <div className={classes.searchBtn} onClick={resetSearch}>
          <button
            className={
              dark ? 'btn btn-light text-white' : 'btn btn-dark text-black'
            }
          >
            <FaTimes />
          </button>
        </div>
      )}

      <div className={`${classes.searchBar} container `}>
        <AnimatePresence>
          {showSearchBar && (
            <motion.form
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="input-group mb-3"
              onSubmit={searchNewsHandler}
            >
              <input
                type="search"
                className="form-control"
                placeholder="جستجو"
                inputMode="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* <button
                className={classes.searchBarBtn}
                type="submit"
                id="button-addon1"
                disabled={search.length === 0 && true}
              >
                <FaSistrix />
              </button> */}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
      <motion.div
        variants={varinats}
        initial="hidden"
        animate="show"
        className={classes.newsRow}
      >
        {search.length > 0 && (
          <div
            className={`${classes.result} container`}
            style={{ display: 'inline-block' }}
          >
            <h6 className={dark ? 'text-white' : 'text-black'}>
              نتایج یافت شده برای
              <span>" {search} " : </span>
              {data.length.toLocaleString('fa-ir')} از{' '}
              {totalRes.toLocaleString('fa-ir')}
            </h6>
          </div>
        )}

        {rowRender()}
      </motion.div>

      <div className="d-flex justify-content-between align-items-center px-2 my-2">
        <div className={classes.loadMore}>
          {prev && (
            <button onClick={loadPrev}>
              <FaChevronRight />
              <span className="px-2">
                {loading ? (
                  <Spinner animation="border" variant="light" size="sm" />
                ) : (
                  <FaRegNewspaper />
                )}
              </span>
            </button>
          )}
        </div>
        <div className={classes.loadMore}>
          {next && (
            <button onClick={loadMore}>
              <span className="px-2">
                {loading ? (
                  <Spinner animation="border" variant="light" size="sm" />
                ) : (
                  <FaRegNewspaper />
                )}
              </span>
              <FaChevronLeft />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsGrid;
