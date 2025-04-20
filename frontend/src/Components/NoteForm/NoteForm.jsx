import React, { useContext, useState } from "react";
import styles from "./NoteForm.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { myContext } from "../../Context/MyContext";

const NoteForm = ({
  onHide,
  setResponseMessage,
  setSuccessResponse,
  setShowResponse,
}) => {
  const userId = localStorage.getItem("userID");
  const {toggleDataChanged}=useContext(myContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    priority: "low",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendFormData = async (data) => {
    setLoading(true);
    console.log(userId)
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}notes`, data, {
        headers: {
          "Content-Type": "application/json",
          userId: userId,
        },
      });
      console.log(response);
      setLoading(false);
      setResponseMessage({
        title: "Added Successfully",
        content: "Your New Note has been Added Successfully",
      });
      setSuccessResponse(true);
      setShowResponse(true);
      toggleDataChanged()
      onHide();
    } catch (error) {
      console.error(error);
      setResponseMessage({
        title: "Add Note Faild",
        content: "Your New Note faild to be Added please try again",
      });
      setSuccessResponse(false);
      setShowResponse(true);
      onHide();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendFormData(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <div className={styles.input_field}>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="title"
            onChange={handleChange}
          />
        </div>
        <div className={styles.input_field}>
          <textarea
            name="body"
            id="desc"
            placeholder="description"
            onChange={handleChange}
            rows={5}
          />
        </div>
        <div className="d-flex justify-content-evenly align-items-center my-4">
          <div className={styles.select_item}>
            <input
              type="radio"
              id="low"
              name="priority"
              value="low"
              onChange={handleChange}
            />
            <label htmlFor="low">low</label>
          </div>

          <div className={styles.select_item}>
            <input
              type="radio"
              id="med"
              name="priority"
              value="med"
              onChange={handleChange}
            />
            <label htmlFor="med">medium</label>
          </div>

          <div className={styles.select_item}>
            <input
              type="radio"
              id="high"
              name="priority"
              value="high"
              onChange={handleChange}
            />
            <label htmlFor="high">high</label>
          </div>
        </div>
        <div className="text-end mt-4">
          <button type="submit" className={styles.submit_btn}>
            {loading ? <FontAwesomeIcon icon={faSpinner} /> : "Add Now"}
          </button>
        </div>
      </form>
    </>
  );
};

export default NoteForm;
