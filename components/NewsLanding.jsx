import React, { useState } from 'react';
import Link from 'next/link';
import classes from './landing.module.css';
import LoadingComponent from './shared/LoadingComponent';
import SkeletonNews from './shared/skeleton/SkeletonNews';
import { BiErrorCircle } from 'react-icons/bi';
const NewsLanding = (props) => {
  const { data, status } = props;

  const [currentPage] = useState(1);
  const [perPage] = useState(4);
  // const indexOfLast = currentPage * perPage;
  // const indexOfFirst = indexOfLast - perPage;
  // const currentNews = data.slice(indexOfFirst, indexOfLast);

  if (status === 'loading') {
    return <SkeletonNews type="news" />;
  }
  return (
    <div className={classes.newsLanding}>
      {data || data !== undefined ? (
        <>
          {data?.map((nw, index) => (
            <Link key={index} href={`/news/${nw._id}`}>
              <a target="_blank " rel="noopener noreferrer">
                {nw.title}
              </a>
            </Link>
          ))}
        </>
      ) : (
        <div className={classes.newsError}>
          <div className={classes.newsErrorIcon}>
            <BiErrorCircle size={42} />
          </div>

          <div>
            <h3>سرور از دسترس خارج است!</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsLanding;
