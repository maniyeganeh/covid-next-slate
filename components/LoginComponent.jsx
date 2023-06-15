import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import CovidContext from "../store/covid-context";
import classes from "./login.module.css";
import InputComponent from "./shared/InputComponent";
import FormGroupComponent from "./shared/FormGroupComponent";
import LabelComponent from "./shared/LabelComponent";
import { motion } from "framer-motion";
import { Spinner } from "reactstrap";

const LoginComponent = () => {
  const router = useRouter();
  const { login } = useContext(CovidContext);
  const [loading, setLoading] = useState(false);
  // const [selectAdd, setSelectAdd] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setForm({
      ...form,
      [e.target.name]: value,
    });
  };
  // const selectValueChange = (value) => {
  //   setSelectAdd(value);
  //   console.log(value);
  // };
  const submitUser = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await login(form.email, form.password);
      setLoading(false);
      router.push(`/user/${localStorage.getItem("uid")}`);
    } catch (err) {
      console.log(err);
    }
  };
  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
    },
    hidden: {
      opacity: 0,
      y: -100,
      scale: 0.5,
      rotate: 36,
    },
  };

  return (
    <div className={`${classes.loginContainer} rtl`}>
      <motion.div className={classes.loginRow}>
        <motion.div
          initial={{ x: 500 }}
          animate={{ x: 0 }}
          transition={{ duration: 5, type: "spring", bounce: 0.5 }}
          className={classes.loginbox}
        >
          <motion.form onSubmit={submitUser}>
            <FormGroupComponent>
              <LabelComponent label="ایمیل" htmlFor="email" />
              <InputComponent
                inputType="email"
                inputName="email"
                value={form.email}
                change={handleChange}
              />
            </FormGroupComponent>
            <FormGroupComponent>
              <LabelComponent label="رمز عبور" htmlFor="password" />
              <InputComponent
                inputType="password"
                inputName="password"
                value={form.password}
                change={handleChange}
              />
              {/* <input
                type="checkbox"
                value={selectAdd}
                onChange={() => selectValueChange("hello")}
              /> */}
            </FormGroupComponent>
            {loading ? (
              <button className="btn btn-success">
                <Spinner />
              </button>
            ) : (
              <button type="submit" className="btn btn-success">
                ورود
              </button>
            )}
          </motion.form>
        </motion.div>
        <div className={classes.loginbox}>
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            transition={{ type: "spring", duration: 1, bounce: 0.2 }}
            whileTap={{ scale: 0.8 }}
            drag
            dragConstraints={{ left: 0, right: 250, top: 0, bottom: 50 }}
            className={classes.loginIcon}
          >
            <Image src="/img/login.jpg" width={300} height={300} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginComponent;
