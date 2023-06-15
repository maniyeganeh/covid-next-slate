import React, { useContext } from 'react';
import CovidContext from '../store/covid-context';

import classes from './user.module.css';
const UserDetail = () => {
  const { user, news } = useContext(CovidContext);

  return (
    <div className={classes.userContainer}>
      <div className={classes.userRow}>
        <div className={classes.userBox}>
          <h1>به پنل ادمین خوش آمدید</h1>
          <h4>شماره کاربری :{user._id}</h4>
          <h4>ایمیل :{user.email}</h4>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
