import React, { useContext, useEffect, useState } from 'react';
import classes from './news.module.css';
import Image from 'next/image';
import Link from 'next/link';
import CovidContext from '../store/covid-context';
import LoadingComponent from './shared/LoadingComponent';
import ShareIcon from '././shared/Shareicon';
import ErrorComponent from './shared/ErrorComponent';
import AOS from 'aos';
import HTMLReactParser from 'html-react-parser';
import readingTime from 'reading-time';
import { useQuery } from 'react-query';
const SingleNewsComponent = (props) => {
  const { dark } = useContext(CovidContext);
  const [loading, setLoading] = useState(false);
  const [shareBtn, setshareBtn] = useState(false);
  const { getNews } = useContext(CovidContext);
  const { data, status } = useQuery('news', () => getNews(1, 15), {
    cacheTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  // useEffect(() => {
  //   let isCancelled = false;
  //   setLoading(true);
  //   const fetchData = async () => {
  //     try {
  //       if (!isCancelled) {
  //         await getNews(1, 14);
  //         setLoading(false);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  //   return () => (isCancelled = true);
  // }, []);
  // const [currentPage] = useState(1);
  // const [perPage] = useState(15);
  // const indexOfLast = currentPage * perPage;
  // const indexOfFirst = indexOfLast - perPage;
  // const currentNews = data?.slice(indexOfFirst, indexOfLast);
  const filteredNews = data?.filter((nw) => nw._id !== props.singleNews._id);

  const loader = () => {
    return `https://api.maniyeganeh.ir/${props.singleNews.image}`;
  };
  useEffect(() => {
    AOS.init();
    if (window.navigator.share) {
      setshareBtn(true);
    } else {
      setshareBtn(false);
    }
  }, []);
  const shareButton = () => {
    if (navigator.share) {
      window.navigator
        .share({
          title: `${props.singleNews.title}`,
          text: ` ${props.singleNews.title}  `,

          url: document.location.href,
        })
        .then(() => {
          toast.success('با موفقیت ارسال شد');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  if (loading) {
    return <LoadingComponent title="لطفا منتظر بمانید...!" />;
  }
  const readingTimeMinutes = Math.round(
    readingTime(props.singleNews.description).minutes
  );

  return (
    <>
      {props?.singleNews ? (
        <div
          className={`${classes.singleNewsContainer} rtl`}
          data-aos="fade-down"
        >
          <div className={classes.singleNewsRow}>
            <div
              className={
                !dark
                  ? classes.singleNewsBox
                  : `${classes.singleNewsBox} ${classes.singleNewsBoxDrk}`
              }
            >
              <h3>{props.singleNews.title}</h3>
              <small>
                ارسال شده توسط :{props.singleNews.rec} -{' '}
                {new Date(props.singleNews.createdAt).toLocaleDateString(
                  'fa-ir'
                )}{' '}
                <span>
                  {shareBtn && (
                    <>
                      {' '}
                      -{' '}
                      <span className={classes.icon}>
                        <ShareIcon onClick={shareButton} />
                      </span>
                    </>
                  )}
                </span>
              </small>
              {readingTimeMinutes > 0 && (
                <p className={classes.mintues}>
                  <small>
                    <span>
                      مدت زمان مطالعه :{' '}
                      {readingTimeMinutes.toLocaleString('fa-ir')} دقیقه
                    </span>
                  </small>
                </p>
              )}

              <div
                className={
                  !dark
                    ? classes.newsImgContainer
                    : `${classes.newsImgContainer} ${classes.newsImgContainerDark}`
                }
              >
                <Image
                  loader={loader}
                  placeholder="blur"
                  src={`https://api.maniyeganeh.ir/${props.singleNews.image}`}
                  blurDataURL={`https://api.maniyeganeh.ir/${props.singleNews.image}`}
                  width="100%"
                  height="100%"
                  unoptimized
                  alt={props.singleNews.title}
                  className="img-fluid"
                />
              </div>
              <h4>{props.singleNews.subtitle}</h4>
              <div>{HTMLReactParser(props.singleNews.description)}</div>
              <p>منبع : {props.singleNews.rec}</p>
              <a
                className={classes.link}
                href={props.singleNews.link}
                target="_blank"
                rel="noreferrer"
              >
                متن خبر
              </a>
            </div>
            <div
              className={
                !dark
                  ? `${classes.singleNewsBox} shadow`
                  : `${classes.singleNewsBox} ${classes.singleNewsBoxDrk} shadow`
              }
            >
              <h6>دیگر اخبار</h6>
              {filteredNews?.map((nw, index) => (
                <div className={classes.newsLink} key={index}>
                  <Link href={`/news/${nw._id}`}>{nw.title}</Link>
                </div>
              ))}
              <div className={`${classes.buttonContainer} text-center`}>
                <Link href="/news" className={classes.button}>
                  خبر های بیشتر
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ErrorComponent
          title="خبر مورد نظر یافت نشد!"
          to="/news"
          link="رفتن به صفحه اخبار "
        />
      )}
    </>
  );
};

export default SingleNewsComponent;
