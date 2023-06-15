import React, { useContext, useState, Fragment } from "react";
import CovidContext from "../store/covid-context";
import InputComponent from "./shared/InputComponent";
import classes from "./addVaccine.module.css";
import { Spinner } from "reactstrap";
const AddVaccine = () => {
  const { userId, addVaccine } = useContext(CovidContext);
  const [form, setForm] = useState({
    firstDose: "",
    secondDose: "",
    thirdDose: "",
    total: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;

    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  const reset = () => {
    setForm({
      ...form,
      firstDose: "",
      secondDose: "",
      thirdDose: "",
      total: "",
    });
  };

  const vaccineSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const vaccine = {
        creator: userId,
        firstdose: form.firstDose,
        seconddose: form.secondDose,
        thirddose: form.thirdDose,
        total: form.total,
      };
      setLoading(true);
      await addVaccine(vaccine);
      reset();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className={classes.form} onSubmit={vaccineSubmitHandler}>
      <InputComponent inputType="text" hide value={userId} name="creator" />
      <InputComponent
        inputType="number"
        inputName="firstDose"
        value={form.firstDose}
        change={handleChange}
        place="دوز اول"
      />
      <InputComponent
        inputType="number"
        inputName="secondDose"
        value={form.secondDose}
        change={handleChange}
        place="دوز دوم"
      />
      <InputComponent
        inputType="number"
        inputName="thirdDose"
        value={form.thirdDose}
        change={handleChange}
        place="دوز سوم"
      />
      <InputComponent
        inputType="number"
        inputName="total"
        value={form.total}
        change={handleChange}
        place=" مجموع"
      />
      {loading ? (
        <button className="btn btn-success">
          <Spinner />
        </button>
      ) : (
        <button type="submit" className="btn btn-success">
          فرستادن
        </button>
      )}
    </form>
  );
};

export default AddVaccine;
