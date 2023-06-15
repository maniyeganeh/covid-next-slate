import React, { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import classes from "./modal.module.css";
import InputComponent from "./InputComponent";
import TextAreaComponent from "./TextAreaComponent";
import CovidContext from "../../store/covid-context";
import { toast } from "react-toastify";
const AddModal = ({ show, handleClose }) => {
  const { addNews } = useContext(CovidContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [rec, setRec] = useState("");
  const creator = localStorage.getItem("uid");
  const titleChange = (e) => {
    setTitle(e.target.value);
  };
  const descChange = (e) => {
    setDescription(e.target.value);
  };
  const linkChange = (e) => {
    setLink(e.target.value);
  };
  const subChange = (e) => {
    setSubtitle(e.target.value);
  };
  const recChange = (e) => {
    setRec(e.target.value);
  };
  const imageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const reset = () => {
    setTitle("");
    setDescription("");
    setLink("");
    setRec("");
    setSubtitle("");
  };
  const submitNews = async (postData) => {
    postData.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("subtitle", subtitle);
      formData.append("link", link);
      formData.append("creator", creator);
      formData.append("rec", rec);
      formData.append("image", postData.target.image.files[0]);
      addNews(formData);
      reset();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal show={show} onHide={handleClose} className={`${classes.modal} rtl`}>
      <Modal.Header closeButton>
        <Modal.Title>اضافه کردن خبر</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={submitNews}>
          <InputComponent
            inputType="text"
            inputName="creator"
            value={creator}
            hide
          />
          <InputComponent
            inputType="text"
            inputName="title"
            hide={false}
            place="تیتر خبر"
            value={title}
            change={titleChange}
          />
          <InputComponent
            inputType="text"
            inputName="subtitle"
            place="خلاصه خبر"
            value={subtitle}
            change={subChange}
          />
          <TextAreaComponent
            place="متن خبر"
            inputName="description"
            value={description}
            change={descChange}
          />
          <InputComponent
            inputType="text"
            place="لینک"
            inputName="link"
            value={link}
            change={linkChange}
          />
          <InputComponent
            inputType="text"
            place="منبع"
            inputName="rec"
            value={rec}
            change={recChange}
          />
          <InputComponent
            inputType="file"
            inputName="image"
            change={imageChange}
          />
          <Button type="submit" variant="primary" onClick={handleClose}>
            فرستادن
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
